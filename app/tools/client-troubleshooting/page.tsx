"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientTroubleshootingTool } from "@/components/client-troubleshooting-tool"

export default function ClientTroubleshootingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 -mt-[73px] pt-[73px]">
        <ClientTroubleshootingTool />
      </main>
      <Footer />
    </div>
  )
}
