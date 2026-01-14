import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const {
      to,
      coachName,
      clientFirstName,
      clientLastName,
      clientEmail,
      assessmentData,
    } = await request.json()

    if (!to || !coachName || !clientFirstName || !clientLastName || !clientEmail || !assessmentData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Format the assessment data into a readable email
    const formatValue = (value: any): string => {
      if (value === null || value === undefined || value === "") return "Not provided"
      if (typeof value === "boolean") return value ? "Yes" : "No"
      return String(value)
    }

    const formatAssessment = () => {
      let html = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #37B6AE; border-bottom: 2px solid #37B6AE; padding-bottom: 10px;">
            Health Assessment Submission
          </h2>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Client Information</h3>
            <p><strong>Name:</strong> ${clientFirstName} ${clientLastName}</p>
            <p><strong>Email:</strong> ${clientEmail}</p>
            ${assessmentData.phone ? `<p><strong>Phone:</strong> ${formatValue(assessmentData.phone)}</p>` : ""}
            ${assessmentData.dob ? `<p><strong>Date of Birth:</strong> ${formatValue(assessmentData.dob)}</p>` : ""}
            ${assessmentData.howHeard ? `<p><strong>How they heard about us:</strong> ${formatValue(assessmentData.howHeard)}</p>` : ""}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Goals</h3>
            <p><strong>Current Health State:</strong></p>
            <p style="background: #f9f9f9; padding: 10px; border-left: 3px solid #37B6AE; margin: 10px 0;">
              ${formatValue(assessmentData.goalsCurrentState)}
            </p>
            ${assessmentData.goalsWhy ? `
              <p><strong>Why they want to lose weight:</strong></p>
              <p style="background: #f9f9f9; padding: 10px; border-left: 3px solid #37B6AE; margin: 10px 0;">
                ${formatValue(assessmentData.goalsWhy)}
              </p>
            ` : ""}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Medical Information</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 10px 0;">
              ${assessmentData.pregnant ? `<p><strong>Pregnant:</strong> Yes</p>` : ""}
              ${assessmentData.nursing ? `<p><strong>Nursing:</strong> Yes${assessmentData.babyAgeMonths ? ` (${assessmentData.babyAgeMonths} months)` : ""}</p>` : ""}
              ${assessmentData.diabetesType1 ? `<p><strong>Diabetes Type 1:</strong> Yes</p>` : ""}
              ${assessmentData.diabetesType2 ? `<p><strong>Diabetes Type 2:</strong> Yes</p>` : ""}
              ${assessmentData.highBloodPressure ? `<p><strong>High Blood Pressure:</strong> Yes</p>` : ""}
              ${assessmentData.highCholesterol ? `<p><strong>High Cholesterol:</strong> Yes</p>` : ""}
              ${assessmentData.gout ? `<p><strong>Gout:</strong> Yes</p>` : ""}
              ${assessmentData.ibs ? `<p><strong>IBS:</strong> Yes</p>` : ""}
            </div>
            ${assessmentData.otherConditions ? `<p><strong>Other Conditions:</strong> ${formatValue(assessmentData.otherConditions)}</p>` : ""}
            ${assessmentData.onMedications && assessmentData.medications ? `
              <p><strong>Medications:</strong> ${formatValue(assessmentData.medications)}</p>
            ` : ""}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Habits</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 10px 0;">
              ${assessmentData.sleepQuality ? `<p><strong>Sleep Quality:</strong> ${assessmentData.sleepQuality}/5</p>` : ""}
              ${assessmentData.energyLevel ? `<p><strong>Energy Level:</strong> ${assessmentData.energyLevel}/5</p>` : ""}
              ${assessmentData.mealsPerDay !== null && assessmentData.mealsPerDay !== undefined ? `<p><strong>Meals/Day:</strong> ${assessmentData.mealsPerDay}</p>` : ""}
              ${assessmentData.snacksPerDay !== null && assessmentData.snacksPerDay !== undefined ? `<p><strong>Snacks/Day:</strong> ${assessmentData.snacksPerDay}</p>` : ""}
              ${assessmentData.waterIntakeOz !== null && assessmentData.waterIntakeOz !== undefined ? `<p><strong>Water (oz):</strong> ${assessmentData.waterIntakeOz}</p>` : ""}
              ${assessmentData.caffeinePerDay !== null && assessmentData.caffeinePerDay !== undefined ? `<p><strong>Caffeine/Day:</strong> ${assessmentData.caffeinePerDay}</p>` : ""}
              ${assessmentData.alcoholPerWeek !== null && assessmentData.alcoholPerWeek !== undefined ? `<p><strong>Alcohol/Week:</strong> ${assessmentData.alcoholPerWeek}</p>` : ""}
              ${assessmentData.exerciseDaysPerWeek !== null && assessmentData.exerciseDaysPerWeek !== undefined ? `<p><strong>Exercise Days/Week:</strong> ${assessmentData.exerciseDaysPerWeek}</p>` : ""}
              ${assessmentData.commitment ? `<p><strong>Commitment:</strong> ${assessmentData.commitment}/10</p>` : ""}
            </div>
            ${assessmentData.exerciseTypes ? `<p><strong>Exercise Types:</strong> ${formatValue(assessmentData.exerciseTypes)}</p>` : ""}
            ${assessmentData.wakeTime || assessmentData.bedTime ? `
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 10px 0;">
                ${assessmentData.wakeTime ? `<p><strong>Wake Time:</strong> ${formatValue(assessmentData.wakeTime)}</p>` : ""}
                ${assessmentData.bedTime ? `<p><strong>Bed Time:</strong> ${formatValue(assessmentData.bedTime)}</p>` : ""}
              </div>
            ` : ""}
          </div>

          ${assessmentData.additionalNotes ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Additional Notes</h3>
              <p style="background: #f9f9f9; padding: 10px; border-left: 3px solid #37B6AE; margin: 10px 0;">
                ${formatValue(assessmentData.additionalNotes)}
              </p>
            </div>
          ` : ""}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This assessment was submitted through your Health Assessment link.</p>
            <p>Client Email: ${clientEmail}</p>
            <p>Submitted: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
      return html
    }

    const { data, error } = await resend.emails.send({
      from: "Coaching Amplifier <noreply@coachingamplifier.com>",
      to: [to],
      subject: `New Health Assessment from ${clientFirstName} ${clientLastName}`,
      html: formatAssessment(),
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send email", details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Error sending health assessment email:", error)
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    )
  }
}
