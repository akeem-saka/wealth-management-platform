import { NextResponse } from "next/server"
import { listMessages, saveMessage } from "@/lib/messages"
import { hasValidSession } from "@/lib/session"

export async function GET() {
  if (!(await hasValidSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }
  const messages = await listMessages()
  return NextResponse.json({ messages })
}

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

  const { body: text } = (body ?? {}) as Record<string, unknown>

  if (typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json({ error: "Message can't be empty." }, { status: 400 })
  }
  if (text.length > 2000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 })
  }

  const message = await saveMessage(text.trim().slice(0, 2000))
  return NextResponse.json({ ok: true, message })
}
