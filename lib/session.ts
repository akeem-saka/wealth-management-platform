import { cookies } from "next/headers"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth"

// Server-only (Route Handlers / Server Components) — uses next/headers,
// which isn't available in middleware. Middleware reads the cookie via
// NextRequest.cookies and calls verifySessionToken() directly instead.
export async function hasValidSession(): Promise<boolean> {
  const store = await cookies()
  return verifySessionToken(store.get(SESSION_COOKIE)?.value)
}
