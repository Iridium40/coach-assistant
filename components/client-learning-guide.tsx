"use client"

import { useState, useEffect } from "react"

interface Screenshot {
  img: string
  title: string
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
          <div style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 50%, #6366f1 100%)", padding: "36px 36px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
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

            {/* Intro */}
            <div style={{ padding: "16px 18px", marginBottom: "24px", background: "linear-gradient(135deg, #eff6ff, #e0e7ff)", border: "1px solid #bfdbfe", borderRadius: "12px", position: "relative", fontSize: "14px", color: "#475569", lineHeight: 1.65 }}>
              <span style={{ position: "absolute", top: "-10px", left: "14px", fontSize: "16px", background: "#fff", padding: "0 4px", borderRadius: "6px" }}>🔒</span>
              Like the 100&apos;s List, your Client Tracker is <strong style={{ color: "#1e40af" }}>privacy-first</strong> — only nicknames and labels, no real contact info. All client data stays in OPTAVIA&apos;s official coach portal.
            </div>

            {/* Pipeline */}
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
              Client Journey Stages<span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #e2e8f0, transparent)" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "20px", padding: "14px 16px", background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", borderRadius: "12px", border: "1px solid #e2e8f0", overflowX: "auto" }}>
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

            {/* Features */}
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
              Features<span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #e2e8f0, transparent)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "18px" }}>
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

            {/* Key Tools */}
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
              Key Tools<span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #e2e8f0, transparent)" }} />
            </div>

            {/* Text Templates */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", marginBottom: "14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px" }}>
              <span style={{ fontSize: "22px", flexShrink: 0 }}>💬</span>
              <div>
                <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "13px", color: "#1e293b", marginBottom: "3px" }}>Text Templates & Resources</h4>
                <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5, margin: 0 }}>Tap <strong style={{ color: "#1e40af" }}>Text</strong> on any client card and you&apos;ll see two tabs. <strong style={{ color: "#1e40af" }}>Text Templates</strong> gives you the exact message to send for that program day — just copy, paste into your messaging app, and personalize before sending. <strong style={{ color: "#1e40af" }}>Resources</strong> shows coaching actions for the current phase, plus day-specific videos and links you can watch or share with your client.</p>
              </div>
            </div>

            {/* Client Journey */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", marginBottom: "14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px" }}>
              <span style={{ fontSize: "22px", flexShrink: 0 }}>📅</span>
              <div>
                <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "13px", color: "#1e293b", marginBottom: "3px" }}>Client Journey</h4>
                <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5, margin: 0 }}>Tap the <strong style={{ color: "#1e40af" }}>progress bar</strong> on any client card to open their full Client Journey. It shows every task for the current week — text scripts, videos, graphics, and links — with checkboxes to track completion and a <strong style={{ color: "#1e40af" }}>Copy All</strong> button to grab everything at once. Navigate between weeks and see your overall progress across all 41 tasks.</p>
              </div>
            </div>

            {/* Coaching Guide */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", marginBottom: "18px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px" }}>
              <span style={{ fontSize: "22px", flexShrink: 0 }}>💡</span>
              <div>
                <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "13px", color: "#1e293b", marginBottom: "3px" }}>Coaching Guide & Resources</h4>
                <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5, margin: 0 }}>Every client card has an expandable <strong style={{ color: "#1e40af" }}>Coaching Guide & Resources</strong> section. It shows coaching actions for their current stage — what to focus on, how to approach calls, and reminders like &quot;coach through discovery — do NOT provide answers.&quot; Your built-in playbook for every client interaction.</p>
              </div>
            </div>

            {/* How To */}
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
              Add Your First Client<span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #e2e8f0, transparent)" }} />
            </div>
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

            {/* Screenshots */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
              <SsBtn label="See the Tracker" onClick={() => setLightbox(SCREENSHOTS["client-tracker"])} />
              <SsBtn label="See the Add Form" onClick={() => setLightbox(SCREENSHOTS["add-client"])} />
              <SsBtn label="See the Client Journey" onClick={() => setLightbox(SCREENSHOTS["client-journey"])} />
            </div>

            {/* Why */}
            <div style={{ padding: "14px 16px", borderRadius: "10px", display: "flex", alignItems: "flex-start", gap: "10px", background: "#eff6ff", border: "1px solid #bfdbfe", marginBottom: "4px" }}>
              <span style={{ fontSize: "18px", flexShrink: 0, marginTop: "1px" }}>🎯</span>
              <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                <strong style={{ color: "#1e293b" }}>Why it matters:</strong> The first 30 days are make-or-break for client success. The Client Tracker gives you the exact script, video, or call to make on every single day — so you never wonder &quot;what should I send today?&quot; Your clients get consistent, professional support and you can manage multiple clients without anything slipping.
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ padding: "20px 32px 28px", borderTop: "1px solid #f1f5f9" }}>
            <button onClick={onClose} style={{ width: "100%", padding: "15px", border: "none", borderRadius: "14px", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "15px", cursor: "pointer", textAlign: "center", color: "#fff", background: "linear-gradient(135deg, #3b82f6, #6366f1)", boxShadow: "0 4px 16px rgba(99,102,241,0.3)", transition: "all 0.25s" }}>
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
