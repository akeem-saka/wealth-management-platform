import { Bell, Search } from "lucide-react"
import { client } from "@/lib/portal-data"

export function PortalTopbar() {
  const initials = client.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-border bg-background px-6">
      <div className="hidden items-center gap-2 rounded-md border border-border bg-card px-3 py-2 sm:flex sm:w-72">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search holdings, documents…"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3 sm:ml-auto">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-serif text-sm font-medium text-primary-foreground">
            {initials}
          </span>
          <div className="hidden text-sm sm:block">
            <p className="font-medium leading-tight text-foreground">{client.name}</p>
            <p className="text-xs leading-tight text-muted-foreground">Advised by {client.advisor}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
