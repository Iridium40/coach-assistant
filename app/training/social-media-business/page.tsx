"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SocialMediaBusinessContent } from "@/components/training/social-media-business-content"

export default function SocialMediaBusinessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200">
      <Header activeTab="training" />
      <main className="flex-1">
        <SocialMediaBusinessContent />
      </main>
      <Footer />
    </div>
  )
}
