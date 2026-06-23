"use client"

import { useState } from "react"
import { Check } from "lucide-react"

const investorTypes = [
  "Private Wealth",
  "Family Office",
  "Endowment / Foundation",
  "Institution",
]

export function ContactCta() {
  const [submitted, setSubmitted] = useState(false)
  const [type, setType] = useState(investorTypes[0])

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
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" id="name" placeholder="Jane Doe" />
                <Field label="Email" id="email" type="email" placeholder="jane@example.com" />
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
                  className="w-full rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary-foreground/60 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-primary-foreground px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary-foreground/90"
              >
                Request Consultation
              </button>
              <p className="text-center text-xs text-primary-foreground/50">
                This is a demonstration form. No data is transmitted or stored.
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
}: {
  label: string
  id: string
  type?: string
  placeholder?: string
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
        className="w-full rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary-foreground/60 focus:outline-none"
      />
    </div>
  )
}
