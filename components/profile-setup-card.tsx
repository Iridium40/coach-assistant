"use client"

import { useState } from "react"

interface ProfileData {
  avatar_url?: string | null
  coach_rank?: string | null
  phone_number?: string | null
  optavia_id?: string | null
  notification_email?: string | null
  zoom_link?: string | null
}

interface ProfileSetupCardProps {
  mode?: "announcement" | "dashboard"
  profile?: ProfileData
  onDismiss?: () => void
  onNavigate?: () => void
}

const SUPABASE_IMG = "https://rcucmbujkdwvrcjistub.supabase.co/storage/v1/object/public/user_training"

const SETUP_STEPS = [
  { key: "avatar_url" as const,         label: "Upload Profile Photo",           tab: "Profile",       icon: "📷", hint: "JPG, PNG, or GIF — Max 5MB" },
  { key: "coach_rank" as const,         label: "Set Your Coach Rank",            tab: "Profile",       icon: "🏅", hint: "New Coach → IPD" },
  { key: "phone_number" as const,       label: "Enter Phone Number",             tab: "Profile",       icon: "📱", hint: "10-digit number" },
  { key: "optavia_id" as const,         label: "Add OPTAVIA Coach Website",      tab: "Profile",       icon: "🔗", hint: "optavia.com/us/en/coach/yourname" },
  { key: "notification_email" as const, label: "Notification Email",             tab: "Notifications", icon: "📧", hint: "Defaults to signup email", autoFilled: true },
  { key: "zoom_link" as const,          label: "Zoom Meeting Link",              tab: "Zoom",          icon: "🎥", hint: "Optional — phone meetings still work", optional: true },
]

type StepKey = typeof SETUP_STEPS[number]["key"]

const TAB_SCREENSHOTS: Record<string, { img: string; title: string }> = {
  "Profile":       { img: `${SUPABASE_IMG}/profile.png`,       title: "📋 Profile Settings" },
  "Notifications": { img: `${SUPABASE_IMG}/notifications.png`, title: "🔔 Notification Settings" },
  "Zoom":          { img: `${SUPABASE_IMG}/zoom.png`,          title: "🎥 Zoom Integration" },
}

const STEP_COLORS = [
  "linear-gradient(135deg, #f59e0b, #f97316)",
  "linear-gradient(135deg, #8b5cf6, #6366f1)",
  "linear-gradient(135deg, #06b6d4, #0284c7)",
  "linear-gradient(135deg, #ec4899, #e11d48)",
  "linear-gradient(135deg, #64748b, #475569)",
  "linear-gradient(135deg, #2563eb, #1d4ed8)",
]

function Lightbox({ screenshot, onClose }: { screenshot: { img: string; title: string } | null; onClose: () => void }) {
  if (!screenshot) return null
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "fadeIn 0.2s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: "700px", width: "100%", background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "#1a2744", color: "#fff" }}>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "14px" }}>{screenshot.title}</span>
          <button onClick={onClose} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <img src={screenshot.img} alt={screenshot.title} style={{ width: "100%", display: "block" }} />
      </div>
    </div>
  )
}

function isStepComplete(profile: ProfileData | undefined, key: StepKey): boolean {
  if (!profile) return false
  if (key === "notification_email") return true
  const val = profile[key]
  if (!val) return false
  if (typeof val === "string" && val.trim() === "") return false
  return true
}

export default function ProfileSetupCard({ mode = "announcement", profile = {}, onDismiss, onNavigate }: ProfileSetupCardProps) {
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null)
  const [dismissed, setDismissed] = useState(false)

  const completedCount = SETUP_STEPS.filter(s => isStepComplete(profile, s.key)).length
  const totalRequired = SETUP_STEPS.filter(s => !s.optional).length
  const requiredComplete = SETUP_STEPS.filter(s => !s.optional && isStepComplete(profile, s.key)).length
  const allRequiredDone = requiredComplete >= totalRequired
  const allDone = completedCount === SETUP_STEPS.length

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  const handleNavigate = () => {
    onNavigate?.()
  }

  const tabs = [...new Set(SETUP_STEPS.map(s => s.tab))]

  // ════════════════════════════════════════
  // DASHBOARD MODE — Compact card
  // ════════════════════════════════════════
  if (mode === "dashboard") {
    return (
      <>
        <div style={{ background: "#fff", borderRadius: "14px", border: allRequiredDone ? "1px solid #bbf7d0" : "1px solid #fde68a", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", fontFamily: "'Open Sans', -apple-system, sans-serif" }}>
          {/* Compact Header */}
          <div style={{ padding: "16px 20px", background: allRequiredDone ? "linear-gradient(135deg, #003B2E, #00A651)" : "linear-gradient(135deg, #92400e, #f59e0b)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "22px" }}>{allRequiredDone ? "✅" : "👋"}</span>
              <div>
                <h3 style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "15px", color: "#fff" }}>
                  {allRequiredDone ? "Profile Almost Complete!" : "Complete Your Profile"}
                </h3>
                <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
                  {completedCount} of {SETUP_STEPS.length} steps done
                </p>
              </div>
            </div>
            {allDone && (
              <button onClick={handleDismiss} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>
                Dismiss
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div style={{ padding: "0 20px", marginTop: "12px" }}>
            <div style={{ height: "6px", borderRadius: "3px", background: "#f1f5f9" }}>
              <div style={{ height: "100%", width: `${(completedCount / SETUP_STEPS.length) * 100}%`, background: allRequiredDone ? "#00A651" : "#f59e0b", borderRadius: "3px", transition: "width 0.5s ease" }} />
            </div>
          </div>

          {/* Step Checklist */}
          <div style={{ padding: "12px 20px 8px" }}>
            {SETUP_STEPS.map((step, i) => {
              const done = isStepComplete(profile, step.key)
              return (
                <div key={step.key} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: i < SETUP_STEPS.length - 1 ? "1px solid #f8fafc" : "none" }}>
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center",
                    background: done ? "#00A651" : "#f1f5f9", color: done ? "#fff" : "#94a3b8", fontSize: "11px", fontWeight: 800,
                    fontFamily: "'Montserrat', sans-serif", flexShrink: 0, transition: "all 0.3s",
                  }}>
                    {done ? "✓" : i + 1}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: done ? "#9ca3af" : "#374151", textDecoration: done ? "line-through" : "none", flex: 1, transition: "all 0.3s" }}>
                    {step.icon} {step.label}
                  </span>
                  {step.optional && !done && <span style={{ fontSize: "9px", fontWeight: 700, color: "#92400e", background: "#fef3c7", padding: "1px 6px", borderRadius: "3px" }}>OPTIONAL</span>}
                  {step.autoFilled && <span style={{ fontSize: "9px", fontWeight: 700, color: "#065f46", background: "#d1fae5", padding: "1px 6px", borderRadius: "3px" }}>AUTO</span>}
                </div>
              )
            })}
          </div>

          {/* CTA */}
          {!allDone && (
            <div style={{ padding: "8px 20px 16px" }}>
              <button onClick={handleNavigate} style={{
                width: "100%", padding: "11px", background: "linear-gradient(135deg, #003B2E, #00A651)", color: "#fff",
                border: "none", borderRadius: "10px", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "13px",
                cursor: "pointer", boxShadow: "0 2px 8px rgba(0,166,81,0.2)", transition: "all 0.2s",
              }}>
                Go to My Settings →
              </button>
            </div>
          )}
        </div>

        <Lightbox screenshot={lightbox} onClose={() => setLightbox(null)} />
      </>
    )
  }

  // ════════════════════════════════════════
  // ANNOUNCEMENT MODE — Full welcome card
  // ════════════════════════════════════════
  return (
    <>
      <div style={{ maxWidth: "640px", width: "100%", margin: "0 auto", background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)", fontFamily: "'Open Sans', -apple-system, sans-serif" }}>
        {/* HEADER */}
        <div style={{ background: "linear-gradient(135deg, #003B2E 0%, #00A651 60%, #5cbdab 100%)", padding: "36px 32px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", bottom: "-40px", left: "-20px", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <span style={{ fontSize: "40px", display: "block", marginBottom: "12px", position: "relative" }}>👋</span>
          <h1 style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "26px", color: "#fff", letterSpacing: "-0.5px", position: "relative" }}>
            Welcome to Coaching Amplifier!
          </h1>
          <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.85)", fontSize: "15px", position: "relative" }}>
            Let&apos;s get your profile set up so you&apos;re ready to coach.
          </p>
        </div>

        {/* BODY */}
        <div style={{ padding: "28px 32px 12px" }}>
          <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: "24px" }}>
            Before diving in, take <strong style={{ color: "#1e293b" }}>a few minutes</strong> to complete your coach profile. This personalizes your experience and unlocks rank-specific training and features.
          </p>

          {/* GETTING THERE */}
          <div style={{ marginBottom: "22px" }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "4px", display: "flex", alignItems: "center", gap: "10px" }}>
              Getting There<span style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
            </div>

            {[
              { num: 1, title: "Tap Your Profile Avatar", desc: <>Click your avatar in the <strong>top-right corner</strong> of the screen.</> },
              { num: 2, title: <>Select <span style={{ display: "inline-flex", alignItems: "center", fontSize: "12px", fontWeight: 700, color: "#1a2744", background: "#e8ecf1", padding: "2px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontFamily: "'Montserrat', sans-serif" }}>My Settings</span></>, desc: <>In the dropdown, click <strong>My Settings</strong> to open your profile page.</> },
            ].map(s => (
              <div key={s.num} style={{ display: "flex", gap: "14px", padding: "13px 0", borderBottom: s.num === 1 ? "1px solid #f8fafc" : "none" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#1a2744", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "13px", color: "#fff", flexShrink: 0 }}>{s.num}</div>
                <div>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "14px", color: "#1e293b", margin: "0 0 2px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>{s.title}</h3>
                  <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* TAB SECTIONS */}
          {tabs.map(tab => {
            const tabSteps = SETUP_STEPS.filter(s => s.tab === tab)
            const screenshot = TAB_SCREENSHOTS[tab]
            const globalIdx = SETUP_STEPS.indexOf(tabSteps[0])

            return (
              <div key={tab} style={{ marginBottom: "22px" }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "4px", display: "flex", alignItems: "center", gap: "10px" }}>
                  {tab} Tab<span style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
                </div>

                {screenshot && (
                  <button onClick={() => setLightbox(screenshot)} style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "5px 12px", fontSize: "11px", fontWeight: 700, fontFamily: "'Montserrat', sans-serif", color: "#1a2744", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", marginBottom: "10px", marginTop: "6px", transition: "all 0.15s" }}>
                    📸 See Example Screenshot
                  </button>
                )}

                {tabSteps.map((step, i) => {
                  const stepNum = globalIdx + i + 3
                  const done = isStepComplete(profile, step.key)
                  return (
                    <div key={step.key} style={{ display: "flex", gap: "14px", padding: "13px 0", borderBottom: i < tabSteps.length - 1 ? "1px solid #f8fafc" : "none" }}>
                      <div style={{
                        width: "30px", height: "30px", borderRadius: "8px",
                        background: done ? "#00A651" : STEP_COLORS[globalIdx + i] || "#64748b",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: done ? "14px" : "13px", color: "#fff", flexShrink: 0, transition: "all 0.3s",
                      }}>
                        {done ? "✓" : stepNum}
                      </div>
                      <div>
                        <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "14px", color: done ? "#9ca3af" : "#1e293b", margin: "0 0 2px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", textDecoration: done ? "line-through" : "none" }}>
                          {step.label}
                          {step.autoFilled && <span style={{ fontSize: "10px", fontWeight: 700, color: "#065f46", background: "#d1fae5", padding: "2px 8px", borderRadius: "4px", border: "1px solid #a7f3d0", textDecoration: "none" }}>AUTO-FILLED</span>}
                          {step.optional && <span style={{ fontSize: "10px", fontWeight: 700, color: "#92400e", background: "#fef3c7", padding: "2px 8px", borderRadius: "4px", border: "1px solid #fde68a", textDecoration: "none" }}>OPTIONAL</span>}
                        </h3>
                        <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                          {step.key === "notification_email"
                            ? "This defaults to the email you signed up with. Only change it if you want notifications and meeting invites sent to a different address."
                            : step.key === "zoom_link"
                            ? "If you have a Zoom account, add your personal meeting link. This is used when sending Zoom invites to prospects or clients."
                            : step.key === "avatar_url"
                            ? "Add a professional headshot or friendly photo so your team and clients can recognize you."
                            : step.key === "coach_rank"
                            ? "Select the highest level you've achieved in OPTAVIA. This unlocks rank-specific features and training."
                            : step.key === "phone_number"
                            ? "Add your phone number for client communications and scheduling."
                            : "Paste your personal OPTAVIA coach page URL so clients can find and connect with you."
                          }
                        </p>
                        {step.key === "zoom_link" && (
                          <p style={{ marginTop: "6px", fontSize: "12px", color: "#94a3b8", fontStyle: "italic" }}>
                            💡 Don&apos;t have Zoom? No worries — you can still schedule phone meetings without it.
                          </p>
                        )}
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "5px", fontSize: "11px", fontWeight: 600, color: "#94a3b8", fontStyle: "italic" }}>
                          {step.icon} {step.hint}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}

          <p style={{ margin: "4px 0 0", textAlign: "center", fontSize: "14px", fontWeight: 600, color: "#003B2E" }}>
            Don&apos;t forget to hit <span style={{ display: "inline-flex", fontSize: "13px", fontWeight: 700, color: "#003B2E", background: "#e6f7ee", padding: "2px 10px", borderRadius: "6px", border: "1px solid #bbf7d0", fontFamily: "'Montserrat', sans-serif" }}>Save Changes</span> on each tab!
          </p>
        </div>

        {/* FOOTER */}
        <div style={{ padding: "16px 32px 28px" }}>
          <button onClick={handleNavigate} style={{
            width: "100%", padding: "14px", background: "linear-gradient(135deg, #003B2E, #00A651)", color: "#fff",
            border: "none", borderRadius: "12px", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "15px",
            cursor: "pointer", boxShadow: "0 2px 12px rgba(0,166,81,0.25)", transition: "all 0.2s", letterSpacing: "0.3px",
          }}>
            Go to My Settings →
          </button>
          <p style={{ textAlign: "center", marginTop: "12px", fontSize: "12px", color: "#94a3b8" }}>
            Takes just a few minutes • You can update these anytime
          </p>
        </div>
      </div>

      <Lightbox screenshot={lightbox} onClose={() => setLightbox(null)} />
    </>
  )
}
