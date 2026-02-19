"use client"

import { useState } from "react"

// ========================================
// TYPES
// ========================================
interface WeekColor {
  bg: string
  border: string
  header: string
}

interface Task {
  type: "text" | "graphic" | "video" | "call" | "resource" | "action"
  title: string
  icon: string
  hasScript?: boolean
  script?: string
  videoUrl?: string
  graphicPlaceholder?: string
  resourceUrl?: string
  note?: string
}

interface DayData {
  label: string
  phase?: string
  tasks: Task[]
}

// ========================================
// CALENDAR DATA — Month One (30 Days)
// ========================================
const WEEK_COLORS: WeekColor[] = [
  { bg: "#dbeafe", border: "#93c5fd", header: "#1e40af" },
  { bg: "#ede9fe", border: "#c4b5fd", header: "#5b21b6" },
  { bg: "#ffe4e6", border: "#fda4af", header: "#be123c" },
  { bg: "#fce7f3", border: "#f9a8d4", header: "#be185d" },
  { bg: "#ccfbf1", border: "#5eead4", header: "#0f766e" },
]

const CALENDAR_DAYS: Record<string, DayData> = {
  // ===== WEEK 1 =====
  "1-sun": {
    label: "Day Before Start",
    phase: "Pre-Start",
    tasks: [
      { type: "text", title: "Day Before Start Text", icon: "💬", hasScript: true, script: `I'm so excited for you… tomorrow is Day 1 of your Metabolic Reset, and tonight is just about getting ready so you can wake up and roll right into success. 🙌🏼 Here's your quick Pre-Day 1 checklist so we're all synced up for the morning:\n\n1️⃣ Watch this 20 minute video and read through the spiral guide that came in your box. We will have a quick 15-20 minute call to make sure you feel clear about YOUR path to fat burn. __JOURNEY KICKOFF VIDEO__\n\n2️⃣ Save this Client Linktree to your phone __CLIENT LINKTREE__\n\n3️⃣ Have your Renpho charged and ready. First thing tomorrow, hop on your scale before water, coffee, or clothes.\n✔️ Weight ✔️ Body fat % ✔️ Visceral fat ✔️ Skeletal muscle % ✔️ Metabolic age ✔️ Protein % ✔️ Hydration %\n\n4️⃣ Grab a tape measure. Tomorrow morning, measure your W.A.T.C.H.=Waist, Arm, Thigh, Chest, Hips\n\n5️⃣ Hydration plan ready. Fill a water bottle tonight… 💦\n\n6️⃣ Lay out your 5 fuelings + Lean & Green plan. ✨\n\n7️⃣ Sleep! Your metabolism loves a solid night's sleep. 😴\n\n8️⃣ Your mindset. This isn't about perfection…it's about consistency. 🤝\n\nText me in the morning with:\n📍 Renpho reading 📍 Measurements 📍 How you're feeling\n\nAnd then… we're off! 🚀` },
      { type: "video", title: "Kickoff Call Video", icon: "🎬", videoUrl: "https://vimeo.com/1158234614/d128997deb" },
      { type: "resource", title: "5&1 Tracker", icon: "📋", note: "Mention in the Kickoff Call", graphicPlaceholder: "SUPABASE_BUCKET/5-and-1-daily-tracker.png" },
      { type: "video", title: "Lean and Green Video", icon: "🥗", videoUrl: "https://vimeo.com/414057972" },
    ]
  },
  "1-mon": {
    label: "Day 1",
    phase: "Foundation Day",
    tasks: [
      { type: "graphic", title: "Send Daily Graphic", icon: "🖼", graphicPlaceholder: "SUPABASE_BUCKET/day-1-foundation-day.png" },
      { type: "text", title: "Send Day 1 Text", icon: "💬", hasScript: true, script: `🌅 DAY 1 — FOUNDATION DAY\nHELLO Day 1!! 🎉\nWelcome to your reset — and take a breath. This works when it's simple. No perfection. No pressure. No overthinking. Just consistency.\n\nHere's your only focus today: Your 5 Fat-Burn Anchors\n1️⃣ Choose 5 fuelings + keep backups nearby (purse, car, desk = success strategy 😅)\n2️⃣ Hydrate like it matters (64–100 oz water) + aim for 7 hours sleep\n3️⃣ Eat within 30 min of waking → then every 2–3 hours\n4️⃣ Follow the plan precisely — if it's not in the guide, it's not in your mouth\n5️⃣ Track it. Awareness creates results.\n\n🔥 Fat burn loves structure.\n🔥 Simplicity = consistency.\n🔥 Consistency = transformation.\n\nToday is about establishing rhythm, not chasing results.\n📸 Please weigh in today (smart scale data is gold), take pics + measurements. This is your baseline.\n\nText me what's for dinner tonight 💚 We're building momentum from Day 1.` },
      { type: "video", title: "What is Fat Burn Video", icon: "🔥", videoUrl: "https://vimeo.com/1044531642/fde0ddc92e" },
      { type: "call", title: "Daily Check In Questions Days 1-4", icon: "📞", hasScript: true, script: `DAY 1-4 DAILY CHECK IN QUESTIONS\n*Important to not provide the answers to them*\n\n• What time did you wake up?\n• What time did you eat for the first time?\n• Do you drink coffee? Do you put anything in your coffee?\n• How many ounces of water have you had today?\n• Did you set your timers / use the eat wise app?\n  - How far apart?\n• Did you go past 3 hours at any time without eating?\n  - How many fuelings have you had in your day?\n• What did you have for your lean and green meal?\n  - How many ounces of protein (before or after you cooked it)?\n• How many servings of vegetables?\n• Did you measure or weigh your vegetables?\n• What time are you planning to go to bed?\n• When time is your last fueling?\n  - If you come close to the 2.5 hr mark and you are not asleep, please add a small serving of protein in to balance your blood sugars.\n• Did you eat anything outside of the program today?\n\nLet us know if you have any EXTRA activity in your day!!!` },
    ]
  },
  "1-tue": {
    label: "Day 2",
    phase: "Transition Day",
    tasks: [
      { type: "graphic", title: "Daily Graphic", icon: "🖼", graphicPlaceholder: "SUPABASE_BUCKET/day-2-transition-day.png" },
      { type: "text", title: "Day 2 Text", icon: "💬", hasScript: true, script: `🌤 DAY 2 — TRANSITION DAY\nHELLO Day 2!! 🤍\nYour body is shifting gears — and that's a good thing.\nYou're moving from sugar-burning → fat-burning.\n\nIf you feel:\n• tired • foggy • a little hungry • headache-ish • low energy\nThat's not failure — it's metabolic adaptation.\n\nSupport tools:\n🥒 Dill pickle or celery\n🍵 Chicken broth\n💧 Sugar-free electrolytes (up to 3/day)\n🚰 Extra water\n\nWhen insulin drops, your body releases water + minerals — replacing them keeps fat burn smooth and comfortable. This phase passes quickly — and what follows is:\n⚡ energy 😴 better sleep 🔥 fat loss 🧠 mental clarity 🍽 less hunger\n\nSmall mindset task today: Create a non-food reward list for every 10 lbs lost (new clothes, massage, trip, gym shoes, facial, nails, etc.) Send it to me 💛\n\nSuccess is built with structure + support — and you're not doing this alone.\n📸 Send me your Day 1 tracker when you can.` },
      { type: "call", title: "Daily Check In Questions Days 1-4", icon: "📞" },
    ]
  },
  "1-wed": {
    label: "Day 3",
    phase: "Ignition Day",
    tasks: [
      { type: "graphic", title: "Daily Graphic + Day 3 Text", icon: "🖼", graphicPlaceholder: "SUPABASE_BUCKET/day-3-ignition-day.png" },
      { type: "text", title: "Day 3 Text", icon: "💬", hasScript: true, script: `🌱 DAY 3 — IGNITION DAY\nHELLO Day 3!! ✨\nYou're approaching fat-burn ignition 🔥\nThis is where the magic starts happening internally — even if the scale hasn't caught up yet.\n\nWatch this video to shift your mindset to success:\n👉 [CHASING GOALS VIDEO]\n\nFocus today:\n• Weigh + measure your Lean & Green\n• Eat every 2–3 hours\n• Stay hydrated\n• Track everything\n• No improvising — structure creates results\n\nThis isn't a diet — it's metabolic retraining.\n\n📸 Snap your tracker + send it to me — I want to coach you, not just cheer you on 💪` },
      { type: "video", title: "Chasing Your Goals Instead of Chasing Taste Video", icon: "🎯", videoUrl: "https://vimeo.com/723522647" },
      { type: "call", title: "Daily Check In Questions Days 1-4", icon: "📞" },
    ]
  },
  "1-thu": {
    label: "Day 4",
    phase: "Fat Burn Day",
    tasks: [
      { type: "graphic", title: "Daily Graphic + Day 4 Text", icon: "🖼", graphicPlaceholder: "SUPABASE_BUCKET/day-4-fat-burn-day.png" },
      { type: "text", title: "Day 4 Text", icon: "💬", hasScript: true, script: `🔥 DAY 4 — FAT BURN DAY\nHELLO Day 4!! 🔥\nYou should officially be entering fat-burning mode today.\nIf hunger pops up:\n🚰 Drink water ⏱ Wait 15 minutes\n\nMost of the time it passes — it's habit hunger, not true hunger.\n\nWhat starts happening now:\n✔ More energy ✔ Better sleep ✔ Reduced cravings ✔ Clearer thinking ✔ Fat loss momentum ✔ Appetite regulation\n\nThis is where people start saying: "I don't feel obsessed with food anymore."\nAnd that's metabolic freedom.\n\n💬 Reflection question: Who in your life would benefit from feeling this way too?\n\n📸 Send me your updated tracker. Let's lock in this fat-burn phase strong.` },
      { type: "call", title: "Daily Check In Questions Days 1-4", icon: "📞" },
      { type: "video", title: "Send How to Protect Your Hard-Earned Fat Burn", icon: "🛡", videoUrl: "https://vimeo.com/1163428641", note: "Send AFTER the Day 4 call" },
    ]
  },
  "1-fri": { label: "", tasks: [] },
  "1-sat": { label: "", tasks: [] },

  // ===== WEEK 2 =====
  "2-sun": { label: "", tasks: [] },
  "2-mon": {
    label: "Day 8",
    phase: "Celebration",
    tasks: [
      { type: "graphic", title: "Daily Graphic", icon: "🖼", graphicPlaceholder: "SUPABASE_BUCKET/day-8-celebration-community.png" },
      { type: "text", title: "Day 8 Text", icon: "💬", hasScript: true, script: `🥳 DAY 8 — CELEBRATION + COMMUNITY POST COACHING\nHELLO Day 8!! 🎉\nYou did it — Week ONE complete. And that matters more than the scale number.\n\nFirst — send me:\n📊 Your Week 1 scale results\n📈 Your smart scale snapshot\n💬 What you're already noticing\n\nNow let's celebrate properly — and anchor this win 💛\n\n✨ Client Page Celebration Post\nHere's a simple template:\n"Week 1 done 🎉 I started this for fat loss, but what I'm noticing already is:\n• (example: more energy)\n• (example: better sleep)\n• (example: less cravings)\n\nI didn't think I could stick to something this structured — but I did. Grateful for coaching, support, and a plan that actually feels sustainable."\n\nWeek 1 = water weight + inflammation drop\nWeeks 2+ = true fat loss phase 🔥\n\nSo proud of you. We're just getting started 💛` },
      { type: "call", title: "Check In Call", icon: "📞", note: "Celebration Call + Schedule Week 3 Call" },
    ]
  },
  "2-tue": { label: "", tasks: [] },
  "2-wed": {
    label: "Mid-Week",
    phase: "Check In",
    tasks: [
      { type: "action", title: "Mid-Week Check In — Choose 1 or More", icon: "💛", hasScript: true, script: `Choose at least 1:\n• Send a 30–60 second voice text check in\n• Share a simple Lean & Green idea\n• Send a reminder about client mindset calls\n• Quick Call to Celebrate something specific\n\n💡 Ideas:\n• Coffee with Clients or Let's Talk reminder\n• Mindset video/podcast\n• Community win spotlight\n• Pounds Down Jar reminder\n• Simple Lean & Green recipes\n• Protein, hydration, or travel tips` },
    ]
  },
  "2-thu": { label: "", tasks: [] },
  "2-fri": { label: "", tasks: [] },
  "2-sat": { label: "", tasks: [] },

  // ===== WEEK 3 =====
  "3-sun": { label: "", tasks: [] },
  "3-mon": {
    label: "Day 15",
    phase: "Progress Check",
    tasks: [
      { type: "text", title: "Touch base text", icon: "💬" },
      { type: "call", title: "Day 15 Check In Call", icon: "📞", note: "Celebration / troubleshooting / progress check" },
    ]
  },
  "3-tue": {
    label: "Premier Order",
    phase: "",
    tasks: [
      { type: "resource", title: "Update Your Premier Order", icon: "📦", note: "When you get 7-day premier order reminder, send:", resourceUrl: "https://answers.optavia.com/help/s/article/Edit-Your-Premier-Items" },
    ]
  },
  "3-wed": {
    label: "Mid-Week",
    phase: "Check In",
    tasks: [
      { type: "action", title: "Mid-Week Check In — Choose 1 or More", icon: "💛" },
    ]
  },
  "3-thu": { label: "", tasks: [] },
  "3-fri": { label: "", tasks: [] },
  "3-sat": { label: "", tasks: [] },

  // ===== WEEK 4 =====
  "4-sun": { label: "", tasks: [] },
  "4-mon": {
    label: "Day 22",
    phase: "Scheduled Call",
    tasks: [
      { type: "text", title: "Day 22 Text", icon: "💬", note: "Reminder of your scheduled call" },
    ]
  },
  "4-tue": {
    label: "Day 23",
    phase: "Graduation",
    tasks: [
      { type: "call", title: "Check In Call", icon: "📞", note: "Client 'graduates' to VIP" },
      { type: "action", title: "Go over Office Hours and Client Support Call Schedule", icon: "📋" },
      { type: "action", title: "Invite client to VIP call", icon: "🌟" },
    ]
  },
  "4-wed": {
    label: "Mid-Week",
    phase: "Check In",
    tasks: [
      { type: "action", title: "Mid-Week Check In — Choose 1 or More", icon: "💛" },
    ]
  },
  "4-thu": {
    label: "After Call",
    phase: "Send Resources",
    tasks: [
      { type: "text", title: "Red/Yellow/Green Support Model Text", icon: "🚦", hasScript: true, script: `Hey [Client NAME] 💛\nI am so proud of you…you have officially graduated to our next level of support! 🎉\n\nWe use a simple Red • Yellow • Green system\nThese are not labels, but signals to help us support you in the best way possible.\n\n👉 Starting now, when you check in on Monday mornings, please send:\n• Your smart scale full report (if you have one)\n• AND the color that best describes your week.\n\n🟢 Green — things are flowing\n🟡 Yellow — a small adjustment is needed\n🔴 Red — you need extra support\n\n🔥 Coach Office Hours are live, open-support Zoom calls.\n👉 If you're Yellow or Red, we strongly encourage you to attend that week.\nEven Green clients are welcome!\n\n⬇️ Please watch this short video + save these graphics ⬇️` },
      { type: "video", title: "How to Use Office Hours Video", icon: "🎬", videoUrl: "https://youtu.be/phRN32R_pHc" },
      { type: "graphic", title: "Office Hours Graphic", icon: "🖼", graphicPlaceholder: "SUPABASE_BUCKET/office-hours-graphic.png" },
    ]
  },
  "4-fri": { label: "", tasks: [] },
  "4-sat": { label: "", tasks: [] },

  // ===== WEEK 5 =====
  "5-sun": { label: "", tasks: [] },
  "5-mon": {
    label: "Day 29",
    phase: "R/Y/G Begins",
    tasks: [
      { type: "text", title: "Send Day 29 Text", icon: "💬", hasScript: true, script: `Happy Monday! 💛\nAs you check in today, please send:\n• Your smart scale full report\n• Your color for the week 🟢🟡🔴\n\n🟢 Green — things are flowing\n🟡 Yellow — small adjustment needed\n🔴 Red — extra support needed\n\nUsing support early keeps things moving — we've got you! 💪✨` },
      { type: "action", title: "Coaching Office Hours Begin (Optional)", icon: "🏢" },
    ]
  },
  "5-tue": {
    label: "",
    phase: "",
    tasks: [
      { type: "action", title: "Coaching Office Hours", icon: "🏢" },
    ]
  },
  "5-wed": {
    label: "Mid-Week",
    phase: "Check In",
    tasks: [
      { type: "action", title: "Mid-Week Check In — Choose 1 or More", icon: "💛" },
      { type: "action", title: "Coaching Office Hours", icon: "🏢" },
    ]
  },
  "5-thu": { label: "", tasks: [] },
  "5-fri": { label: "", tasks: [] },
  "5-sat": { label: "", tasks: [] },
}

// Month 2 repeating weekly pattern
const MONTH2_WEEKLY: Record<string, DayData> = {
  sun: { label: "", tasks: [] },
  mon: {
    label: "Monday",
    phase: "Renpho + Color Day",
    tasks: [
      { type: "action", title: "Monday: Renpho + Color Day", icon: "📊" },
      { type: "action", title: "Coaching Office Hours", icon: "🏢" },
    ]
  },
  tue: {
    label: "",
    phase: "",
    tasks: [
      { type: "action", title: "Coaching Office Hours", icon: "🏢" },
    ]
  },
  wed: {
    label: "Mid-Week",
    phase: "Check In",
    tasks: [
      { type: "action", title: "Mid-Week Check In — Choose 1 or More", icon: "💛" },
      { type: "action", title: "Coaching Office Hours", icon: "🏢" },
    ]
  },
  thu: { label: "", tasks: [] },
  fri: { label: "", tasks: [] },
  sat: { label: "", tasks: [] },
}

const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

const COLOR_SCRIPTS = {
  green: { emoji: "🟢", label: "GREEN", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", script: `Love seeing GREEN 💚\nThat tells me things are flowing!!! Great job staying consistent. Keep doing what you're doing and let's keep the momentum going this week. I'll be cheering you on!` },
  yellow: { emoji: "🟡", label: "YELLOW", color: "#ca8a04", bg: "#fefce8", border: "#fef08a", script: `Thanks for checking in and choosing YELLOW 💛\nThat's a great signal to make a small tweak before frustration builds. Coach Office Hours will be the best next step for clarity this week. Bring your questions and we'll get you dialed in. I've got you!` },
  red: { emoji: "🔴", label: "RED", color: "#dc2626", bg: "#fef2f2", border: "#fecaca", script: `Thank you for being honest and choosing RED ❤️\nThis is just a signal… it tells us it's time to lean into support. Please plan to attend Coach Office Hours this week. When is a good time for you and I to do a quick Systems Check call so we can reset and move forward together.` },
}

const TASK_BADGE_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  text: { bg: "#dbeafe", color: "#1e40af", label: "TEXT" },
  graphic: { bg: "#fce7f3", color: "#be185d", label: "GRAPHIC" },
  video: { bg: "#fef3c7", color: "#92400e", label: "VIDEO" },
  call: { bg: "#d1fae5", color: "#065f46", label: "CALL" },
  resource: { bg: "#e0e7ff", color: "#3730a3", label: "LINK" },
  action: { bg: "#f3e8ff", color: "#6b21a8", label: "ACTION" },
}

// ========================================
// SUB-COMPONENTS
// ========================================
function TaskBadge({ type }: { type: string }) {
  const s = TASK_BADGE_STYLES[type] || TASK_BADGE_STYLES.action
  return (
    <span
      className="inline-block rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  )
}

function DetailDrawer({
  day,
  dayKey,
  onClose,
  completedTasks,
  onToggle,
  showColorScripts,
}: {
  day: DayData
  dayKey: string
  onClose: () => void
  completedTasks: Record<string, boolean>
  onToggle: (key: string) => void
  showColorScripts: boolean
}) {
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null)

  const copyText = (text: string, idx: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-[min(480px,90vw)] bg-white h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-5" style={{ background: "linear-gradient(135deg, #003B2E, #00A651)" }}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors">
            ✕
          </button>
          {day.phase && <div className="text-[13px] text-white/80 font-medium">{day.phase}</div>}
          <div className="text-[22px] font-extrabold text-white mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {day.label || "Tasks"}
          </div>
          <div className="text-xs text-white/70 mt-1">{day.tasks.length} task{day.tasks.length !== 1 ? "s" : ""}</div>
        </div>

        {/* Tasks */}
        <div className="p-4 space-y-3">
          {day.tasks.map((task, i) => {
            const taskKey = `${dayKey}-${i}`
            const done = !!completedTasks[taskKey]
            return (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{
                  border: done ? "1px solid #bbf7d0" : "1px solid #e5e7eb",
                  background: done ? "#f0fdf4" : "#fafafa",
                }}
              >
                <div className="flex items-start gap-2.5">
                  <button
                    onClick={() => onToggle(taskKey)}
                    className="w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center text-xs text-white transition-colors"
                    style={{
                      borderColor: done ? "#00A651" : "#d1d5db",
                      background: done ? "#00A651" : "transparent",
                    }}
                  >
                    {done && "✓"}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[15px]">{task.icon}</span>
                      <span className={`font-semibold text-sm ${done ? "text-gray-500" : "text-gray-900"}`}>{task.title}</span>
                      <TaskBadge type={task.type} />
                    </div>
                    {task.note && (
                      <p className="mt-1.5 text-xs text-amber-600 font-semibold italic">⚠️ {task.note}</p>
                    )}

                    <div className="flex gap-1.5 mt-2.5 flex-wrap">
                      {task.hasScript && task.script && (
                        <button
                          onClick={() => copyText(task.script!, `script-${i}`)}
                          className="text-xs px-3 py-1.5 rounded-md border font-semibold transition-colors"
                          style={{
                            borderColor: copiedIdx === `script-${i}` ? "#bbf7d0" : "#dbeafe",
                            background: copiedIdx === `script-${i}` ? "#d1fae5" : "#eff6ff",
                            color: copiedIdx === `script-${i}` ? "#065f46" : "#1e40af",
                          }}
                        >
                          {copiedIdx === `script-${i}` ? "✅ Copied!" : "📋 Copy Script"}
                        </button>
                      )}
                      {task.videoUrl && (
                        <>
                          <button
                            onClick={() => copyText(task.videoUrl!, `video-${i}`)}
                            className="text-xs px-3 py-1.5 rounded-md border font-semibold transition-colors"
                            style={{
                              borderColor: copiedIdx === `video-${i}` ? "#bbf7d0" : "#fef3c7",
                              background: copiedIdx === `video-${i}` ? "#d1fae5" : "#fffbeb",
                              color: copiedIdx === `video-${i}` ? "#065f46" : "#92400e",
                            }}
                          >
                            {copiedIdx === `video-${i}` ? "✅ Copied!" : "🔗 Copy Video Link"}
                          </button>
                          <button
                            onClick={() => window.open(task.videoUrl, "_blank")}
                            className="text-xs px-3 py-1.5 rounded-md border font-semibold"
                            style={{ borderColor: "#fef3c7", background: "#fffbeb", color: "#92400e" }}
                          >
                            ▶️ Watch
                          </button>
                        </>
                      )}
                      {task.graphicPlaceholder && (
                        <>
                          <button
                            onClick={() => copyText(task.graphicPlaceholder!, `graphic-${i}`)}
                            className="text-xs px-3 py-1.5 rounded-md border font-semibold transition-colors"
                            style={{
                              borderColor: copiedIdx === `graphic-${i}` ? "#bbf7d0" : "#fce7f3",
                              background: copiedIdx === `graphic-${i}` ? "#d1fae5" : "#fdf2f8",
                              color: copiedIdx === `graphic-${i}` ? "#065f46" : "#be185d",
                            }}
                          >
                            {copiedIdx === `graphic-${i}` ? "✅ Copied!" : "🔗 Copy Graphic Link"}
                          </button>
                          <button
                            onClick={() => window.open(task.graphicPlaceholder, "_blank")}
                            className="text-xs px-3 py-1.5 rounded-md border font-semibold"
                            style={{ borderColor: "#fce7f3", background: "#fdf2f8", color: "#be185d" }}
                          >
                            🖼 View
                          </button>
                        </>
                      )}
                      {task.resourceUrl && (
                        <>
                          <button
                            onClick={() => copyText(task.resourceUrl!, `resource-${i}`)}
                            className="text-xs px-3 py-1.5 rounded-md border font-semibold transition-colors"
                            style={{
                              borderColor: copiedIdx === `resource-${i}` ? "#bbf7d0" : "#e0e7ff",
                              background: copiedIdx === `resource-${i}` ? "#d1fae5" : "#eef2ff",
                              color: copiedIdx === `resource-${i}` ? "#065f46" : "#3730a3",
                            }}
                          >
                            {copiedIdx === `resource-${i}` ? "✅ Copied!" : "🔗 Copy Link"}
                          </button>
                          <button
                            onClick={() => window.open(task.resourceUrl, "_blank")}
                            className="text-xs px-3 py-1.5 rounded-md border font-semibold"
                            style={{ borderColor: "#e0e7ff", background: "#eef2ff", color: "#3730a3" }}
                          >
                            🌐 Open
                          </button>
                        </>
                      )}
                    </div>

                    {task.hasScript && task.script && (
                      <details className="mt-2.5">
                        <summary className="text-xs text-gray-500 cursor-pointer font-medium hover:text-gray-700">Preview script</summary>
                        <pre className="mt-2 p-3 bg-gray-50 rounded-lg text-xs leading-relaxed whitespace-pre-wrap break-words text-gray-700 border border-gray-200 max-h-[300px] overflow-y-auto">
                          {task.script}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {showColorScripts && (
            <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-gray-50">
              <h4 className="text-sm font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Response Scripts by Color
              </h4>
              {Object.values(COLOR_SCRIPTS).map(cs => (
                <div key={cs.label} className="mb-2.5 p-3 rounded-lg" style={{ background: cs.bg, border: `1px solid ${cs.border}` }}>
                  <div className="font-bold text-[13px] mb-1.5" style={{ color: cs.color }}>{cs.emoji} {cs.label}</div>
                  <pre className="m-0 text-xs leading-relaxed whitespace-pre-wrap text-gray-700">{cs.script}</pre>
                  <button
                    onClick={() => navigator.clipboard?.writeText(cs.script)}
                    className="mt-2 text-[11px] px-2.5 py-1 rounded border bg-white cursor-pointer font-semibold"
                    style={{ borderColor: cs.border, color: cs.color }}
                  >
                    📋 Copy
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CalendarCell({
  day,
  dayKey,
  onClick,
  completedTasks,
  weekColor,
}: {
  day: DayData
  dayKey: string
  onClick: () => void
  completedTasks: Record<string, boolean>
  weekColor: WeekColor
}) {
  const hasTasks = day.tasks.length > 0
  const completedCount = hasTasks ? day.tasks.filter((_, i) => completedTasks[`${dayKey}-${i}`]).length : 0
  const allDone = hasTasks && completedCount === day.tasks.length

  return (
    <div
      onClick={hasTasks ? onClick : undefined}
      className="flex-1 min-w-0 min-h-[100px] p-2 rounded-md transition-all relative hover:scale-[1.02] hover:z-10"
      style={{
        background: hasTasks ? weekColor.bg : "#f9fafb",
        border: allDone ? "2px solid #00A651" : `1px solid ${hasTasks ? weekColor.border : "#e5e7eb"}`,
        cursor: hasTasks ? "pointer" : "default",
        opacity: hasTasks ? 1 : 0.5,
      }}
    >
      {allDone && <div className="absolute top-1 right-1 text-xs">✅</div>}
      {day.label && (
        <div
          className="font-bold text-[11px] mb-0.5 uppercase tracking-wide"
          style={{ color: weekColor.header, fontFamily: "'Montserrat', sans-serif" }}
        >
          {day.label}
        </div>
      )}
      {day.phase && (
        <div className="text-[10px] text-gray-500 mb-1 font-medium">{day.phase}</div>
      )}
      {hasTasks && day.tasks.map((task, i) => (
        <div key={i} className="text-[10px] text-gray-700 leading-tight mb-0.5 flex items-start gap-0.5">
          <span className="flex-shrink-0">{task.icon}</span>
          <span
            className="font-medium"
            style={{
              textDecoration: completedTasks[`${dayKey}-${i}`] ? "line-through" : "none",
              opacity: completedTasks[`${dayKey}-${i}`] ? 0.5 : 1,
            }}
          >
            {task.title}
          </span>
        </div>
      ))}
      {hasTasks && (
        <div className="mt-1 h-[3px] rounded-sm bg-black/10">
          <div
            className="h-full rounded-sm transition-all duration-300"
            style={{ width: `${(completedCount / day.tasks.length) * 100}%`, background: "#00A651" }}
          />
        </div>
      )}
    </div>
  )
}

// ========================================
// MAIN COMPONENT
// ========================================
export function ClientSupportCalendar() {
  const [activeMonth, setActiveMonth] = useState<"month1" | "month2">("month1")
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null)
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null)
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})

  const toggleTask = (key: string) => setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }))

  const openDay = (dayData: DayData, dayKey: string) => {
    if (dayData.tasks.length > 0) {
      setSelectedDay(dayData)
      setSelectedDayKey(dayKey)
    }
  }

  const month1Weeks = [1, 2, 3, 4, 5].map(weekNum => ({
    weekNum,
    color: WEEK_COLORS[weekNum - 1],
    days: DAY_KEYS.map(dk => ({
      key: `${weekNum}-${dk}`,
      data: CALENDAR_DAYS[`${weekNum}-${dk}`] || { label: "", tasks: [] },
    })),
  }))

  const month2Weeks = [1, 2, 3, 4, 5].map(weekNum => ({
    weekNum,
    color: WEEK_COLORS[(weekNum - 1) % WEEK_COLORS.length],
    days: DAY_KEYS.map(dk => ({
      key: `m2-${weekNum}-${dk}`,
      data: MONTH2_WEEKLY[dk] || { label: "", tasks: [] },
    })),
  }))

  const weeks = activeMonth === "month1" ? month1Weeks : month2Weeks

  const totalTasks = Object.values(CALENDAR_DAYS).reduce((sum, d) => sum + (d?.tasks?.length || 0), 0)
  const totalCompleted = Object.entries(completedTasks).filter(([k, v]) => v && !k.startsWith("m2-")).length

  const showColorScripts = !!(selectedDayKey && (selectedDayKey.includes("5-mon") || selectedDayKey.startsWith("m2-")))

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#1a2744]">
        <div className="max-w-[1100px] mx-auto px-5 pt-6 pb-4">
          <h1 className="text-2xl sm:text-[28px] font-black text-white tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            CREATING EMPOWERED CLIENTS
          </h1>
          <p className="text-base text-slate-400 italic mt-1" style={{ fontFamily: "Georgia, serif" }}>
            {activeMonth === "month1" ? "Month One Guide" : "Month Two Guide"}
          </p>

          {/* Progress bar */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3.5 py-2">
              <span className="text-xs text-slate-400 font-semibold">Progress:</span>
              <span className="text-lg font-extrabold text-[#00A651]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0}%
              </span>
            </div>
            <div className="flex-1 h-2 rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${totalTasks > 0 ? (totalCompleted / totalTasks) * 100 : 0}%`, background: "#00A651" }}
              />
            </div>
          </div>

          {/* Month Tabs */}
          <div className="flex gap-1 mt-4">
            {(["month1", "month2"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveMonth(tab)}
                className="px-6 py-2.5 border-none cursor-pointer font-bold text-[13px] rounded-t-lg transition-colors"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  background: activeMonth === tab ? "#e8ecf1" : "rgba(255,255,255,0.05)",
                  color: activeMonth === tab ? "#1a2744" : "#94a3b8",
                }}
              >
                {tab === "month1" ? "Month One" : "Month Two"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="max-w-[1100px] mx-auto px-5 pb-10">
        {/* Day Headers */}
        <div className="hidden sm:flex gap-1 pt-3 pb-2">
          {DAYS_OF_WEEK.map(d => (
            <div key={d} className="flex-1 text-center font-extrabold text-[11px] text-slate-500 tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {d}
            </div>
          ))}
        </div>

        {/* Mobile: Stack view */}
        <div className="sm:hidden space-y-2 pt-3">
          {weeks.flatMap(week =>
            week.days
              .filter(({ data }) => data.tasks.length > 0)
              .map(({ key, data }) => (
                <div
                  key={key}
                  onClick={() => openDay(data, key)}
                  className="p-3 rounded-lg cursor-pointer"
                  style={{ background: week.color.bg, border: `1px solid ${week.color.border}` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {data.label && (
                        <div className="font-bold text-sm" style={{ color: week.color.header }}>{data.label}</div>
                      )}
                      {data.phase && <div className="text-xs text-gray-500">{data.phase}</div>}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{data.tasks.length} tasks</div>
                  </div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {data.tasks.map((t, i) => (
                      <span key={i} className="text-sm" title={t.title}>{t.icon}</span>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Desktop: Calendar grid */}
        <div className="hidden sm:block space-y-1">
          {weeks.map((week) => (
            <div key={week.weekNum} className="flex gap-1">
              {week.days.map(({ key, data }) => (
                <CalendarCell
                  key={key}
                  day={data}
                  dayKey={key}
                  onClick={() => openDay(data, key)}
                  completedTasks={completedTasks}
                  weekColor={week.color}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
          <p className="text-[13px] text-gray-500 m-0">
            {activeMonth === "month1"
              ? "Click any day to see full task details, copy scripts, and access video links."
              : "Client Support Beyond the First 30 Days — Weekly rhythm: Monday Renpho + Color Day → Tuesday/Wednesday Office Hours → Mid-Week Touchpoint"
            }
          </p>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedDay && selectedDayKey && (
        <DetailDrawer
          day={selectedDay}
          dayKey={selectedDayKey}
          onClose={() => { setSelectedDay(null); setSelectedDayKey(null) }}
          completedTasks={completedTasks}
          onToggle={toggleTask}
          showColorScripts={showColorScripts}
        />
      )}
    </div>
  )
}
