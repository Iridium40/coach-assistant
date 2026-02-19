import {
  getEmailWrapper,
  getEmailHeader,
  getEmailFooter,
  getButtonStyle,
} from "@/lib/email-templates"

interface AuthEmailResult {
  subject: string
  html: string
  text: string
}

export function getSignupConfirmationEmail(
  fullName: string | undefined,
  confirmUrl: string
): AuthEmailResult {
  const name = fullName || "there"
  const subject = "Verify Your Email - Coach Assistant Hub"

  const header = getEmailHeader("Verify Your Email", "One quick step to activate your account")

  const bodyContent = `
    <div style="padding: 30px 20px;">
      <p style="font-size: 16px; color: #333; margin: 0 0 20px 0;">Hi ${name},</p>

      <p style="font-size: 16px; color: #333; margin: 0 0 20px 0;">
        Thanks for signing up for <strong>Coach Assistant Hub</strong>! Please verify your email address by clicking the button below.
      </p>

      <div style="text-align: center; margin: 35px 0;">
        <a href="${confirmUrl}" style="${getButtonStyle()}">
          Verify My Email
        </a>
      </div>

      <div style="background-color: #f8f9fa; padding: 16px; border-radius: 6px; margin: 25px 0;">
        <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.6;">
          If you didn't create an account with Coach Assistant Hub, you can safely ignore this email.
        </p>
      </div>

      <p style="font-size: 14px; color: #999; margin: 25px 0 0 0;">
        If the button above doesn't work, copy and paste this link into your browser:
      </p>
      <p style="font-size: 13px; color: #2A9C95; word-break: break-all; margin: 8px 0 0 0;">
        ${confirmUrl}
      </p>
    </div>
  `

  const footer = getEmailFooter()
  const html = getEmailWrapper(header + bodyContent + footer, subject)

  const text = `
Verify Your Email - Coach Assistant Hub

Hi ${name},

Thanks for signing up for Coach Assistant Hub! Please verify your email address by visiting the link below:

${confirmUrl}

If you didn't create an account with Coach Assistant Hub, you can safely ignore this email.

- The Coach Assistant Hub Team
  `.trim()

  return { subject, html, text }
}

export function getPasswordRecoveryEmail(
  fullName: string | undefined,
  resetUrl: string
): AuthEmailResult {
  const name = fullName || "there"
  const subject = "Reset Your Password - Coach Assistant Hub"

  const header = getEmailHeader("Reset Your Password", "We received a request to reset your password")

  const bodyContent = `
    <div style="padding: 30px 20px;">
      <p style="font-size: 16px; color: #333; margin: 0 0 20px 0;">Hi ${name},</p>

      <p style="font-size: 16px; color: #333; margin: 0 0 20px 0;">
        We received a request to reset the password for your <strong>Coach Assistant Hub</strong> account. Click the button below to choose a new password.
      </p>

      <div style="text-align: center; margin: 35px 0;">
        <a href="${resetUrl}" style="${getButtonStyle()}">
          Reset Password
        </a>
      </div>

      <div style="background-color: #fef3c7; padding: 16px; border-radius: 6px; margin: 25px 0; border-left: 4px solid #f59e0b;">
        <p style="margin: 0; font-size: 14px; color: #92400e; line-height: 1.6;">
          <strong>Didn't request this?</strong> If you didn't ask to reset your password, you can safely ignore this email. Your password will remain unchanged.
        </p>
      </div>

      <p style="font-size: 14px; color: #999; margin: 25px 0 0 0;">
        If the button above doesn't work, copy and paste this link into your browser:
      </p>
      <p style="font-size: 13px; color: #2A9C95; word-break: break-all; margin: 8px 0 0 0;">
        ${resetUrl}
      </p>
    </div>
  `

  const footer = getEmailFooter()
  const html = getEmailWrapper(header + bodyContent + footer, subject)

  const text = `
Reset Your Password - Coach Assistant Hub

Hi ${name},

We received a request to reset the password for your Coach Assistant Hub account. Visit the link below to choose a new password:

${resetUrl}

Didn't request this? If you didn't ask to reset your password, you can safely ignore this email. Your password will remain unchanged.

- The Coach Assistant Hub Team
  `.trim()

  return { subject, html, text }
}
