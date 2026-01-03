"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UnderstandingHealthAssessmentContent } from "@/components/training/understanding-health-assessment-content"

export default function UnderstandingHealthAssessmentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200">
      <Header activeTab="training" />
      <main className="flex-1">
        <UnderstandingHealthAssessmentContent />
      </main>
      <Footer />
    </div>
  )
}
