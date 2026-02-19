// Shared calendar data and utilities used by both the calendar page and client card progress

export interface CalendarTask {
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

export interface CalendarDayData {
  label: string
  phase?: string
  tasks: CalendarTask[]
}

export const CALENDAR_DAYS: Record<string, CalendarDayData> = {
  "1-sun": {
    label: "Day Before Start",
    phase: "Pre-Start",
    tasks: [
      { type: "text", title: "Day Before Start Text", icon: "💬", hasScript: true, script: `I'm so excited for you… tomorrow is Day 1 of your Metabolic Reset, and tonight is just about getting ready so you can wake up and roll right into success. 🙌🏼 Here's your quick Pre-Day 1 checklist so we're all synced up for the morning:\n\n1️⃣ Watch this 20 minute video and read through the spiral guide that came in your box. We will have a quick 15-20 minute call to make sure you feel clear about YOUR path to fat burn.\n👇 See video & resource links below\n\n2️⃣ Save this Client Linktree to your phone\n\n3️⃣ Have your Renpho charged and ready. First thing tomorrow, hop on your scale before water, coffee, or clothes.\n✔️ Weight ✔️ Body fat % ✔️ Visceral fat ✔️ Skeletal muscle % ✔️ Metabolic age ✔️ Protein % ✔️ Hydration %\n\n4️⃣ Grab a tape measure. Tomorrow morning, measure your W.A.T.C.H.=Waist, Arm, Thigh, Chest, Hips\n\n5️⃣ Hydration plan ready. Fill a water bottle tonight… 💦\n\n6️⃣ Lay out your 5 fuelings + Lean & Green plan. ✨\n\n7️⃣ Sleep! Your metabolism loves a solid night's sleep. 😴\n\n8️⃣ Your mindset. This isn't about perfection…it's about consistency. 🤝\n\nText me in the morning with:\n📍 Renpho reading 📍 Measurements 📍 How you're feeling\n\nAnd then… we're off! 🚀` },
      { type: "video", title: "Kickoff Call Video", icon: "🎬", videoUrl: "https://vimeo.com/1158234614/d128997deb" },
      { type: "resource", title: "5&1 Tracker", icon: "📋", note: "Mention in the Kickoff Call", graphicPlaceholder: "https://rcucmbujkdwvrcjistub.supabase.co/storage/v1/object/public/CEC/5-and-1-daily-tracker.png" },
      { type: "video", title: "Lean and Green Video", icon: "🥗", videoUrl: "https://vimeo.com/414057972" },
    ]
  },
  "1-mon": {
    label: "Day 1",
    phase: "Foundation Day",
    tasks: [
      { type: "graphic", title: "Send Daily Graphic", icon: "🖼", graphicPlaceholder: "https://rcucmbujkdwvrcjistub.supabase.co/storage/v1/object/public/CEC/day-1-foundation-day.png" },
      { type: "text", title: "Send Day 1 Text", icon: "💬", hasScript: true, script: `🌅 DAY 1 — FOUNDATION DAY\nHELLO Day 1!! 🎉\nWelcome to your reset — and take a breath. This works when it's simple. No perfection. No pressure. No overthinking. Just consistency.\n\nHere's your only focus today: Your 5 Fat-Burn Anchors\n1️⃣ Choose 5 fuelings + keep backups nearby (purse, car, desk = success strategy 😅)\n2️⃣ Hydrate like it matters (64–100 oz water) + aim for 7 hours sleep\n3️⃣ Eat within 30 min of waking → then every 2–3 hours\n4️⃣ Follow the plan precisely — if it's not in the guide, it's not in your mouth\n5️⃣ Track it. Awareness creates results.\n\n🔥 Fat burn loves structure.\n🔥 Simplicity = consistency.\n🔥 Consistency = transformation.\n\nToday is about establishing rhythm, not chasing results.\n📸 Please weigh in today (smart scale data is gold), take pics + measurements. This is your baseline.\n\nText me what's for dinner tonight 💚 We're building momentum from Day 1.` },
      { type: "video", title: "What is Fat Burn Video", icon: "🔥", videoUrl: "https://vimeo.com/1044531642/fde0ddc92e" },
      { type: "call", title: "Daily Check In Questions Days 1-4", icon: "📞", hasScript: true, script: `DAY 1-4 DAILY CHECK IN QUESTIONS\n*Important to not provide the answers to them*\n\n• What time did you wake up?\n• What time did you eat for the first time?\n• Do you drink coffee? Do you put anything in your coffee?\n• How many ounces of water have you had today?\n• Did you set your timers / use the eat wise app?\n  - How far apart?\n• Did you go past 3 hours at any time without eating?\n  - How many fuelings have you had in your day?\n• What did you have for your lean and green meal?\n  - How many ounces of protein (before or after you cooked it)?\n• How many servings of vegetables?\n• Did you measure or weigh your vegetables?\n• What time are you planning to go to bed?\n• When time is your last fueling?\n  - If you come close to the 2.5 hr mark and you are not asleep, please add a small serving of protein in to balance your blood sugars.\n• Did you eat anything outside of the program today?\n\nLet us know if you have any EXTRA activity in your day!!!` },
    ]
  },
  "1-tue": {
    label: "Day 2",
    phase: "Transition Day",
    tasks: [
      { type: "graphic", title: "Daily Graphic", icon: "🖼", graphicPlaceholder: "https://rcucmbujkdwvrcjistub.supabase.co/storage/v1/object/public/CEC/day-2-transition-day.png" },
      { type: "text", title: "Day 2 Text", icon: "💬", hasScript: true, script: `🌤 DAY 2 — TRANSITION DAY\nHELLO Day 2!! 🤍\nYour body is shifting gears — and that's a good thing.\nYou're moving from sugar-burning → fat-burning.\n\nIf you feel:\n• tired • foggy • a little hungry • headache-ish • low energy\nThat's not failure — it's metabolic adaptation.\n\nSupport tools:\n🥒 Dill pickle or celery\n🍵 Chicken broth\n💧 Sugar-free electrolytes (up to 3/day)\n🚰 Extra water\n\nWhen insulin drops, your body releases water + minerals — replacing them keeps fat burn smooth and comfortable. This phase passes quickly — and what follows is:\n⚡ energy 😴 better sleep 🔥 fat loss 🧠 mental clarity 🍽 less hunger\n\nSmall mindset task today: Create a non-food reward list for every 10 lbs lost (new clothes, massage, trip, gym shoes, facial, nails, etc.) Send it to me 💛\n\nSuccess is built with structure + support — and you're not doing this alone.\n📸 Send me your Day 1 tracker when you can.` },
      { type: "call", title: "Daily Check In Questions Days 1-4", icon: "📞" },
    ]
  },
  "1-wed": {
    label: "Day 3",
    phase: "Ignition Day",
    tasks: [
      { type: "graphic", title: "Daily Graphic + Day 3 Text", icon: "🖼", graphicPlaceholder: "https://rcucmbujkdwvrcjistub.supabase.co/storage/v1/object/public/CEC/day-3-ignition-day.png" },
      { type: "text", title: "Day 3 Text", icon: "💬", hasScript: true, script: `🌱 DAY 3 — IGNITION DAY\nHELLO Day 3!! ✨\nYou're approaching fat-burn ignition 🔥\nThis is where the magic starts happening internally — even if the scale hasn't caught up yet.\n\nWatch this video to shift your mindset to success:\n👇 See video link below\n\nFocus today:\n• Weigh + measure your Lean & Green\n• Eat every 2–3 hours\n• Stay hydrated\n• Track everything\n• No improvising — structure creates results\n\nThis isn't a diet — it's metabolic retraining.\n\n📸 Snap your tracker + send it to me — I want to coach you, not just cheer you on 💪` },
      { type: "video", title: "Chasing Your Goals Instead of Chasing Taste Video", icon: "🎯", videoUrl: "https://vimeo.com/723522647" },
      { type: "call", title: "Daily Check In Questions Days 1-4", icon: "📞" },
    ]
  },
  "1-thu": {
    label: "Day 4",
    phase: "Fat Burn Day",
    tasks: [
      { type: "graphic", title: "Daily Graphic + Day 4 Text", icon: "🖼", graphicPlaceholder: "https://rcucmbujkdwvrcjistub.supabase.co/storage/v1/object/public/CEC/day-4-fat-burn-day.png" },
      { type: "text", title: "Day 4 Text", icon: "💬", hasScript: true, script: `🔥 DAY 4 — FAT BURN DAY\nHELLO Day 4!! 🔥\nYou should officially be entering fat-burning mode today.\nIf hunger pops up:\n🚰 Drink water ⏱ Wait 15 minutes\n\nMost of the time it passes — it's habit hunger, not true hunger.\n\nWhat starts happening now:\n✔ More energy ✔ Better sleep ✔ Reduced cravings ✔ Clearer thinking ✔ Fat loss momentum ✔ Appetite regulation\n\nThis is where people start saying: "I don't feel obsessed with food anymore."\nAnd that's metabolic freedom.\n\n💬 Reflection question: Who in your life would benefit from feeling this way too?\n\n📸 Send me your updated tracker. Let's lock in this fat-burn phase strong.` },
      { type: "call", title: "Daily Check In Questions Days 1-4", icon: "📞" },
      { type: "video", title: "Send How to Protect Your Hard-Earned Fat Burn", icon: "🛡", videoUrl: "https://vimeo.com/1163428641", note: "Send AFTER the Day 4 call" },
    ]
  },
  "1-fri": { label: "", tasks: [] },
  "1-sat": { label: "", tasks: [] },
  "2-sun": { label: "", tasks: [] },
  "2-mon": {
    label: "Day 8",
    phase: "Celebration",
    tasks: [
      { type: "graphic", title: "Daily Graphic", icon: "🖼", graphicPlaceholder: "https://rcucmbujkdwvrcjistub.supabase.co/storage/v1/object/public/CEC/day-8-celebration-community.png" },
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
      { type: "text", title: "Red/Yellow/Green Support Model Text", icon: "🚦", hasScript: true, script: `Hey {firstName} 💛\nI am so proud of you…you have officially graduated to our next level of support! 🎉\n\nWe use a simple Red • Yellow • Green system\nThese are not labels, but signals to help us support you in the best way possible.\n\n👉 Starting now, when you check in on Monday mornings, please send:\n• Your smart scale full report (if you have one)\n• AND the color that best describes your week.\n\n🟢 Green — things are flowing\n🟡 Yellow — a small adjustment is needed\n🔴 Red — you need extra support\n\n🔥 Coach Office Hours are live, open-support Zoom calls.\n👉 If you're Yellow or Red, we strongly encourage you to attend that week.\nEven Green clients are welcome!\n\n⬇️ Please watch this short video + save these graphics ⬇️` },
      { type: "video", title: "How to Use Office Hours Video", icon: "🎬", videoUrl: "https://youtu.be/phRN32R_pHc" },
      { type: "graphic", title: "Office Hours Graphic", icon: "🖼", graphicPlaceholder: "https://rcucmbujkdwvrcjistub.supabase.co/storage/v1/object/public/CEC/office-hours-graphic.png" },
      { type: "graphic", title: "Client R/Y/G Support Graphic", icon: "🚦", graphicPlaceholder: "https://rcucmbujkdwvrcjistub.supabase.co/storage/v1/object/public/CEC/client-ryg-support-graphic.png" },
    ]
  },
  "4-fri": { label: "", tasks: [] },
  "4-sat": { label: "", tasks: [] },
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

export const MONTH2_WEEKLY: Record<string, CalendarDayData> = {
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

// Total Month 1 tasks (only days with actual tasks)
export function getMonth1TotalTasks(): number {
  return Object.values(CALENDAR_DAYS).reduce((sum, d) => sum + (d?.tasks?.length || 0), 0)
}

// Map program day (1-based) to the calendar day key
// The calendar uses a week/day-of-week grid where:
//   Week 1: Sun=pre-start, Mon=Day1, Tue=Day2, Wed=Day3, Thu=Day4, Fri/Sat=off
//   Week 2: Mon=Day8, Wed=mid-week check-in, etc.
// We map linearly: program day to the calendar key that represents it.
const PROGRAM_DAY_TO_KEY: Record<number, string> = {
  0: "1-sun",   // Day before start
  1: "1-mon",
  2: "1-tue",
  3: "1-wed",
  4: "1-thu",
  8: "2-mon",
  10: "2-wed",
  15: "3-mon",
  16: "3-tue",
  17: "3-wed",
  22: "4-mon",
  23: "4-tue",
  24: "4-wed",
  25: "4-thu",
  29: "5-mon",
  30: "5-tue",
  31: "5-wed",
}

export function getCalendarKeyForProgramDay(programDay: number): string | null {
  return PROGRAM_DAY_TO_KEY[programDay] || null
}

// Get tasks that are due on or before the given program day (Month 1 only)
export function getTasksDueByDay(programDay: number): { key: string; taskIndex: number }[] {
  const result: { key: string; taskIndex: number }[] = []
  for (const [day, calKey] of Object.entries(PROGRAM_DAY_TO_KEY)) {
    const dayNum = parseInt(day)
    if (dayNum <= programDay) {
      const dayData = CALENDAR_DAYS[calKey]
      if (dayData?.tasks?.length) {
        dayData.tasks.forEach((_, i) => {
          result.push({ key: calKey, taskIndex: i })
        })
      }
    }
  }
  return result
}

// localStorage key for a client's calendar progress
export function getStorageKey(clientId: string): string {
  return `client-calendar-${clientId}`
}

// Load completed tasks from localStorage for a client
export function loadCompletedTasks(clientId: string): Record<string, boolean> {
  if (typeof window === "undefined") return {}
  try {
    const stored = localStorage.getItem(getStorageKey(clientId))
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

// Save completed tasks to localStorage for a client
export function saveCompletedTasks(clientId: string, tasks: Record<string, boolean>): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(getStorageKey(clientId), JSON.stringify(tasks))
  } catch {
    // localStorage full or unavailable
  }
}

// Calculate completion stats for a client
export function getClientCalendarProgress(clientId: string, programDay: number): {
  totalDue: number
  completed: number
  percentage: number
} {
  const completedTasks = loadCompletedTasks(clientId)
  const tasksDue = getTasksDueByDay(programDay)
  const totalDue = tasksDue.length
  const completed = tasksDue.filter(t => completedTasks[`${t.key}-${t.taskIndex}`]).length

  return {
    totalDue,
    completed,
    percentage: totalDue > 0 ? Math.round((completed / totalDue) * 100) : 0,
  }
}
