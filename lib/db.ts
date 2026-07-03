import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// No migration framework for four small tables — just idempotent DDL run
// lazily on first query per serverless instance, cached after that.
let migrated: Promise<void> | null = null

async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id UUID PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      investor_type TEXT NOT NULL,
      message TEXT NOT NULL,
      suggested_approach TEXT,
      created_at TIMESTAMPTZ NOT NULL
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS portal_messages (
      id UUID PRIMARY KEY,
      sender TEXT NOT NULL CHECK (sender IN ('client', 'advisor')),
      body TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS appointments (
      id UUID PRIMARY KEY,
      date DATE NOT NULL,
      time TEXT NOT NULL,
      topic TEXT NOT NULL,
      notes TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS paid_invoices (
      invoice_id TEXT PRIMARY KEY,
      paid_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `

  // Seed the advisor's opening messages once. ON CONFLICT makes this safe
  // to run on every cold start.
  await sql`
    INSERT INTO portal_messages (id, sender, body, created_at) VALUES
      ('00000000-0000-0000-0000-000000000001', 'advisor',
       'Good afternoon — I''ve attached the Q2 performance report to your document vault. Let me know if you''d like to walk through it together.',
       '2026-06-30T14:05:00.000Z'),
      ('00000000-0000-0000-0000-000000000002', 'advisor',
       'The Private Credit II drawdown (4 of 8) was processed on schedule. Cash reserve remains within your target band.',
       '2026-06-05T09:30:00.000Z')
    ON CONFLICT (id) DO NOTHING
  `
}

export async function getDb() {
  if (!migrated) migrated = migrate()
  await migrated
  return sql
}
