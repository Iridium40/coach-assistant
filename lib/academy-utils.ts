/**
 * Coaching Amplifier Academy Utilities
 * Functions for rank-based access control and module navigation
 */

// Rank hierarchy from lowest to highest
export const RANK_ORDER = [
  'Coach',      // New Coach
  'SC',         // Senior Coach
  'MG',         // Manager
  'AD',         // Associate Director
  'DR',         // Director
  'ED',         // Executive Director
  'IED',        // Integrated Executive Director
  'FIBC',       // Fully Integrated Business Coach (special status)
  'IRD',        // Integrated Regional Director
  'IND',        // Integrated National Director
  'IGD',        // Integrated Global Director
  'FIBL',       // Fully Integrated Business Leader
  'Presidential', // Presidential Director
  'IPD'         // Integrated Presidential Director
]

// Rank aliases - these ranks are considered equivalent for access control
const RANK_ALIASES: Record<string, string[]> = {
  'IRD': ['IRD', 'IND'],
  'IND': ['IRD', 'IND'],
  'Presidential': ['Presidential', 'IPD'],
  'IPD': ['Presidential', 'IPD']
}

// Academy module IDs and resource IDs
export const ACADEMY_MODULE_IDS = [
  'academy-module-1',
  'academy-module-2',
  'academy-module-3',
  'academy-module-4',
  'academy-module-5',
  'academy-module-6',
]

export const ACADEMY_RESOURCE_IDS = [
  'academy-resource-1',
  'academy-resource-2',
  'academy-resource-3',
  'academy-resource-4',
  'academy-resource-5',
  'academy-resource-6',
]

// Academy module metadata
export const ACADEMY_MODULES = [
  { id: 'module-1', title: 'New Coach Foundations', requiredRank: null, next: 'module-2' },
  { id: 'module-2', title: 'Building Your Business', requiredRank: 'SC', prev: 'module-1', next: 'module-3' },
  { id: 'module-3', title: 'Leadership Development', requiredRank: 'ED', prev: 'module-2', next: 'module-4' },
  { id: 'module-4', title: 'National Expansion', requiredRank: 'IRD', prev: 'module-3', next: 'module-5' },
  { id: 'module-5', title: 'Executive Leadership', requiredRank: 'IGD', prev: 'module-4', next: 'module-6' },
  { id: 'module-6', title: 'Legacy Building', requiredRank: 'Presidential', prev: 'module-5' }
]

/**
 * Get the rank index in the hierarchy
 * Returns -1 if rank is not found
 */
function getRankIndex(rank: string | null): number {
  if (!rank) return -1
  
  // Check direct match first
  const directIndex = RANK_ORDER.findIndex(r => r === rank)
  if (directIndex !== -1) return directIndex
  
  // Check aliases
  for (const [baseRank, aliases] of Object.entries(RANK_ALIASES)) {
    if (aliases.includes(rank)) {
      const baseIndex = RANK_ORDER.findIndex(r => r === baseRank)
      if (baseIndex !== -1) return baseIndex
    }
  }
  
  return -1
}

/**
 * Compare two ranks
 * Returns:
 * - Negative number if userRank < requiredRank
 * - 0 if userRank === requiredRank
 * - Positive number if userRank > requiredRank
 */
export function compareRanks(
  userRank: string | null,
  requiredRank: string | null
): number {
  // No requirement means accessible to all
  if (!requiredRank) return 1
  
  // No user rank means can't access (unless no requirement)
  if (!userRank) return -1
  
  const userIndex = getRankIndex(userRank)
  const requiredIndex = getRankIndex(requiredRank)
  
  // Unknown ranks - if required rank is unknown, allow access
  // If user rank is unknown, deny access
  if (userIndex === -1) return -1
  if (requiredIndex === -1) return 1
  
  // Compare indices (higher index = higher rank)
  return userIndex - requiredIndex
}

/**
 * Check if a user can access a module based on their rank
 */
export function canAccessModule(
  userRank: string | null,
  requiredRank: string | null
): boolean {
  return compareRanks(userRank, requiredRank) >= 0
}

/**
 * Check if a resource belongs to the academy
 */
export function isAcademyResource(resourceId: string): boolean {
  return ACADEMY_RESOURCE_IDS.includes(resourceId)
}

/**
 * Check if a module belongs to the academy
 */
export function isAcademyModule(moduleId: string): boolean {
  return ACADEMY_MODULE_IDS.includes(moduleId)
}

/**
 * Calculate academy course progress
 */
export function getAcademyProgress(completedResources: string[]): {
  completed: number
  total: number
  percentage: number
} {
  const completedAcademyResources = ACADEMY_RESOURCE_IDS.filter(id =>
    completedResources.includes(id)
  )
  
  return {
    completed: completedAcademyResources.length,
    total: ACADEMY_RESOURCE_IDS.length,
    percentage: Math.round((completedAcademyResources.length / ACADEMY_RESOURCE_IDS.length) * 100)
  }
}

/**
 * Get navigation information for an academy module
 */
export function getAcademyModuleNav(
  moduleId: string,
  userRank: string | null
): {
  prev: string | null
  next: string | null
  canAccessNext: boolean
  nextRequiredRank: string | null
} {
  // Extract module number from moduleId (e.g., "module-1" or "academy-module-1")
  const moduleMatch = moduleId.match(/module-(\d+)/)
  if (!moduleMatch) {
    return { prev: null, next: null, canAccessNext: false, nextRequiredRank: null }
  }
  
  const moduleNum = parseInt(moduleMatch[1], 10)
  const module = ACADEMY_MODULES.find(m => m.id === `module-${moduleNum}`)
  
  if (!module) {
    return { prev: null, next: null, canAccessNext: false, nextRequiredRank: null }
  }
  
  const nextModule = module.next ? ACADEMY_MODULES.find(m => m.id === module.next) : null
  const canAccessNext = nextModule ? canAccessModule(userRank, nextModule.requiredRank) : false
  
  return {
    prev: module.prev ? `/academy/${module.prev}` : null,
    next: module.next ? `/academy/${module.next}` : null,
    canAccessNext,
    nextRequiredRank: nextModule?.requiredRank || null
  }
}

/**
 * Get the rank display name
 */
export function getRankDisplayName(rank: string | null): string {
  if (!rank) return 'No Rank'
  
  const rankNames: Record<string, string> = {
    'Coach': 'New Coach',
    'SC': 'Senior Coach',
    'MG': 'Manager',
    'AD': 'Associate Director',
    'DR': 'Director',
    'ED': 'Executive Director',
    'IED': 'Integrated Executive Director',
    'FIBC': 'Fully Integrated Business Coach',
    'IRD': 'Integrated Regional Director',
    'IND': 'Integrated National Director',
    'IGD': 'Integrated Global Director',
    'FIBL': 'Fully Integrated Business Leader',
    'Presidential': 'Presidential Director',
    'IPD': 'Integrated Presidential Director'
  }
  
  return rankNames[rank] || rank
}
