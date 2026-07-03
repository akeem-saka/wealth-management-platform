"use client"

import { useState, type FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { BrandMark } from "@/components/brand-mark"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus("submitting")
    setError(null)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Invalid email or password.")
        setStatus("error")
        return
      }

      router.push(searchParams.get("from") || "/portal")
      router.refresh()
    } catch {
      setError("Something went wrong. Please try again.")
      setStatus("error")
    }
  }

  return (
    <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8">
      <div className="flex items-center gap-2.5">
        <BrandMark className="h-6 w-6 text-primary" />
        <span className="font-serif text-lg font-medium tracking-tight text-foreground">
          Marchetti Stone
        </span>
      </div>
      <h1 className="mt-6 font-serif text-xl font-medium tracking-tight text-foreground">Client Login</h1>
      <p className="mt-1 text-sm text-muted-foreground">Sign in to view your portfolio.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "submitting" ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <div className="mt-6 rounded-md bg-secondary/60 px-4 py-3 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">Demo credentials</p>
        <p className="mt-1 font-mono">client@marchettistone.com / Whitfield#2026</p>
        <p className="mt-1">Override via the PORTAL_EMAIL / PORTAL_PASSWORD env vars.</p>
      </div>

      <Link href="/" className="mt-6 block text-center text-xs text-muted-foreground hover:text-foreground">
        ← Back to site
      </Link>
    </div>
  )
}
