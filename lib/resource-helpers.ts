import { createClient } from "@/lib/supabase/client"
import type { ExternalResource } from "@/lib/types"

/**
 * Get resources relevant to a client's current program day
 * Matches resources where:
 * - show_condition matches the day range (e.g., client_day_0, client_day_1_to_9)
 * - features.relevant_days includes the programDay
 */
export async function getRelevantResourcesForClient(programDay: number): Promise<ExternalResource[]> {
  const supabase = createClient()
  
  // Build conditions for day matching
  const dayConditions: string[] = []
  
  // Exact day match
  dayConditions.push(`show_condition.eq.client_day_${programDay}`)
  
  // Range matches
  if (programDay === 0) {
    dayConditions.push(`show_condition.eq.client_day_0_or_1`)
  } else if (programDay === 1) {
    dayConditions.push(`show_condition.eq.client_day_0_or_1`)
    dayConditions.push(`show_condition.eq.client_day_1_to_4`)
    dayConditions.push(`show_condition.eq.client_day_1_to_9`)
  } else if (programDay >= 2 && programDay <= 4) {
    dayConditions.push(`show_condition.eq.client_day_1_to_4`)
    dayConditions.push(`show_condition.eq.client_day_1_to_9`)
  } else if (programDay >= 5 && programDay <= 9) {
    dayConditions.push(`show_condition.eq.client_day_1_to_9`)
  } else if (programDay >= 10 && programDay <= 30) {
    dayConditions.push(`show_condition.eq.client_day_10_to_30`)
  }
  
  const { data, error } = await supabase
    .from('external_resources')
    .select('*')
    .eq('is_active', true)
    .or(dayConditions.join(','))
    .order('sort_order')
  
  if (error) {
    console.error('Error fetching client resources:', error)
    return []
  }
  
  // Additional filter for features.relevant_days if present
  const filtered = (data || []).filter(resource => {
    // If no features or no relevant_days, include if show_condition matched
    if (!resource.features || !resource.features.relevant_days) {
      return true
    }
    // Check if programDay is in relevant_days array
    return resource.features.relevant_days.includes(programDay)
  })
  
  return filtered
}

/**
 * Get resources relevant to a prospect's current stage
 * Matches resources where:
 * - features.show_in includes 'prospect_tracker'
 * - Optionally filters by relevant_stages if specified
 */
export async function getRelevantResourcesForProspect(
  stage?: string
): Promise<ExternalResource[]> {
  const supabase = createClient()
  
  // First, get all resources that should show in prospect tracker
  const { data, error } = await supabase
    .from('external_resources')
    .select('*')
    .eq('is_active', true)
    .or('show_condition.eq.prospect_tracker_view,show_condition.eq.prospect_early_stage,show_condition.eq.prospect_interested_stage')
    .order('sort_order')
  
  if (error) {
    console.error('Error fetching prospect resources:', error)
    return []
  }
  
  // Filter by stage if provided
  if (stage && data) {
    return data.filter(resource => {
      // If no relevant_stages specified, show for all stages
      if (!resource.features?.relevant_stages) {
        return true
      }
      // Check if current stage matches relevant_stages
      return resource.features.relevant_stages.includes(stage)
    })
  }
  
  return data || []
}

/**
 * Get all resources for a specific category
 */
export async function getResourcesByCategory(category: string): Promise<ExternalResource[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('external_resources')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .order('sort_order')
  
  if (error) {
    console.error('Error fetching resources by category:', error)
    return []
  }
  
  return data || []
}

/**
 * Get all unique categories from active resources
 */
export async function getAllResourceCategories(): Promise<string[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('external_resources')
    .select('category')
    .eq('is_active', true)
    .order('category')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  
  // Get unique categories
  const categories = [...new Set((data || []).map(r => r.category))].filter(Boolean)
  return categories as string[]
}

/**
 * Get resources by tag (from features.tags)
 */
export async function getResourcesByTag(tag: string): Promise<ExternalResource[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('external_resources')
    .select('*')
    .eq('is_active', true)
    .contains('features', { tags: [tag] })
    .order('sort_order')
  
  if (error) {
    console.error('Error fetching resources by tag:', error)
    return []
  }
  
  return data || []
}

/**
 * Get essential/onboarding resources
 */
export async function getEssentialResources(): Promise<ExternalResource[]> {
  return getResourcesByTag('essential')
}

/**
 * Resource display helper - determines if resource should show based on context
 */
export function shouldShowResource(
  resource: ExternalResource,
  context: {
    view: 'client_tracker' | 'prospect_tracker' | 'resources' | 'dashboard'
    programDay?: number
    prospectStage?: string
  }
): boolean {
  const { view, programDay, prospectStage } = context
  const features = resource.features
  
  // If no features or show_in specified, show on resources page only
  if (!features?.show_in) {
    return view === 'resources' || view === 'dashboard'
  }
  
  // Check if resource should show in current view
  if (!features.show_in.includes(view)) {
    return false
  }
  
  // Additional filtering for client tracker
  if (view === 'client_tracker' && programDay !== undefined) {
    if (features.relevant_days && !features.relevant_days.includes(programDay)) {
      return false
    }
  }
  
  // Additional filtering for prospect tracker
  if (view === 'prospect_tracker' && prospectStage) {
    if (features.relevant_stages && !features.relevant_stages.includes(prospectStage)) {
      return false
    }
  }
  
  return true
}
