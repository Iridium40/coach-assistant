"use client"

import { useState, useEffect, useCallback } from "react"

interface Screenshot {
  img: string
  title: string
}

interface JourneyStage {
  id: string
  days: string
  label: string
  emoji: string
  color: string
  action: string
  actionType: "text" | "call"
  description: string
  tips: string[]
  isMilestone?: boolean
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "critical", days: "1-3", label: "Critical Phase", emoji: "🔴", color: "#ef4444",
    actionType: "text", action: "Daily encouragement texts",
    description: "The hardest days! Your client needs extra support as their body adjusts. Check in daily.",
    tips: ["Text every single day during this phase", "Remind them this is temporary — it gets easier", "Ask about energy, hunger, and how they're feeling", "Celebrate every small win"],
  },
  {
    id: "week1", days: "4-6", label: "Week 1", emoji: "🟠", color: "#f97316",
    actionType: "text", action: "Check-in texts",
    description: "They're building momentum! Keep the encouragement going as they establish their routine.",
    tips: ["Ask about their favorite Fuelings", "Check if they have Lean & Green questions", "Remind them Day 7 milestone is coming!"],
  },
  {
    id: "week1_complete", days: "7", label: "Week 1 Complete!", emoji: "🎉", color: "#22c55e",
    actionType: "call", action: "Schedule celebration call", isMilestone: true,
    description: "FIRST MILESTONE! They made it through the hardest week. This deserves recognition!",
    tips: ["Schedule a call to celebrate this win", "Ask what was harder/easier than expected", "Discuss any NSVs (non-scale victories)", "Set them up for a strong Week 2"],
  },
  {
    id: "week2", days: "8-13", label: "Week 2", emoji: "🔵", color: "#3b82f6",
    actionType: "text", action: "Routine-building texts",
    description: "They're in a groove now. Focus on reinforcing their new habits and routines.",
    tips: ["Ask about changes they're noticing", "Encourage them to try new recipes", "Build excitement for the 2-week mark"],
  },
  {
    id: "two_weeks", days: "14", label: "2 Weeks!", emoji: "⭐", color: "#22c55e",
    actionType: "call", action: "Schedule celebration call", isMilestone: true,
    description: "TWO WEEKS of consistency! They're proving to themselves they can do this.",
    tips: ["Celebrate their commitment", "Review their progress and wins", "Discuss any adjustments needed", "Preview the big Day 21 milestone!"],
  },
  {
    id: "week3", days: "15-20", label: "Week 3", emoji: "🟣", color: "#8b5cf6",
    actionType: "text", action: '"Almost there" texts',
    description: "The home stretch to habit formation! Build anticipation for the 21-day milestone.",
    tips: ['Remind them: "21 days = habit formed!"', "Ask about NSVs and mindset shifts", "Get them excited for Day 21"],
  },
  {
    id: "twenty_one", days: "21", label: "21 Days — Habit Formed!", emoji: "💎", color: "#10b981",
    actionType: "call", action: "Schedule celebration call", isMilestone: true,
    description: "MAJOR MILESTONE! Science says 21 days forms a habit. Their brain is literally rewired!",
    tips: ["BIG celebration energy for this call!", "Explain the science of habit formation", "Compare how they feel now vs Day 1", "Document all their wins and NSVs", "Consider a 3-way call with your upline"],
  },
  {
    id: "week4", days: "22-29", label: "Week 4", emoji: "🩵", color: "#06b6d4",
    actionType: "text", action: "Momentum texts",
    description: "The habit is formed — now they're strengthening it. One month is right around the corner!",
    tips: ["Build excitement for ONE MONTH", "Ask them to reflect on their journey", '"What would Day 1 you think about this?"'],
  },
  {
    id: "one_month", days: "30", label: "ONE MONTH!", emoji: "👑", color: "#f59e0b",
    actionType: "call", action: "Schedule celebration call", isMilestone: true,
    description: "THE BIG ONE! 30 days of commitment. This is a lifestyle now, not a diet.",
    tips: ["Make this celebration SPECIAL", "Full transformation review", "Compare Day 1 to Day 30 in every way", "Discuss their \"why\" and future goals", "Consider: Are they interested in coaching?", "3-way call with upline for recognition"],
  },
  {
    id: "ongoing", days: "31+", label: "Ongoing Journey", emoji: "🟢", color: "#22c55e",
    actionType: "text", action: "Regular check-ins",
    description: "They've built the foundation. Continue supporting their journey with consistent touchpoints.",
    tips: ["Check in at least every 10 days", "Celebrate 60, 90, 120 day milestones", "Watch for coaching interest", "Support their transition phases"],
  },
]

const SPECIAL_STATUSES = {
  coachProspect: {
    label: "Coach Prospect", emoji: "⭐",
    description: "This client shows interest in becoming a coach! Nurture their curiosity about the business opportunity.",
    tips: ["Share your coaching journey", "Invite them to team calls", "Connect them with your upline", "Help them see the possibilities"],
  },
  paused: {
    label: "Paused", emoji: "⏸️",
    description: "Life happens. When a client needs to pause, keep the relationship warm for when they're ready to return.",
    tips: ["No judgment — circumstances change", "Check in occasionally to show you care", "Leave the door open for their return", "They may come back stronger than ever"],
  },
}

const SUPABASE_IMG = "https://rcucmbujkdwvrcjistub.supabase.co/storage/v1/object/public/user_training"

const SCREENSHOTS: Record<string, Screenshot> = {
  "client-tracker":  { img: `${SUPABASE_IMG}/client-tracker.png`,  title: "👥 Client Tracker" },
  "add-client":      { img: `${SUPABASE_IMG}/add-client.png`,      title: "➕ Add Client" },
  "client-journey":  { img: `${SUPABASE_IMG}/client-journey.png`,  title: "📅 Client Journey — Day-by-Day Support" },
}

function Lightbox({ screenshot, onClose }: { screenshot: Screenshot | null; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  if (!screenshot) return null
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 10001, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "900px", width: "100%", background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.35)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "#1a2744", color: "#fff" }}>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "14px" }}>{screenshot.title}</span>
          <button onClick={onClose} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.12)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <img src={screenshot.img} alt={screenshot.title} style={{ width: "100%", display: "block" }} />
      </div>
    </div>
  )
}

function SsBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "6px 14px", fontSize: "11px", fontWeight: 700, fontFamily: "'Montserrat', sans-serif", color: "#1a2744", background: "linear-gradient(135deg, #f1f5f9, #e8ecf1)", border: "1px solid #d1d5db", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      📸 {label}
    </button>
  )
}

function ClientJourneyTimeline() {
  const [activeStage, setActiveStage] = useState<string | null>(null)
  const toggle = useCallback((id: string) => setActiveStage((prev) => (prev === id ? null : id)), [])

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "14px", padding: "10px 14px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "12px", fontSize: "12px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#64748b" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} /> 📱 Text Check-in</span>
        <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#64748b" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} /> 📅 Celebration Call</span>
        <span style={{ fontSize: "10px", fontWeight: 700, color: "#92400e", background: "#fef3c7", padding: "2px 8px", borderRadius: "4px" }}>MILESTONE</span>
      </div>

      {JOURNEY_STAGES.map((stage, i) => (
        <div key={stage.id}>
          <button
            onClick={() => toggle(stage.id)}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: activeStage === stage.id ? "#f8fafc" : "transparent", border: "none", borderBottom: "1px solid #f1f5f9", cursor: "pointer", textAlign: "left", borderRadius: activeStage === stage.id ? "10px" : 0, transition: "background 0.15s" }}
          >
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: stage.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0, boxShadow: stage.isMilestone ? "0 0 0 2px #fff, 0 0 0 4px #86efac" : "0 1px 3px rgba(0,0,0,0.12)" }}>
              {stage.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "10px", fontFamily: "monospace", background: "#f1f5f9", color: "#64748b", padding: "1px 6px", borderRadius: "4px" }}>Day {stage.days}</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "13px", color: "#1e293b" }}>{stage.label}</span>
                {stage.isMilestone && <span style={{ fontSize: "9px", fontWeight: 700, color: "#92400e", background: "#fef3c7", padding: "1px 6px", borderRadius: "3px" }}>MILESTONE</span>}
              </div>
              <div style={{ fontSize: "11px", color: stage.actionType === "call" ? "#7c3aed" : "#3b82f6", fontWeight: 600 }}>
                {stage.actionType === "call" ? "📅" : "📱"} {stage.action}
              </div>
            </div>
            <span style={{ color: "#94a3b8", fontSize: "14px", transition: "transform 0.2s", transform: activeStage === stage.id ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
          </button>

          {activeStage === stage.id && (
            <div style={{ padding: "8px 12px 14px 54px", fontSize: "13px", color: "#475569", lineHeight: 1.5 }}>
              <p style={{ margin: "0 0 8px" }}>{stage.description}</p>
              {stage.tips.map((tip, ti) => (
                <div key={ti} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "3px" }}>
                  <span style={{ color: "#22c55e", marginTop: "2px", fontSize: "12px" }}>✓</span>
                  <span style={{ fontSize: "12px", color: "#374151" }}>{tip}</span>
                </div>
              ))}
            </div>
          )}

          {/* Special statuses after One Month */}
          {stage.id === "one_month" && (
            <div style={{ marginLeft: "42px", marginBottom: "4px", marginTop: "4px" }}>
              <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px", paddingLeft: "4px" }}>Special Statuses</div>

              {/* Coach Prospect */}
              <button
                onClick={() => toggle("coach_prospect")}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", background: activeStage === "coach_prospect" ? "#fffbeb" : "transparent", border: "1px solid #fde68a", borderRadius: "8px", cursor: "pointer", textAlign: "left", marginBottom: "6px" }}
              >
                <span style={{ fontSize: "14px" }}>{SPECIAL_STATUSES.coachProspect.emoji}</span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#92400e", flex: 1 }}>{SPECIAL_STATUSES.coachProspect.label}</span>
              </button>
              {activeStage === "coach_prospect" && (
                <div style={{ padding: "6px 10px 12px 32px", fontSize: "12px", color: "#475569", lineHeight: 1.5, marginBottom: "6px" }}>
                  <p style={{ margin: "0 0 6px" }}>{SPECIAL_STATUSES.coachProspect.description}</p>
                  {SPECIAL_STATUSES.coachProspect.tips.map((tip, ti) => (
                    <div key={ti} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "2px" }}>
                      <span style={{ color: "#f59e0b", marginTop: "2px" }}>★</span>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>{tip}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Paused */}
              <button
                onClick={() => toggle("paused")}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", background: activeStage === "paused" ? "#f8fafc" : "transparent", border: "1px dashed #d1d5db", borderRadius: "8px", cursor: "pointer", textAlign: "left" }}
              >
                <span style={{ fontSize: "14px" }}>{SPECIAL_STATUSES.paused.emoji}</span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", flex: 1 }}>{SPECIAL_STATUSES.paused.label}</span>
                <span style={{ fontSize: "10px", color: "#94a3b8" }}>(can return anytime)</span>
              </button>
              {activeStage === "paused" && (
                <div style={{ padding: "6px 10px 12px 32px", fontSize: "12px", color: "#475569", lineHeight: 1.5 }}>
                  <p style={{ margin: "0 0 6px" }}>{SPECIAL_STATUSES.paused.description}</p>
                  {SPECIAL_STATUSES.paused.tips.map((tip, ti) => (
                    <div key={ti} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "2px" }}>
                      <span style={{ color: "#94a3b8", marginTop: "2px" }}>•</span>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Connector dot */}
          {i < JOURNEY_STAGES.length - 1 && stage.id !== "one_month" && (
            <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: "26px" }}>
              <div style={{ width: "2px", height: "8px", background: stage.isMilestone ? "linear-gradient(#86efac, #e2e8f0)" : "#e2e8f0" }} />
            </div>
          )}
        </div>
      ))}

      {/* Needs Attention Triggers */}
      <div style={{ padding: "14px 16px", marginTop: "14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px" }}>
        <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "12px", color: "#b91c1c", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>🚨 &quot;Needs Attention&quot; Triggers</h4>
        {[
          { num: "1", text: "Scheduled check-in is due — Meeting date is today or past" },
          { num: "2", text: "10+ days since last check-in — Time to reach out!" },
          { num: "3", text: "Never checked in — New client needs first touchpoint" },
        ].map((t) => (
          <div key={t.num} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "4px" }}>
            <span style={{ color: "#ef4444", fontSize: "12px", fontWeight: 700 }}>{t.num}.</span>
            <span style={{ fontSize: "12px", color: "#374151" }}>{t.text}</span>
          </div>
        ))}
      </div>

      {/* Milestone Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px", marginTop: "14px" }}>
        {[
          { emoji: "🎉", day: "Day 7", sub: "Week 1" },
          { emoji: "⭐", day: "Day 14", sub: "2 Weeks" },
          { emoji: "💎", day: "Day 21", sub: "Habit!" },
          { emoji: "👑", day: "Day 30", sub: "1 Month" },
        ].map((m) => (
          <div key={m.day} style={{ textAlign: "center", padding: "10px 6px", background: "#f0fdf4", borderRadius: "10px", border: "1px solid #d1fae5" }}>
            <div style={{ fontSize: "20px", marginBottom: "2px" }}>{m.emoji}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "13px", color: "#065f46" }}>{m.day}</div>
            <div style={{ fontSize: "10px", color: "#94a3b8" }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: "11px", color: "#94a3b8", marginTop: "8px" }}>
        👆 Tap any stage to see coaching tips
      </p>
    </div>
  )
}

function CollapsibleSection({ title, emoji, defaultOpen = false, children }: { title: string; emoji?: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div style={{ marginBottom: "16px", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", background: isOpen ? "#f8fafc" : "#fff", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
      >
        {emoji && <span style={{ fontSize: "18px", flexShrink: 0 }}>{emoji}</span>}
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "12px", color: "#374151", textTransform: "uppercase", letterSpacing: "1.5px", flex: 1 }}>{title}</span>
        <span style={{ color: "#94a3b8", fontSize: "14px", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </button>
      {isOpen && (
        <div style={{ padding: "4px 16px 16px" }}>
          {children}
        </div>
      )}
    </div>
  )
}

export function ClientLearningGuide({ onClose }: { onClose: () => void }) {
  const [lightbox, setLightbox] = useState<Screenshot | null>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", overflowY: "auto" }}>
        <div style={{ maxWidth: "660px", width: "100%", background: "linear-gradient(170deg, #fff 0%, #f8fafb 100%)", borderRadius: "24px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.2)", animation: "clgSlideUp 0.3s ease", margin: "auto" }}>

          {/* HEADER */}
          <div style={{ background: "linear-gradient(135deg, #2A9C95 0%, #37B6AE 50%, #5cbdab 100%)", padding: "36px 36px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-80px", right: "-50px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: "-60px", left: "-30px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }} />
            <button onClick={onClose} style={{ position: "absolute", top: "14px", right: "14px", width: "32px", height: "32px", borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>✕</button>
            <span style={{ fontSize: "44px", display: "inline-block", marginBottom: "10px", position: "relative", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}>👥</span>
            <h1 style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "24px", color: "#fff", letterSpacing: "-0.5px", position: "relative", textShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
              Client Tracker
            </h1>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px", marginTop: "8px", position: "relative", lineHeight: 1.5 }}>
              Daily touchpoints, milestones, and the full coaching journey — everything you need to support your clients through their first 30 days and beyond.
            </p>
          </div>

          {/* SCROLLABLE BODY */}
          <div style={{ maxHeight: "calc(80vh - 200px)", overflowY: "auto", padding: "28px 32px 14px" }}>

            <CollapsibleSection title="Privacy & Labels" emoji="🔒">
              <div style={{ padding: "16px 18px", background: "linear-gradient(135deg, #eaf7f6, #d5f0ee)", border: "1px solid #a7ddd9", borderRadius: "12px", position: "relative", fontSize: "14px", color: "#475569", lineHeight: 1.65 }}>
                <span style={{ position: "absolute", top: "-10px", left: "14px", fontSize: "16px", background: "#fff", padding: "0 4px", borderRadius: "6px" }}>🔒</span>
                Like the 100&apos;s List, your Client Tracker is <strong style={{ color: "#2A9C95" }}>privacy-first</strong> — only nicknames and labels, no real contact info. All client data stays in OPTAVIA&apos;s official coach portal.
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Client Journey Stages" emoji="📊">
              <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "14px 16px", background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", borderRadius: "12px", border: "1px solid #e2e8f0", overflowX: "auto" }}>
                {[
                  { label: "⭐ Client", bg: "#f59e0b" },
                  { label: "🏆 Goal Achieved", bg: "#f97316" },
                  { label: "💎 Future Coach", bg: "#3b82f6" },
                  { label: "🚀 Launched", bg: "#8b5cf6" },
                  { label: "✅ Completed", bg: "#00A651" },
                ].map((s, i, arr) => (
                  <span key={s.label} style={{ display: "contents" }}>
                    <div style={{ padding: "6px 10px", borderRadius: "7px", fontSize: "10px", fontWeight: 700, fontFamily: "'Montserrat', sans-serif", whiteSpace: "nowrap", color: "#fff", background: s.bg, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>{s.label}</div>
                    {i < arr.length - 1 && <span style={{ color: "#cbd5e1", fontSize: "13px", fontWeight: 700, flexShrink: 0 }}>→</span>}
                  </span>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="The First 30 Days — Day by Day" emoji="📅">
              <ClientJourneyTimeline />
            </CollapsibleSection>

            <CollapsibleSection title="Features" emoji="⚡">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {[
                  { icon: "📆", text: "Auto-calculated program day and phase from their start date" },
                  { icon: "📊", text: "Journey progress bar — see how far along each client is at a glance" },
                  { icon: "💬", text: "Text button — opens ready-to-copy scripts for their exact program day" },
                  { icon: "📞", text: "Schedule check-ins, Zoom meetings, and phone calls" },
                  { icon: "✅", text: "Check In to log contact and clear attention alerts" },
                  { icon: "⚠️", text: "Needs Attention alerts when a client hasn't been contacted" },
                  { icon: "⭐", text: "Coach button — flag clients who show potential as future coaches" },
                  { icon: "🎉", text: "Milestone celebrations at Days 7, 14, 21, and 30" },
                ].map((f) => (
                  <div key={f.text} style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "10px 12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #f1f5f9" }}>
                    <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "1px" }}>{f.icon}</span>
                    <span style={{ fontSize: "12px", color: "#475569", fontWeight: 600, lineHeight: 1.4 }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Key Tools" emoji="🔧">
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", marginBottom: "14px", background: "#eaf7f6", border: "1px solid #a7ddd9", borderRadius: "10px" }}>
                <span style={{ fontSize: "22px", flexShrink: 0 }}>💬</span>
                <div>
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "13px", color: "#1e293b", marginBottom: "3px" }}>Text Templates & Resources</h4>
                  <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5, margin: 0 }}>Tap <strong style={{ color: "#2A9C95" }}>Text</strong> on any client card and you&apos;ll see two tabs. <strong style={{ color: "#2A9C95" }}>Text Templates</strong> gives you the exact message to send for that program day — just copy, paste into your messaging app, and personalize before sending. <strong style={{ color: "#2A9C95" }}>Resources</strong> shows coaching actions for the current phase, plus day-specific videos and links you can watch or share with your client.</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", marginBottom: "14px", background: "#eaf7f6", border: "1px solid #a7ddd9", borderRadius: "10px" }}>
                <span style={{ fontSize: "22px", flexShrink: 0 }}>📅</span>
                <div>
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "13px", color: "#1e293b", marginBottom: "3px" }}>Client Journey</h4>
                  <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5, margin: 0 }}>Tap the <strong style={{ color: "#2A9C95" }}>progress bar</strong> on any client card to open their full Client Journey. It shows every task for the current week — text scripts, videos, graphics, and links — with checkboxes to track completion and a <strong style={{ color: "#2A9C95" }}>Copy All</strong> button to grab everything at once. Navigate between weeks and see your overall progress across all 41 tasks.</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", background: "#eaf7f6", border: "1px solid #a7ddd9", borderRadius: "10px" }}>
                <span style={{ fontSize: "22px", flexShrink: 0 }}>💡</span>
                <div>
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "13px", color: "#1e293b", marginBottom: "3px" }}>Coaching Guide & Resources</h4>
                  <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5, margin: 0 }}>Every client card has an expandable <strong style={{ color: "#2A9C95" }}>Coaching Guide & Resources</strong> section. It shows coaching actions for their current stage — what to focus on, how to approach calls, and reminders like &quot;coach through discovery — do NOT provide answers.&quot; Your built-in playbook for every client interaction.</p>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Add Your First Client" emoji="🎯">
              <div style={{ padding: "16px 18px", background: "linear-gradient(135deg, #f0fdf4, #ecfdf5)", border: "1px solid #d1fae5", borderRadius: "10px", marginBottom: "14px" }}>
                <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "12px", color: "#065f46", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>🎯 Step by Step</h4>
                {[
                  <>Go to <strong style={{ color: "#065f46" }}>My Business → Client Tracker</strong></>,
                  <>Click <strong style={{ color: "#065f46" }}>+ Add Client</strong> in the top-right corner</>,
                  <>Enter a <strong style={{ color: "#065f46" }}>Label / Nickname</strong> you&apos;ll recognize (e.g., Jennifer, Mike)</>,
                  <>Set their <strong style={{ color: "#065f46" }}>Start Date</strong> — we&apos;ll automatically calculate their program day and show milestone reminders</>,
                  <>Click <strong style={{ color: "#065f46" }}>Add Client</strong> — their card appears with program day, phase, daily actions, and the full Client Journey!</>,
                ].map((text, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", padding: "8px 0", alignItems: "flex-start", borderBottom: i < 4 ? "1px solid rgba(0,166,81,0.1)" : "none" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#00A651", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", flexShrink: 0, boxShadow: "0 1px 4px rgba(0,166,81,0.2)" }}>{i + 1}</div>
                    <div style={{ fontSize: "13px", color: "#374151", lineHeight: 1.45 }}>{text}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                <SsBtn label="See the Tracker" onClick={() => setLightbox(SCREENSHOTS["client-tracker"])} />
                <SsBtn label="See the Add Form" onClick={() => setLightbox(SCREENSHOTS["add-client"])} />
                <SsBtn label="See the Client Journey" onClick={() => setLightbox(SCREENSHOTS["client-journey"])} />
              </div>

              <div style={{ padding: "14px 16px", borderRadius: "10px", display: "flex", alignItems: "flex-start", gap: "10px", background: "#eaf7f6", border: "1px solid #a7ddd9" }}>
                <span style={{ fontSize: "18px", flexShrink: 0, marginTop: "1px" }}>🎯</span>
                <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                  <strong style={{ color: "#1e293b" }}>Why it matters:</strong> The first 30 days are make-or-break for client success. The Client Tracker gives you the exact script, video, or call to make on every single day — so you never wonder &quot;what should I send today?&quot; Your clients get consistent, professional support and you can manage multiple clients without anything slipping.
                </p>
              </div>
            </CollapsibleSection>
          </div>

          {/* FOOTER */}
          <div style={{ padding: "20px 32px 28px", borderTop: "1px solid #f1f5f9" }}>
            <button onClick={onClose} style={{ width: "100%", padding: "15px", border: "none", borderRadius: "14px", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "15px", cursor: "pointer", textAlign: "center", color: "#fff", background: "linear-gradient(135deg, #2A9C95, #37B6AE)", boxShadow: "0 4px 16px rgba(55,182,174,0.3)", transition: "all 0.25s" }}>
              Got It! →
            </button>
            <p style={{ textAlign: "center", marginTop: "12px", fontSize: "12px", color: "#94a3b8" }}>
              Access your clients anytime from the My Business menu
            </p>
          </div>
        </div>
      </div>

      <Lightbox screenshot={lightbox} onClose={() => setLightbox(null)} />

      <style>{`
        @keyframes clgSlideUp {
          from { transform: translateY(20px) scale(0.97); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </>
  )
}
