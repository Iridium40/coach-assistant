"use client"

import { useState, useEffect } from "react"

// ═══════════════════════════════════════════════════════════
// BUSINESS GETTING STARTED
// ═══════════════════════════════════════════════════════════
//
// TWO COMPONENTS:
//
// 1. <BusinessGettingStartedGuide />
//    Full modal walkthrough explaining the 100's List and Client Tracker.
//
// 2. <BusinessGettingStartedProgress />
//    Dashboard card showing prospect/client creation progress.
//    Auto-hides when user has at least 1 prospect AND 1 client.
//
// ═══════════════════════════════════════════════════════════

export interface BusinessGettingStartedGuideProps {
  onClose: () => void
  onNavigateProspects: () => void
  onNavigateClients: () => void
}

export interface BusinessGettingStartedProgressProps {
  prospectCount: number
  clientCount: number
  onOpenGuide: () => void
  onNavigateProspects: () => void
  onNavigateClients: () => void
}

interface Screenshot {
  img: string
  title: string
}

const SUPABASE_IMG = "https://rcucmbujkdwvrcjistub.supabase.co/storage/v1/object/public/user_training"

const SCREENSHOTS: Record<string, Screenshot> = {
  "prospects-list":  { img: `${SUPABASE_IMG}/prospects-list.png`,  title: "📋 100's List Tracker" },
  "add-prospect":    { img: `${SUPABASE_IMG}/add-prospect.png`,    title: "➕ Add Prospect" },
  "client-tracker":  { img: `${SUPABASE_IMG}/client-tracker.png`,  title: "👥 Client Tracker" },
  "add-client":      { img: `${SUPABASE_IMG}/add-client.png`,      title: "➕ Add Client" },
  "client-journey":  { img: `${SUPABASE_IMG}/client-journey.png`,  title: "📅 Client Journey — Day-by-Day Support" },
}

// ── Lightbox ──

function Lightbox({ screenshot, onClose }: { screenshot: Screenshot | null; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  if (!screenshot) return null

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 10001, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "900px", width: "100%", background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.35)", animation: "bgsSlideUp 0.3s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "#1a2744", color: "#fff" }}>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "14px" }}>{screenshot.title}</span>
          <button onClick={onClose} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.12)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <img src={screenshot.img} alt={screenshot.title} style={{ width: "100%", display: "block" }} />
      </div>
    </div>
  )
}

// ── Shared sub-components ──

function PipelineStage({ label, bg }: { label: string; bg: string }) {
  return <div style={{ padding: "5px 10px", borderRadius: "6px", fontSize: "10px", fontWeight: 700, fontFamily: "'Montserrat', sans-serif", whiteSpace: "nowrap", color: "#fff", background: bg }}>{label}</div>
}

function PipelineArrow() {
  return <span style={{ color: "#cbd5e1", fontSize: "13px", fontWeight: 700, flexShrink: 0 }}>→</span>
}

function Feature({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "10px 12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #f1f5f9" }}>
      <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "1px" }}>{icon}</span>
      <span style={{ fontSize: "12px", color: "#475569", fontWeight: 600, lineHeight: 1.4 }}>{text}</span>
    </div>
  )
}

function FeatureHighlight({ icon, title, text, color }: { icon: string; title: string; text: React.ReactNode; color: "orange" | "blue" }) {
  const styles = color === "orange"
    ? { bg: "#fffbeb", border: "#fde68a" }
    : { bg: "#eff6ff", border: "#bfdbfe" }
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", marginBottom: "16px", borderRadius: "10px", border: `1px solid ${styles.border}`, background: styles.bg }}>
      <span style={{ fontSize: "22px", flexShrink: 0 }}>{icon}</span>
      <div>
        <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "13px", color: "#1e293b", marginBottom: "3px" }}>{title}</h4>
        <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5, margin: 0 }}>{text}</p>
      </div>
    </div>
  )
}

function HowStep({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "10px", padding: "8px 0", alignItems: "flex-start" }}>
      <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#00A651", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", flexShrink: 0, boxShadow: "0 1px 4px rgba(0,166,81,0.2)" }}>{num}</div>
      <div style={{ fontSize: "13px", color: "#374151", lineHeight: 1.45 }}>{children}</div>
    </div>
  )
}

function ScreenshotButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "6px 14px", fontSize: "11px", fontWeight: 700, fontFamily: "'Montserrat', sans-serif", color: "#1a2744", background: "linear-gradient(135deg, #f1f5f9, #e8ecf1)", border: "1px solid #d1d5db", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      📸 {label}
    </button>
  )
}


// ═══════════════════════════════════════════════════════════
// COMPONENT 1: FULL GUIDE MODAL
// ═══════════════════════════════════════════════════════════

export function BusinessGettingStartedGuide({ onClose, onNavigateProspects, onNavigateClients }: BusinessGettingStartedGuideProps) {
  const [lightbox, setLightbox] = useState<Screenshot | null>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", overflowY: "auto" }}>
        <div style={{ maxWidth: "680px", width: "100%", background: "linear-gradient(170deg, #fff 0%, #f8fafb 100%)", borderRadius: "24px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.2)", animation: "bgsSlideUp 0.3s ease", margin: "auto" }}>

          {/* HEADER */}
          <div style={{ background: "linear-gradient(135deg, #003B2E 0%, #00A651 55%, #5cbdab 100%)", padding: "36px 36px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-80px", right: "-50px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: "-60px", left: "-30px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)" }} />
            <button onClick={onClose} style={{ position: "absolute", top: "14px", right: "14px", width: "32px", height: "32px", borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>✕</button>
            <span style={{ fontSize: "44px", display: "inline-block", marginBottom: "10px", position: "relative", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}>🚀</span>
            <h1 style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "24px", color: "#fff", letterSpacing: "-0.5px", position: "relative", textShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
              My Business — Getting Started
            </h1>
            <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "14px", marginTop: "8px", position: "relative", lineHeight: 1.5 }}>
              Your 100&apos;s List and Client Tracker are the two engines that drive your coaching business. Here&apos;s how to use them.
            </p>
          </div>

          {/* SCROLLABLE BODY */}
          <div style={{ maxHeight: "calc(80vh - 200px)", overflowY: "auto", padding: "28px 32px 14px" }}>

            {/* Intro */}
            <div style={{ padding: "16px 18px", marginBottom: "26px", background: "linear-gradient(135deg, #f0fdf4, #ecfdf5)", border: "1px solid #d1fae5", borderRadius: "12px", position: "relative", fontSize: "14px", color: "#475569", lineHeight: 1.65 }}>
              <span style={{ position: "absolute", top: "-10px", left: "14px", fontSize: "18px", background: "#fff", padding: "0 4px", borderRadius: "6px" }}>💡</span>
              Everything in <strong style={{ color: "#065f46" }}>My Business</strong> is privacy-first — you only store nicknames and labels here. All real contact information stays in OPTAVIA&apos;s official coach portal.
            </div>

            {/* ═══ 100'S LIST TRACKER ═══ */}
            <div style={{ marginBottom: "28px", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
              <div style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: "14px", background: "linear-gradient(135deg, #fef3c7, #fef9c3)", borderBottom: "1px solid #fde68a" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", background: "linear-gradient(135deg, #f59e0b, #f97316)" }}>📋</div>
                <div>
                  <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "18px", color: "#1e293b", margin: 0 }}>100&apos;s List Tracker</h2>
                  <p style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>Your prospect pipeline — track everyone who could benefit from OPTAVIA.</p>
                </div>
              </div>

              <div style={{ padding: "20px 22px", background: "#fff" }}>
                {/* Pipeline */}
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "18px", padding: "12px 14px", background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", borderRadius: "10px", border: "1px solid #e2e8f0", overflowX: "auto" }}>
                  <PipelineStage label="🆕 New" bg="#3b82f6" />
                  <PipelineArrow />
                  <PipelineStage label="🔥 Interested" bg="#f59e0b" />
                  <PipelineArrow />
                  <PipelineStage label="📅 HA Scheduled" bg="#8b5cf6" />
                  <PipelineArrow />
                  <PipelineStage label="🎉 Client Won" bg="#00A651" />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                  <Feature icon="🏷️" text="Privacy-first labels — nicknames only, no real contact info stored" />
                  <Feature icon="📊" text="Visual pipeline counts showing prospects at each stage" />
                  <Feature icon="📅" text="Schedule Health Assessments with date/time and reminders" />
                  <Feature icon="📤" text="Share HA — send a Health Assessment link to your prospect" />
                  <Feature icon="✅" text="Check In to log each conversation and stay consistent" />
                  <Feature icon="🔍" text="Filter by stage — All, New, Interested, Client!, Not Interested" />
                  <Feature icon="📅" text="List or Week view — see your pipeline your way" />
                  <Feature icon="📝" text="Notes on each card — add context for follow-ups" />
                </div>

                <FeatureHighlight color="orange" icon="💡" title="Coaching Guide & Resources" text="Every prospect card has an expandable guide built right in. It shows coaching actions for their current stage — like initial outreach tips, how to share your story, and conversation starters — so you always know the right next step." />

                <div style={{ padding: "16px 18px", background: "linear-gradient(135deg, #f0fdf4, #ecfdf5)", border: "1px solid #d1fae5", borderRadius: "10px", marginBottom: "12px" }}>
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "12px", color: "#065f46", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>🎯 Add Your First Prospect</h4>
                  <HowStep num={1}>Go to <strong style={{ color: "#065f46" }}>My Business → 100&apos;s List Tracker</strong></HowStep>
                  <HowStep num={2}>Click <strong style={{ color: "#065f46" }}>+ Add Prospect</strong> in the top-right corner</HowStep>
                  <HowStep num={3}>Enter a <strong style={{ color: "#065f46" }}>Label / Nickname</strong> you&apos;ll recognize (e.g., &quot;Gym Sarah&quot;)</HowStep>
                  <HowStep num={4}>Select <strong style={{ color: "#065f46" }}>How did you meet?</strong> — Family, Work, Social Media, etc.</HowStep>
                  <HowStep num={5}>Add any helpful <strong style={{ color: "#065f46" }}>Notes</strong> for context (optional)</HowStep>
                  <HowStep num={6}>Click <strong style={{ color: "#065f46" }}>Add to List</strong> — they appear as &quot;New&quot; in your pipeline!</HowStep>
                </div>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <ScreenshotButton label="See the Tracker" onClick={() => setLightbox(SCREENSHOTS["prospects-list"])} />
                  <ScreenshotButton label="See the Add Form" onClick={() => setLightbox(SCREENSHOTS["add-prospect"])} />
                </div>

                <div style={{ margin: "14px 0 2px", padding: "14px 16px", borderRadius: "10px", display: "flex", alignItems: "flex-start", gap: "10px", background: "#fffbeb", border: "1px solid #fde68a" }}>
                  <span style={{ fontSize: "18px", flexShrink: 0, marginTop: "1px" }}>🎯</span>
                  <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                    <strong style={{ color: "#1e293b" }}>Why it matters:</strong> Most coaches lose track of conversations and forget to follow up. Your 100&apos;s List keeps every prospect visible with their stage, meeting source, and notes — so no one falls through the cracks. When they schedule a Health Assessment, use <strong>Share HA</strong> to send them the assessment — they complete and submit it, and you receive the results via email.
                  </p>
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "6px 0 24px", padding: "0 4px" }}>
              <span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #e2e8f0, transparent)" }} />
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "10px", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "2px", whiteSpace: "nowrap" }}>Prospect becomes a client</span>
              <span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #e2e8f0, transparent)" }} />
            </div>

            {/* ═══ CLIENT TRACKER ═══ */}
            <div style={{ marginBottom: "28px", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
              <div style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: "14px", background: "linear-gradient(135deg, #dbeafe, #ede9fe)", borderBottom: "1px solid #bfdbfe" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}>👥</div>
                <div>
                  <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "18px", color: "#1e293b", margin: 0 }}>Client Tracker</h2>
                  <p style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>Daily touchpoints, milestones, and the full coaching journey for each client.</p>
                </div>
              </div>

              <div style={{ padding: "20px 22px", background: "#fff" }}>
                {/* Pipeline */}
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "18px", padding: "12px 14px", background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", borderRadius: "10px", border: "1px solid #e2e8f0", overflowX: "auto" }}>
                  <PipelineStage label="⭐ Client" bg="#f59e0b" />
                  <PipelineArrow />
                  <PipelineStage label="🏆 Goal Achieved" bg="#f97316" />
                  <PipelineArrow />
                  <PipelineStage label="💎 Future Coach" bg="#3b82f6" />
                  <PipelineArrow />
                  <PipelineStage label="🚀 Launched" bg="#8b5cf6" />
                  <PipelineArrow />
                  <PipelineStage label="✅ Completed" bg="#00A651" />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                  <Feature icon="📆" text="Auto-calculated program day and phase from their start date" />
                  <Feature icon="📊" text="Journey progress bar — see how far along they are at a glance" />
                  <Feature icon="💬" text="Text button — opens ready-to-copy scripts for their exact program day" />
                  <Feature icon="📞" text="Schedule check-ins, Zoom meetings, and phone calls" />
                  <Feature icon="✅" text="Check In to log contact and clear attention alerts" />
                  <Feature icon="⚠️" text="Needs Attention alerts when a client hasn't been contacted" />
                  <Feature icon="⭐" text="Coach button — flag clients who show potential as future coaches" />
                  <Feature icon="🎉" text="Milestone celebrations at Days 7, 14, 21, and 30" />
                </div>

                <FeatureHighlight color="blue" icon="💬" title="Text Templates & Resources" text={<>Tap <strong>Text</strong> on any client card and you&apos;ll see two tabs. <strong>Text Templates</strong> gives you the exact message to send for that program day — just copy, paste, and personalize. <strong>Resources</strong> shows coaching actions for the current phase, plus day-specific videos and links.</>} />

                <FeatureHighlight color="blue" icon="💡" title="Coaching Guide & Resources" text={<>Every client card has an expandable <strong>Coaching Guide &amp; Resources</strong> section. It shows coaching actions for their current stage — what to focus on, how to approach calls, and reminders like &quot;coach through discovery — do NOT provide answers.&quot;</>} />

                <div style={{ padding: "16px 18px", background: "linear-gradient(135deg, #f0fdf4, #ecfdf5)", border: "1px solid #d1fae5", borderRadius: "10px", marginBottom: "12px" }}>
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "12px", color: "#065f46", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>🎯 Add Your First Client</h4>
                  <HowStep num={1}>Go to <strong style={{ color: "#065f46" }}>My Business → Client Tracker</strong></HowStep>
                  <HowStep num={2}>Click <strong style={{ color: "#065f46" }}>+ Add Client</strong> in the top-right corner</HowStep>
                  <HowStep num={3}>Enter a <strong style={{ color: "#065f46" }}>Label / Nickname</strong> you&apos;ll recognize (e.g., Jennifer, Mike)</HowStep>
                  <HowStep num={4}>Set their <strong style={{ color: "#065f46" }}>Start Date</strong> — we&apos;ll calculate their program day and show milestones</HowStep>
                  <HowStep num={5}>Click <strong style={{ color: "#065f46" }}>Add Client</strong> — their card appears with program day, phase, daily actions, and the full Client Journey!</HowStep>
                </div>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <ScreenshotButton label="See the Tracker" onClick={() => setLightbox(SCREENSHOTS["client-tracker"])} />
                  <ScreenshotButton label="See the Add Form" onClick={() => setLightbox(SCREENSHOTS["add-client"])} />
                  <ScreenshotButton label="See Client Journey" onClick={() => setLightbox(SCREENSHOTS["client-journey"])} />
                </div>

                <div style={{ margin: "14px 0 2px", padding: "14px 16px", borderRadius: "10px", display: "flex", alignItems: "flex-start", gap: "10px", background: "#eff6ff", border: "1px solid #bfdbfe" }}>
                  <span style={{ fontSize: "18px", flexShrink: 0, marginTop: "1px" }}>🎯</span>
                  <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                    <strong style={{ color: "#1e293b" }}>Why it matters:</strong> The first 30 days are make-or-break for client success. The Client Tracker gives you the exact script, video, or call to make on every single day — so you never wonder &quot;what should I send today?&quot; Your clients get consistent, professional support and you can manage multiple clients without anything slipping.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ padding: "20px 32px 28px", borderTop: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={onNavigateProspects} style={{ flex: 1, padding: "14px", border: "none", borderRadius: "12px", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "14px", cursor: "pointer", textAlign: "center", color: "#fff", background: "linear-gradient(135deg, #f59e0b, #f97316)", boxShadow: "0 3px 12px rgba(249,115,22,0.25)", transition: "all 0.25s" }}>
                📋 Go to 100&apos;s List
              </button>
              <button onClick={onNavigateClients} style={{ flex: 1, padding: "14px", border: "none", borderRadius: "12px", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "14px", cursor: "pointer", textAlign: "center", color: "#fff", background: "linear-gradient(135deg, #3b82f6, #6366f1)", boxShadow: "0 3px 12px rgba(99,102,241,0.25)", transition: "all 0.25s" }}>
                👥 Go to Client Tracker
              </button>
            </div>
            <p style={{ textAlign: "center", marginTop: "12px", fontSize: "12px", color: "#94a3b8" }}>
              Access both trackers anytime from the My Business menu
            </p>
          </div>
        </div>
      </div>

      <Lightbox screenshot={lightbox} onClose={() => setLightbox(null)} />

      <style>{`
        @keyframes bgsSlideUp {
          from { transform: translateY(20px) scale(0.97); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </>
  )
}


// ═══════════════════════════════════════════════════════════
// COMPONENT 2: DASHBOARD PROGRESS CARD
// Shows until user has at least 1 prospect AND 1 client.
// ═══════════════════════════════════════════════════════════

export function BusinessGettingStartedProgress({ prospectCount, clientCount, onOpenGuide, onNavigateProspects, onNavigateClients }: BusinessGettingStartedProgressProps) {
  const hasProspect = prospectCount > 0
  const hasClient = clientCount > 0
  const doneCount = (hasProspect ? 1 : 0) + (hasClient ? 1 : 0)
  const pct = Math.round((doneCount / 2) * 100)

  if (hasProspect && hasClient) return null

  return (
    <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", fontFamily: "'Open Sans', -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", background: "linear-gradient(135deg, #003B2E, #00A651)", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: "22px" }}>🚀</span>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "15px", color: "#fff" }}>
            Build Your Business
          </h3>
          <p style={{ margin: "2px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>
            {doneCount} of 2 steps complete
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
        {/* Prospect step */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderBottom: "1px solid #f8fafc" }}>
          <div style={{
            width: "22px", height: "22px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center",
            background: hasProspect ? "#00A651" : "#f1f5f9", color: hasProspect ? "#fff" : "#94a3b8", fontSize: "11px", fontWeight: 800,
            fontFamily: "'Montserrat', sans-serif", flexShrink: 0, transition: "all 0.3s",
          }}>
            {hasProspect ? "✓" : "1"}
          </div>
          <span style={{ fontSize: "13px", fontWeight: hasProspect ? 500 : 600, color: hasProspect ? "#9ca3af" : "#374151", textDecoration: hasProspect ? "line-through" : "none", flex: 1 }}>
            📋 Add your first prospect to the 100&apos;s List
          </span>
          {hasProspect && <span style={{ fontSize: "9px", fontWeight: 700, color: "#065f46", background: "#d1fae5", padding: "1px 6px", borderRadius: "3px" }}>{prospectCount} added</span>}
        </div>

        {/* Client step */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0" }}>
          <div style={{
            width: "22px", height: "22px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center",
            background: hasClient ? "#00A651" : "#f1f5f9", color: hasClient ? "#fff" : "#94a3b8", fontSize: "11px", fontWeight: 800,
            fontFamily: "'Montserrat', sans-serif", flexShrink: 0, transition: "all 0.3s",
          }}>
            {hasClient ? "✓" : "2"}
          </div>
          <span style={{ fontSize: "13px", fontWeight: hasClient ? 500 : 600, color: hasClient ? "#9ca3af" : "#374151", textDecoration: hasClient ? "line-through" : "none", flex: 1 }}>
            👥 Add your first client to the Client Tracker
          </span>
          {hasClient && <span style={{ fontSize: "9px", fontWeight: 700, color: "#065f46", background: "#d1fae5", padding: "1px 6px", borderRadius: "3px" }}>{clientCount} added</span>}
        </div>
      </div>

      {/* Next Step Nudge */}
      {!hasProspect && (
        <div style={{ margin: "4px 20px 0", padding: "10px 14px", background: "#fffbeb", borderRadius: "8px", border: "1px solid #fde68a", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>👉</span>
          <p style={{ margin: 0, fontSize: "12px", color: "#92400e", fontWeight: 600 }}>
            Next: <strong>Add your first prospect</strong> — start building your 100&apos;s List!
          </p>
        </div>
      )}
      {hasProspect && !hasClient && (
        <div style={{ margin: "4px 20px 0", padding: "10px 14px", background: "#eff6ff", borderRadius: "8px", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>👉</span>
          <p style={{ margin: 0, fontSize: "12px", color: "#1e40af", fontWeight: 600 }}>
            Next: <strong>Add your first client</strong> — start tracking their journey!
          </p>
        </div>
      )}

      {/* Actions */}
      <div style={{ padding: "14px 20px 16px", display: "flex", gap: "8px" }}>
        {!hasProspect ? (
          <button onClick={onNavigateProspects} style={{ flex: 1, padding: "11px", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#fff", border: "none", borderRadius: "10px", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "13px", cursor: "pointer", boxShadow: "0 2px 8px rgba(249,115,22,0.2)", transition: "all 0.2s" }}>
            📋 Go to 100&apos;s List →
          </button>
        ) : (
          <button onClick={onNavigateClients} style={{ flex: 1, padding: "11px", background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "#fff", border: "none", borderRadius: "10px", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "13px", cursor: "pointer", boxShadow: "0 2px 8px rgba(99,102,241,0.2)", transition: "all 0.2s" }}>
            👥 Go to Client Tracker →
          </button>
        )}
        <button onClick={onOpenGuide} style={{ padding: "11px 16px", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: "10px", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "13px", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
          🚀 Guide
        </button>
      </div>
    </div>
  )
}
