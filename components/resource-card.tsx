"use client"

import { ExternalLink, Pin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ResourceCardProps {
  id?: string
  title: string
  description: string
  url: string
  buttonText: string
  features?: string[] | { tags?: string[]; type?: string; [key: string]: any } | null
  isPinned?: boolean
  onTogglePin?: () => void
}

export function ResourceCard({ 
  id, 
  title, 
  description, 
  url, 
  buttonText, 
  features, 
  isPinned, 
  onTogglePin 
}: ResourceCardProps) {
  // Handle both legacy array format and new JSONB object format
  const featuresList = Array.isArray(features) 
    ? features 
    : (features?.tags && Array.isArray(features.tags))
      ? features.tags 
      : []
  
  // Show only top 3 features for compactness
  const displayFeatures = featuresList.slice(0, 3)

  return (
    <Card className="group relative overflow-hidden bg-white border-2 border-gray-200 hover:border-[hsl(var(--optavia-green))] transition-all duration-300 hover:shadow-lg">
      {/* Pin Button */}
      {onTogglePin && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onTogglePin()
          }}
          className={`absolute top-2 right-2 z-10 h-8 w-8 ${
            isPinned 
              ? "text-[hsl(var(--optavia-green))] bg-[hsl(var(--optavia-green-light))] hover:bg-[hsl(var(--optavia-green-light))]" 
              : "text-gray-400 hover:text-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-light))] opacity-0 group-hover:opacity-100"
          } transition-all`}
          title={isPinned ? "Unpin from Quick Links" : "Pin to Quick Links"}
        >
          <Pin className={`h-4 w-4 ${isPinned ? "fill-current" : ""}`} />
        </Button>
      )}

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-5 sm:p-6"
      >
        {/* Header with title and icon */}
        <div className="flex items-start justify-between gap-4 mb-3 pr-8">
          <h3 className="font-heading font-bold text-lg sm:text-xl text-optavia-dark group-hover:text-[hsl(var(--optavia-green))] transition-colors flex-1">
            {title}
          </h3>
          <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-[hsl(var(--optavia-green))] transition-colors flex-shrink-0 mt-0.5" />
        </div>

        {/* Description */}
        <p className="text-sm text-optavia-gray mb-4 line-clamp-2">
          {description}
        </p>

        {/* Compact feature list */}
        {displayFeatures.length > 0 && (
          <div className="space-y-1.5">
            {displayFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-optavia-gray">
                <div className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--optavia-green))] flex-shrink-0" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </a>
    </Card>
  )
}
