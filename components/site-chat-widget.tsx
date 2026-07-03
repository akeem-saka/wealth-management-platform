"use client"

import { ChatWidget } from "@/components/chat-widget"
import { generalIntents, generalFallback } from "@/lib/chatbot-knowledge"

export function SiteChatWidget() {
  return (
    <ChatWidget
      title="Marchetti Stone Assistant"
      greeting="Hello! I can answer questions about our services, minimum engagement, offices, fees, or how to get in touch. What would you like to know?"
      intents={generalIntents}
      fallback={generalFallback}
    />
  )
}
