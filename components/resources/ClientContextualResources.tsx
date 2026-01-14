"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'
import { ResourceCard } from './ResourceCard'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { ExternalResource } from '@/lib/types'

interface ClientContextualResourcesProps {
  programDay: number
  clientName?: string
  compact?: boolean
}

export function ClientContextualResources({ 
  programDay, 
  clientName,
  compact = false 
}: ClientContextualResourcesProps) {
  const [resources, setResources] = useState<ExternalResource[]>([])
  const [isExpanded, setIsExpanded] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchRelevantResources()
  }, [programDay])

  const fetchRelevantResources = async () => {
    setIsLoading(true)
    
    try {
      // Build show_condition query based on program day
      const conditions: string[] = []
      
      // Always check for exact day match
      conditions.push(`show_condition.eq.client_day_${programDay}`)
      
      // Add range conditions based on program day
      if (programDay === 0 || programDay === 1) {
        conditions.push(`show_condition.eq.client_day_0_or_1`)
      }
      if (programDay >= 1 && programDay <= 4) {
        conditions.push(`show_condition.eq.client_day_1_to_4`)
      }
      if (programDay >= 1 && programDay <= 9) {
        conditions.push(`show_condition.eq.client_day_1_to_9`)
      }
      if (programDay >= 10 && programDay <= 30) {
        conditions.push(`show_condition.eq.client_day_10_to_30`)
      }

      // Get resources that match any of the conditions
      const { data, error } = await supabase
        .from('external_resources')
        .select('*')
        .eq('is_active', true)
        .or(conditions.join(','))
        .order('sort_order')

      if (error) throw error

      // Additional filtering by relevant_days in features jsonb
      const filtered = (data || []).filter((resource) => {
        const features = resource.features as ExternalResource['features']
        
        // If features has show_in, check if it includes client_tracker
        const showIn = Array.isArray(features?.show_in) ? features.show_in : []
        if (showIn.length > 0 && !showIn.includes('client_tracker')) {
          return false
        }

        // If features has relevant_days, check if current day is included
        const relevantDays = Array.isArray(features?.relevant_days) ? features.relevant_days : []
        if (relevantDays.length > 0) {
          return relevantDays.includes(programDay)
        }

        // If no relevant_days specified, include the resource (it matched show_condition)
        return true
      })

      setResources(filtered)
    } catch (error) {
      console.error('Error fetching resources:', error)
      setResources([])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    )
  }

  if (resources.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
          <h3 className="font-semibold text-optavia-dark">
            Helpful Resources for Day {programDay}
          </h3>
          <span className="text-sm text-optavia-gray">({resources.length})</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-8 text-optavia-gray hover:text-optavia-dark"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <>
          <Alert className="bg-[hsl(var(--optavia-green-light))] border-[hsl(var(--optavia-green))]">
            <AlertDescription className="text-sm text-optavia-dark">
              {clientName 
                ? `Resources specifically chosen for ${clientName} on day ${programDay} of their journey.`
                : `Resources specifically chosen for clients on day ${programDay} of their journey.`
              }
            </AlertDescription>
          </Alert>

          <div className={compact ? "space-y-2" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                description={resource.description}
                url={resource.url}
                buttonText={resource.button_text}
                icon={resource.icon || undefined}
                features={resource.features}
                compact={compact}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
