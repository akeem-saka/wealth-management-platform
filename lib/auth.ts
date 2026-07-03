// Session token = base64url(payload).base64url(HMAC-SHA256 signature).
// Built on Web Crypto (crypto.subtle) rather than Node's crypto module so
// this file works identically in the Edge runtime (middleware) and Node
// (route handlers).

export const SESSION_COOKIE = "portal_session"
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours, in seconds

function getSecret() {
  // A real deployment should set AUTH_SECRET. This fallback keeps the demo
  // working out of the box, but every server instance must share one
  // secret for sessions to validate consistently.
  return process.env.AUTH_SECRET || "dev-only-insecure-secret-change-me"
}

function base64UrlEncode(bytes: Uint8Array): string {
  let str = ""
  for (const b of bytes) str += String.fromCharCode(b)
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function base64UrlDecode(str: string): Uint8Array {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/")
  const bin = atob(padded.padEnd(padded.length + ((4 - (padded.length % 4)) % 4), "="))
  return Uint8Array.from(bin, (c) => c.charCodeAt(0))
}

async function hmac(data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data))
  return new Uint8Array(sig)
}

export async function createSessionToken(): Promise<string> {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE * 1000 })
  const payloadB64 = base64UrlEncode(new TextEncoder().encode(payload))
  const sig = await hmac(payloadB64)
  return `${payloadB64}.${base64UrlEncode(sig)}`
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const [payloadB64, sigB64] = token.split(".")
  if (!payloadB64 || !sigB64) return false

  let expectedSig: Uint8Array
  let actualSig: Uint8Array
  try {
    expectedSig = await hmac(payloadB64)
    actualSig = base64UrlDecode(sigB64)
  } catch {
    return false
  }

  if (expectedSig.length !== actualSig.length) return false
  let diff = 0
  for (let i = 0; i < expectedSig.length; i++) diff |= expectedSig[i] ^ actualSig[i]
  if (diff !== 0) return false

  try {
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64)))
    return typeof payload.exp === "number" && payload.exp > Date.now()
  } catch {
    return false
  }
}
