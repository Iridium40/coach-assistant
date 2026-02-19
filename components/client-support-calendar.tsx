"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {
  CALENDAR_DAYS,
  MONTH2_WEEKLY,
  type CalendarTask,
  type CalendarDayData,
  loadCompletedTasks,
  saveCompletedTasks,
  getMonth1TotalTasks,
} from "@/lib/client-calendar-data"

// ========================================
// VISUAL CONSTANTS
// ========================================
interface WeekColor {
  bg: string
  border: string
  header: string
}

const WEEK_COLORS: WeekColor[] = [
  { bg: "#dbeafe", border: "#93c5fd", header: "#1e40af" },
  { bg: "#ede9fe", border: "#c4b5fd", header: "#5b21b6" },
  { bg: "#ffe4e6", border: "#fda4af", header: "#be123c" },
  { bg: "#fce7f3", border: "#f9a8d4", header: "#be185d" },
  { bg: "#ccfbf1", border: "#5eead4", header: "#0f766e" },
]

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

// Map calendar day keys to program day numbers for highlighting "today"
const KEY_TO_PROGRAM_DAY: Record<string, number> = {
  "1-sun": 0, "1-mon": 1, "1-tue": 2, "1-wed": 3, "1-thu": 4,
  "2-mon": 8, "2-wed": 10,
  "3-mon": 15, "3-tue": 16, "3-wed": 17,
  "4-mon": 22, "4-tue": 23, "4-wed": 24, "4-thu": 25,
  "5-mon": 29, "5-tue": 30, "5-wed": 31,
}

function getProgramDayFromStartDate(startDate: string): number {
  const start = new Date(startDate)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const diffTime = today.getTime() - startDay.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
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
  isCurrentDay,
}: {
  day: CalendarDayData
  dayKey: string
  onClose: () => void
  completedTasks: Record<string, boolean>
  onToggle: (key: string) => void
  showColorScripts: boolean
  isCurrentDay: boolean
}) {
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null)

  const copyText = (text: string, idx: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  const buildCopyAllText = (): string => {
    const usedUrls = new Set<string>()

    // Build a list of tasks with URLs for placeholder matching
    const urlTasks = day.tasks
      .filter(t => t.videoUrl || t.graphicPlaceholder || t.resourceUrl)
      .map(t => ({
        url: (t.videoUrl || t.graphicPlaceholder || t.resourceUrl)!,
        titleWords: t.title.toLowerCase().split(/\s+/).filter(w => w.length > 3),
        icon: t.icon,
        title: t.title,
      }))

    // Collect scripts and inline matching URLs at placeholder locations
    let scriptText = day.tasks
      .filter(t => t.hasScript && t.script)
      .map(t => t.script!)
      .join("\n\n")

    // Replace __PLACEHOLDER__ patterns with matching URLs
    scriptText = scriptText.replace(/__([^_]+)__/g, (match, inner) => {
      const innerLower = inner.toLowerCase()
      const found = urlTasks.find(ut => ut.titleWords.some(w => innerLower.includes(w)) && !usedUrls.has(ut.url))
      if (found) {
        usedUrls.add(found.url)
        return `${match}\n👉 ${found.url}`
      }
      return match
    })

    // Replace [PLACEHOLDER] patterns (uppercase, 4+ chars) with matching URLs
    scriptText = scriptText.replace(/\[([A-Z][^\]]{3,})\]/g, (match, inner) => {
      const innerLower = inner.toLowerCase()
      const found = urlTasks.find(ut => ut.titleWords.some(w => innerLower.includes(w)) && !usedUrls.has(ut.url))
      if (found) {
        usedUrls.add(found.url)
        return `${match}\n👉 ${found.url}`
      }
      return match
    })

    const parts = [scriptText]

    // Append any media that wasn't inlined via placeholder
    const remaining = urlTasks.filter(ut => !usedUrls.has(ut.url))
    if (remaining.length > 0) {
      parts.push("📎 Resources & Media:\n" + remaining.map(r => `${r.icon} ${r.title}: ${r.url}`).join("\n"))
    }

    return parts.join("\n\n")
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-[min(480px,90vw)] bg-white h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-5" style={{ background: "linear-gradient(135deg, hsl(176, 57.6%, 38.8%), hsl(176, 53.6%, 46.5%))" }}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors">
            ✕
          </button>
          {isCurrentDay && (
            <span className="inline-block px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900 text-[10px] font-bold uppercase tracking-wider mb-1">
              Today
            </span>
          )}
          {day.phase && <div className="text-[13px] text-white/80 font-medium">{day.phase}</div>}
          <div className="text-[22px] font-extrabold text-white mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {day.label || "Tasks"}
          </div>
          <div className="text-xs text-white/70 mt-1">{day.tasks.length} task{day.tasks.length !== 1 ? "s" : ""}</div>
        </div>

        {/* Tasks */}
        <div className="p-4 space-y-3">
          {/* Copy All button */}
          <button
            onClick={() => copyText(buildCopyAllText(), "copy-all")}
            className="w-full py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
            style={{
              background: copiedIdx === "copy-all" ? "#d1fae5" : "linear-gradient(135deg, hsl(176, 57.6%, 38.8%), hsl(176, 53.6%, 46.5%))",
              color: copiedIdx === "copy-all" ? "#065f46" : "#ffffff",
              border: copiedIdx === "copy-all" ? "1px solid #bbf7d0" : "none",
            }}
          >
            {copiedIdx === "copy-all" ? "✅ Copied Everything!" : "📋 Copy All — Script + Links"}
          </button>
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
                      borderColor: done ? "#37B6AE" : "#d1d5db",
                      background: done ? "#37B6AE" : "transparent",
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
  isCurrentDay,
}: {
  day: CalendarDayData
  dayKey: string
  onClick: () => void
  completedTasks: Record<string, boolean>
  weekColor: WeekColor
  isCurrentDay: boolean
}) {
  const hasTasks = day.tasks.length > 0
  const completedCount = hasTasks ? day.tasks.filter((_, i) => completedTasks[`${dayKey}-${i}`]).length : 0
  const allDone = hasTasks && completedCount === day.tasks.length

  return (
    <div
      onClick={hasTasks ? onClick : undefined}
      className={`flex-1 min-w-0 min-h-[100px] p-2 rounded-md transition-all relative hover:scale-[1.02] hover:z-10 ${isCurrentDay ? "ring-2 ring-yellow-400 ring-offset-1" : ""}`}
      style={{
        background: hasTasks ? weekColor.bg : "#f9fafb",
        border: allDone ? "2px solid #37B6AE" : `1px solid ${hasTasks ? weekColor.border : "#e5e7eb"}`,
        cursor: hasTasks ? "pointer" : "default",
        opacity: hasTasks ? 1 : 0.5,
      }}
    >
      {isCurrentDay && (
        <div className="absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-400 text-yellow-900 uppercase tracking-wider">
          Today
        </div>
      )}
      {allDone && <div className="absolute top-1 right-1 text-xs">✅</div>}
      {day.label && (
        <div
          className={`font-bold text-[11px] mb-0.5 uppercase tracking-wide ${isCurrentDay ? "mt-4" : ""}`}
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
            style={{ width: `${(completedCount / day.tasks.length) * 100}%`, background: "#37B6AE" }}
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
  const searchParams = useSearchParams()
  const clientId = searchParams.get("clientId") || ""
  const clientName = searchParams.get("clientName") || ""
  const startDateParam = searchParams.get("startDate") || ""

  const [activeMonth, setActiveMonth] = useState<"month1" | "month2">("month1")
  const [selectedDay, setSelectedDay] = useState<CalendarDayData | null>(null)
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null)
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})

  const programDay = startDateParam ? getProgramDayFromStartDate(startDateParam) : null

  // Load persisted progress for this client
  useEffect(() => {
    if (clientId) {
      setCompletedTasks(loadCompletedTasks(clientId))
    }
  }, [clientId])

  const toggleTask = useCallback((key: string) => {
    setCompletedTasks(prev => {
      const next = { ...prev, [key]: !prev[key] }
      if (clientId) {
        saveCompletedTasks(clientId, next)
      }
      return next
    })
  }, [clientId])

  const openDay = (dayData: CalendarDayData, dayKey: string) => {
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

  const totalTasks = getMonth1TotalTasks()
  const totalCompleted = Object.entries(completedTasks).filter(([k, v]) => v && !k.startsWith("m2-")).length

  const showColorScripts = !!(selectedDayKey && (selectedDayKey.includes("5-mon") || selectedDayKey.startsWith("m2-")))

  // Check if a given day key is "today" for this client
  const isDayCurrentDay = (dayKey: string): boolean => {
    if (!programDay || dayKey.startsWith("m2-")) return false
    const dayProgram = KEY_TO_PROGRAM_DAY[dayKey]
    return dayProgram !== undefined && dayProgram === programDay
  }

  const isSelectedDayCurrentDay = !!(selectedDayKey && isDayCurrentDay(selectedDayKey))

  return (
    <div className="min-h-screen bg-[hsl(var(--optavia-bg-alt))]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))]">
        <div className="max-w-[1100px] mx-auto px-5 pt-6 pb-4">
          {/* Back link when viewing for a specific client */}
          {clientId && (
            <Link
              href="/client-tracker"
              className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-3 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Client Tracker
            </Link>
          )}

          <h1 className="text-2xl sm:text-[28px] font-black text-white tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {clientName ? `${clientName.toUpperCase()}'S JOURNEY` : "CLIENT SUPPORT CALENDAR"}
          </h1>
          <p className="text-base text-white/70 italic mt-1" style={{ fontFamily: "Georgia, serif" }}>
            {activeMonth === "month1" ? "Month One Guide" : "Month Two Guide"}
            {programDay !== null && programDay > 0 && (
              <span className="not-italic text-white/90 ml-2">
                — Day {programDay}
              </span>
            )}
          </p>

          {/* Progress bar — only shown when viewing for a specific client */}
          {clientId && (
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3.5 py-2">
                <span className="text-xs text-white/70 font-semibold">Progress:</span>
                <span className="text-lg font-extrabold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0}%
                </span>
              </div>
              <div className="flex-1 h-2 rounded-full bg-white/20">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-white"
                />
              </div>
              <div className="text-xs text-white/80 font-medium">
                {totalCompleted}/{totalTasks}
              </div>
            </div>
          )}

          {/* Month Tabs */}
          <div className="flex gap-1 mt-4">
            {(["month1", "month2"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveMonth(tab)}
                className="px-6 py-2.5 border-none cursor-pointer font-bold text-[13px] rounded-t-lg transition-colors"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  background: activeMonth === tab ? "#ffffff" : "rgba(255,255,255,0.15)",
                  color: activeMonth === tab ? "hsl(176, 53.6%, 46.5%)" : "rgba(255,255,255,0.7)",
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
              .map(({ key, data }) => {
                const isCurrent = isDayCurrentDay(key)
                return (
                  <div
                    key={key}
                    onClick={() => openDay(data, key)}
                    className={`p-3 rounded-lg cursor-pointer ${isCurrent ? "ring-2 ring-yellow-400" : ""}`}
                    style={{ background: week.color.bg, border: `1px solid ${week.color.border}` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isCurrent && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-400 text-yellow-900 uppercase">Today</span>
                        )}
                        <div>
                          {data.label && (
                            <div className="font-bold text-sm" style={{ color: week.color.header }}>{data.label}</div>
                          )}
                          {data.phase && <div className="text-xs text-gray-500">{data.phase}</div>}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {data.tasks.filter((_, i) => completedTasks[`${key}-${i}`]).length}/{data.tasks.length}
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {data.tasks.map((t, i) => (
                        <span key={i} className={`text-sm ${completedTasks[`${key}-${i}`] ? "opacity-40" : ""}`} title={t.title}>{t.icon}</span>
                      ))}
                    </div>
                  </div>
                )
              })
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
                  isCurrentDay={isDayCurrentDay(key)}
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
          isCurrentDay={isSelectedDayCurrentDay}
        />
      )}
    </div>
  )
}
