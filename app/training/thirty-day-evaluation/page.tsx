"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThirtyDayEvaluationContent } from "@/components/training/thirty-day-evaluation-content"

export default function ThirtyDayEvaluationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200">
      <Header activeTab="training" />
      <main className="flex-1">
        <ThirtyDayEvaluationContent />
      </main>
      <Footer />
    </div>
  )
}
