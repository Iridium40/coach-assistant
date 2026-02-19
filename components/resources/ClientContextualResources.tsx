"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronDown, ChevronUp, Lightbulb, Target } from 'lucide-react'
import { ResourceCard } from './ResourceCard'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { ExternalResource } from '@/lib/types'
import type { ClientStatus } from '@/hooks/use-clients'

interface ClientContextualResourcesProps {
  programDay: number
  clientStatus?: ClientStatus
  clientName?: string
  compact?: boolean
}

const STATUS_LABELS: Record<string, string> = {
  'active': 'Client',
  'goal_achieved': 'Goal Achieved',
  'future_coach': 'Future Coach',
  'coach_launched': 'Coach Launched',
  'completed': 'Completed',
}

const STATUS_TIPS: Record<string, string> = {
  'active': 'Active on the program. Follow the CEC calendar: daily touchpoints Days 1-4, weekly calls at milestones, mid-week check-ins, and R/Y/G system after Day 21.',
  'goal_achieved': 'Client has hit their primary health goal! Time to celebrate and plan next steps.',
  'future_coach': 'Has expressed interest in becoming a coach. Start mentorship conversations.',
  'coach_launched': 'Officially an OPTAVIA coach! Support their first 30-day game plan.',
  'completed': 'Client has finished their program journey. Stay connected and celebrate their transformation!',
}

const STATUS_COACHING_ACTIONS: Record<string, string[]> = {
  'active': [], // Overridden by phase-aware actions below
  'goal_achieved': [
    'Celebrate the milestone!',
    'Transition to Optimal Health/maintenance',
    'Introduce the "pay it forward" concept',
  ],
  'future_coach': [
    'Share business opportunity details',
    'Invite to team calls and events',
    'Begin apprenticeship / mentorship conversations',
  ],
  'coach_launched': [
    'Onboard them into your team',
    'Create first 30-day game plan',
    'Connect with upline resources and training',
  ],
  'completed': [
    'Celebrate their full transformation journey',
    'Stay connected for ongoing support',
    'Ask for testimonial or referral',
  ],
}

function getActiveClientActions(programDay: number): string[] {
  if (programDay <= 3) {
    return [
      'Daily text + graphic + check-in call (Critical Phase)',
      'Coach through discovery — do NOT provide answers',
      'Ensure they eat every 2-3 hours and track everything',
      'Watch for transition symptoms and reassure',
    ]
  }
  if (programDay <= 6) {
    return [
      'Send Day 4 text + Fat Burn graphic',
      'Send "Protect Your Fat Burn" video after Day 4 call',
      'Monitor for fat burn signs (energy, reduced cravings)',
    ]
  }
  if (programDay <= 7) {
    return [
      'Schedule Week 1 Celebration Call',
      'Request smart scale snapshot + Week 1 results',
      'Help write Client Page Celebration Post',
    ]
  }
  if (programDay <= 13) {
    return [
      'Mid-week touchpoint (voice text, L&G idea, or mindset call)',
      'Encourage community participation',
      'Remind about daily tracking and hydration',
    ]
  }
  if (programDay <= 14) {
    return [
      'Schedule Day 14/15 Progress Check Call',
      'Review compliance and troubleshoot issues',
      'Confirm premier order is updated',
    ]
  }
  if (programDay <= 20) {
    return [
      'Send premier order update reminder',
      'Mid-week touchpoint',
      'Preview upcoming graduation to VIP support',
    ]
  }
  if (programDay <= 21) {
    return [
      'Schedule Graduation Call — introduce R/Y/G system',
      'Walk through Office Hours schedule',
      'Set up Monday check-in routine (Renpho + Color)',
      'After call: send R/Y/G text + Office Hours video + graphics',
    ]
  }
  if (programDay <= 29) {
    return [
      'Monday: Request Renpho report + R/Y/G color',
      'Respond with appropriate color script (Green/Yellow/Red)',
      'Mid-week touchpoint',
      'Gently introduce coaching opportunity',
    ]
  }
  if (programDay === 30) {
    return [
      'Schedule ONE MONTH Celebration Call',
      'Review total Month 1 results (weight, measurements, non-scale wins)',
      'Confirm R/Y/G and Office Hours rhythm is working',
      'Set Month 2 goals and expectations',
    ]
  }
  return [
    'Monday: Renpho + R/Y/G Color check-in',
    'Mid-week touchpoint',
    'Office Hours support',
    'Ongoing encouragement and community connection',
  ]
}

export function ClientContextualResources({ 
  programDay, 
  clientStatus = 'active',
  clientName,
  compact = false 
}: ClientContextualResourcesProps) {
  const [resources, setResources] = useState<ExternalResource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchRelevantResources()
  }, [programDay])

  const fetchRelevantResources = async () => {
    setIsLoading(true)
    
    try {
      const conditions: string[] = []
      conditions.push(`show_condition.eq.client_day_${programDay}`)
      
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
      // CEC day-specific conditions
      if (programDay === 8 || programDay === 7) {
        conditions.push(`show_condition.eq.client_day_8`)
      }
      if (programDay >= 15 && programDay <= 20) {
        conditions.push(`show_condition.eq.client_day_15_to_20`)
      }
      if (programDay >= 20 && programDay <= 22) {
        conditions.push(`show_condition.eq.client_day_21`)
      }
      if (programDay >= 28) {
        conditions.push(`show_condition.eq.client_day_28_plus`)
      }

      const { data, error } = await supabase
        .from('external_resources')
        .select('*')
        .eq('is_active', true)
        .or(conditions.join(','))
        .order('sort_order')

      if (error) throw error

      const filtered = (data || []).filter((resource) => {
        const features = resource.features as ExternalResource['features']
        const showIn = Array.isArray(features?.show_in) ? features.show_in : []
        if (showIn.length > 0 && !showIn.includes('client_tracker')) {
          return false
        }

        const relevantDays = Array.isArray(features?.relevant_days) ? features.relevant_days : []
        if (relevantDays.length > 0) {
          return relevantDays.includes(programDay)
        }

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

  const statusLabel = STATUS_LABELS[clientStatus] || clientStatus
  const statusTip = STATUS_TIPS[clientStatus]
  const coachingActions = clientStatus === 'active'
    ? getActiveClientActions(programDay)
    : (STATUS_COACHING_ACTIONS[clientStatus] || [])

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
      {statusTip && (
        <Alert className="bg-[hsl(var(--optavia-green-light))] border-[hsl(var(--optavia-green))]">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-sm text-gray-700">
            <span className="font-semibold text-gray-900">{statusLabel}: </span>
            {statusTip}
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
              Day {programDay} Resources ({resources.length})
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
