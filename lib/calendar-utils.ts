import type { ZoomCall } from "@/lib/types"

/**
 * Generic calendar event type for scheduling
 */
export interface CalendarEvent {
  title: string
  description?: string
  startDate: Date
  endDate: Date
  location?: string
  uid?: string
}

/**
 * Generate ICS content for a generic calendar event
 * Optionally includes an attendee who will receive a calendar invite
 */
export function generateGenericICSContent(event: CalendarEvent, attendeeEmail?: string, attendeeName?: string, organizerEmail?: string): string {
  // Format date to ICS format: YYYYMMDDTHHMMSSZ
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  }
  
  const uid = event.uid || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@coachingamplifier.com`
  const now = formatDate(new Date())
  
  // Escape special characters for ICS
  const escapeICS = (str: string) => {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n')
  }
  
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Coaching Amplifier//Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${formatDate(event.startDate)}`,
    `DTEND:${formatDate(event.endDate)}`,
    `SUMMARY:${escapeICS(event.title)}`,
  ]
  
  if (event.description) {
    lines.push(`DESCRIPTION:${escapeICS(event.description)}`)
  }
  
  if (event.location) {
    lines.push(`LOCATION:${escapeICS(event.location)}`)
  }
  
  // Add organizer (the coach sending the invite)
  if (organizerEmail) {
    lines.push(`ORGANIZER;CN=Coach:mailto:${organizerEmail}`)
  } else {
    lines.push(`ORGANIZER;CN=Coaching Amplifier:mailto:noreply@coachingamplifier.com`)
  }
  
  // Add attendee (the client/prospect receiving the invite)
  if (attendeeEmail) {
    const name = attendeeName || attendeeEmail.split('@')[0]
    lines.push(`ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${name}:mailto:${attendeeEmail}`)
  }
  
  lines.push('STATUS:CONFIRMED')
  lines.push('END:VEVENT')
  lines.push('END:VCALENDAR')
  
  return lines.join('\r\n')
}

/**
 * Download an ICS file for a generic event
 * If attendeeEmail is provided, the calendar invite will be sent to them when opened
 */
export function downloadGenericICSFile(
  event: CalendarEvent, 
  attendeeEmail?: string, 
  attendeeName?: string,
  organizerEmail?: string
): void {
  const icsContent = generateGenericICSContent(event, attendeeEmail, attendeeName, organizerEmail)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `${event.title.replace(/[^a-z0-9]/gi, '_')}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Get Google Calendar URL for a generic event
 */
export function getGenericGoogleCalendarUrl(event: CalendarEvent): string {
  const formatGoogleDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  }
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatGoogleDate(event.startDate)}/${formatGoogleDate(event.endDate)}`,
    details: event.description || '',
  })
  
  if (event.location) {
    params.append('location', event.location)
  }
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/**
 * Get Outlook Calendar URL for a generic event
 */
export function getGenericOutlookCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    startdt: event.startDate.toISOString(),
    enddt: event.endDate.toISOString(),
    body: event.description || '',
  })
  
  if (event.location) {
    params.append('location', event.location)
  }
  
  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`
}

/**
 * Get Yahoo Calendar URL for a generic event
 */
export function getGenericYahooCalendarUrl(event: CalendarEvent): string {
  const formatYahooDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z/, '')
  }
  
  const durationMs = event.endDate.getTime() - event.startDate.getTime()
  const durationMins = Math.round(durationMs / 60000)
  const hours = Math.floor(durationMins / 60)
  const mins = durationMins % 60
  
  const params = new URLSearchParams({
    v: '60',
    title: event.title,
    st: formatYahooDate(event.startDate),
    dur: `${hours.toString().padStart(2, '0')}${mins.toString().padStart(2, '0')}`,
    desc: event.description || '',
  })
  
  if (event.location) {
    params.append('in_loc', event.location)
  }
  
  return `https://calendar.yahoo.com/?${params.toString()}`
}

/**
 * Generate a mailto link with .ics attachment for sending calendar invite
 */
export function getEmailWithICSContent(event: CalendarEvent, recipientEmail: string, senderName?: string): string {
  const subject = encodeURIComponent(`Calendar Invite: ${event.title}`)
  const dateStr = event.startDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  const timeStr = event.startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  
  const body = encodeURIComponent(
`Hi!

You're invited to: ${event.title}

📅 Date: ${dateStr}
🕐 Time: ${timeStr}

${event.description || ''}

Looking forward to connecting!

${senderName ? `- ${senderName}` : ''}

Note: Download the attached .ics file to add this event to your calendar.`)
  
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`
}

/**
 * Generate an ICS (iCalendar) file content for a zoom call
 */
export function generateICSContent(call: ZoomCall): string {
  const startDate = new Date(call.scheduled_at)
  const endDate = new Date(startDate.getTime() + call.duration_minutes * 60000)
  
  // Format date to ICS format: YYYYMMDDTHHMMSSZ
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  }
  
  const uid = `${call.id}@coachingamplifier.com`
  const now = formatDate(new Date())
  
  // Build description with meeting details
  let description = call.description || ''
  if (call.zoom_link) {
    description += `\\n\\nJoin Zoom Meeting:\\n${call.zoom_link}`
  }
  if (call.zoom_meeting_id) {
    description += `\\n\\nMeeting ID: ${call.zoom_meeting_id}`
  }
  if (call.zoom_passcode) {
    description += `\\nPasscode: ${call.zoom_passcode}`
  }
  description += `\\n\\nCall Type: ${call.call_type === 'coach_only' ? 'Coach Only' : 'With Clients'}`
  
  // Escape special characters for ICS
  const escapeICS = (str: string) => {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n')
  }
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Coaching Amplifier//Zoom Calls//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${escapeICS(call.title)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    call.zoom_link ? `URL:${call.zoom_link}` : '',
    'STATUS:CONFIRMED',
    `ORGANIZER;CN=Coaching Amplifier:mailto:noreply@coachingamplifier.com`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean).join('\r\n')
  
  return icsContent
}

/**
 * Download an ICS file for a zoom call
 */
export function downloadICSFile(call: ZoomCall): void {
  const icsContent = generateICSContent(call)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `${call.title.replace(/[^a-z0-9]/gi, '_')}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Generate a Google Calendar add event URL
 */
export function getGoogleCalendarUrl(call: ZoomCall): string {
  const startDate = new Date(call.scheduled_at)
  const endDate = new Date(startDate.getTime() + call.duration_minutes * 60000)
  
  // Format for Google Calendar: YYYYMMDDTHHMMSSZ
  const formatGoogleDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  }
  
  // Build details text
  let details = call.description || ''
  if (call.zoom_link) {
    details += `\n\nJoin Zoom Meeting:\n${call.zoom_link}`
  }
  if (call.zoom_meeting_id) {
    details += `\n\nMeeting ID: ${call.zoom_meeting_id}`
  }
  if (call.zoom_passcode) {
    details += `\nPasscode: ${call.zoom_passcode}`
  }
  details += `\n\nCall Type: ${call.call_type === 'coach_only' ? 'Coach Only' : 'With Clients'}`
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: call.title,
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
    details: details,
  })
  
  if (call.zoom_link) {
    params.append('location', call.zoom_link)
  }
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/**
 * Generate an Outlook/Office 365 calendar add event URL
 */
export function getOutlookCalendarUrl(call: ZoomCall): string {
  const startDate = new Date(call.scheduled_at)
  const endDate = new Date(startDate.getTime() + call.duration_minutes * 60000)
  
  // Build body text
  let body = call.description || ''
  if (call.zoom_link) {
    body += `<br><br>Join Zoom Meeting:<br><a href="${call.zoom_link}">${call.zoom_link}</a>`
  }
  if (call.zoom_meeting_id) {
    body += `<br><br>Meeting ID: ${call.zoom_meeting_id}`
  }
  if (call.zoom_passcode) {
    body += `<br>Passcode: ${call.zoom_passcode}`
  }
  body += `<br><br>Call Type: ${call.call_type === 'coach_only' ? 'Coach Only' : 'With Clients'}`
  
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: call.title,
    startdt: startDate.toISOString(),
    enddt: endDate.toISOString(),
    body: body,
  })
  
  if (call.zoom_link) {
    params.append('location', call.zoom_link)
  }
  
  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`
}

/**
 * Generate a Yahoo Calendar add event URL
 */
export function getYahooCalendarUrl(call: ZoomCall): string {
  const startDate = new Date(call.scheduled_at)
  
  // Format for Yahoo: YYYYMMDDTHHMMSS
  const formatYahooDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z/, '')
  }
  
  // Build description
  let desc = call.description || ''
  if (call.zoom_link) {
    desc += `\n\nJoin Zoom Meeting:\n${call.zoom_link}`
  }
  if (call.zoom_meeting_id) {
    desc += `\n\nMeeting ID: ${call.zoom_meeting_id}`
  }
  if (call.zoom_passcode) {
    desc += `\nPasscode: ${call.zoom_passcode}`
  }
  
  const params = new URLSearchParams({
    v: '60',
    title: call.title,
    st: formatYahooDate(startDate),
    dur: `${Math.floor(call.duration_minutes / 60).toString().padStart(2, '0')}${(call.duration_minutes % 60).toString().padStart(2, '0')}`,
    desc: desc,
  })
  
  if (call.zoom_link) {
    params.append('in_loc', call.zoom_link)
  }
  
  return `https://calendar.yahoo.com/?${params.toString()}`
}
