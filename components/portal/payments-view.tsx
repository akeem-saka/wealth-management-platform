"use client"

import { useEffect, useState, type FormEvent } from "react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { CreditCard, Check, Loader2, AlertTriangle } from "lucide-react"
import { formatCurrency, type invoices as invoicesType } from "@/lib/portal-data"

type Invoice = (typeof invoicesType)[number]

function PaymentsViewInner({
  invoices,
  paidInvoiceIds,
  stripeConfigured,
}: {
  invoices: Invoice[]
  paidInvoiceIds: string[]
  stripeConfigured: boolean
}) {
  const searchParams = useSearchParams()
  const [paid, setPaid] = useState(new Set(paidInvoiceIds))
  const [amount, setAmount] = useState("")
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [banner, setBanner] = useState<{ kind: "success" | "cancelled"; message: string } | null>(null)

  useEffect(() => {
    const status = searchParams.get("status")
    const kind = searchParams.get("kind")
    const sessionId = searchParams.get("session_id")

    if (status === "success" && kind === "invoice" && sessionId) {
      fetch("/api/payments/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.invoiceId) {
            setPaid((prev) => new Set(prev).add(data.invoiceId))
          }
          setBanner({ kind: "success", message: "Payment received — thank you." })
        })
        .catch(() => setBanner({ kind: "success", message: "Payment received — thank you." }))
    } else if (status === "success" && kind === "contribution") {
      setBanner({ kind: "success", message: "Contribution received — thank you." })
    } else if (status === "cancelled") {
      setBanner({ kind: "cancelled", message: "Checkout was cancelled. No payment was made." })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function startCheckout(payload: Record<string, unknown>, key: string) {
    setBusy(key)
    setError(null)
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Couldn't start checkout.")
        setBusy(null)
        return
      }
      window.location.href = data.url
    } catch {
      setError("Couldn't start checkout. Please check your connection.")
      setBusy(null)
    }
  }

  function handleContribute(e: FormEvent) {
    e.preventDefault()
    const value = Number(amount)
    if (!Number.isFinite(value) || value <= 0) {
      setError("Please enter a valid contribution amount.")
      return
    }
    startCheckout({ type: "contribution", amount: value }, "contribution")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-lg font-medium tracking-tight text-foreground">Payments</h1>
        <p className="text-sm text-muted-foreground">Fund your account or pay outstanding advisory fees.</p>
      </div>

      {!stripeConfigured && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Payments are running in demo mode. Set <code className="font-mono">STRIPE_SECRET_KEY</code> to a
            Stripe test-mode key to enable real (test) checkout.
          </p>
        </div>
      )}

      {banner && (
        <div
          className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
            banner.kind === "success"
              ? "border-accent/30 bg-accent/10 text-accent"
              : "border-border bg-secondary/60 text-muted-foreground"
          }`}
        >
          {banner.kind === "success" && <Check className="h-4 w-4 shrink-0" />}
          {banner.message}
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/8 text-primary">
            <CreditCard className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-serif text-base font-medium tracking-tight text-foreground">
              Fund Your Account
            </h2>
            <p className="text-sm text-muted-foreground">Make a one-time contribution via secure checkout.</p>
          </div>
        </div>

        <form onSubmit={handleContribute} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center rounded-md border border-border bg-background px-3 py-2.5">
            <span className="mr-1 text-sm text-muted-foreground">$</span>
            <input
              type="number"
              min={1}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10,000"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={busy === "contribution"}
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy === "contribution" && <Loader2 className="h-4 w-4 animate-spin" />}
            Contribute
          </button>
        </form>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-serif text-base font-medium tracking-tight text-foreground">Advisory Fee Invoices</h2>
        </div>
        <ul className="divide-y divide-border/60">
          {invoices.map((inv) => {
            const isPaid = paid.has(inv.id)
            return (
              <li key={inv.id} className="flex items-center justify-between gap-4 px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{inv.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {inv.id} · Due {inv.dueDate}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm tabular-nums text-foreground">{formatCurrency(inv.amount)}</span>
                  {isPaid ? (
                    <span className="flex items-center gap-1 rounded-md bg-accent/12 px-2.5 py-1 text-xs font-medium text-accent">
                      <Check className="h-3 w-3" />
                      Paid
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startCheckout({ type: "invoice", invoiceId: inv.id }, inv.id)}
                      disabled={busy === inv.id}
                      className="flex items-center gap-2 rounded-md border border-primary px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {busy === inv.id && <Loader2 className="h-3 w-3 animate-spin" />}
                      Pay Now
                    </button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export function PaymentsView(props: {
  invoices: Invoice[]
  paidInvoiceIds: string[]
  stripeConfigured: boolean
}) {
  return (
    <Suspense fallback={null}>
      <PaymentsViewInner {...props} />
    </Suspense>
  )
}
