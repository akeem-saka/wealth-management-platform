"use client"

import { useState, type FormEvent } from "react"
import { Send, Loader2 } from "lucide-react"
import { client } from "@/lib/portal-data"
import type { PortalMessage } from "@/lib/messages"
import { cn } from "@/lib/utils"

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export function MessageThread({ initialMessages }: { initialMessages: PortalMessage[] }) {
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSend(e: FormEvent) {
    e.preventDefault()
    if (!draft.trim()) return

    setSending(true)
    setError(null)
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: draft }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Couldn't send your message. Please try again.")
        return
      }

      setMessages((prev) => [...prev, data.message as PortalMessage])
      setDraft("")
    } catch {
      setError("Couldn't send your message. Please check your connection.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-lg border border-border bg-card">
      <div className="border-b border-border px-6 py-4">
        <h1 className="font-serif text-lg font-medium tracking-tight text-foreground">Messages</h1>
        <p className="text-sm text-muted-foreground">Conversation with {client.advisor}</p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
        {messages.map((m) => (
          <div key={m.id} className={cn("flex", m.sender === "client" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-md rounded-lg px-4 py-2.5 text-sm",
                m.sender === "client"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground",
              )}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{m.body}</p>
              <p
                className={cn(
                  "mt-1.5 text-[11px]",
                  m.sender === "client" ? "text-primary-foreground/60" : "text-muted-foreground",
                )}
              >
                {m.sender === "client" ? "You" : client.advisor} · {formatTimestamp(m.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="border-t border-border p-4">
        {error && (
          <p role="alert" className="mb-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="flex items-end gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend(e)
              }
            }}
            rows={2}
            placeholder={`Message ${client.advisor}…`}
            className="w-full flex-1 resize-none rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={sending || !draft.trim()}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </form>
    </div>
  )
}
