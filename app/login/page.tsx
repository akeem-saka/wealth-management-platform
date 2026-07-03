import { Suspense } from "react"
import type { Metadata } from "next"
import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Client Login — Marchetti Stone",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-6">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
