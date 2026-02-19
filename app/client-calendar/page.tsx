"use client"

import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientSupportCalendar } from "@/components/client-support-calendar"

function CalendarLoading() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4" />
        <div className="h-4 bg-gray-200 rounded w-48 mx-auto" />
      </div>
    </div>
  )
}

export default function ClientCalendarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header activeTab="coach-tools" />
      <main className="flex-1">
        <Suspense fallback={<CalendarLoading />}>
          <ClientSupportCalendar />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
