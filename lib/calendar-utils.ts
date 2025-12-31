import type { ZoomCall } from "@/lib/types"

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
