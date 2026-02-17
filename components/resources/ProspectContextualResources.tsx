"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronDown, ChevronUp, Target, Lightbulb } from 'lucide-react'
import { ResourceCard } from './ResourceCard'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { ExternalResource } from '@/lib/types'

interface ProspectContextualResourcesProps {
  stage: string
  prospectName?: string
  compact?: boolean
}

const STAGE_LABELS: Record<string, string> = {
  'new': 'New',
  'interested': 'Interested',
  'ha_scheduled': 'HA Scheduled',
  'converted': 'Client Won',
}

const STAGE_COACHING_ACTIONS: Record<string, string[]> = {
  'new': [
    'Initial outreach — share your story',
    'Invite them to learn more about optimal health',
    'Build rapport through genuine connection',
  ],
  'interested': [
    'Deeper conversation — identify their "why"',
    'Build rapport and address early questions',
    'Introduce the Health Assessment',
  ],
  'ha_scheduled': [
    'Send a confirmation/reminder before the call',
    'Prepare for the HA — have program materials ready',
    'Follow up consistently if they need time',
  ],
  'converted': [
    'Onboarding — help with first order placement',
    'Welcome them to the community',
    'Set clear expectations for their first week',
  ],
}

const STAGE_TIPS: Record<string, string> = {
  'new': 'First contact made — social media, referral, or warm market. Focus on starting a meaningful conversation.',
  'interested': 'They\'ve engaged back positively. Time to deepen the conversation and understand their health goals.',
  'ha_scheduled': 'This is the critical conversion point. A well-prepared HA can change their life!',
  'converted': 'They said yes! Time to set them up for success on their journey.',
}

export function ProspectContextualResources({ 
  stage, 
  prospectName,
  compact = false 
}: ProspectContextualResourcesProps) {
  const [resources, setResources] = useState<ExternalResource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchRelevantResources()
  }, [stage])

  const fetchRelevantResources = async () => {
    setIsLoading(true)
    
    try {
      const { data, error } = await supabase
        .from('external_resources')
        .select('*')
        .eq('is_active', true)
        .or('show_condition.eq.prospect_tracker_view,show_condition.eq.prospect_new_stage,show_condition.eq.prospect_interested_stage,show_condition.eq.prospect_ha_stage,show_condition.eq.prospect_converted_stage')
        .order('sort_order')

      if (error) throw error

      const filtered = (data || []).filter((resource) => {
        const features = resource.features as ExternalResource['features']
        const showIn = Array.isArray(features?.show_in) ? features.show_in : []
        const relevantStages = Array.isArray(features?.relevant_stages) ? features.relevant_stages : []

        if (showIn.length > 0 && !showIn.includes('prospect_tracker')) {
          return false
        }

        if (relevantStages.length > 0) {
          return relevantStages.includes(stage)
        }

        if (resource.show_condition === 'prospect_tracker_view') return true
        if (resource.show_condition === 'prospect_new_stage' && stage === 'new') return true
        if (resource.show_condition === 'prospect_interested_stage' && stage === 'interested') return true
        if (resource.show_condition === 'prospect_ha_stage' && stage === 'ha_scheduled') return true
        if (resource.show_condition === 'prospect_converted_stage' && stage === 'converted') return true

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

  const stageLabel = STAGE_LABELS[stage] || stage
  const stageTip = STAGE_TIPS[stage]
  const coachingActions = STAGE_COACHING_ACTIONS[stage] || []

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Coaching tip — always visible */}
      {stageTip && (
        <Alert className="bg-blue-50 border-blue-200">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-sm text-gray-700">
            <span className="font-semibold text-gray-900">{stageLabel} Stage: </span>
            {stageTip}
          </AlertDescription>
        </Alert>
      )}

      {/* Coach actions checklist */}
      {coachingActions.length > 0 && (
        <div className="rounded-lg border bg-white p-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Coach Actions</p>
          <ul className="space-y-1.5">
            {coachingActions.map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-[hsl(var(--optavia-green))] mt-0.5 flex-shrink-0">•</span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Database resources if any */}
      {resources.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-[hsl(var(--optavia-green))]" />
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Resources ({resources.length})
            </p>
          </div>
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
        </div>
      )}
    </div>
  )
}
