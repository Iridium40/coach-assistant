import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"
import { getEmailWrapper, getEmailHeader, getEmailFooter, getButtonStyle } from "@/lib/email-templates"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { to, fullName, coachRank } = await request.json()

    if (!to || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields: to, fullName" },
        { status: 400 }
      )
    }

    // Create email content
    const subject = `Welcome to Coach Assistant Hub!`
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://www.coachassistancehub.com"
    
    const header = getEmailHeader("Welcome to Coach Assistant Hub!", "Your coaching journey starts here")
    
    const bodyContent = `
      <div style="padding: 30px 20px;">
        <p style="font-size: 16px; color: #333; margin: 0 0 20px 0;">Hi ${fullName},</p>
        
        <p style="font-size: 16px; color: #333; margin: 0 0 20px 0;">
          Welcome to <strong>Coach Assistant Hub</strong>! We're excited to have you join our community of coaches dedicated to amplifying their business and supporting their clients.
        </p>
        
        ${coachRank ? `
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2A9C95;">
            <p style="margin: 0; font-size: 15px; color: #333;">
              <strong style="color: #2A9C95;">Your Coach Rank:</strong> ${coachRank}
            </p>
          </div>
        ` : ""}
        
        <div style="background-color: #e7f5e7; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #2A9C95;">
          <h2 style="color: #2A9C95; margin-top: 0; font-size: 20px; font-weight: bold;">What's Next?</h2>
          <ul style="margin: 10px 0; padding-left: 20px; color: #333; font-size: 15px; line-height: 1.8;">
            <li>Explore our comprehensive resource library</li>
            <li>Access training modules to enhance your coaching skills</li>
            <li>Discover Lean & Green recipes for your clients</li>
            <li>Track your progress and earn achievement badges</li>
            <li>Connect with OPTAVIA resources and tools</li>
          </ul>
        </div>
        
        <p style="font-size: 16px; color: #333; margin: 20px 0;">Ready to get started? Click the button below to access your dashboard:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${appUrl}" style="${getButtonStyle()}">
            Go to Dashboard
          </a>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h3 style="color: #2A9C95; margin-top: 0; font-size: 18px; font-weight: bold;">Quick Tips to Get Started</h3>
          <div style="margin-top: 15px;">
            <p style="margin: 10px 0; font-size: 15px; color: #333;">
              <strong style="color: #2A9C95;">📚 Training Tab:</strong> Browse modules organized by category - Getting Started, Business Building, Client Support, and Training.
            </p>
            <p style="margin: 10px 0; font-size: 15px; color: #333;">
              <strong style="color: #2A9C95;">🍽️ Recipes Tab:</strong> Access a collection of Lean & Green recipes to share with your clients.
            </p>
            <p style="margin: 10px 0; font-size: 15px; color: #333;">
              <strong style="color: #2A9C95;">🏆 Achievements:</strong> Complete resources in each category to earn achievement badges and track your progress.
            </p>
            <p style="margin: 10px 0; font-size: 15px; color: #333;">
              <strong style="color: #2A9C95;">⚙️ Settings:</strong> Customize your profile, upload an avatar, and manage your notification preferences.
            </p>
          </div>
        </div>
        
        <p style="font-size: 16px; color: #333; margin: 30px 0 0 0;">
          If you have any questions or need assistance, don't hesitate to reach out. We're here to support your success!
        </p>
        
        <p style="font-size: 16px; color: #333; margin: 20px 0 0 0;">
          Best regards,<br>
          <strong>The Coach Assistant Hub Team</strong>
        </p>
      </div>
    `
    
    const footer = getEmailFooter()
    
    const htmlContent = getEmailWrapper(header + bodyContent + footer, "Welcome to Coach Assistant Hub")

    const textContent = `
Welcome to Coach Assistant Hub!

Hi ${fullName},

Welcome to Coach Assistant Hub! We're excited to have you join our community of coaches dedicated to amplifying their business and supporting their clients.

${coachRank ? `Your Coach Rank: ${coachRank}\n\n` : ""}
What's Next?

• Explore our comprehensive resource library
• Access training modules to enhance your coaching skills
• Discover Lean & Green recipes for your clients
• Track your progress and earn achievement badges
• Connect with OPTAVIA resources and tools

Ready to get started? Visit your dashboard: ${appUrl}

Quick Tips to Get Started:

📚 Training Tab: Browse modules organized by category - Getting Started, Business Building, Client Support, and Training.

🍽️ Recipes Tab: Access a collection of Lean & Green recipes to share with your clients.

🏆 Achievements: Complete resources in each category to earn achievement badges and track your progress.

⚙️ Settings: Customize your profile, upload an avatar, and manage your notification preferences.

If you have any questions or need assistance, don't hesitate to reach out. We're here to support your success!

Best regards,
The Coach Assistant Hub Team
    `

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Coach Assistant Hub <onboarding@coachassistancehub.com>", // Update this with your verified domain
      to: [to],
      subject: subject,
      html: htmlContent,
      text: textContent,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to send email" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Email sending error:", error)
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

