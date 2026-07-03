import { randomUUID } from "crypto"
import { getDb } from "@/lib/db"

export type Appointment = {
  id: string
  date: string
  time: string
  topic: string
  notes: string
  createdAt: string
}

export async function saveAppointment(
  input: Omit<Appointment, "id" | "createdAt">,
): Promise<Appointment> {
  const sql = await getDb()
  const id = randomUUID()
  const createdAt = new Date().toISOString()

  await sql`
    INSERT INTO appointments (id, date, time, topic, notes, created_at)
    VALUES (${id}, ${input.date}, ${input.time}, ${input.topic}, ${input.notes}, ${createdAt})
  `

  return { ...input, id, createdAt }
}

export async function listAppointments(): Promise<Appointment[]> {
  const sql = await getDb()
  const rows = await sql`
    SELECT id, date, time, topic, notes, created_at
    FROM appointments
    ORDER BY created_at DESC
  `
  return rows.map((r) => ({
    id: r.id,
    date: typeof r.date === "string" ? r.date : new Date(r.date).toISOString().slice(0, 10),
    time: r.time,
    topic: r.topic,
    notes: r.notes,
    createdAt: new Date(r.created_at).toISOString(),
  }))
}
