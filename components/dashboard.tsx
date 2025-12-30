"use client"

import { Hero } from "@/components/hero"
import { ResourcesTab } from "@/components/resources-tab"
import { BlogTab } from "@/components/blog-tab"
import { RecipesTab } from "@/components/recipes-tab"
import { ConnectTab } from "@/components/connect-tab"
import type { UserData, Module, Recipe } from "@/lib/types"
import type { UserProfile } from "@/hooks/use-supabase-data"

interface DashboardProps {
  userData: UserData
  profile: UserProfile | null
  setUserData: (data: UserData) => void
  toggleFavoriteRecipe?: (recipeId: string) => Promise<void>
  onSelectModule: (module: Module) => void
  onSelectRecipe: (recipe: Recipe) => void
  activeTab?: "resources" | "blog" | "recipes" | "connect"
}

export function Dashboard({ userData, profile, setUserData, toggleFavoriteRecipe, onSelectModule, onSelectRecipe, activeTab = "resources" }: DashboardProps) {

  // Extract first name from full_name
  const firstName = profile?.full_name?.split(" ")[0] || null

  return (
    <>
      <Hero userData={userData} firstName={firstName} />

      <div className="container mx-auto px-4 py-4 sm:py-8 bg-white">
        {/* Tab Content */}
        {activeTab === "resources" && (
          <ResourcesTab userData={userData} setUserData={setUserData} onSelectModule={onSelectModule} />
        )}

        {activeTab === "blog" && <BlogTab />}

        {activeTab === "recipes" && (
          <RecipesTab 
            userData={userData} 
            setUserData={setUserData} 
            toggleFavoriteRecipe={toggleFavoriteRecipe}
            onSelectRecipe={onSelectRecipe} 
          />
        )}

        {activeTab === "connect" && <ConnectTab />}
      </div>
    </>
  )
}
