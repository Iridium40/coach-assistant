"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShareHealthAssessment } from "@/components/share-health-assessment"
import { Share2, Copy, Check, ExternalLink } from "lucide-react"
import { createAssessmentLink } from "@/lib/assessment-links"
import { useUserData } from "@/contexts/user-data-context"
import { useToast } from "@/hooks/use-toast"

export function ShareHALink() {
  const { profile } = useUserData()
  const { toast } = useToast()
  const [showShareModal, setShowShareModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const assessmentLink = profile?.email ? createAssessmentLink(profile.email) : null
  const coachName = profile?.full_name || "Your Coach"

  const handleCopyLink = async () => {
    if (!assessmentLink) return
    try {
      await navigator.clipboard.writeText(assessmentLink)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "Your assessment link has been copied to clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  if (!assessmentLink) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <Share2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">
            Please set your email in your profile settings to generate an assessment link.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Share2 className="h-12 w-12 mx-auto mb-3 text-[hsl(var(--optavia-green))]" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Health Assessment</h3>
        <p className="text-sm text-gray-600">
          Send your personalized health assessment link to prospects
        </p>
      </div>

      {/* Quick Link Display */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <div className="text-xs font-medium text-gray-500 mb-2">Your Assessment Link</div>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-xs break-all text-gray-700 bg-white p-2 rounded border">
            {assessmentLink}
          </code>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyLink}
            className="shrink-0"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => setShowShareModal(true)}
          className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Link
        </Button>
        <Button
          variant="outline"
          onClick={() => window.open(assessmentLink, "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
        <p className="font-medium mb-1">💡 Tip</p>
        <p>
          Share this link via email, text, or social media. When prospects complete the assessment, 
          you'll receive their responses to review before your call.
        </p>
      </div>

      {/* Share Modal */}
      <ShareHealthAssessment
        open={showShareModal}
        onOpenChange={setShowShareModal}
      />
    </div>
  )
}
