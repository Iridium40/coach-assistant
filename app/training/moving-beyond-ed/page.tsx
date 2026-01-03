"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MovingBeyondEdContent } from "@/components/training/moving-beyond-ed-content"

export default function MovingBeyondEdPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activeTab="training" />
      <main className="flex-1">
        <MovingBeyondEdContent />
      </main>
      <Footer />
    </div>
  )
}
