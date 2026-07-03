import { randomUUID } from "crypto"
import { getDb } from "@/lib/db"

export type PortalMessage = {
  id: string
  sender: "client" | "advisor"
  body: string
  createdAt: string
}

export async function saveMessage(body: string): Promise<PortalMessage> {
  const sql = await getDb()
  const id = randomUUID()
  const createdAt = new Date().toISOString()

  await sql`
    INSERT INTO portal_messages (id, sender, body, created_at)
    VALUES (${id}, 'client', ${body}, ${createdAt})
  `

  return { id, sender: "client", body, createdAt }
}

export async function listMessages(): Promise<PortalMessage[]> {
  const sql = await getDb()
  const rows = await sql`
    SELECT id, sender, body, created_at
    FROM portal_messages
    ORDER BY created_at ASC
  `
  return rows.map((r) => ({
    id: r.id,
    sender: r.sender as "client" | "advisor",
    body: r.body,
    createdAt: new Date(r.created_at).toISOString(),
  }))
}
