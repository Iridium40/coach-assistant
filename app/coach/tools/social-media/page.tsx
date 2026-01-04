"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { SocialMediaPromptGenerator } from "@/components/social-media-prompt-generator"
import { useUserData } from "@/contexts/user-data-context"
import { ArrowLeft } from "lucide-react"

export default function SocialMediaToolPage() {
  const router = useRouter()
  const { user, authLoading } = useUserData()

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login")
    }
  }, [authLoading, user, router])

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

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activeTab="dashboard" />
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="mb-6">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-optavia-dark mb-2 flex items-center gap-2">
              <span>📱</span> Social Media Post Generator
            </h1>
            <p className="text-optavia-gray">
              Build a prompt, copy it to ChatGPT, get 3 post ideas instantly
            </p>
          </div>

          <SocialMediaPromptGenerator />
        </div>
      </main>
      <Footer />
    </div>
  )
}
