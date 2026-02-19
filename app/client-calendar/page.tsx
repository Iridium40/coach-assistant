"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientSupportCalendar } from "@/components/client-support-calendar"

export default function ClientCalendarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header activeTab="coach-tools" />
      <main className="flex-1">
        <ClientSupportCalendar />
      </main>
      <Footer />
    </div>
  )
}
