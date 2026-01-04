"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lightbulb, X } from "lucide-react"

// Rotating coach tips about Habits of Health
const coachTips = [
  "Remind clients that weight loss is more than diet — the Habits of Health cover mindset, sleep, motion, and surroundings too!",
  "Dr. A's LifeBook helps clients track their journey across all 6 Habits of Health. Have you suggested it to your clients?",
  "The Habits of Health assessment at habitsofhealth.com helps clients identify which areas need the most attention.",
  "Micro-habits make big changes sustainable. Help clients start with small, achievable steps they can't fail at.",
  "Sleep is a Habit of Health! Ask clients how their sleep routine is supporting their wellness goals.",
  "The 'Mind' habit is crucial — help clients develop a healthy mindset around food and self-image.",
  "Motion doesn't mean intense workouts. Even small movements throughout the day build the habit of an active lifestyle.",
  "Surroundings matter! Encourage clients to create an environment that supports their healthy choices.",
  "The OPTAVIA app has habit tracking built in. Show clients how to use it to stay accountable.",
  "Dr. A's daily tips at habitsofhealth.com provide ongoing motivation and education for clients.",
  "Weight management is just ONE of six habits. Help clients see the bigger picture of optimal health.",
  "Hydration is part of the Eating & Hydration habit. Ensure clients understand proper water intake for their goals.",
  "The 30-day email challenge at habitsofhealth.com is a great way to introduce clients to the system.",
  "Transformation isn't just physical — it's mental, emotional, and environmental. Share this holistic view with clients.",
  "Celebrate micro-wins with clients! Each small habit they build is a step toward lasting transformation.",
]

export function CoachTip() {
  const [dismissed, setDismissed] = useState(false)

  // Check if coach tip was dismissed today
  useEffect(() => {
    const today = new Date().toDateString()
    const dismissedDate = localStorage.getItem('coachTipDismissedDate')
    if (dismissedDate === today) {
      setDismissed(true)
    }
  }, [])

  // Handle coach tip dismissal
  const handleDismiss = () => {
    const today = new Date().toDateString()
    localStorage.setItem('coachTipDismissedDate', today)
    setDismissed(true)
  }

  if (dismissed) return null

  // Get tip based on day of year for daily rotation
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - startOfYear.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  const tipIndex = dayOfYear % coachTips.length
  const todaysTip = coachTips[tipIndex]

  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 relative">
      <div className="bg-amber-100 rounded-full p-2 shrink-0">
        <Lightbulb className="h-5 w-5 text-amber-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-amber-800 mb-1">Coach Tip of the Day</p>
        <p className="text-sm text-amber-700">{todaysTip}</p>
      </div>
      <Link href="/resources?category=Habits%20of%20Health" className="shrink-0">
        <Button variant="ghost" size="sm" className="text-amber-700 hover:bg-amber-100 hover:text-amber-800 text-xs">
          Healthy Habits
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDismiss}
        className="absolute top-2 right-2 h-6 w-6 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
        aria-label="Close coach tip"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
