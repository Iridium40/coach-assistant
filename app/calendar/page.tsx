"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { CalendarView } from "@/components/calendar-view"
import { useUserData } from "@/contexts/user-data-context"

export default function CalendarPage() {
  const router = useRouter()
  const { user, authLoading } = useUserData()

  // Redirect non-authenticated users to login
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login")
    }
  }, [authLoading, user, router])

  // Show loading only during initial auth check
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--optavia-green))] mx-auto mb-4"></div>
          <p className="text-optavia-gray">Loading...</p>
        </div>
      </div>
    )
  }

  // Show redirecting for non-authenticated users
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--optavia-green))] mx-auto mb-4"></div>
          <p className="text-optavia-gray">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activeTab="calendar" />
      <Hero />
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {/* Page Header */}
          <div className="text-center py-4 sm:py-8 mb-6">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-optavia-dark mb-3 sm:mb-4">
              Calendar
            </h2>
            <p className="text-optavia-gray text-base sm:text-lg max-w-2xl mx-auto px-4">
              View upcoming meetings, training sessions, and team events.
            </p>
          </div>
          
          {/* Calendar Component */}
          <CalendarView />
        </div>
      </main>
      <Footer />
    </div>
  )
}
