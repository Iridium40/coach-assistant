"use client"

import { useState, useEffect } from "react"

interface Screenshot {
  img: string
  title: string
}

const SUPABASE_IMG = "https://rcucmbujkdwvrcjistub.supabase.co/storage/v1/object/public/user_training"

const SCREENSHOTS: Record<string, Screenshot> = {
  "prospects-list": { img: `${SUPABASE_IMG}/prospects-list.png`, title: "📋 100's List Tracker" },
  "add-prospect":   { img: `${SUPABASE_IMG}/add-prospect.png`,   title: "➕ Add Prospect" },
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

export function ProspectLearningGuide({ onClose }: { onClose: () => void }) {
  const [lightbox, setLightbox] = useState<Screenshot | null>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", overflowY: "auto" }}>
        <div style={{ maxWidth: "660px", width: "100%", background: "linear-gradient(170deg, #fff 0%, #f8fafb 100%)", borderRadius: "24px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.2)", animation: "plgSlideUp 0.3s ease", margin: "auto" }}>

          {/* HEADER */}
          <div style={{ background: "linear-gradient(135deg, #92400e 0%, #f59e0b 50%, #fbbf24 100%)", padding: "36px 36px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-80px", right: "-50px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: "-60px", left: "-30px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }} />
            <button onClick={onClose} style={{ position: "absolute", top: "14px", right: "14px", width: "32px", height: "32px", borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>✕</button>
            <span style={{ fontSize: "44px", display: "inline-block", marginBottom: "10px", position: "relative", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}>📋</span>
            <h1 style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "24px", color: "#fff", letterSpacing: "-0.5px", position: "relative", textShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
              100&apos;s List Tracker
            </h1>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px", marginTop: "8px", position: "relative", lineHeight: 1.5 }}>
              Your prospect pipeline — track everyone who could benefit from OPTAVIA and never lose a follow-up.
            </p>
          </div>

          {/* SCROLLABLE BODY */}
          <div style={{ maxHeight: "calc(80vh - 200px)", overflowY: "auto", padding: "28px 32px 14px" }}>

            {/* Intro */}
            <div style={{ padding: "16px 18px", marginBottom: "24px", background: "linear-gradient(135deg, #fffbeb, #fef3c7)", border: "1px solid #fde68a", borderRadius: "12px", position: "relative", fontSize: "14px", color: "#475569", lineHeight: 1.65 }}>
              <span style={{ position: "absolute", top: "-10px", left: "14px", fontSize: "16px", background: "#fff", padding: "0 4px", borderRadius: "6px" }}>🔒</span>
              Your 100&apos;s List is <strong style={{ color: "#92400e" }}>privacy-first</strong> — you only store nicknames and labels here. All real contact information stays in OPTAVIA&apos;s official coach portal.
            </div>

            {/* Pipeline */}
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
              Your Prospect Pipeline<span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #e2e8f0, transparent)" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "20px", padding: "14px 16px", background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", borderRadius: "12px", border: "1px solid #e2e8f0", overflowX: "auto" }}>
              {[
                { label: "🆕 New", bg: "#3b82f6" },
                { label: "🔥 Interested", bg: "#f59e0b" },
                { label: "📅 HA Scheduled", bg: "#8b5cf6" },
                { label: "🎉 Client Won", bg: "#00A651" },
              ].map((s, i, arr) => (
                <span key={s.label} style={{ display: "contents" }}>
                  <div style={{ padding: "6px 12px", borderRadius: "7px", fontSize: "11px", fontWeight: 700, fontFamily: "'Montserrat', sans-serif", whiteSpace: "nowrap", color: "#fff", background: s.bg, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>{s.label}</div>
                  {i < arr.length - 1 && <span style={{ color: "#cbd5e1", fontSize: "14px", fontWeight: 700, flexShrink: 0 }}>→</span>}
                </span>
              ))}
            </div>

            {/* Features */}
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
              Features<span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #e2e8f0, transparent)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "18px" }}>
              {[
                { icon: "🏷️", text: "Privacy-first labels — nicknames only, no real contact info stored" },
                { icon: "📊", text: "Visual pipeline counts showing prospects at each stage" },
                { icon: "📅", text: "Schedule Health Assessments with date/time and reminders" },
                { icon: "📤", text: "Share HA — send the assessment link for your prospect to complete" },
                { icon: "✅", text: "Check In to log each conversation and stay consistent" },
                { icon: "🔍", text: "Filter by stage — All, New, Interested, Client!, Not Interested" },
                { icon: "📅", text: "List or Week view — see your pipeline your way" },
                { icon: "📝", text: "Notes on each card — add context for follow-ups" },
              ].map((f) => (
                <div key={f.text} style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "10px 12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "1px" }}>{f.icon}</span>
                  <span style={{ fontSize: "12px", color: "#475569", fontWeight: 600, lineHeight: 1.4 }}>{f.text}</span>
                </div>
              ))}
            </div>

            {/* Coaching Guide Highlight */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", marginBottom: "18px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px" }}>
              <span style={{ fontSize: "22px", flexShrink: 0 }}>💡</span>
              <div>
                <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "13px", color: "#1e293b", marginBottom: "3px" }}>Coaching Guide & Resources</h4>
                <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5, margin: 0 }}>Every prospect card has an expandable guide built right in. It shows coaching actions for their current stage — like initial outreach tips, how to share your story, and conversation starters — so you always know the right next step.</p>
              </div>
            </div>

            {/* Share HA Highlight */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", marginBottom: "18px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px" }}>
              <span style={{ fontSize: "22px", flexShrink: 0 }}>📋</span>
              <div>
                <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "13px", color: "#1e293b", marginBottom: "3px" }}>How Share HA Works</h4>
                <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5, margin: 0 }}>When a prospect is ready, tap <strong>Share HA</strong> to send them a Health Assessment link. They complete and submit it on their own, and the results are sent directly to your email. No health data is stored in the app — it stays private between you and your prospect.</p>
              </div>
            </div>

            {/* How To */}
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
              Add Your First Prospect<span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #e2e8f0, transparent)" }} />
            </div>
            <div style={{ padding: "16px 18px", background: "linear-gradient(135deg, #f0fdf4, #ecfdf5)", border: "1px solid #d1fae5", borderRadius: "10px", marginBottom: "14px" }}>
              <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "12px", color: "#065f46", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>🎯 Step by Step</h4>
              {[
                <>Go to <strong style={{ color: "#065f46" }}>My Business → 100&apos;s List Tracker</strong></>,
                <>Click <strong style={{ color: "#065f46" }}>+ Add Prospect</strong> in the top-right corner</>,
                <>Enter a <strong style={{ color: "#065f46" }}>Label / Nickname</strong> you&apos;ll recognize (e.g., &quot;Gym Sarah&quot;)</>,
                <>Select <strong style={{ color: "#065f46" }}>How did you meet?</strong> — Family, Work, Social Media, etc.</>,
                <>Add any helpful <strong style={{ color: "#065f46" }}>Notes</strong> for context (optional)</>,
                <>Click <strong style={{ color: "#065f46" }}>Add to List</strong> — they appear as &quot;New&quot; in your pipeline!</>,
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", padding: "8px 0", alignItems: "flex-start", borderBottom: i < 5 ? "1px solid rgba(0,166,81,0.1)" : "none" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#00A651", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "11px", flexShrink: 0, boxShadow: "0 1px 4px rgba(0,166,81,0.2)" }}>{i + 1}</div>
                  <div style={{ fontSize: "13px", color: "#374151", lineHeight: 1.45 }}>{text}</div>
                </div>
              ))}
            </div>

            {/* Screenshots */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
              <SsBtn label="See the Tracker" onClick={() => setLightbox(SCREENSHOTS["prospects-list"])} />
              <SsBtn label="See the Add Form" onClick={() => setLightbox(SCREENSHOTS["add-prospect"])} />
            </div>

            {/* Why */}
            <div style={{ padding: "14px 16px", borderRadius: "10px", display: "flex", alignItems: "flex-start", gap: "10px", background: "#fffbeb", border: "1px solid #fde68a", marginBottom: "4px" }}>
              <span style={{ fontSize: "18px", flexShrink: 0, marginTop: "1px" }}>🎯</span>
              <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                <strong style={{ color: "#1e293b" }}>Why it matters:</strong> Most coaches lose track of conversations and forget to follow up. Your 100&apos;s List keeps every prospect visible with their stage, meeting source, and notes — so no one falls through the cracks. As they progress, move them through stages and when they become a client, they flow into your Client Tracker automatically.
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ padding: "20px 32px 28px", borderTop: "1px solid #f1f5f9" }}>
            <button onClick={onClose} style={{ width: "100%", padding: "15px", border: "none", borderRadius: "14px", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "15px", cursor: "pointer", textAlign: "center", color: "#fff", background: "linear-gradient(135deg, #f59e0b, #f97316)", boxShadow: "0 4px 16px rgba(249,115,22,0.3)", transition: "all 0.25s" }}>
              Got It! →
            </button>
            <p style={{ textAlign: "center", marginTop: "12px", fontSize: "12px", color: "#94a3b8" }}>
              Access your list anytime from the My Business menu
            </p>
          </div>
        </div>
      </div>

      <Lightbox screenshot={lightbox} onClose={() => setLightbox(null)} />

      <style>{`
        @keyframes plgSlideUp {
          from { transform: translateY(20px) scale(0.97); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </>
  )
}
