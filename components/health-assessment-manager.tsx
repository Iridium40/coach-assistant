"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createAssessmentLink } from "@/lib/assessment-links"
import { useUserData } from "@/contexts/user-data-context"
import { createClient } from "@/lib/supabase/client"
import { Copy, Check, ExternalLink, Mail, Calendar, FileText } from "lucide-react"
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

  const assessmentLink = profile?.email ? createAssessmentLink(profile.email) : null

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
              <div className="flex gap-2">
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
                    {selectedAssessment.first_name} {selectedAssessment.last_name}
                  </CardTitle>
                  <CardDescription className="text-optavia-gray">
                    Submitted {format(new Date(selectedAssessment.created_at), "MMMM d, yyyy 'at' h:mm a")}
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
