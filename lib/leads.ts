import { randomUUID } from "crypto"
import { getDb } from "@/lib/db"

export type Lead = {
  id: string
  name: string
  email: string
  investorType: string
  message: string
  suggestedApproach: string | null
  createdAt: string
}

export async function saveLead(input: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const sql = await getDb()
  const id = randomUUID()
  const createdAt = new Date().toISOString()

  await sql`
    INSERT INTO leads (id, name, email, investor_type, message, suggested_approach, created_at)
    VALUES (${id}, ${input.name}, ${input.email}, ${input.investorType}, ${input.message}, ${input.suggestedApproach}, ${createdAt})
  `

  return { ...input, id, createdAt }
}

export async function listLeads(): Promise<Lead[]> {
  const sql = await getDb()
  const rows = await sql`
    SELECT id, name, email, investor_type, message, suggested_approach, created_at
    FROM leads
    ORDER BY created_at DESC
  `
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    investorType: r.investor_type,
    message: r.message,
    suggestedApproach: r.suggested_approach,
    createdAt: new Date(r.created_at).toISOString(),
  }))
}
