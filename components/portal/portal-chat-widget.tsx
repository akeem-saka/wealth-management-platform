"use client"

import { ChatWidget, type ChatIntent } from "@/components/chat-widget"
import { generalIntents } from "@/lib/chatbot-knowledge"
import { client, portfolioSummary, allocation, formatCurrency } from "@/lib/portal-data"

const allocationSummary = allocation.map((a) => `${a.value}% ${a.name}`).join(", ")

const portalIntents: ChatIntent[] = [
  {
    id: "portfolio_value",
    keywords: ["portfolio value", "total value", "how much do i have", "net worth", "account value", "worth"],
    answer: `Your total portfolio value is ${formatCurrency(portfolioSummary.totalValue)}, ${
      portfolioSummary.dayChange >= 0 ? "up" : "down"
    } ${formatCurrency(Math.abs(portfolioSummary.dayChange))} (${portfolioSummary.dayChangePct}%) today.`,
    action: { label: "View Overview", href: "/portal" },
  },
  {
    id: "performance",
    keywords: ["performance", "return", "ytd", "year to date", "gain", "how am i doing"],
    answer: `Your YTD return is +${portfolioSummary.ytdReturnPct}%, net of fees, with ${formatCurrency(
      portfolioSummary.unrealizedGain,
    )} in unrealized gains since inception.`,
  },
  {
    id: "cash",
    keywords: ["cash", "available cash", "liquidity", "dry powder"],
    answer: `You have ${formatCurrency(portfolioSummary.cashAvailable)} in cash available across your accounts.`,
  },
  {
    id: "holdings",
    keywords: ["holdings", "positions", "what am i invested in", "allocation", "asset class"],
    answer: `Your portfolio is allocated: ${allocationSummary}.`,
    action: { label: "View Holdings", href: "/portal/holdings" },
  },
  {
    id: "documents",
    keywords: ["document", "statement", "report", "tax form", "1099", "vault"],
    answer: "You can view and download your statements, reports, and tax documents in the Document Vault.",
    action: { label: "Go to Documents", href: "/portal/documents" },
  },
  {
    id: "schedule",
    keywords: ["schedule", "book", "review", "meeting", "appointment", "call my advisor"],
    answer: "You can request a time with your advisor on the Schedule Review page.",
    action: { label: "Schedule a Review", href: "/portal/schedule" },
  },
  {
    id: "payments",
    keywords: ["pay", "payment", "invoice", "contribute", "fund my account"],
    answer: "You can fund your account or pay outstanding advisory fee invoices from the Payments page.",
    action: { label: "Go to Payments", href: "/portal/payments" },
  },
  {
    id: "my_advisor",
    keywords: ["my advisor", "who is my advisor", "advisor name"],
    answer: `Your advisor is ${client.advisor}, ${client.advisorTitle}.`,
    action: { label: "Message Advisor", href: "/portal/messages" },
  },
  ...generalIntents,
]

const portalFallback = {
  answer: "I don't have an answer for that yet — you can message your advisor directly for anything specific.",
  action: { label: "Message Advisor", href: "/portal/messages" },
}

export function PortalChatWidget() {
  const firstName = client.name.split(" ")[0]

  return (
    <ChatWidget
      title={`Ask ${client.advisor.split(" ")[0]}'s Assistant`}
      greeting={`Hi ${firstName} — I can answer quick questions about your portfolio, documents, or scheduling. What would you like to know?`}
      intents={portalIntents}
      fallback={portalFallback}
      placeholder="Ask about your portfolio…"
    />
  )
}
