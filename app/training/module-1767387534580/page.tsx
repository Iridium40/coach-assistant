"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SponsoringCoachProTipsContent } from "@/components/training/sponsoring-coach-pro-tips-content"

export default function SponsoringCoachProTipsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200">
      <Header activeTab="training" />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="text-5xl mb-2">🎉</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Congratulations on Launching Your New Coach!
            </h1>
            <p className="text-lg opacity-90">
              How to be an incredible mentor to your new coach
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <SponsoringCoachProTipsContent />

            {/* Footer Navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-12 pt-8 border-t border-gray-300">
              <a
                href="/training"
                className="flex items-center gap-2 text-optavia-gray hover:text-purple-600 font-semibold"
              >
                ← Back to Training Center
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
