"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createAssessmentLink } from "@/lib/assessment-links"
import { useUserData } from "@/contexts/user-data-context"
import { createClient } from "@/lib/supabase/client"
import { Copy, Check, ExternalLink, Calendar, FileText, MessageSquare, Share2, X, Facebook, Twitter, Linkedin, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

interface HealthAssessmentSubmission {
  id: string
  coach_id: string
  client_name: string | null
  client_email: string | null
  submitted_at: string
  email_sent_at: string | null
  email_sent_successfully: boolean
}

export function HealthAssessmentManager() {
  const { user, profile } = useUserData()
  const { toast } = useToast()
  const [submissions, setSubmissions] = useState<HealthAssessmentSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<HealthAssessmentSubmission | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientPhone, setRecipientPhone] = useState("")
  const [customMessage, setCustomMessage] = useState("")

  const assessmentLink = profile?.email ? createAssessmentLink(profile.email) : null
  const coachName = profile?.full_name || "Your Coach"
  
  const defaultMessage = `Hi! I'd love to learn more about your health goals. Please take a few minutes to complete this quick health assessment, and I'll reach out to schedule a time to chat!\n\n${assessmentLink}\n\n- ${coachName}`

  useEffect(() => {
    if (user) {
      loadSubmissions()
    }
  }, [user])

  const loadSubmissions = async () => {
    if (!user) return

    const supabase = createClient()
    const { data, error } = await supabase
      .from("health_assessment_submissions")
      .select("*")
      .eq("coach_id", user.id)
      .order("submitted_at", { ascending: false })

    if (error) {
      console.error("Error loading submissions:", error)
    } else {
      setSubmissions(data || [])
    }
    setLoading(false)
  }

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
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      })
    }
  }

  const handleCopyMessage = async () => {
    const message = customMessage || defaultMessage
    try {
      await navigator.clipboard.writeText(message)
      toast({
        title: "Message copied!",
        description: "The message with link has been copied to clipboard.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy message",
        variant: "destructive",
      })
    }
  }

  const handleShareEmail = () => {
    if (!assessmentLink) return
    const subject = encodeURIComponent("Complete Your Health Assessment")
    const body = encodeURIComponent(customMessage || defaultMessage)
    const emailTo = recipientEmail ? encodeURIComponent(recipientEmail) : ""
    window.open(`mailto:${emailTo}?subject=${subject}&body=${body}`, "_blank")
    toast({
      title: "Email opened",
      description: "Your email client should open with the message ready to send.",
    })
  }

  const handleShareSMS = () => {
    if (!assessmentLink) return
    const message = encodeURIComponent(customMessage || defaultMessage)
    const phone = recipientPhone.replace(/\D/g, "")
    // Use sms: protocol - works on both iOS and Android
    window.open(`sms:${phone}?body=${message}`, "_blank")
    toast({
      title: "SMS opened",
      description: "Your messaging app should open with the message ready to send.",
    })
  }

  const handleShareFacebook = () => {
    if (!assessmentLink) return
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(assessmentLink)}`, "_blank", "width=600,height=400")
  }

  const handleShareTwitter = () => {
    if (!assessmentLink) return
    const text = encodeURIComponent(`Take a moment to complete this quick health assessment! 💚`)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(assessmentLink)}`, "_blank", "width=600,height=400")
  }

  const handleShareLinkedIn = () => {
    if (!assessmentLink) return
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(assessmentLink)}`, "_blank", "width=600,height=400")
  }

  const handleNativeShare = async () => {
    if (!assessmentLink) return
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Health Assessment",
          text: "Take a moment to complete this quick health assessment!",
          url: assessmentLink,
        })
        toast({
          title: "Shared!",
          description: "Health assessment link shared successfully.",
        })
      } catch (err) {
        // User cancelled or error
        if ((err as Error).name !== "AbortError") {
          toast({
            title: "Error",
            description: "Failed to share",
            variant: "destructive",
          })
        }
      }
    } else {
      // Fallback - just copy the link
      handleCopyLink()
    }
  }

  const openShareModal = () => {
    setCustomMessage(defaultMessage)
    setRecipientEmail("")
    setRecipientPhone("")
    setShowShareModal(true)
  }

  const successCount = submissions.filter((s) => s.email_sent_successfully).length

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--optavia-green))] mx-auto mb-4"></div>
            <p className="text-optavia-gray">Loading assessments...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Share Link Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-optavia-dark">Share Your Health Assessment Link</CardTitle>
          <CardDescription className="text-optavia-gray">
            Share this link with potential clients to collect health assessments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {assessmentLink ? (
            <>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border">
                <code className="flex-1 text-sm text-optavia-dark break-all">{assessmentLink}</code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyLink}
                  className="shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={openShareModal}
                  className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Assessment
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(assessmentLink, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Preview Link
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm text-optavia-gray">
              Please set your email in your profile settings to generate an assessment link.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Assessments List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-optavia-dark">Health Assessments</CardTitle>
              <CardDescription className="text-optavia-gray">
                {assessments.length} total {enrolledCount > 0 && `• ${enrolledCount} enrolled`}
              </CardDescription>
            </div>
            {enrolledCount > 0 && (
              <Badge className="bg-green-500">{enrolledCount} Enrolled</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {assessments.length === 0 ? (
            <div className="text-center py-8 text-optavia-gray">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No assessments yet</p>
              <p className="text-sm mt-2">Share your assessment link to start receiving submissions</p>
            </div>
          ) : (
            <div className="space-y-2">
              {assessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                    assessment.enrolled ? "bg-green-50 border-green-200" : "bg-white"
                  }`}
                  onClick={() => setSelectedAssessment(assessment)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-optavia-dark">
                          {assessment.client_name || "Unknown Client"}
                        </h3>
                        {assessment.enrolled && (
                          <Badge className="bg-green-500">Enrolled</Badge>
                        )}
                        {assessment.call_outcome && !assessment.enrolled && (
                          <Badge variant="outline">{assessment.call_outcome}</Badge>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-4 text-sm text-optavia-gray">
                        {assessment.client_phone && (
                          <span className="flex items-center gap-1">
                            📞 {assessment.client_phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(assessment.created_at), "MMM d, yyyy")}
                        </span>
                      </div>
                      {assessment.client_why && (
                        <p className="mt-2 text-xs text-optavia-gray line-clamp-2">
                          "{assessment.client_why}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assessment Detail Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedAssessment(null)}>
          <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-optavia-dark">
                    {selectedAssessment.client_name || "Unknown Client"}
                  </CardTitle>
                  <CardDescription className="text-optavia-gray">
                    {format(new Date(selectedAssessment.created_at), "MMMM d, yyyy 'at' h:mm a")}
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedAssessment(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-optavia-gray">Phone</p>
                  <p className="font-medium">{selectedAssessment.client_phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-optavia-gray">Call Outcome</p>
                  <Badge className={selectedAssessment.enrolled ? "bg-green-500" : ""}>
                    {selectedAssessment.call_outcome}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-optavia-gray">Commitment Level</p>
                  <p className="font-medium">{selectedAssessment.client_commitment || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-optavia-gray">Progress</p>
                  <p className="font-medium">{selectedAssessment.progress || 0}%</p>
                </div>
              </div>

              {selectedAssessment.client_why && (
                <div>
                  <p className="text-xs text-optavia-gray mb-1">Their Why</p>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedAssessment.client_why}</p>
                </div>
              )}

              {selectedAssessment.call_notes && (
                <div>
                  <p className="text-xs text-optavia-gray mb-1">Call Notes</p>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{selectedAssessment.call_notes}</p>
                </div>
              )}

              {selectedAssessment.timer_seconds && selectedAssessment.timer_seconds > 0 && (
                <div>
                  <p className="text-xs text-optavia-gray">Call Duration</p>
                  <p className="font-medium">
                    {Math.floor(selectedAssessment.timer_seconds / 60)}m {selectedAssessment.timer_seconds % 60}s
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && assessmentLink && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-optavia-dark flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
                    Share Health Assessment
                  </CardTitle>
                  <CardDescription className="text-optavia-gray">
                    Send your assessment link via email, SMS, or social media
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowShareModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customize Message */}
              <div className="space-y-3">
                <Label htmlFor="customMessage" className="text-optavia-dark font-semibold">
                  Customize Your Message
                </Label>
                <Textarea
                  id="customMessage"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={5}
                  className="bg-white"
                  placeholder="Enter your personalized message..."
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyMessage}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Message
                </Button>
              </div>

              {/* Email Section */}
              <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <Label className="text-blue-900 font-semibold">Send via Email</Label>
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Recipient's email (optional)"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="bg-white"
                  />
                  <Button
                    onClick={handleShareEmail}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Open Email
                  </Button>
                </div>
              </div>

              {/* SMS Section */}
              <div className="space-y-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <Label className="text-green-900 font-semibold">Send via Text Message</Label>
                </div>
                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder="Phone number (optional)"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="bg-white"
                  />
                  <Button
                    onClick={handleShareSMS}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Open Messages
                  </Button>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="space-y-3">
                <Label className="text-optavia-dark font-semibold">Share on Social Media</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    onClick={handleShareFacebook}
                    className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="text-xs">Facebook</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShareTwitter}
                    className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-sky-50 hover:border-sky-400 hover:text-sky-600"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="text-xs">Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShareLinkedIn}
                    className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-700"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="text-xs">LinkedIn</span>
                  </Button>
                </div>
              </div>

              {/* Copy Link Section */}
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border">
                  <code className="flex-1 text-xs text-optavia-dark break-all">{assessmentLink}</code>
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
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

