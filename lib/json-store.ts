import { promises as fs } from "fs"
import os from "os"
import path from "path"

// Vercel's deployment filesystem is read-only outside /tmp, so on Vercel we
// fall back to /tmp. That storage is ephemeral (per-instance, can be wiped
// at any time) — fine as a demo/backstop, not a substitute for a real DB.
const DATA_DIR = process.env.VERCEL
  ? path.join(os.tmpdir(), "wealth-management-platform-data")
  : path.join(process.cwd(), "data")

export async function readJsonFile<T>(filename: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, filename), "utf-8")
    return JSON.parse(raw) as T[]
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return []
    throw err
  }
}

export async function writeJsonFile<T>(filename: string, records: T[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(path.join(DATA_DIR, filename), JSON.stringify(records, null, 2), "utf-8")
}

export async function appendJsonRecord<T>(filename: string, record: T): Promise<T> {
  const records = await readJsonFile<T>(filename)
  records.push(record)
  await writeJsonFile(filename, records)
  return record
}
