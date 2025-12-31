"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FavoritesPage } from "@/components/favorites-page"
import { useUserData } from "@/contexts/user-data-context"

export default function FavoritesRoute() {
  const router = useRouter()
  const { user, authLoading } = useUserData()

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login")
    }
  }, [user, authLoading, router])

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--optavia-green))] mx-auto mb-4"></div>
          <p className="text-optavia-gray">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activeTab="favorites" />
      <main className="flex-1 bg-white">
        <FavoritesPage />
      </main>
      <Footer />
    </div>
  )
}

