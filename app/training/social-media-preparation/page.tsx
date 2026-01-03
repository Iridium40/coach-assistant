"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SocialMediaPreparationContent } from "@/components/training/social-media-preparation-content"

export default function SocialMediaPreparationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200">
      <Header activeTab="training" />
      <main className="flex-1">
        <SocialMediaPreparationContent />
      </main>
      <Footer />
    </div>
  )
}
