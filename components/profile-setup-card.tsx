"use client"

import { useState, useEffect } from "react"

// ═══════════════════════════════════════════════════════════
// PROFILE SETUP SYSTEM
// ═══════════════════════════════════════════════════════════
//
// TWO COMPONENTS:
//
// 1. <ProfileSetupAnnouncement />
//    Full-screen modal walkthrough for new users on first login.
//
// 2. <ProfileSetupProgress />
//    Dashboard card showing completion status.
//    "Setup Guide" button re-opens the announcement.
//    Auto-hides when all required steps are done.
//
// ═══════════════════════════════════════════════════════════

// ── Types ──

export interface CoachProfile {
  avatar_url?: string | null
  coach_rank?: string | null
  phone_number?: string | null
  optavia_id?: string | null
  notification_email?: string | null
  zoom_link?: string | null
}

interface SetupStep {
  key: keyof CoachProfile
  label: string
  tab: "Profile" | "Notifications" | "Zoom"
  icon: string
  hint: string
  autoFilled?: boolean
  optional?: boolean
}

interface Screenshot {
  img: string
  title: string
}

interface SetupStats {
  total: number
  done: number
  requiredTotal: number
  requiredDone: number
  allDone: boolean
  allRequiredDone: boolean
}

export interface ProfileSetupAnnouncementProps {
  profile?: CoachProfile
  onClose: () => void
  onNavigate: () => void
}

export interface ProfileSetupProgressProps {
  profile?: CoachProfile
  onOpenGuide: () => void
  onNavigate: () => void
}

// ── Constants ──

const SUPABASE_IMG = "https://rcucmbujkdwvrcjistub.supabase.co/storage/v1/object/public/user_training"

const SETUP_STEPS: SetupStep[] = [
  { key: "avatar_url",         label: "Upload Profile Photo",      tab: "Profile",       icon: "📷", hint: "JPG, PNG, or GIF — Max 5MB" },
  { key: "coach_rank",         label: "Set Your Coach Rank",       tab: "Profile",       icon: "🏅", hint: "New Coach → IPD" },
  { key: "phone_number",       label: "Enter Phone Number",        tab: "Profile",       icon: "📱", hint: "10-digit number" },
  { key: "optavia_id",         label: "OPTAVIA Coach Website",     tab: "Profile",       icon: "🔗", hint: "optavia.com/us/en/coach/yourname" },
  { key: "notification_email", label: "Notification Email",        tab: "Notifications", icon: "📧", hint: "Defaults to signup email", autoFilled: true },
  { key: "zoom_link",          label: "Zoom Meeting Link",         tab: "Zoom",          icon: "🎥", hint: "Optional — phone meetings still work", optional: true },
]

const TAB_SCREENSHOTS: Record<string, Screenshot> = {
  "Profile":       { img: `${SUPABASE_IMG}/profile.png`,       title: "📋 Profile Settings" },
  "Notifications": { img: `${SUPABASE_IMG}/notifications.png`, title: "🔔 Notification Settings" },
  "Zoom":          { img: `${SUPABASE_IMG}/zoom.png`,          title: "🎥 Zoom Integration" },
}

const STEP_COLORS: string[] = [
  "linear-gradient(135deg, #f59e0b, #f97316)",
  "linear-gradient(135deg, #8b5cf6, #6366f1)",
  "linear-gradient(135deg, #06b6d4, #0284c7)",
  "linear-gradient(135deg, #ec4899, #e11d48)",
  "linear-gradient(135deg, #64748b, #475569)",
  "linear-gradient(135deg, #2563eb, #1d4ed8)",
]

const STEP_DESCRIPTIONS: Record<keyof CoachProfile, string> = {
  avatar_url: "Add a professional headshot or friendly photo so your team and clients can recognize you.",
  coach_rank: "Select the highest level you\u2019ve achieved in OPTAVIA. This unlocks rank-specific features and training.",
  phone_number: "Add your phone number for client communications and scheduling.",
  optavia_id: "Paste your personal OPTAVIA coach page URL so clients can find and connect with you.",
  notification_email: "This defaults to the email you signed up with. Only change it if you want notifications and meeting invites sent to a different address.",
  zoom_link: "If you have a Zoom account, add your personal meeting link. This is used when sending Zoom invites to prospects or clients.",
}

// ── Helpers ──

const isComplete = (profile: CoachProfile, key: keyof CoachProfile): boolean => {
  if (key === "notification_email") return true
  const val = profile[key]
  if (!val) return false
  if (typeof val === "string" && val.trim() === "") return false
  return true
}

const getStats = (profile: CoachProfile): SetupStats => {
  const total = SETUP_STEPS.length
  const done = SETUP_STEPS.filter((s) => isComplete(profile, s.key)).length
  const requiredTotal = SETUP_STEPS.filter((s) => !s.optional).length
  const requiredDone = SETUP_STEPS.filter((s) => !s.optional && isComplete(profile, s.key)).length
  return { total, done, requiredTotal, requiredDone, allDone: done === total, allRequiredDone: requiredDone >= requiredTotal }
}

// ── Shared: Screenshot Lightbox ──

function Lightbox({ screenshot, onClose }: { screenshot: Screenshot | null; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  if (!screenshot) return null

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 10001, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "700px", width: "100%", background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", animation: "slideUp 0.25s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "#1a2744", color: "#fff" }}>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "14px" }}>{screenshot.title}</span>
          <button onClick={onClose} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✕
          </button>
        </div>
        <img src={screenshot.img} alt={screenshot.title} style={{ width: "100%", display: "block" }} />
      </div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════
// COMPONENT 1: ANNOUNCEMENT MODAL
// Full walkthrough shown as an overlay.
// ═══════════════════════════════════════════════════════════

export function ProfileSetupAnnouncement({ profile = {}, onClose, onNavigate }: ProfileSetupAnnouncementProps) {
  const [lightbox, setLightbox] = useState<Screenshot | null>(null)
  const tabs = [...new Set(SETUP_STEPS.map((s) => s.tab))]

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <>
      {/* OVERLAY */}
      <div style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", overflowY: "auto" }}>
        <div style={{ maxWidth: "640px", width: "100%", background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.2)", animation: "slideUp 0.3s ease", margin: "auto" }}>

          {/* HEADER */}
          <div style={{ background: "linear-gradient(135deg, #003B2E 0%, #00A651 60%, #5cbdab 100%)", padding: "32px 32px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
            <div style={{ position: "absolute", bottom: "-40px", left: "-20px", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <button
              onClick={onClose}
              style={{ position: "absolute", top: "14px", right: "14px", width: "32px", height: "32px", borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}
            >
              ✕
            </button>
            <span style={{ fontSize: "40px", display: "block", marginBottom: "10px", position: "relative" }}>👋</span>
            <h1 style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "24px", color: "#fff", letterSpacing: "-0.5px", position: "relative" }}>
              Welcome to Coaching Amplifier!
            </h1>
            <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.85)", fontSize: "14px", position: "relative" }}>
              Let&apos;s get your profile set up so you&apos;re ready to coach.
            </p>
          </div>

          {/* SCROLLABLE BODY */}
          <div style={{ maxHeight: "calc(80vh - 200px)", overflowY: "auto", padding: "24px 32px 12px" }}>
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: "22px" }}>
              Take <strong style={{ color: "#1e293b" }}>a few minutes</strong> to complete your coach profile. This personalizes your experience and unlocks rank-specific training.
            </p>

            {/* GETTING THERE */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "4px", display: "flex", alignItems: "center", gap: "10px" }}>
                Getting There<span style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
              </div>

              {([
                { num: 1, title: "Tap Your Profile Avatar", desc: <>Click your avatar in the <strong>top-right corner</strong> of the screen.</> },
                {
                  num: 2,
                  title: (
                    <>
                      Select{" "}
                      <span style={{ display: "inline-flex", fontSize: "12px", fontWeight: 700, color: "#1a2744", background: "#e8ecf1", padding: "2px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontFamily: "'Montserrat', sans-serif" }}>
                        My Settings
                      </span>
                    </>
                  ),
                  desc: <>In the dropdown, click <strong>My Settings</strong> to open your profile page.</>,
                },
              ] as { num: number; title: React.ReactNode; desc: React.ReactNode }[]).map((s) => (
                <div key={s.num} style={{ display: "flex", gap: "14px", padding: "11px 0", borderBottom: s.num === 1 ? "1px solid #f8fafc" : "none" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#1a2744", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "12px", color: "#fff", flexShrink: 0 }}>
                    {s.num}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "14px", color: "#1e293b", margin: "0 0 2px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      {s.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* TAB SECTIONS */}
            {tabs.map((tab) => {
              const tabSteps = SETUP_STEPS.filter((s) => s.tab === tab)
              const screenshot = TAB_SCREENSHOTS[tab]
              const globalIdx = SETUP_STEPS.indexOf(tabSteps[0])

              return (
                <div key={tab} style={{ marginBottom: "20px" }}>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "4px", display: "flex", alignItems: "center", gap: "10px" }}>
                    {tab} Tab<span style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
                  </div>

                  {screenshot && (
                    <button
                      onClick={() => setLightbox(screenshot)}
                      style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "5px 12px", fontSize: "11px", fontWeight: 700, fontFamily: "'Montserrat', sans-serif", color: "#1a2744", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", marginBottom: "8px", marginTop: "5px", transition: "all 0.15s" }}
                    >
                      📸 See Example Screenshot
                    </button>
                  )}

                  {tabSteps.map((step, i) => {
                    const stepNum = globalIdx + i + 3
                    const done = isComplete(profile, step.key)
                    return (
                      <div key={step.key} style={{ display: "flex", gap: "14px", padding: "11px 0", borderBottom: i < tabSteps.length - 1 ? "1px solid #f8fafc" : "none" }}>
                        <div
                          style={{
                            width: "28px", height: "28px", borderRadius: "7px",
                            background: done ? "#00A651" : (STEP_COLORS[globalIdx + i] || "#64748b"),
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: done ? "14px" : "12px", color: "#fff", flexShrink: 0, transition: "all 0.3s",
                          }}
                        >
                          {done ? "✓" : stepNum}
                        </div>
                        <div>
                          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "14px", color: done ? "#9ca3af" : "#1e293b", margin: "0 0 2px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", textDecoration: done ? "line-through" : "none" }}>
                            {step.label}
                            {step.autoFilled && (
                              <span style={{ fontSize: "10px", fontWeight: 700, color: "#065f46", background: "#d1fae5", padding: "2px 8px", borderRadius: "4px", border: "1px solid #a7f3d0", textDecoration: "none" }}>AUTO-FILLED</span>
                            )}
                            {step.optional && (
                              <span style={{ fontSize: "10px", fontWeight: 700, color: "#92400e", background: "#fef3c7", padding: "2px 8px", borderRadius: "4px", border: "1px solid #fde68a", textDecoration: "none" }}>OPTIONAL</span>
                            )}
                          </h3>
                          <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                            {STEP_DESCRIPTIONS[step.key]}
                          </p>
                          {step.key === "zoom_link" && (
                            <p style={{ marginTop: "5px", fontSize: "12px", color: "#94a3b8", fontStyle: "italic" }}>
                              💡 Don&apos;t have Zoom? No worries — you can still schedule phone meetings without it.
                            </p>
                          )}
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "4px", fontSize: "11px", fontWeight: 600, color: "#94a3b8", fontStyle: "italic" }}>
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
              Don&apos;t forget to hit{" "}
              <span style={{ display: "inline-flex", fontSize: "13px", fontWeight: 700, color: "#003B2E", background: "#e6f7ee", padding: "2px 10px", borderRadius: "6px", border: "1px solid #bbf7d0", fontFamily: "'Montserrat', sans-serif" }}>
                Save Changes
              </span>{" "}
              on each tab!
            </p>
          </div>

          {/* FOOTER */}
          <div style={{ padding: "16px 32px 24px", borderTop: "1px solid #f1f5f9" }}>
            <button
              onClick={onNavigate}
              style={{
                width: "100%", padding: "13px", background: "linear-gradient(135deg, #003B2E, #00A651)", color: "#fff",
                border: "none", borderRadius: "12px", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "15px",
                cursor: "pointer", boxShadow: "0 2px 12px rgba(0,166,81,0.25)", transition: "all 0.2s",
              }}
            >
              Go to My Settings →
            </button>
            <p style={{ textAlign: "center", marginTop: "10px", fontSize: "12px", color: "#94a3b8" }}>
              Takes just a few minutes • You can update these anytime
            </p>
          </div>
        </div>
      </div>

      <Lightbox screenshot={lightbox} onClose={() => setLightbox(null)} />

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  )
}


// ═══════════════════════════════════════════════════════════
// COMPONENT 2: DASHBOARD PROGRESS CARD
// Compact card for the dashboard. Shows checklist + progress.
// "Setup Guide" re-opens the announcement modal.
// Auto-hides when all required steps are done.
// ═══════════════════════════════════════════════════════════

export function ProfileSetupProgress({ profile = {}, onOpenGuide, onNavigate }: ProfileSetupProgressProps) {
  const stats = getStats(profile)

  if (stats.allRequiredDone && stats.done >= stats.total - 1) return null

  const nextStep = SETUP_STEPS.find((s) => !isComplete(profile, s.key) && !s.optional)
  const pct = Math.round((stats.done / stats.total) * 100)

  return (
    <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", fontFamily: "'Open Sans', -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", background: "linear-gradient(135deg, #003B2E, #00A651)", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: "22px" }}>⚙️</span>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "15px", color: "#fff" }}>
            Complete Your Profile
          </h3>
          <p style={{ margin: "2px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>
            {stats.done} of {stats.total} steps complete
          </p>
        </div>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <svg width="48" height="48" viewBox="0 0 48 48" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
            <circle cx="24" cy="24" r="20" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray={`${(pct / 100) * 125.6} 125.6`} strokeLinecap="round" style={{ transition: "stroke-dasharray 0.5s ease" }} />
          </svg>
          <span style={{ fontSize: "13px", fontWeight: 800, color: "#fff", fontFamily: "'Montserrat', sans-serif", position: "relative" }}>{pct}%</span>
        </div>
      </div>

      {/* Checklist */}
      <div style={{ padding: "12px 20px 4px" }}>
        {SETUP_STEPS.map((step, i) => {
          const done = isComplete(profile, step.key)
          return (
            <div key={step.key} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderBottom: i < SETUP_STEPS.length - 1 ? "1px solid #f8fafc" : "none" }}>
              <div
                style={{
                  width: "22px", height: "22px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center",
                  background: done ? "#00A651" : "#f1f5f9", color: done ? "#fff" : "#94a3b8", fontSize: "11px", fontWeight: 800,
                  fontFamily: "'Montserrat', sans-serif", flexShrink: 0, transition: "all 0.3s",
                }}
              >
                {done ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: "13px", fontWeight: done ? 500 : 600, color: done ? "#9ca3af" : "#374151", textDecoration: done ? "line-through" : "none", flex: 1, transition: "all 0.3s" }}>
                {step.icon} {step.label}
              </span>
              {step.optional && !done && <span style={{ fontSize: "9px", fontWeight: 700, color: "#92400e", background: "#fef3c7", padding: "1px 6px", borderRadius: "3px" }}>OPTIONAL</span>}
              {step.autoFilled && <span style={{ fontSize: "9px", fontWeight: 700, color: "#065f46", background: "#d1fae5", padding: "1px 6px", borderRadius: "3px" }}>AUTO</span>}
            </div>
          )
        })}
      </div>

      {/* Next Step Nudge */}
      {nextStep && (
        <div style={{ margin: "4px 20px 0", padding: "10px 14px", background: "#fffbeb", borderRadius: "8px", border: "1px solid #fde68a", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>👉</span>
          <p style={{ margin: 0, fontSize: "12px", color: "#92400e", fontWeight: 600 }}>
            Next: <strong>{nextStep.label}</strong>
          </p>
        </div>
      )}

      {/* Actions */}
      <div style={{ padding: "14px 20px 16px", display: "flex", gap: "8px" }}>
        <button
          onClick={onNavigate}
          style={{
            flex: 1, padding: "11px", background: "linear-gradient(135deg, #003B2E, #00A651)", color: "#fff",
            border: "none", borderRadius: "10px", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "13px",
            cursor: "pointer", boxShadow: "0 2px 8px rgba(0,166,81,0.2)", transition: "all 0.2s",
          }}
        >
          Go to Settings →
        </button>
        <button
          onClick={onOpenGuide}
          style={{
            padding: "11px 16px", background: "#f1f5f9", color: "#475569",
            border: "1px solid #e2e8f0", borderRadius: "10px", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "13px",
            cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
          }}
        >
          📋 Setup Guide
        </button>
      </div>
    </div>
  )
}
