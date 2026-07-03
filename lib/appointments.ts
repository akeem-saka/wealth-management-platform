import { randomUUID } from "crypto"
import { appendJsonRecord, readJsonFile } from "@/lib/json-store"

export type Appointment = {
  id: string
  date: string
  time: string
  topic: string
  notes: string
  createdAt: string
}

const FILE = "appointments.json"

export async function saveAppointment(
  input: Omit<Appointment, "id" | "createdAt">,
): Promise<Appointment> {
  return appendJsonRecord<Appointment>(FILE, {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  })
}

export async function listAppointments(): Promise<Appointment[]> {
  return readJsonFile<Appointment>(FILE)
}
