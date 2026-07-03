import { PortalSidebar } from "@/components/portal/portal-sidebar"
import { PortalTopbar } from "@/components/portal/portal-topbar"
import { PortalChatWidget } from "@/components/portal/portal-chat-widget"

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-secondary/30">
      <PortalSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <PortalTopbar />
        <main className="flex-1 space-y-6 px-6 py-8">{children}</main>
      </div>
      <PortalChatWidget />
    </div>
  )
}
