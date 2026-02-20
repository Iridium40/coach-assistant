"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"

const FEATURES = [
  {
    emoji: "📋",
    emojiBg: "linear-gradient(135deg, #fef3c7, #fde68a)",
    title: "100's List",
    description: "Your prospect pipeline from first contact to \"Client Won.\" Never lose a follow-up again.",
    items: ["Stage-based pipeline tracking", "Share Health Assessments", "Schedule & set reminders", "Built-in coaching guide"],
  },
  {
    emoji: "👥",
    emojiBg: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    title: "Client Tracker",
    description: "Daily touchpoints, milestone celebrations, and the exact script for every program day.",
    items: ["Auto-calculated program day", "Copy-paste text templates", "Client Journey with progress", "Needs Attention alerts"],
  },
  {
    emoji: "🏋️",
    emojiBg: "linear-gradient(135deg, #f3e8ff, #c4b5fd)",
    title: "Coach List",
    description: "Track the coaches you've sponsored — their rank, stage, and what they need from you.",
    items: ["Rank progression tracking", "Rank Guide & Focus actions", "Schedule mentoring sessions", "Client & prospect counts"],
  },
  {
    emoji: "🎓",
    emojiBg: "linear-gradient(135deg, #fce7f3, #f9a8d4)",
    title: "Training Academy",
    description: "Structured modules that unlock as you advance — from new coach basics to leadership mastery.",
    items: ["Rank-based training modules", "Video + document training", "Quizzes & progress tracking", "Achievement badges"],
  },
  {
    emoji: "🛠️",
    emojiBg: "linear-gradient(135deg, #e0f2fe, #7dd3fc)",
    title: "Coach Tools",
    description: "Quick-access tools for common coaching scenarios — objections, guidelines, and more.",
    items: ["Objection Navigator (15 flows)", "AI Social Media Post Generator", "Water & Exercise Calculators", "Quick reference cards"],
  },
  {
    emoji: "🍽️",
    emojiBg: "linear-gradient(135deg, #d1fae5, #6ee7b7)",
    title: "Meal Planner & Recipes",
    description: "Lean & Green recipes tagged with nutritional counts — build weekly meal plans and share with clients.",
    items: ["Weekly meal planner", "Instacart shopping lists", "Searchable & filterable", "Send plans to clients"],
  },
]

const STATS = [
  { number: "3", label: "Business Trackers" },
  { number: "30+", label: "Day-by-Day Scripts" },
  { number: "42+", label: "Lean & Green Recipes" },
  { number: "15", label: "Objection Flows" },
]

const RECIPE_PILLS = [
  { emoji: "🥩", label: "Lean Proteins" },
  { emoji: "🥗", label: "Salads & Bowls" },
  { emoji: "🍲", label: "Soups & Stews" },
  { emoji: "🍳", label: "Breakfast" },
  { emoji: "🌮", label: "Quick Meals" },
]

export function HomeLanding() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "18px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(0,0,0,0.04)",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <picture>
            <source srcSet="/branding/ca_hub_logo.svg" type="image/svg+xml" />
            <img src="/branding/ca_hub_logo.png" alt="Coach Assistant Hub" style={{ height: "40px", width: "auto" }} />
          </picture>
        </Link>
        <Button
          className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white font-bold text-sm px-7 py-2.5 rounded-[10px]"
          asChild
        >
          <Link href="/login">Sign In <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "120px 24px 80px",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, hsl(var(--optavia-green-light)) 0%, #fff 30%, hsl(var(--optavia-green-light)) 70%, rgba(55,182,174,0.08) 100%)",
        }}>
          <div style={{ position: "absolute", top: "25%", left: 0, right: 0, height: "1px", background: "rgba(55,182,174,0.06)" }} />
          <div style={{ position: "absolute", top: "75%", left: 0, right: 0, height: "1px", background: "rgba(55,182,174,0.06)" }} />
          <div style={{ position: "absolute", left: "20%", top: 0, bottom: 0, width: "1px", background: "rgba(55,182,174,0.06)" }} />
          <div style={{ position: "absolute", right: "20%", top: 0, bottom: 0, width: "1px", background: "rgba(55,182,174,0.06)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: "820px", textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "8px 20px", borderRadius: "100px",
            background: "rgba(55,182,174,0.08)", border: "1px solid rgba(55,182,174,0.15)",
            fontSize: "13px", fontWeight: 600, color: "hsl(var(--optavia-green-dark))",
            marginBottom: "32px",
          }}>
            <span style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "hsl(var(--optavia-green))",
              boxShadow: "0 0 0 0 rgba(55,182,174,0.4)",
              animation: "pulse 2s infinite",
            }} />
            Built for OPTAVIA Coaches
          </div>

          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.08, letterSpacing: "-1.5px",
            color: "#1a1a2e", marginBottom: "24px",
          }}>
            Run your coaching business{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, hsl(var(--optavia-green)), hsl(var(--optavia-green-dark)))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>like a pro</em>
          </h1>

          <p style={{
            fontSize: "19px", lineHeight: 1.7, color: "#5a5a72",
            maxWidth: "580px", margin: "0 auto 40px", fontWeight: 400,
          }}>
            The all-in-one platform that gives you the exact scripts, daily touchpoints, training, and tracking tools to grow your OPTAVIA business — so nothing falls through the cracks.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Button
              size="lg"
              className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white font-bold text-base px-10 py-7 rounded-[14px] shadow-lg"
              asChild
            >
              <Link href="/login">Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <a
              href="#features"
              style={{
                padding: "16px 32px", borderRadius: "14px",
                border: "1.5px solid #d1d5db", background: "#fff", color: "#1a1a2e",
                fontWeight: 600, fontSize: "16px", cursor: "pointer",
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px",
                transition: "all 0.3s",
              }}
            >
              See What&apos;s Inside <ChevronDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{
        background: "#1a1a2e", padding: "48px 24px",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexWrap: "wrap", gap: "0",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(55,182,174,0.08), rgba(42,156,149,0.08), rgba(55,182,174,0.08))",
        }} />
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{
            flex: "1 1 200px", textAlign: "center", padding: "0 32px",
            position: "relative",
          }}>
            {i < STATS.length - 1 && (
              <div className="hidden md:block" style={{
                position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
                width: "1px", height: "48px", background: "rgba(255,255,255,0.1)",
              }} />
            )}
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "42px", color: "#fff", lineHeight: 1 }}>
              {stat.number}
            </div>
            <div style={{
              fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase", letterSpacing: "1.5px", marginTop: "8px",
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── FEATURES GRID ── */}
      <section id="features" style={{ padding: "100px 24px", background: "#faf9f6" }}>
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 64px" }}>
          <div style={{
            display: "inline-block", fontSize: "12px", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "2px",
            color: "hsl(var(--optavia-green))", marginBottom: "16px",
          }}>
            Everything You Need
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: "16px", color: "#1a1a2e",
          }}>
            Six pillars to grow your coaching business
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#6b7280" }}>
            Every tool, script, and resource — organized so you spend less time searching and more time coaching.
          </p>
        </div>

        <div style={{
          maxWidth: "1120px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px",
        }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{
              background: "#fff", borderRadius: "20px", padding: "36px 32px",
              border: "1px solid rgba(0,0,0,0.05)",
              transition: "all 0.35s", position: "relative", overflow: "hidden",
            }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "28px", marginBottom: "20px", background: f.emojiBg,
              }}>
                {f.emoji}
              </div>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", marginBottom: "10px", color: "#1a1a2e" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#6b7280" }}>{f.description}</p>
              <ul style={{ listStyle: "none", marginTop: "16px", padding: 0 }}>
                {f.items.map((item) => (
                  <li key={item} style={{
                    fontSize: "13px", color: "#475569", padding: "6px 0",
                    display: "flex", alignItems: "center", gap: "8px", fontWeight: 500,
                  }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
                      background: "hsl(var(--optavia-green-light))", color: "hsl(var(--optavia-green))",
                      fontSize: "10px", fontWeight: 800,
                    }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── BIG FEATURE: CLIENT SUPPORT ── */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

          {/* Row 1: Client Support */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center" style={{ paddingBottom: "80px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "hsl(var(--optavia-green))", marginBottom: "20px" }}>
                💬 Client Support
              </div>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: "16px", color: "#1a1a2e" }}>
                The right message, every single day
              </h3>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#6b7280", marginBottom: "12px" }}>
                The first 30 days are make-or-break. Your Client Tracker gives you the exact text script for every program day — personalized, research-backed, and ready to copy-paste.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#6b7280" }}>
                Tap <strong style={{ color: "#1a1a2e" }}>Text</strong> on any client card and the day&apos;s message is waiting. Resources tab shows coaching actions, videos, and links for their current phase.
              </p>
            </div>
            <div style={{
              background: "linear-gradient(135deg, hsl(var(--optavia-green-light)), rgba(55,182,174,0.06))",
              borderRadius: "24px", padding: "40px",
              display: "flex", flexDirection: "column", gap: "10px",
              border: "1px solid rgba(55,182,174,0.08)",
            }}>
              {[
                { bg: "#fef3c7", icon: "📅", text: "Day 1 — Foundation Day script ready" },
                { bg: "#dbeafe", icon: "🎥", text: "Kickoff Video + Lean & Green Video" },
                { bg: "#d1fae5", icon: "📋", text: "5&1 Tracker link to share" },
                { bg: "#fce7f3", icon: "🔥", text: "Critical Phase coaching actions" },
              ].map((pill) => (
                <div key={pill.text} style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "14px 20px", background: "#fff", borderRadius: "12px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  fontSize: "14px", fontWeight: 600, color: "#1a1a2e",
                }}>
                  <span style={{ width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0, background: pill.bg }}>
                    {pill.icon}
                  </span>
                  {pill.text}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Business Visibility */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center" style={{ padding: "80px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="md:order-2">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "hsl(var(--optavia-green))", marginBottom: "20px" }}>
                📊 Business Visibility
              </div>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: "16px", color: "#1a1a2e" }}>
                See your entire business at a glance
              </h3>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#6b7280", marginBottom: "12px" }}>
                Three trackers give you a complete picture: prospects in your pipeline, clients on program, and coaches you&apos;re developing. Each has pipeline counts, stage filters, and attention alerts.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#6b7280" }}>
                The coaches who scale aren&apos;t working harder — they&apos;re <strong style={{ color: "#1a1a2e" }}>working systematically</strong>. Every card, every stage, every touchpoint is designed so nothing slips.
              </p>
            </div>
            <div className="md:order-1" style={{
              background: "linear-gradient(135deg, #1e2a3a, #243447)",
              borderRadius: "24px", padding: "40px",
              display: "flex", flexDirection: "column", gap: "10px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              {[
                { bg: "rgba(245,158,11,0.15)", icon: "📋", text: "12 Prospects · 3 HA Scheduled" },
                { bg: "rgba(59,130,246,0.15)", icon: "👥", text: "8 Clients · 2 Need Attention" },
                { bg: "rgba(124,58,237,0.15)", icon: "🏋️", text: "4 Coaches · 1 New Launch" },
              ].map((pill) => (
                <div key={pill.text} style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "14px 20px", background: "rgba(255,255,255,0.06)", borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "14px", fontWeight: 600, color: "#fff",
                }}>
                  <span style={{ width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0, background: pill.bg }}>
                    {pill.icon}
                  </span>
                  {pill.text}
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Built-In Guidance */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center" style={{ paddingTop: "80px" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "hsl(var(--optavia-green))", marginBottom: "20px" }}>
                🎯 Built-In Guidance
              </div>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: "16px", color: "#1a1a2e" }}>
                Know what to do — at every stage
              </h3>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#6b7280", marginBottom: "12px" }}>
                Every prospect, client, and coach card has an expandable <strong style={{ color: "#1a1a2e" }}>Coaching Guide</strong> built right in. It tells you the coaching actions for their current stage, so even brand-new coaches operate like seasoned pros.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#6b7280" }}>
                From &quot;share your story&quot; for new prospects to &quot;coach through discovery — do NOT provide answers&quot; for active clients — the playbook is always one tap away.
              </p>
            </div>
            <div style={{
              background: "linear-gradient(135deg, hsl(var(--optavia-green-light)), rgba(55,182,174,0.06))",
              borderRadius: "24px", padding: "40px",
              display: "flex", flexDirection: "column", gap: "10px",
              border: "1px solid rgba(55,182,174,0.08)",
            }}>
              {[
                { bg: "#f3e8ff", icon: "💡", text: "Stage-specific coaching actions" },
                { bg: "#fef3c7", icon: "🎯", text: "Next Goal to keep momentum" },
                { bg: "#d1fae5", icon: "📞", text: "Your Actions as a mentor" },
              ].map((pill) => (
                <div key={pill.text} style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "14px 20px", background: "#fff", borderRadius: "12px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  fontSize: "14px", fontWeight: 600, color: "#1a1a2e",
                }}>
                  <span style={{ width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0, background: pill.bg }}>
                    {pill.icon}
                  </span>
                  {pill.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RECIPE STRIP ── */}
      <section style={{
        background: "linear-gradient(135deg, hsl(var(--optavia-green-dark)) 0%, hsl(var(--optavia-green)) 50%, #37B6AE 100%)",
        padding: "80px 24px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 20% 20%, rgba(255,255,255,0.05), transparent), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(0,0,0,0.1), transparent)" }} />
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 44px)", color: "#fff", position: "relative", marginBottom: "12px" }}>
          42+ Lean & Green Recipes
        </h2>
        <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", maxWidth: "520px", margin: "0 auto 32px", position: "relative", lineHeight: 1.6 }}>
          Compliant, delicious, and ready to share with your clients. Every recipe tagged with nutritional counts for program tracking.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "40px", flexWrap: "wrap", position: "relative" }}>
          {RECIPE_PILLS.map((rp) => (
            <div key={rp.label} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "14px 24px", background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "14px", color: "#fff",
              fontWeight: 600, fontSize: "14px",
              backdropFilter: "blur(8px)",
            }}>
              <span style={{ fontSize: "24px" }}>{rp.emoji}</span>
              {rp.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "120px 24px", textAlign: "center", position: "relative", background: "#faf9f6" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(55,182,174,0.04), transparent)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: 1.12, letterSpacing: "-0.5px", marginBottom: "16px", color: "#1a1a2e",
          }}>
            Ready to run your business like a pro?
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#6b7280", marginBottom: "36px" }}>
            Join coaches who are using systematic tools and proven scripts to support their clients, grow their teams, and advance through OPTAVIA&apos;s rank structure.
          </p>
          <Button
            size="lg"
            className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white font-bold text-lg px-12 py-7 rounded-[14px] shadow-lg"
            asChild
          >
            <Link href="/login">Sign In & Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <p style={{ marginTop: "24px", fontSize: "14px", color: "#6b7280" }}>
            Need an account? Contact your coach or organization for an invitation.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "#1a1a2e", padding: "40px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "12px",
        color: "rgba(255,255,255,0.4)", fontSize: "13px",
      }}>
        <span>&copy; 2026 Coach Assistant Hub. Built for OPTAVIA coaches.</span>
        <span>
          Privacy-first · No client contact info stored ·{" "}
          <Link href="/privacy" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Privacy Policy</Link>
        </span>
      </footer>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(55,182,174,0.4); }
          70% { box-shadow: 0 0 0 10px rgba(55,182,174,0); }
          100% { box-shadow: 0 0 0 0 rgba(55,182,174,0); }
        }
      `}</style>
    </div>
  )
}
