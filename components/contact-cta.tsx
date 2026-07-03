"use client"

import { useState, type FormEvent } from "react"
import { Check, Loader2, Sparkles } from "lucide-react"
import { suggestionsByInvestorType } from "@/lib/investment-suggestions"

const investorTypes = [
  "Private Wealth",
  "Family Office",
  "Endowment / Foundation",
  "Institution",
]

export function ContactCta() {
  const [submitted, setSubmitted] = useState(false)
  const [type, setType] = useState(investorTypes[0])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [company, setCompany] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const suggestion = suggestionsByInvestorType[type]

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus("submitting")
    setError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, investorType: type, message, company }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.")
        setStatus("error")
        return
      }

      setStatus("idle")
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please check your connection and try again.")
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="text-sm font-medium uppercase tracking-widest text-primary-foreground/60">
            Get Started
          </span>
          <h2 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            Begin a confidential conversation.
          </h2>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/70">
            Tell us a little about your objectives and a member of our advisory team will be in
            touch within one business day. All inquiries are held in strict confidence.
          </p>

          <dl className="mt-10 space-y-5 border-t border-primary-foreground/15 pt-8 text-sm">
            <div>
              <dt className="text-primary-foreground/55">Minimum engagement</dt>
              <dd className="mt-1 font-serif text-lg">$2M investable assets</dd>
            </div>
            <div>
              <dt className="text-primary-foreground/55">Offices</dt>
              <dd className="mt-1 font-serif text-lg">New York · London · Singapore</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/[0.04] p-7 lg:p-8">
          {submitted ? (
            <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                <Check className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-serif text-2xl font-medium">Thank you.</h3>
              <p className="mt-2 max-w-xs text-sm text-primary-foreground/70">
                Your inquiry has been received. An advisor will reach out to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative space-y-5">
              {/* Honeypot — hidden from real users via CSS, bots that autofill it get caught server-side. */}
              <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full name"
                  id="name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={setName}
                  required
                />
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={setEmail}
                  required
                />
              </div>

              <div>
                <span className="mb-2 block text-sm font-medium text-primary-foreground/80">
                  Investor type
                </span>
                <div className="flex flex-wrap gap-2">
                  {investorTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                        type === t
                          ? "border-primary-foreground bg-primary-foreground text-primary"
                          : "border-primary-foreground/25 text-primary-foreground/80 hover:border-primary-foreground/50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {suggestion && (
                <div className="rounded-md border border-accent/30 bg-accent/10 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-accent">
                    <Sparkles className="h-4 w-4" />
                    Suggested for you: {suggestion.headline}
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {suggestion.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-primary-foreground/20 px-2.5 py-0.5 text-xs text-primary-foreground/80"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-primary-foreground/60">{suggestion.note}</p>
                </div>
              )}

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-primary-foreground/80"
                >
                  How can we help?
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Briefly describe your goals…"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary-foreground/60 focus:outline-none"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary-foreground px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary-foreground/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === "submitting" ? "Sending…" : "Request Consultation"}
              </button>
              <p className="text-center text-xs text-primary-foreground/50">
                Your information is sent securely to our advisory team.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string
  id: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-primary-foreground/80">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary-foreground/60 focus:outline-none"
      />
    </div>
  )
}
