"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Copy, Check, Sun, Moon } from "lucide-react"

interface ClientTextTemplatesProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientLabel: string
  programDay: number
}

// Get text templates based on program day
function getTextTemplates(day: number): { morning: string; evening: string } {
  if (day <= 3) {
    return {
      morning: `Good morning! ☀️ DAY ${day}!

How are you feeling today? Remember:
💧 Water is your best friend
⏰ Stick to your fueling schedule
🥗 Plan your Lean & Green

You've got this! What's your plan for today?`,
      evening: `Evening check-in! 🌙 Day ${day} almost done!

How did today go? Any challenges I can help with?

Remember: Days 2-3 are often the hardest. You're doing amazing by pushing through! 💪`,
    }
  }

  if (day === 7) {
    return {
      morning: `🎉🎉🎉 DAY 7!!! 🎉🎉🎉

Good morning! YOU DID IT - ONE FULL WEEK!

This is HUGE! You've proven you can commit to yourself. I'm so proud of you!

How are you celebrating today?`,
      evening: `Evening! 🌟 Week 1 COMPLETE!

Take a moment to appreciate what you've accomplished:
✅ 7 days of commitment
✅ New habits forming
✅ One step closer to your goals

Week 2 is where the magic really happens. You're ready! 💚`,
    }
  }

  if (day <= 7) {
    return {
      morning: `Good morning! ☀️ DAY ${day}!

You're building great habits! How's your energy today?

💧 How's your water intake?
⏰ Staying on schedule?
🥗 Got your L&G planned?

Let me know how I can support you!`,
      evening: `Evening! 🌟

Day ${day} is wrapping up! How did it go?

✨ What went well today?
✨ Any challenges?

You're doing great - keep it up! 💚`,
    }
  }

  if (day === 14) {
    return {
      morning: `🌟 DAY 14 - TWO WEEKS! 🌟

Good morning! You've completed TWO FULL WEEKS!

You're officially building momentum. Your body is adapting and your habits are getting stronger every day.

How are you feeling?`,
      evening: `Evening! ⭐ 2 WEEKS complete!

This is a major milestone! You should be SO proud.

Notice the non-scale victories:
✨ More energy?
✨ Better sleep?
✨ Clothes fitting differently?

Keep going - you're doing amazing! 💚`,
    }
  }

  if (day <= 14) {
    return {
      morning: `Good morning! ☀️ DAY ${day}!

Week 2 is when things really start clicking! How are you feeling?

Any questions or challenges I can help with?`,
      evening: `Evening check-in! 🌙 Day ${day} done!

How was your day? Remember to notice the non-scale victories too:
✨ Energy levels
✨ How clothes fit
✨ Mental clarity
✨ Sleep quality

You're doing amazing! 💚`,
    }
  }

  if (day === 21) {
    return {
      morning: `💎💎💎 DAY 21 - HABIT FORMED! 💎💎💎

Good morning! This is a HUGE day!

They say it takes 21 days to form a habit. You've done it! This is no longer just a "diet" - this is your lifestyle now.

How does it feel to be unstoppable?`,
      evening: `Evening! 💎 21 DAYS!

You've officially formed the habits that will carry you to your goals and beyond.

The hardest part is behind you. From here, it only gets easier.

I'm so proud of your commitment! 💚`,
    }
  }

  if (day <= 21) {
    return {
      morning: `Good morning! ☀️ DAY ${day}!

Week 3 - you're forming lasting habits! How's everything going?

Remember - I'm here if you need anything!`,
      evening: `Evening! 🌙 Day ${day} complete!

How was your day? Any wins to celebrate?

You're building habits that will last a lifetime! 💚`,
    }
  }

  if (day === 30) {
    return {
      morning: `👑👑👑 DAY 30 - ONE MONTH!!! 👑👑👑

Good morning! WOW - you've completed a FULL MONTH!

This is incredible! Think about where you were 30 days ago vs today. You're a completely different person.

Let's celebrate! How are you feeling?`,
      evening: `Evening! 👑 ONE MONTH COMPLETE!

Take a moment to really appreciate this achievement:
✅ 30 days of commitment
✅ New habits locked in
✅ Incredible transformation

You should be SO proud. Here's to month 2! 💚`,
    }
  }

  // Day 31+
  return {
    morning: `Good morning! ☀️ DAY ${day}!

You're a pro at this now! How's everything going?

Remember - I'm here if you need anything!`,
    evening: `Evening! 🌙 Day ${day} complete!

How was your day? Any wins to celebrate? Challenges to troubleshoot?

Keep up the great work! 💚`,
  }
}

export function ClientTextTemplates({
  open,
  onOpenChange,
  clientLabel,
  programDay,
}: ClientTextTemplatesProps) {
  const { toast } = useToast()
  const [copiedType, setCopiedType] = useState<"morning" | "evening" | null>(null)

  const templates = getTextTemplates(programDay)

  const copyToClipboard = async (text: string, type: "morning" | "evening") => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedType(type)
      toast({
        title: "Copied!",
        description: `${type === "morning" ? "Morning" : "Evening"} text copied to clipboard`,
      })
      setTimeout(() => setCopiedType(null), 2000)
    } catch {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Day {programDay} Texts
            <span className="text-sm font-normal text-gray-500">
              for {clientLabel}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Morning Text */}
          <div>
            <div className="flex items-center gap-2 text-orange-600 font-semibold mb-2">
              <Sun className="h-4 w-4" />
              Morning Text
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                {templates.morning}
              </pre>
            </div>
            <Button
              onClick={() => copyToClipboard(templates.morning, "morning")}
              className="mt-2 bg-orange-500 hover:bg-orange-600"
              size="sm"
            >
              {copiedType === "morning" ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Morning Text
                </>
              )}
            </Button>
          </div>

          {/* Evening Text */}
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-2">
              <Moon className="h-4 w-4" />
              Evening Text
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                {templates.evening}
              </pre>
            </div>
            <Button
              onClick={() => copyToClipboard(templates.evening, "evening")}
              className="mt-2 bg-indigo-500 hover:bg-indigo-600"
              size="sm"
            >
              {copiedType === "evening" ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Evening Text
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-600">
          <strong>Tip:</strong> Copy the text, paste it into your messaging app, and
          personalize it before sending!
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Export the getTextTemplates function for use in dashboard
export { getTextTemplates }
