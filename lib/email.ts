import type { Lead } from "@/lib/leads"

type SendResult = { sent: true } | { sent: false; reason: string }

// No-ops (returns sent: false) unless RESEND_API_KEY + LEAD_NOTIFICATION_EMAIL
// are set in the environment. Contact form submissions are always persisted
// via saveLead() regardless of whether email delivery is configured.
export async function sendLeadNotification(lead: Lead): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_NOTIFICATION_EMAIL
  if (!apiKey || !to) return { sent: false, reason: "email not configured" }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_NOTIFICATION_FROM || "Marchetti Stone <onboarding@resend.dev>",
      to,
      reply_to: lead.email,
      subject: `New consultation request — ${lead.name}`,
      text: [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Investor type: ${lead.investorType}`,
        lead.suggestedApproach ? `Suggested approach: ${lead.suggestedApproach}` : null,
        "",
        lead.message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    }),
  })

  if (!res.ok) {
    return { sent: false, reason: `Resend responded ${res.status}: ${await res.text()}` }
  }
  return { sent: true }
}
