import type { ChatIntent } from "@/components/chat-widget"

export const generalIntents: ChatIntent[] = [
  {
    id: "greeting",
    keywords: ["hello", "hi", "hey", "hiya", "good morning", "good afternoon"],
    answer:
      "Hello! I'm the Marchetti Stone assistant. Ask me about our services, minimum engagement, offices, fees, or how to get in touch.",
  },
  {
    id: "services",
    keywords: [
      "service",
      "services",
      "offer",
      "what do you do",
      "portfolio strategy",
      "private market",
      "estate",
      "tax strategy",
      "risk",
    ],
    answer:
      "We offer Portfolio Strategy, Private Market Access, Institutional Advisory, Estate & Tax Strategy, Risk & Suitability, and a Dedicated Advisory Team for every relationship.",
    action: { label: "See all services", href: "#services" },
  },
  {
    id: "minimum",
    keywords: ["minimum", "how much do i need", "get started", "qualify", "threshold", "2m", "$2m"],
    answer: "Our minimum engagement is $2M in investable assets.",
    action: { label: "Start a conversation", href: "#contact" },
  },
  {
    id: "offices",
    keywords: ["office", "location", "where are you", "based", "city"],
    answer: "We have offices in New York, London, and Singapore.",
  },
  {
    id: "fees",
    keywords: ["fee", "fees", "cost", "pricing", "charge", "expensive"],
    answer:
      "Advisory fees are typically around 0.85% of AUM, billed quarterly. Exact terms are set per client during the proposal stage.",
  },
  {
    id: "approach",
    keywords: ["approach", "process", "how does it work", "hybrid", "methodology", "onboarding"],
    answer:
      "Our process has four stages: Discovery & Suitability, Strategy & Proposal, Implementation, and Ongoing Stewardship — with continuous monitoring and quarterly reviews throughout.",
    action: { label: "Read more", href: "#approach" },
  },
  {
    id: "contact",
    keywords: ["contact", "talk to", "speak with", "advisor", "consultation", "reach"],
    answer: "You can request a confidential consultation and an advisor will respond within one business day.",
    action: { label: "Request a consultation", href: "#contact" },
  },
  {
    id: "portal_login",
    keywords: ["portal", "login", "log in", "client access", "sign in", "existing client"],
    answer: "Existing clients can access their portfolio through the Client Portal.",
    action: { label: "Client Login", href: "/login" },
  },
]

export const generalFallback = {
  answer:
    "I don't have an answer for that yet — would you like to schedule a confidential conversation with an advisor?",
  action: { label: "Contact Us", href: "#contact" },
}
