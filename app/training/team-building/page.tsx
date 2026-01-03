"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamBuildingContent } from "@/components/training/team-building-content"

export default function TeamBuildingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200">
      <Header activeTab="training" />
      <main className="flex-1">
        <TeamBuildingContent />
      </main>
      <Footer />
    </div>
  )
}
