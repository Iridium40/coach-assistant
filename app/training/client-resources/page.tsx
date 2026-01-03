"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientResourcesContent } from "@/components/training/client-resources-content"

export default function ClientResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200">
      <Header activeTab="training" />
      <main className="flex-1">
        <ClientResourcesContent />
      </main>
      <Footer />
    </div>
  )
}
