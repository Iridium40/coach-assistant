import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { Webhook } from "standardwebhooks"
import {
  getSignupConfirmationEmail,
  getPasswordRecoveryEmail,
} from "@/lib/auth-email-templates"

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailHookPayload {
  user: {
    id: string
    email: string
    user_metadata?: {
      full_name?: string
    }
  }
  email_data: {
    token: string
    token_hash: string
    redirect_to: string
    email_action_type: string
    site_url: string
    token_new: string
    token_hash_new: string
  }
}

function buildVerifyUrl(
  tokenHash: string,
  type: string,
  redirectTo: string
): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const params = new URLSearchParams({
    token_hash: tokenHash,
    type,
    next: redirectTo,
  })
  return `${supabaseUrl}/auth/v1/verify?${params.toString()}`
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text()

    const hookSecret = process.env.SEND_EMAIL_HOOK_SECRET
    if (hookSecret) {
      const secret = hookSecret.replace("v1,whsec_", "")
      const headers: Record<string, string> = {}
      request.headers.forEach((value, key) => {
        headers[key] = value
      })

      const wh = new Webhook(secret)
      wh.verify(payload, headers)
    } else {
      console.warn("SEND_EMAIL_HOOK_SECRET not configured — skipping signature verification")
    }

    const { user, email_data } = JSON.parse(payload) as SendEmailHookPayload
    const { email_action_type, token_hash, redirect_to } = email_data
    const fullName = user.user_metadata?.full_name

    let emailContent: { subject: string; html: string; text: string }

    switch (email_action_type) {
      case "signup": {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.coachassistancehub.com"
        const confirmUrl = buildVerifyUrl(token_hash, "signup", redirect_to || appUrl)
        emailContent = getSignupConfirmationEmail(fullName, confirmUrl)
        break
      }

      case "recovery": {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.coachassistancehub.com"
        const resetUrl = buildVerifyUrl(token_hash, "recovery", redirect_to || `${appUrl}/reset-password`)
        emailContent = getPasswordRecoveryEmail(fullName, resetUrl)
        break
      }

      default: {
        const fallbackUrl = buildVerifyUrl(token_hash, email_action_type, redirect_to || "/")
        emailContent = {
          subject: `Coach Assistant Hub - Action Required`,
          html: `<p>Click <a href="${fallbackUrl}">here</a> to continue.</p>`,
          text: `Visit this link to continue: ${fallbackUrl}`,
        }
      }
    }

    const { error } = await resend.emails.send({
      from: "Coach Assistant Hub <noreply@coachassistanthub.com>",
      to: [user.email],
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    })

    if (error) {
      console.error("Resend error in auth send-email hook:", error)
      return NextResponse.json(
        { error: { http_code: 500, message: error.message } },
        { status: 500 }
      )
    }

    return NextResponse.json({}, { status: 200 })
  } catch (err: any) {
    console.error("Auth send-email hook error:", err)
    return NextResponse.json(
      { error: { http_code: 401, message: err.message || "Webhook verification failed" } },
      { status: 401 }
    )
  }
}
