"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronDown, ChevronUp, Target } from 'lucide-react'
import { ResourceCard } from './ResourceCard'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { ExternalResource } from '@/lib/types'

interface ProspectContextualResourcesProps {
  stage: string // 'contact_made' | 'engaged' | 'interested' | 'ha_scheduled'
  prospectName?: string
  compact?: boolean
}

const STAGE_LABELS: Record<string, string> = {
  'contact_made': 'Initial Contact',
  'engaged': 'Engaged',
  'interested': 'Interested',
  'ha_scheduled': 'HA Scheduled',
  'converted': 'Converted'
}

const STAGE_TIPS: Record<string, string> = {
  'contact_made': 'Focus on building rapport and starting meaningful conversations.',
  'engaged': 'Share your story and understand their health goals.',
  'interested': 'Address objections and schedule a Health Assessment.',
  'ha_scheduled': 'Prepare for a great HA call and follow up consistently.',
  'converted': 'Congratulations! Time to onboard your new client.'
}

export function ProspectContextualResources({ 
  stage, 
  prospectName,
  compact = false 
}: ProspectContextualResourcesProps) {
  const [resources, setResources] = useState<ExternalResource[]>([])
  const [isExpanded, setIsExpanded] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchRelevantResources()
  }, [stage])

  const fetchRelevantResources = async () => {
    setIsLoading(true)
    
    try {
      // Get resources relevant to prospect tracking
      const { data, error } = await supabase
        .from('external_resources')
        .select('*')
        .eq('is_active', true)
        .or('show_condition.eq.prospect_tracker_view,show_condition.eq.prospect_early_stage,show_condition.eq.prospect_interested_stage')
        .order('sort_order')

      if (error) throw error

      // Filter by relevant stages and show_in
      const filtered = (data || []).filter((resource) => {
        const features = resource.features as ExternalResource['features']
        
        // If features has show_in, check if it includes prospect_tracker
        if (features?.show_in && !features.show_in.includes('prospect_tracker')) {
          return false
        }

        // Check if relevant_stages includes current stage
        if (features?.relevant_stages && features.relevant_stages.length > 0) {
          return features.relevant_stages.includes(stage)
        }

        // Check show_condition for general prospect resources
        if (resource.show_condition === 'prospect_tracker_view') {
          return true
        }

        // Early stage resources for contact_made and engaged
        if (resource.show_condition === 'prospect_early_stage' && 
            (stage === 'contact_made' || stage === 'engaged')) {
          return true
        }

        // Interested stage resources
        if (resource.show_condition === 'prospect_interested_stage' && stage === 'interested') {
          return true
        }

        return false
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
          <Target className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
          <h3 className="font-semibold text-optavia-dark">
            Resources for {STAGE_LABELS[stage] || stage}
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
          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription className="text-sm text-gray-700">
              {prospectName 
                ? `Resources to help move ${prospectName} forward. `
                : `Resources to help move this prospect forward. `
              }
              <span className="font-medium">{STAGE_TIPS[stage] || ''}</span>
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
