import { randomUUID } from "crypto"
import { appendJsonRecord, readJsonFile } from "@/lib/json-store"

export type Lead = {
  id: string
  name: string
  email: string
  investorType: string
  message: string
  suggestedApproach: string | null
  createdAt: string
}

const FILE = "leads.json"

export async function saveLead(input: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  return appendJsonRecord<Lead>(FILE, {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  })
}

export async function listLeads(): Promise<Lead[]> {
  return readJsonFile<Lead>(FILE)
}
