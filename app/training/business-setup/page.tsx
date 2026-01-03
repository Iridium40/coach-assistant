"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BusinessSetupContent } from "@/components/training/business-setup-content"
import { ChevronRight } from "lucide-react"

export default function BusinessSetupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200">
      <Header activeTab="training" />
      <main className="flex-1">
        <BusinessSetupContent />
      </main>
      <Footer />
    </div>
  )
}
