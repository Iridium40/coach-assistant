"use client"

import { useState } from "react"
import { Hero } from "@/components/hero"
import { ResourcesTab } from "@/components/resources-tab"
import { RecipesTab } from "@/components/recipes-tab"
import type { UserData, Module, Recipe } from "@/lib/types"

interface DashboardProps {
  userData: UserData
  setUserData: (data: UserData) => void
  onSelectModule: (module: Module) => void
  onSelectRecipe: (recipe: Recipe) => void
}

export function Dashboard({ userData, setUserData, onSelectModule, onSelectRecipe }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"resources" | "recipes">("resources")

  return (
    <>
      <Hero userData={userData} />

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-8 border-b border-optavia-border mb-8">
          <button
            onClick={() => setActiveTab("resources")}
            className={`pb-4 px-2 font-heading font-semibold text-lg transition-colors relative ${
              activeTab === "resources"
                ? "text-[hsl(var(--optavia-green))]"
                : "text-optavia-gray hover:text-[hsl(var(--optavia-green))]"
            }`}
          >
            Resources
            {activeTab === "resources" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--optavia-green))]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("recipes")}
            className={`pb-4 px-2 font-heading font-semibold text-lg transition-colors relative ${
              activeTab === "recipes"
                ? "text-[hsl(var(--optavia-green))]"
                : "text-optavia-gray hover:text-[hsl(var(--optavia-green))]"
            }`}
          >
            Lean & Green Recipes
            {activeTab === "recipes" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--optavia-green))]" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "resources" && (
          <ResourcesTab userData={userData} setUserData={setUserData} onSelectModule={onSelectModule} />
        )}

        {activeTab === "recipes" && (
          <RecipesTab userData={userData} setUserData={setUserData} onSelectRecipe={onSelectRecipe} />
        )}
      </div>
    </>
  )
}
