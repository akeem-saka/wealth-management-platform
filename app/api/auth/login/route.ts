import { NextResponse } from "next/server"
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth"

const DEMO_EMAIL = process.env.PORTAL_EMAIL || "client@marchettistone.com"
const DEMO_PASSWORD = process.env.PORTAL_PASSWORD || "Whitfield#2026"

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 8
const attemptsByIp = new Map<string, number[]>()

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (attemptsByIp.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  attemptsByIp.set(key, recent)
  return recent.length > RATE_LIMIT_MAX
}

function timingSafeEqualStr(a: string, b: string): boolean {
  const aBytes = new TextEncoder().encode(a)
  const bBytes = new TextEncoder().encode(b)
  if (aBytes.length !== bBytes.length) return false
  let diff = 0
  for (let i = 0; i < aBytes.length; i++) diff |= aBytes[i] ^ bBytes[i]
  return diff === 0
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const { email, password } = (body ?? {}) as Record<string, unknown>
  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
  }

  const emailOk = timingSafeEqualStr(email.trim().toLowerCase(), DEMO_EMAIL.toLowerCase())
  const passwordOk = timingSafeEqualStr(password, DEMO_PASSWORD)

  if (!emailOk || !passwordOk) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 })
  }

  const token = await createSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })
  return res
}
