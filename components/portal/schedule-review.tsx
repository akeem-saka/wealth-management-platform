"use client"

import { useState, type FormEvent } from "react"
import { Check, Loader2, Calendar } from "lucide-react"
import { client } from "@/lib/portal-data"

const timeSlots = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"]
const topics = ["Portfolio Review", "Rebalancing Discussion", "Private Markets Opportunity", "Tax Planning", "Other"]

function minDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

function maxDate() {
  const d = new Date()
  d.setDate(d.getDate() + 60)
  return d.toISOString().slice(0, 10)
}

export function ScheduleReview() {
  const [date, setDate] = useState("")
  const [time, setTime] = useState(timeSlots[0])
  const [topic, setTopic] = useState(topics[0])
  const [notes, setNotes] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "done">("idle")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!date) {
      setError("Please select a date.")
      setStatus("error")
      return
    }

    setStatus("submitting")
    setError(null)

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, topic, notes }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Couldn't request that time. Please try again.")
        setStatus("error")
        return
      }

      setStatus("done")
    } catch {
      setError("Couldn't request that time. Please check your connection.")
      setStatus("error")
    }
  }

  if (status === "done") {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/12 text-accent">
          <Check className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-serif text-2xl font-medium text-foreground">Review requested.</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {client.advisor} will confirm your {topic.toLowerCase()} on{" "}
          {new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}{" "}
          at {time}.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/8 text-primary">
          <Calendar className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-serif text-lg font-medium tracking-tight text-foreground">
            Schedule a Review
          </h1>
          <p className="text-sm text-muted-foreground">With {client.advisor}, {client.advisorTitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="mb-2 block text-sm font-medium text-foreground">
              Date
            </label>
            <input
              id="date"
              type="date"
              min={minDate()}
              max={maxDate()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="time" className="mb-2 block text-sm font-medium text-foreground">
              Time
            </label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
            >
              {timeSlots.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-foreground">Topic</span>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                  topic === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="mb-2 block text-sm font-medium text-foreground">
            Anything specific you'd like to cover? (optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
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
          {status === "submitting" ? "Requesting…" : "Request Review"}
        </button>
      </form>
    </div>
  )
}
