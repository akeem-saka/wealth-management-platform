"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { MessageCircle, X, Send } from "lucide-react"
import { cn } from "@/lib/utils"

export type ChatAction = { label: string; href: string }
export type ChatIntent = { id: string; keywords: string[]; answer: string; action?: ChatAction }

type ChatMessage = { id: string; role: "bot" | "user"; text: string; action?: ChatAction }

let idCounter = 0
function nextId() {
  idCounter += 1
  return `msg-${idCounter}`
}

function matchIntent(input: string, intents: ChatIntent[]): ChatIntent | null {
  const normalized = input.toLowerCase()
  let best: ChatIntent | null = null
  let bestScore = 0
  for (const intent of intents) {
    const score = intent.keywords.reduce(
      (acc, kw) => (normalized.includes(kw.toLowerCase()) ? acc + 1 : acc),
      0,
    )
    if (score > bestScore) {
      bestScore = score
      best = intent
    }
  }
  return best
}

export function ChatWidget({
  title,
  greeting,
  intents,
  fallback,
  placeholder = "Type a message…",
}: {
  title: string
  greeting: string
  intents: ChatIntent[]
  fallback: { answer: string; action?: ChatAction }
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId(), role: "bot", text: greeting }])
    }
  }, [open, messages.length, greeting])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  function handleSend(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    const userMsg: ChatMessage = { id: nextId(), role: "user", text }
    const matched = matchIntent(text, intents)
    const botMsg: ChatMessage = matched
      ? { id: nextId(), role: "bot", text: matched.answer, action: matched.action }
      : { id: nextId(), role: "bot", text: fallback.answer, action: fallback.action }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput("")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-80 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xl sm:w-96">
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <span className="font-serif text-sm font-medium">{title}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground",
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                  {m.action && (
                    <Link
                      href={m.action.href}
                      className="mt-2 inline-block text-xs font-medium underline underline-offset-2"
                    >
                      {m.action.label} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="w-full flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  )
}
