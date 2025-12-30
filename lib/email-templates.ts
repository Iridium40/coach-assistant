/**
 * Shared email template utilities for consistent styling
 */

export interface EmailTemplateOptions {
  logoUrl?: string
  appUrl?: string
}

/**
 * Get the logo URL for emails
 * In production, this should be an absolute URL to the hosted logo
 */
export function getLogoUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://www.coachingamplifier.com"
  return `${baseUrl}/branding/ca_logo.png`
}

/**
 * Generate the email header with logo
 */
export function getEmailHeader(title: string, subtitle?: string): string {
  const logoUrl = getLogoUrl()
  
  return `
    <div style="background-color: #ffffff; padding: 30px 20px; text-align: center; border-bottom: 3px solid #2d5016;">
      <img src="${logoUrl}" alt="Coaching Amplifier" style="max-width: 300px; height: auto; margin-bottom: 20px;" />
      ${subtitle ? `<p style="color: #666; font-size: 16px; margin: 10px 0 0 0;">${subtitle}</p>` : ""}
    </div>
  `
}

/**
 * Generate the email footer
 */
export function getEmailFooter(): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://www.coachingamplifier.com"
  
  return `
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
      <p style="color: #666; font-size: 14px; margin: 10px 0;">
        <a href="${appUrl}" style="color: #2d5016; text-decoration: none;">Coaching Amplifier</a>
      </p>
      <p style="color: #999; font-size: 12px; margin: 5px 0;">
        Amplify your coaching business with powerful resources and tools
      </p>
      <p style="color: #999; font-size: 12px; margin: 20px 0 0 0;">
        © ${new Date().getFullYear()} Coaching Amplifier. All rights reserved.
      </p>
    </div>
  `
}

/**
 * Generate a primary button style
 */
export function getButtonStyle(): string {
  return "background-color: #2d5016; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;"
}

/**
 * Generate the base email wrapper
 */
export function getEmailWrapper(content: string, title?: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title || "Coaching Amplifier"}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f5f5f5;">
        <div style="background-color: #ffffff; margin: 20px auto; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          ${content}
        </div>
      </body>
    </html>
  `
}

