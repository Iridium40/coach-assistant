"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Copy, Check, ExternalLink } from "lucide-react"
import {
  CALENDAR_DAYS,
  MONTH2_WEEKLY,
  type CalendarTask,
  type CalendarDayData,
  loadCompletedTasks,
  saveCompletedTasks,
  getMonth1TotalTasks,
} from "@/lib/client-calendar-data"

const WEEK_COLORS = [
  { bg: "#dbeafe", border: "#93c5fd", header: "#1e40af", label: "Week 1" },
  { bg: "#ede9fe", border: "#c4b5fd", header: "#5b21b6", label: "Week 2" },
  { bg: "#ffe4e6", border: "#fda4af", header: "#be123c", label: "Week 3" },
  { bg: "#fce7f3", border: "#f9a8d4", header: "#be185d", label: "Week 4" },
  { bg: "#ccfbf1", border: "#5eead4", header: "#0f766e", label: "Week 5" },
]

const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

const TASK_BADGE_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  text: { bg: "#dbeafe", color: "#1e40af", label: "TEXT" },
  graphic: { bg: "#fce7f3", color: "#be185d", label: "GRAPHIC" },
  video: { bg: "#fef3c7", color: "#92400e", label: "VIDEO" },
  call: { bg: "#d1fae5", color: "#065f46", label: "CALL" },
  resource: { bg: "#e0e7ff", color: "#3730a3", label: "LINK" },
  action: { bg: "#f3e8ff", color: "#6b21a8", label: "ACTION" },
}

const COLOR_SCRIPTS = {
  green: { emoji: "🟢", label: "GREEN", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", script: `Love seeing GREEN 💚\nThat tells me things are flowing!!! Great job staying consistent. Keep doing what you're doing and let's keep the momentum going this week. I'll be cheering you on!` },
  yellow: { emoji: "🟡", label: "YELLOW", color: "#ca8a04", bg: "#fefce8", border: "#fef08a", script: `Thanks for checking in and choosing YELLOW 💛\nThat's a great signal to make a small tweak before frustration builds. Coach Office Hours will be the best next step for clarity this week. Bring your questions and we'll get you dialed in. I've got you!` },
  red: { emoji: "🔴", label: "RED", color: "#dc2626", bg: "#fef2f2", border: "#fecaca", script: `Thank you for being honest and choosing RED ❤️\nThis is just a signal… it tells us it's time to lean into support. Please plan to attend Coach Office Hours this week. When is a good time for you and I to do a quick Systems Check call so we can reset and move forward together.` },
}

// Map program day to calendar week number (1-based)
function getWeekForDay(programDay: number): number {
  if (programDay <= 0) return 1
  if (programDay <= 6) return 1  // Pre-start + Days 1-4 + Fri/Sat
  if (programDay <= 13) return 2
  if (programDay <= 20) return 3
  if (programDay <= 27) return 4
  return 5
}

// Map calendar day keys to program day numbers
const KEY_TO_PROGRAM_DAY: Record<string, number> = {
  "1-sun": 0, "1-mon": 1, "1-tue": 2, "1-wed": 3, "1-thu": 4,
  "2-mon": 8, "2-wed": 10,
  "3-mon": 15, "3-tue": 16, "3-wed": 17,
  "4-mon": 22, "4-tue": 23, "4-wed": 24, "4-thu": 25,
  "5-mon": 29, "5-tue": 30, "5-wed": 31,
}

interface ClientCalendarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientId: string
  clientName: string
  startDate: string
  programDay: number
}

export function ClientCalendarDialog({
  open,
  onOpenChange,
  clientId,
  clientName,
  startDate,
  programDay,
}: ClientCalendarDialogProps) {
  const isMonth2 = programDay > 30
  const initialWeek = isMonth2 ? 1 : getWeekForDay(programDay)
  const [currentWeek, setCurrentWeek] = useState(initialWeek)
  const [viewMonth2, setViewMonth2] = useState(isMonth2)
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})
  const [selectedDay, setSelectedDay] = useState<{ data: CalendarDayData; key: string } | null>(null)
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null)

  useEffect(() => {
    if (open && clientId) {
      setCompletedTasks(loadCompletedTasks(clientId))
      setCurrentWeek(isMonth2 ? 1 : getWeekForDay(programDay))
      setViewMonth2(isMonth2)
      setSelectedDay(null)
    }
  }, [open, clientId, programDay, isMonth2])

  const toggleTask = useCallback((key: string) => {
    setCompletedTasks(prev => {
      const next = { ...prev, [key]: !prev[key] }
      if (clientId) saveCompletedTasks(clientId, next)
      return next
    })
  }, [clientId])

  const copyText = (text: string, idx: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  // Build week data
  const weekDays = viewMonth2
    ? DAY_KEYS.map(dk => ({
        key: `m2-${currentWeek}-${dk}`,
        data: MONTH2_WEEKLY[dk] || { label: "", tasks: [] },
      }))
    : DAY_KEYS.map(dk => ({
        key: `${currentWeek}-${dk}`,
        data: CALENDAR_DAYS[`${currentWeek}-${dk}`] || { label: "", tasks: [] },
      }))

  const weekColor = WEEK_COLORS[(currentWeek - 1) % WEEK_COLORS.length]
  const maxWeek = viewMonth2 ? 4 : 5
  const weekLabel = viewMonth2
    ? `Month 2 — Week ${currentWeek}`
    : `${weekColor.label} ${currentWeek === 1 ? "(Pre-Start + Days 1-4)" : ""}`

  const totalTasks = getMonth1TotalTasks()
  const totalCompleted = Object.entries(completedTasks).filter(([k, v]) => v && !k.startsWith("m2-")).length
  const pct = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0

  // Current day detection
  const isDayCurrentDay = (dayKey: string): boolean => {
    if (viewMonth2 || dayKey.startsWith("m2-")) return false
    const dp = KEY_TO_PROGRAM_DAY[dayKey]
    return dp !== undefined && dp === programDay
  }

  const showColorScripts = viewMonth2 || currentWeek === 5

  // Tasks with content for this week
  const activeDays = weekDays.filter(d => d.data.tasks.length > 0)
  const weekTotalTasks = activeDays.reduce((sum, d) => sum + d.data.tasks.length, 0)
  const weekCompletedTasks = activeDays.reduce((sum, d) =>
    sum + d.data.tasks.filter((_, i) => completedTasks[`${d.key}-${i}`]).length, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0">
        {/* Header */}
        <div className="px-5 py-4 bg-[#1a2744] text-white rounded-t-lg flex-shrink-0">
          <div className="text-lg font-extrabold tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {clientName}&apos;s Journey
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-sm text-slate-300">
            <span>Day {programDay}</span>
            <span className="text-slate-500">•</span>
            <span>{pct}% complete ({totalCompleted}/{totalTasks})</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-white/10">
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "#00A651" }} />
          </div>
        </div>

        {/* Week navigation */}
        <div className="px-5 py-3 border-b flex items-center justify-between bg-gray-50 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (currentWeek === 1 && !viewMonth2) return
              if (currentWeek === 1 && viewMonth2) {
                setViewMonth2(false)
                setCurrentWeek(5)
              } else {
                setCurrentWeek(w => w - 1)
              }
              setSelectedDay(null)
            }}
            disabled={currentWeek === 1 && !viewMonth2}
            className="h-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev
          </Button>

          <div className="text-center">
            <div className="font-bold text-sm" style={{ color: weekColor.header }}>
              {weekLabel}
            </div>
            <div className="text-[11px] text-gray-500">
              {weekCompletedTasks}/{weekTotalTasks} tasks done
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (currentWeek >= maxWeek && !viewMonth2) {
                setViewMonth2(true)
                setCurrentWeek(1)
              } else if (currentWeek >= 4 && viewMonth2) {
                return
              } else {
                setCurrentWeek(w => w + 1)
              }
              setSelectedDay(null)
            }}
            disabled={currentWeek >= 4 && viewMonth2}
            className="h-8"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Month toggle pills */}
        <div className="px-5 pt-2 pb-1 flex gap-2 flex-shrink-0">
          <button
            onClick={() => { setViewMonth2(false); setCurrentWeek(isMonth2 ? 5 : getWeekForDay(programDay)); setSelectedDay(null) }}
            className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${!viewMonth2 ? "bg-[#1a2744] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
          >
            Month 1
          </button>
          <button
            onClick={() => { setViewMonth2(true); setCurrentWeek(1); setSelectedDay(null) }}
            className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${viewMonth2 ? "bg-[#1a2744] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
          >
            Month 2
          </button>
        </div>

        {/* Week content */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {selectedDay ? (
            /* Task detail view */
            <div>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-xs text-gray-500 hover:text-gray-700 mb-3 flex items-center gap-1"
              >
                <ChevronLeft className="h-3 w-3" /> Back to week
              </button>

              <div className="rounded-lg p-3 mb-3" style={{ background: weekColor.bg, borderLeft: `4px solid ${weekColor.header}` }}>
                {isDayCurrentDay(selectedDay.key) && (
                  <span className="inline-block px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900 text-[9px] font-bold uppercase tracking-wider mb-1 mr-2">Today</span>
                )}
                <div className="font-bold text-sm" style={{ color: weekColor.header }}>
                  {selectedDay.data.label || "Tasks"}
                </div>
                {selectedDay.data.phase && (
                  <div className="text-xs text-gray-600 mt-0.5">{selectedDay.data.phase}</div>
                )}
              </div>

              {/* Copy All button */}
              <button
                onClick={() => {
                  const parts: string[] = []
                  for (const task of selectedDay.data.tasks) {
                    if (task.hasScript && task.script) parts.push(task.script)
                  }
                  const links: string[] = []
                  for (const task of selectedDay.data.tasks) {
                    if (task.videoUrl) links.push(`${task.icon} ${task.title}: ${task.videoUrl}`)
                    if (task.graphicPlaceholder) links.push(`${task.icon} ${task.title}: ${task.graphicPlaceholder}`)
                    if (task.resourceUrl) links.push(`${task.icon} ${task.title}: ${task.resourceUrl}`)
                  }
                  if (links.length > 0) {
                    parts.push("\n---\n📎 Resources & Media:\n" + links.join("\n"))
                  }
                  copyText(parts.join("\n\n"), "copy-all")
                }}
                className="w-full py-2 rounded-lg font-bold text-[13px] transition-colors flex items-center justify-center gap-2 mb-2"
                style={{
                  background: copiedIdx === "copy-all" ? "#d1fae5" : "linear-gradient(135deg, #003B2E, #00A651)",
                  color: copiedIdx === "copy-all" ? "#065f46" : "#ffffff",
                  border: copiedIdx === "copy-all" ? "1px solid #bbf7d0" : "none",
                }}
              >
                {copiedIdx === "copy-all" ? "✅ Copied Everything!" : "📋 Copy All — Script + Links"}
              </button>

              <div className="space-y-2">
                {selectedDay.data.tasks.map((task, i) => {
                  const taskKey = `${selectedDay.key}-${i}`
                  const done = !!completedTasks[taskKey]
                  return (
                    <div key={i} className="rounded-lg p-3 border" style={{ borderColor: done ? "#bbf7d0" : "#e5e7eb", background: done ? "#f0fdf4" : "#fafafa" }}>
                      <div className="flex items-start gap-2">
                        <button
                          onClick={() => toggleTask(taskKey)}
                          className="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center text-[10px] text-white"
                          style={{ borderColor: done ? "#00A651" : "#d1d5db", background: done ? "#00A651" : "transparent" }}
                        >
                          {done && "✓"}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-sm">{task.icon}</span>
                            <span className={`font-semibold text-[13px] ${done ? "text-gray-400 line-through" : "text-gray-900"}`}>{task.title}</span>
                            <TaskBadge type={task.type} />
                          </div>
                          {task.note && <p className="text-[11px] text-amber-600 font-semibold italic mt-1">⚠️ {task.note}</p>}

                          <div className="flex gap-1.5 mt-2 flex-wrap">
                            {task.hasScript && task.script && (
                              <CopyButton label="Copy Script" text={task.script} idx={`script-${i}`} copiedIdx={copiedIdx} onCopy={copyText} color="#1e40af" bgColor="#eff6ff" borderColor="#dbeafe" />
                            )}
                            {task.videoUrl && (
                              <>
                                <CopyButton label="Copy Link" text={task.videoUrl} idx={`video-${i}`} copiedIdx={copiedIdx} onCopy={copyText} color="#92400e" bgColor="#fffbeb" borderColor="#fef3c7" />
                                <button onClick={() => window.open(task.videoUrl, "_blank")} className="text-[11px] px-2.5 py-1 rounded-md border font-semibold" style={{ borderColor: "#fef3c7", background: "#fffbeb", color: "#92400e" }}>
                                  ▶️ Watch
                                </button>
                              </>
                            )}
                            {task.graphicPlaceholder && (
                              <CopyButton label="Copy Link" text={task.graphicPlaceholder} idx={`graphic-${i}`} copiedIdx={copiedIdx} onCopy={copyText} color="#be185d" bgColor="#fdf2f8" borderColor="#fce7f3" />
                            )}
                            {task.resourceUrl && (
                              <>
                                <CopyButton label="Copy Link" text={task.resourceUrl} idx={`resource-${i}`} copiedIdx={copiedIdx} onCopy={copyText} color="#3730a3" bgColor="#eef2ff" borderColor="#e0e7ff" />
                                <button onClick={() => window.open(task.resourceUrl, "_blank")} className="text-[11px] px-2.5 py-1 rounded-md border font-semibold" style={{ borderColor: "#e0e7ff", background: "#eef2ff", color: "#3730a3" }}>
                                  🌐 Open
                                </button>
                              </>
                            )}
                          </div>

                          {task.hasScript && task.script && (
                            <details className="mt-2">
                              <summary className="text-[11px] text-gray-500 cursor-pointer font-medium">Preview script</summary>
                              <pre className="mt-1.5 p-2.5 bg-gray-50 rounded-lg text-[11px] leading-relaxed whitespace-pre-wrap break-words text-gray-700 border border-gray-200 max-h-[200px] overflow-y-auto">
                                {task.script}
                              </pre>
                            </details>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Color scripts on Week 5+ */}
              {showColorScripts && selectedDay.key.includes("mon") && (
                <div className="mt-4 p-3 rounded-lg border border-gray-200 bg-gray-50">
                  <h4 className="text-xs font-bold text-gray-900 mb-2">Response Scripts by Color</h4>
                  {Object.values(COLOR_SCRIPTS).map(cs => (
                    <div key={cs.label} className="mb-2 p-2.5 rounded-md" style={{ background: cs.bg, border: `1px solid ${cs.border}` }}>
                      <div className="font-bold text-[11px] mb-1" style={{ color: cs.color }}>{cs.emoji} {cs.label}</div>
                      <pre className="m-0 text-[11px] leading-relaxed whitespace-pre-wrap text-gray-700">{cs.script}</pre>
                      <button onClick={() => copyText(cs.script, `color-${cs.label}`)} className="mt-1.5 text-[10px] px-2 py-0.5 rounded border bg-white font-semibold" style={{ borderColor: cs.border, color: cs.color }}>
                        {copiedIdx === `color-${cs.label}` ? "✅ Copied!" : "📋 Copy"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Week overview — day cards */
            <div className="space-y-2">
              {activeDays.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No scheduled tasks this week
                </div>
              ) : (
                activeDays.map(({ key, data }) => {
                  const isCurrent = isDayCurrentDay(key)
                  const dayCompletedCount = data.tasks.filter((_, i) => completedTasks[`${key}-${i}`]).length
                  const allDone = dayCompletedCount === data.tasks.length
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedDay({ data, key })}
                      className={`w-full text-left p-3 rounded-lg border transition-all hover:shadow-sm ${isCurrent ? "ring-2 ring-yellow-400 ring-offset-1" : ""}`}
                      style={{
                        background: allDone ? "#f0fdf4" : weekColor.bg,
                        borderColor: allDone ? "#86efac" : weekColor.border,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {isCurrent && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-400 text-yellow-900 uppercase tracking-wider">Today</span>
                          )}
                          {allDone && <span className="text-sm">✅</span>}
                          <div>
                            {data.label && (
                              <span className="font-bold text-[13px]" style={{ color: allDone ? "#16a34a" : weekColor.header }}>
                                {data.label}
                              </span>
                            )}
                            {data.phase && (
                              <span className="text-[11px] text-gray-500 ml-1.5">{data.phase}</span>
                            )}
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold" style={{ color: allDone ? "#16a34a" : weekColor.header }}>
                          {dayCompletedCount}/{data.tasks.length}
                        </span>
                      </div>
                      <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        {data.tasks.map((t, i) => (
                          <span key={i} className={`text-sm ${completedTasks[`${key}-${i}`] ? "opacity-30" : ""}`}>{t.icon}</span>
                        ))}
                      </div>
                      <div className="mt-2 h-1 rounded-full bg-black/5">
                        <div className="h-full rounded-full transition-all" style={{ width: `${(dayCompletedCount / data.tasks.length) * 100}%`, background: allDone ? "#16a34a" : weekColor.header }} />
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TaskBadge({ type }: { type: string }) {
  const s = TASK_BADGE_STYLES[type] || TASK_BADGE_STYLES.action
  return (
    <span className="inline-block rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  )
}

function CopyButton({ label, text, idx, copiedIdx, onCopy, color, bgColor, borderColor }: {
  label: string; text: string; idx: string; copiedIdx: string | null
  onCopy: (text: string, idx: string) => void
  color: string; bgColor: string; borderColor: string
}) {
  const isCopied = copiedIdx === idx
  return (
    <button
      onClick={() => onCopy(text, idx)}
      className="text-[11px] px-2.5 py-1 rounded-md border font-semibold transition-colors"
      style={{
        borderColor: isCopied ? "#bbf7d0" : borderColor,
        background: isCopied ? "#d1fae5" : bgColor,
        color: isCopied ? "#065f46" : color,
      }}
    >
      {isCopied ? "✅ Copied!" : `📋 ${label}`}
    </button>
  )
}
