import { NextResponse } from "next/server"
import { saveLead } from "@/lib/leads"
import { sendLeadNotification } from "@/lib/email"
import { suggestionsByInvestorType } from "@/lib/investment-suggestions"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
// Best-effort, per-instance only — resets on redeploy/cold start. Good
// enough to blunt naive spam without standing up external infra.
const submissionsByIp = new Map<string, number[]>()

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (submissionsByIp.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  submissionsByIp.set(key, recent)
  return recent.length > RATE_LIMIT_MAX
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const { name, email, investorType, message, company } = (body ?? {}) as Record<string, unknown>

  // Honeypot: a hidden field real users never fill in. Bots that
  // autofill every field trip it and get a fake success response.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true })
  }

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 })
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }
  if (typeof investorType !== "string" || investorType.trim().length === 0) {
    return NextResponse.json({ error: "Please select an investor type." }, { status: 400 })
  }
  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "Please tell us a bit about your goals." }, { status: 400 })
  }
  if (message.length > 2000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 })
  }

  const trimmedInvestorType = investorType.trim().slice(0, 100)
  // Derived server-side from a fixed lookup table, never taken from the
  // client, so it can't be spoofed to an arbitrary string.
  const suggestedApproach = suggestionsByInvestorType[trimmedInvestorType]?.headline ?? null

  const lead = await saveLead({
    name: name.trim().slice(0, 200),
    email: email.trim().slice(0, 200),
    investorType: trimmedInvestorType,
    message: message.trim().slice(0, 2000),
    suggestedApproach,
  })

  const emailResult = await sendLeadNotification(lead)
  if (!emailResult.sent) {
    console.warn(`[contact] email not sent for lead ${lead.id}: ${emailResult.reason}`)
  }

  return NextResponse.json({ ok: true, id: lead.id })
}
