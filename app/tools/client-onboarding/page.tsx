"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientOnboardingTool } from "@/components/client-onboarding-tool"

export default function ClientOnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 -mt-[73px] pt-[73px]">
        <ClientOnboardingTool />
      </main>
      <Footer />
    </div>
  )
}
