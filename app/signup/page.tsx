"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SignupForm } from "@/components/auth/signup-form"
import { Footer } from "@/components/footer"

function SignupPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inviteKey = searchParams.get("invite")

  const handleSuccess = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="mb-8 sm:mb-12">
          <picture>
            <source srcSet="/branding/ca_hub_logo.svg" type="image/svg+xml" />
            <img
              src="/branding/ca_hub_logo.png"
              alt="Coach Assistant Hub"
              className="h-16 sm:h-20 md:h-24 w-auto mx-auto"
            />
          </picture>
        </div>
        <div className="w-full max-w-md space-y-4">
          <SignupForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => router.push("/login")}
            inviteKey={inviteKey}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--optavia-green))] mx-auto mb-4"></div>
          <p className="text-optavia-gray">Loading...</p>
        </div>
      </div>
    }>
      <SignupPageContent />
    </Suspense>
  )
}
