"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  PieChart,
  Receipt,
  FileText,
  MessageSquare,
  Calendar,
  CreditCard,
  LogOut,
} from "lucide-react"
import { BrandMark } from "@/components/brand-mark"
import { cn } from "@/lib/utils"

const nav = [
  { label: "Overview", icon: LayoutDashboard, href: "/portal" },
  { label: "Holdings", icon: PieChart, href: "/portal/holdings" },
  { label: "Activity", icon: Receipt, href: "/portal/activity" },
  { label: "Documents", icon: FileText, href: "/portal/documents" },
  { label: "Payments", icon: CreditCard, href: "/portal/payments" },
  { label: "Messages", icon: MessageSquare, href: "/portal/messages" },
  { label: "Schedule Review", icon: Calendar, href: "/portal/schedule" },
]

export function PortalSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
    router.refresh()
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-6">
        <BrandMark className="h-6 w-6 text-sidebar-foreground" />
        <span className="font-serif text-lg font-medium tracking-tight">Marchetti Stone</span>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {nav.map((item) => {
          const active = item.href === "/portal" ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
        >
          <LogOut className="h-4.5 w-4.5" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
