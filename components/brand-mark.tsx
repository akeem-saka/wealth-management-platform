import { cn } from "@/lib/utils"

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-7 w-7", className)}
      role="img"
      aria-label="Marchetti Stone emblem"
      fill="none"
    >
      <rect x="1" y="1" width="30" height="30" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 23V9l8 9 8-9v14" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  )
}
