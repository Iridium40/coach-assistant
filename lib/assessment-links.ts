/**
 * Utility functions for handling health assessment shareable links
 */

/**
 * Generate a unique assessment link key from coach email
 * Uses base64 encoding of email for a shareable link
 */
export function generateAssessmentKey(coachEmail: string): string {
  // Encode email to base64 for URL-safe sharing
  if (typeof window !== 'undefined') {
    // Browser environment
    return btoa(coachEmail).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  } else {
    // Node.js environment
    return Buffer.from(coachEmail).toString('base64url')
  }
}

/**
 * Decode assessment key to get coach email
 */
export function decodeAssessmentKey(key: string): string | null {
  try {
    if (typeof window !== 'undefined') {
      // Browser environment - decode base64url
      // Add padding if needed
      let base64 = key.replace(/-/g, '+').replace(/_/g, '/')
      while (base64.length % 4) {
        base64 += '='
      }
      return atob(base64)
    } else {
      // Node.js environment
      return Buffer.from(key, 'base64url').toString('utf-8')
    }
  } catch {
    return null
  }
}

/**
 * Create an assessment link URL
 */
export function createAssessmentLink(coachEmail: string, baseUrl?: string): string {
  const key = generateAssessmentKey(coachEmail)
  const url = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '')
  return `${url}/assessment/${key}`
}

/**
 * Extract assessment key from URL path
 */
export function getAssessmentKeyFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/assessment\/([^/]+)/)
  return match ? match[1] : null
}
