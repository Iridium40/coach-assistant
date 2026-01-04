"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUserData } from "@/contexts/user-data-context"
import {
  type CalendarEvent,
  downloadGenericICSFile,
} from "@/lib/calendar-utils"

interface ScheduleCalendarOptionsProps {
  event: CalendarEvent
  recipientName?: string
  recipientEmail?: string
  onEmailChange?: (email: string) => void
  onScheduleComplete?: () => void
  className?: string
}

export function ScheduleCalendarOptions({
  event,
  recipientName,
  recipientEmail: initialEmail,
  onEmailChange,
  onScheduleComplete,
  className = "",
}: ScheduleCalendarOptionsProps) {
  const { toast } = useToast()
  const { profile } = useUserData()
  const [email, setEmail] = useState(initialEmail || "")
  const [invited, setInvited] = useState(false)

  // Use the coach's notification_email from their profile
  const organizerEmail = profile?.notification_email || undefined

  const handleEmailChange = (value: string) => {
    setEmail(value)
    onEmailChange?.(value)
  }

  // Main action: Download ICS with attendee included, so calendar app sends invite
  const handleEmailCalendarInvite = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter the client/prospect email address",
        variant: "destructive",
      })
      return
    }

    if (!organizerEmail) {
      toast({
        title: "Notification email required",
        description: "Please set your notification email in Settings > Notifications first",
        variant: "destructive",
      })
      return
    }

    // Download ICS file with attendee included
    // When user opens this in their calendar app, it will send an invite to the attendee
    downloadGenericICSFile(event, email, recipientName, organizerEmail)
    
    setInvited(true)
    onScheduleComplete?.()
    
    toast({
      title: "📅 Calendar invite downloaded!",
      description: `Open the file to add to your calendar. ${recipientName || "They"} will receive an invite at ${email}.`,
    })

    setTimeout(() => setInvited(false), 3000)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Email Input - Always visible and required */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Mail className="h-4 w-4 text-purple-500" />
          Client/Prospect Email <span className="text-red-500">*</span>
        </Label>
        <Input
          type="email"
          placeholder="Enter their email address"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          required
        />
        <p className="text-xs text-gray-500">
          They'll receive a calendar invite when you open the file
        </p>
      </div>

      {/* Primary Action: Email Calendar Invite */}
      <Button
        type="button"
        onClick={handleEmailCalendarInvite}
        disabled={!email || !organizerEmail}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
      >
        {invited ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Invite Downloaded!
          </>
        ) : (
          <>
            <Mail className="h-4 w-4 mr-2" />
            Email Calendar Invite
          </>
        )}
      </Button>

      {/* Warning if no notification email set */}
      {!organizerEmail && (
        <p className="text-xs text-amber-600 text-center">
          ⚠️ Set your notification email in Settings → Notifications to send invites
        </p>
      )}
    </div>
  )
}
