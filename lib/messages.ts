import { randomUUID } from "crypto"
import { appendJsonRecord, readJsonFile } from "@/lib/json-store"

export type PortalMessage = {
  id: string
  sender: "client" | "advisor"
  body: string
  createdAt: string
}

const FILE = "messages.json"

// Seeded thread history so the inbox doesn't look empty on first load.
// Client-sent messages are appended on top of this via saveMessage().
export const seedMessages: PortalMessage[] = [
  {
    id: "seed-1",
    sender: "advisor",
    body: "Good afternoon — I've attached the Q2 performance report to your document vault. Let me know if you'd like to walk through it together.",
    createdAt: "2026-06-30T14:05:00.000Z",
  },
  {
    id: "seed-2",
    sender: "advisor",
    body: "The Private Credit II drawdown (4 of 8) was processed on schedule. Cash reserve remains within your target band.",
    createdAt: "2026-06-05T09:30:00.000Z",
  },
]

export async function saveMessage(body: string): Promise<PortalMessage> {
  return appendJsonRecord<PortalMessage>(FILE, {
    id: randomUUID(),
    sender: "client",
    body,
    createdAt: new Date().toISOString(),
  })
}

export async function listMessages(): Promise<PortalMessage[]> {
  const stored = await readJsonFile<PortalMessage>(FILE)
  return [...seedMessages, ...stored].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )
}
