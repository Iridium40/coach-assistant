import { createClient } from "@/lib/supabase/client"

// Resource IDs for the 4 onboarding modules
export const ONBOARDING_RESOURCE_IDS = [
  "welcome-content",
  "business-content",
  "acronyms-content",
  "health-assessment-onboarding-content"
]

// Module IDs for the 4 onboarding modules
export const ONBOARDING_MODULE_IDS = [
  "new-coach-welcome",
  "business-resources",
  "acronyms-guide",
  "health-assessment-onboarding"
]

/**
 * Check if a resource ID is part of the onboarding path
 */
export function isOnboardingResource(resourceId: string): boolean {
  return ONBOARDING_RESOURCE_IDS.includes(resourceId)
}

/**
 * Check if a module ID is part of the onboarding path
 */
export function isOnboardingModule(moduleId: string): boolean {
  return ONBOARDING_MODULE_IDS.includes(moduleId)
}

/**
 * Check if user has completed all onboarding modules
 */
export async function checkOnboardingComplete(userId: string): Promise<boolean> {
  const supabase = createClient()

  // Get all completed resources for this user
  const { data: completedResources, error } = await supabase
    .from("user_progress")
    .select("resource_id")
    .eq("user_id", userId)
    .in("resource_id", ONBOARDING_RESOURCE_IDS)

  if (error) {
    console.error("Error checking onboarding completion:", error)
    return false
  }

  // Check if all 4 onboarding resources are completed
  const completedIds = completedResources?.map(r => r.resource_id) || []
  const allCompleted = ONBOARDING_RESOURCE_IDS.every(id => completedIds.includes(id))

  return allCompleted
}

/**
 * Mark user as no longer a new coach
 */
export async function markOnboardingComplete(userId: string): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase
    .from("profiles")
    .update({ is_new_coach: false })
    .eq("id", userId)

  if (error) {
    console.error("Error marking onboarding complete:", error)
    return false
  }

  return true
}

/**
 * Get onboarding progress (number of completed modules out of 4)
 */
export async function getOnboardingProgress(userId: string): Promise<{ completed: number; total: number; percentage: number }> {
  const supabase = createClient()

  const { data: completedResources, error } = await supabase
    .from("user_progress")
    .select("resource_id")
    .eq("user_id", userId)
    .in("resource_id", ONBOARDING_RESOURCE_IDS)

  if (error) {
    console.error("Error getting onboarding progress:", error)
    return { completed: 0, total: 4, percentage: 0 }
  }

  const completed = completedResources?.length || 0
  const total = ONBOARDING_RESOURCE_IDS.length
  const percentage = Math.round((completed / total) * 100)

  return { completed, total, percentage }
}
