import { NextResponse } from "next/server"
import { saveAppointment } from "@/lib/appointments"
import { hasValidSession } from "@/lib/session"

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export async function POST(request: Request) {
  if (!(await hasValidSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const { date, time, topic, notes } = (body ?? {}) as Record<string, unknown>

  if (typeof date !== "string" || !DATE_RE.test(date)) {
    return NextResponse.json({ error: "Please select a valid date." }, { status: 400 })
  }
  if (typeof time !== "string" || time.trim().length === 0) {
    return NextResponse.json({ error: "Please select a time." }, { status: 400 })
  }
  if (typeof topic !== "string" || topic.trim().length === 0) {
    return NextResponse.json({ error: "Please select a topic." }, { status: 400 })
  }

  const appointment = await saveAppointment({
    date,
    time: time.trim().slice(0, 50),
    topic: topic.trim().slice(0, 100),
    notes: typeof notes === "string" ? notes.trim().slice(0, 1000) : "",
  })

  return NextResponse.json({ ok: true, appointment })
}
