import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Approach } from "@/components/approach"
import { TrackRecord } from "@/components/track-record"
import { Insights } from "@/components/insights"
import { ContactCta } from "@/components/contact-cta"
import { SiteFooter } from "@/components/site-footer"
import { SiteChatWidget } from "@/components/site-chat-widget"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Approach />
        <TrackRecord />
        <Insights />
        <ContactCta />
      </main>
      <SiteFooter />
      <SiteChatWidget />
    </div>
  )
}
