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
import { Copy, Check, ExternalLink, Mail, Calendar, FileText, MessageSquare, Share2, X, Facebook, Twitter, Linkedin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

interface HealthAssessment {
  id: string
  client_first_name: string | null
  client_last_name: string | null
  client_email: string
  submitted_at: string
  read_at: string | null
  email_sent_successfully: boolean
}

export function HealthAssessmentManager() {
  const { user, profile } = useUserData()
  const { toast } = useToast()
  const [assessments, setAssessments] = useState<HealthAssessment[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [selectedAssessment, setSelectedAssessment] = useState<HealthAssessment | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientPhone, setRecipientPhone] = useState("")
  const [customMessage, setCustomMessage] = useState("")

  const assessmentLink = profile?.email ? createAssessmentLink(profile.email) : null
  const coachName = profile?.full_name || "Your Coach"
  
  const defaultMessage = `Hi! I'd love to learn more about your health goals. Please take a few minutes to complete this quick health assessment, and I'll reach out to schedule a time to chat!\n\n${assessmentLink}\n\n- ${coachName}`

  useEffect(() => {
    if (user) {
      loadAssessments()
    }
  }, [user])

  const loadAssessments = async () => {
    if (!user) return

    const supabase = createClient()
    const { data, error } = await supabase
      .from("health_assessments")
      .select("*")
      .eq("coach_id", user.id)
      .order("submitted_at", { ascending: false })

    if (error) {
      console.error("Error loading assessments:", error)
    } else {
      setAssessments(data || [])
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

  const markAsRead = async (assessmentId: string) => {
    if (!user) return

    const supabase = createClient()
    const { error } = await supabase
      .from("health_assessments")
      .update({ read_at: new Date().toISOString() })
      .eq("id", assessmentId)
      .eq("coach_id", user.id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to mark as read",
        variant: "destructive",
      })
    } else {
      loadAssessments()
      if (selectedAssessment?.id === assessmentId) {
        setSelectedAssessment({ ...selectedAssessment, read_at: new Date().toISOString() })
      }
    }
  }

  const unreadCount = assessments.filter((a) => !a.read_at).length

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
              
              {/* Quick Share Buttons */}
              <div className="pt-2 border-t">
                <p className="text-xs text-optavia-gray mb-3">Quick share:</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareEmail}
                    className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareSMS}
                    className="hover:bg-green-50 hover:border-green-300 hover:text-green-700"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    SMS
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareFacebook}
                    className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareTwitter}
                    className="hover:bg-sky-50 hover:border-sky-400 hover:text-sky-600"
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareLinkedIn}
                    className="hover:bg-blue-50 hover:border-blue-600 hover:text-blue-700"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                  {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNativeShare}
                      className="hover:bg-purple-50 hover:border-purple-400 hover:text-purple-600"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      More...
                    </Button>
                  )}
                </div>
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
                {assessments.length} total {unreadCount > 0 && `• ${unreadCount} unread`}
              </CardDescription>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} New</Badge>
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
                    !assessment.read_at ? "bg-blue-50 border-blue-200" : "bg-white"
                  }`}
                  onClick={() => setSelectedAssessment(assessment)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-optavia-dark">
                          {assessment.client_first_name || ""} {assessment.client_last_name || ""}
                          {!assessment.client_first_name && !assessment.client_last_name && "Unknown Client"}
                        </h3>
                        {!assessment.read_at && (
                          <Badge variant="default" className="bg-blue-500">New</Badge>
                        )}
                        {!assessment.email_sent_successfully && (
                          <Badge variant="destructive">Email Failed</Badge>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-4 text-sm text-optavia-gray">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {assessment.client_email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(assessment.submitted_at), "MMM d, yyyy")}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-optavia-gray">
                        Assessment details were sent to your email
                      </p>
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
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-optavia-dark">
                    {selectedAssessment.client_first_name} {selectedAssessment.client_last_name}
                  </CardTitle>
                  <CardDescription className="text-optavia-gray">
                    Submitted {format(new Date(selectedAssessment.submitted_at), "MMMM d, yyyy 'at' h:mm a")}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {!selectedAssessment.read_at && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markAsRead(selectedAssessment.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedAssessment(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AssessmentDetail assessmentId={selectedAssessment.id} />
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

function AssessmentDetail({ assessmentId }: { assessmentId: string }) {
  const { user } = useUserData()
  const [assessment, setAssessment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadAssessment()
    }
  }, [user, assessmentId])

  const loadAssessment = async () => {
    if (!user) return

    const supabase = createClient()
    const { data, error } = await supabase
      .from("health_assessments")
      .select("*")
      .eq("id", assessmentId)
      .eq("coach_id", user.id)
      .single()

    if (error) {
      console.error("Error loading assessment:", error)
    } else {
      setAssessment(data)
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!assessment) {
    return <div className="text-center py-8">Assessment not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> Assessment details are not stored in the database for privacy. 
          The full assessment was sent to your email at <strong>{assessment.coach_email}</strong> on{" "}
          {assessment.email_sent_at ? format(new Date(assessment.email_sent_at), "MMMM d, yyyy 'at' h:mm a") : "submission"}.
          Please check your email inbox for the complete assessment details.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-optavia-dark mb-3">Client Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-optavia-gray">Name:</span>
            <p className="text-optavia-dark">
              {assessment.client_first_name || ""} {assessment.client_last_name || ""}
              {!assessment.client_first_name && !assessment.client_last_name && "Unknown"}
            </p>
          </div>
          <div>
            <span className="text-optavia-gray">Email:</span>
            <p className="text-optavia-dark">{assessment.client_email}</p>
          </div>
          <div>
            <span className="text-optavia-gray">Submitted:</span>
            <p className="text-optavia-dark">
              {format(new Date(assessment.submitted_at), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
          <div>
            <span className="text-optavia-gray">Email Status:</span>
            <p className="text-optavia-dark">
              {assessment.email_sent_successfully ? (
                <Badge className="bg-green-500">Sent Successfully</Badge>
              ) : (
                <Badge variant="destructive">Failed to Send</Badge>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
