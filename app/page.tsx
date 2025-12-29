"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Onboarding } from "@/components/onboarding"
import { Dashboard } from "@/components/dashboard"
import { ModuleDetail } from "@/components/module-detail"
import { RecipeDetail } from "@/components/recipe-detail"
import { useStorage } from "@/hooks/use-storage"
import type { Module, Recipe } from "@/lib/types"

export default function Home() {
  const [userData, setUserData] = useStorage()
  const [currentView, setCurrentView] = useState<"onboarding" | "dashboard">("onboarding")
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    if (userData) {
      setCurrentView("dashboard")
    }
  }, [userData])

  const handleOnboardingComplete = (isNewCoach: boolean) => {
    const newUserData = {
      isNewCoach,
      completedResources: [],
      bookmarks: [],
      favoriteRecipes: [],
      createdAt: new Date().toISOString(),
    }
    setUserData(newUserData)
    setCurrentView("dashboard")
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all your progress? This cannot be undone.")) {
      setUserData(null)
      setCurrentView("onboarding")
      setSelectedModule(null)
      setSelectedRecipe(null)
    }
  }

  const handleBack = () => {
    setSelectedModule(null)
    setSelectedRecipe(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onReset={handleReset} showReset={currentView === "dashboard"} />

      <main className="flex-1">
        {currentView === "onboarding" && <Onboarding onComplete={handleOnboardingComplete} />}

        {currentView === "dashboard" && !selectedModule && !selectedRecipe && (
          <Dashboard
            userData={userData!}
            setUserData={setUserData}
            onSelectModule={setSelectedModule}
            onSelectRecipe={setSelectedRecipe}
          />
        )}

        {selectedModule && (
          <ModuleDetail module={selectedModule} userData={userData!} setUserData={setUserData} onBack={handleBack} />
        )}

        {selectedRecipe && (
          <RecipeDetail recipe={selectedRecipe} userData={userData!} setUserData={setUserData} onBack={handleBack} />
        )}
      </main>

      <Footer />
    </div>
  )
}
