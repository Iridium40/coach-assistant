"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { ExternalResourcesTab } from "@/components/external-resources-tab"
import { Announcements } from "@/components/announcements"

export default function ResourcesPage() {
  // No auth checking needed - if user got here, they're logged in
  // The ExternalResourcesTab component handles its own data loading
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activeTab="resources" />
      <main className="flex-1 bg-white">
        <Hero />
        <Announcements />
        <div className="container mx-auto px-4 py-4 sm:py-8 bg-white">
          <ExternalResourcesTab />
        </div>
      </main>
      <Footer />
    </div>
  )
}

