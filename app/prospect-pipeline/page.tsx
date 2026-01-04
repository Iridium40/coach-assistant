"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PipelineView } from "@/components/my-business"

export default function PipelinePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">My Pipeline</h1>
          <p className="text-sm sm:text-base opacity-90">
            Track your prospects from first contact to client to future coach
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 flex-1">
        <PipelineView />
      </div>

      <Footer />
    </div>
  )
}
