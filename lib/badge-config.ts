/**
 * Shared badge configuration used across the application
 */

export interface BadgeInfo {
  name: string
  description: string
  emoji: string
  color: string
}

export const badgeConfig: Record<string, BadgeInfo> = {
  "Getting Started": {
    name: "Getting Started Master",
    description: "Completed all resources in Getting Started",
    emoji: "🚀",
    color: "#3b82f6", // blue
  },
  "Business Building": {
    name: "Business Builder",
    description: "Completed all resources in Business Building",
    emoji: "🏢",
    color: "#a855f7", // purple
  },
  "Client Support": {
    name: "Client Champion",
    description: "Completed all resources in Client Support",
    emoji: "👥",
    color: "#10b981", // green
  },
  "Training": {
    name: "Training Expert",
    description: "Completed all resources in Training",
    emoji: "🎓",
    color: "#f97316", // orange
  },
}

