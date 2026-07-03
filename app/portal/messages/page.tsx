import type { Metadata } from "next"
import { MessageThread } from "@/components/portal/message-thread"
import { listMessages } from "@/lib/messages"

export const metadata: Metadata = {
  title: "Messages — Marchetti Stone",
}

export default async function MessagesPage() {
  const messages = await listMessages()
  return <MessageThread initialMessages={messages} />
}
