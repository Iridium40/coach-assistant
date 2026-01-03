"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TenXSystemContent } from "@/components/training/ten-x-system-content"

export default function TenXSystemPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activeTab="training" />
      <main className="flex-1">
        <TenXSystemContent />
      </main>
      <Footer />
    </div>
  )
}
