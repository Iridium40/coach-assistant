"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Circle, ChevronRight, Clock, Star, ArrowLeft, ArrowRight, Flame, MapPin, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useSupabaseData } from "@/hooks/use-supabase-data"

const lessons = [
  { id: "7.2.1", title: "30 Days All In Action to Grow", type: "Intensive Strategy", icon: Flame, duration: "20 min read" },
  { id: "7.2.2", title: "MAP: How to Map Your Month", type: "Strategic Planning", icon: MapPin, duration: "15 min read" },
  { id: "7.2.3", title: "Design Your Dream Life", type: "Vision Exercise", icon: Sun, duration: "30 min exercise" },
]

const allInPhases = [
  { phase: "Days 1-7: Foundation", color: "#4caf50", focus: "Building habits and creating initial wins", goal: "First new client + first business conversation" },
  { phase: "Days 8-14: Acceleration", color: "#2196f3", focus: "Increasing intensity and expanding reach", goal: "2+ new clients + 1 new coach conversation" },
  { phase: "Days 15-21: Peak Performance", color: "#ff9800", focus: "Maximum output and team duplication", goal: "2+ new clients + 1 new coach signed" },
  { phase: "Days 22-30: Finish Strong", color: "#9c27b0", focus: "Closing strong and creating sustainability", goal: "Hit overall goal + create repeatable systems" },
]

const mapFramework = [
  { step: "M - Mission", desc: "What's the ONE main objective for this month?", color: "#4caf50" },
  { step: "A - Actions", desc: "What specific actions will accomplish the mission?", color: "#2196f3" },
  { step: "P - Priorities", desc: "What are the top 3-5 priorities that get my best energy?", color: "#ff9800" },
]

const dreamLifeCategories = [
  { category: "Financial Freedom", icon: "💰", color: "#4caf50" },
  { category: "Time Freedom", icon: "⏰", color: "#2196f3" },
  { category: "Relationships", icon: "❤️", color: "#e91e63" },
  { category: "Health & Vitality", icon: "💪", color: "#ff9800" },
  { category: "Personal Growth", icon: "🌱", color: "#9c27b0" },
  { category: "Experiences", icon: "✈️", color: "#00bcd4" },
  { category: "Contribution", icon: "🌍", color: "#795548" },
]

export function ScalingYourBusinessContent() {
  const { toast } = useToast()
  const { user } = useAuth()
  const { completedResources, toggleCompletedResource } = useSupabaseData(user)
  const [expandedLesson, setExpandedLesson] = useState(lessons[0].id)
  const [mapData, setMapData] = useState({ theme: "", volumeGoal: "", newClients: "", newCoaches: "", keyEvents: "" })
  const [dreamLifeVision, setDreamLifeVision] = useState("")

  const getResourceId = (lessonId: string) => `scaling-your-business-${lessonId}`
  const completedLessons = new Set(lessons.map((lesson) => lesson.id).filter((lessonId) => completedResources.includes(getResourceId(lessonId))))

  useEffect(() => {
    const saved = localStorage.getItem("scalingBusinessExpanded")
    if (saved) {
      try {
        const lessonId = JSON.parse(saved)
        if (lessons.some((l) => l.id === lessonId)) setExpandedLesson(lessonId)
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("scalingBusinessExpanded", JSON.stringify(expandedLesson))
  }, [expandedLesson])

  const toggleComplete = async (lessonId: string) => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be signed in to track your progress.", variant: "destructive" })
      return
    }
    await toggleCompletedResource(getResourceId(lessonId))
    toast({ title: !completedLessons.has(lessonId) ? "Lesson completed!" : "Lesson unmarked" })
  }

  const currentLessonIndex = lessons.findIndex((l) => l.id === expandedLesson)
  const currentLesson = lessons[currentLessonIndex]
  const prevLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null
  const nextLesson = currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null
  const completedCount = completedLessons.size
  const progressPercent = Math.round((completedCount / lessons.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[#006633] text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm opacity-90 mb-2 uppercase tracking-wide">
            <span>Training Center</span>
            <ChevronRight className="h-4 w-4" />
            <span>Phase 7: FIBC to Global/Presidential</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold">Module 7.2</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Scaling Your Business</h1>
          <p className="text-lg opacity-90 max-w-2xl">Build systems that work without you.</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          <aside className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900 to-blue-800 text-white text-center border-0">
              <CardContent className="pt-6">
                <div className="text-4xl mb-2">👑</div>
                <div className="font-bold text-sm">PHASE 7</div>
                <div className="text-sm opacity-90">FIBC → Global/Presidential</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-semibold">Module Progress</CardTitle>
                  <span className="text-sm font-semibold text-[hsl(var(--optavia-green))]">{completedCount}/{lessons.length}</span>
                </div>
              </CardHeader>
              <CardContent><Progress value={progressPercent} className="h-2" /></CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-xs font-semibold text-optavia-gray uppercase">Lessons</CardTitle></CardHeader>
              <CardContent className="p-0">
                {lessons.map((lesson) => {
                  const Icon = lesson.icon
                  const isActive = expandedLesson === lesson.id
                  const isComplete = completedLessons.has(lesson.id)
                  return (
                    <button key={lesson.id} onClick={() => setExpandedLesson(lesson.id)} className={`w-full p-4 flex items-start gap-3 border-b last:border-b-0 text-left ${isActive ? "bg-green-50 border-l-4 border-l-[hsl(var(--optavia-green))]" : "hover:bg-gray-50"}`}>
                      <div className="mt-1">{isComplete ? <CheckCircle className="h-5 w-5 text-[hsl(var(--optavia-green))]" /> : <Circle className="h-5 w-5 text-gray-300" />}</div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-[hsl(var(--optavia-green))] mb-1">{lesson.id}</div>
                        <div className={`text-sm font-semibold mb-2 ${isActive ? "text-[hsl(var(--optavia-green))]" : ""}`}>{lesson.title}</div>
                        <div className="flex items-center gap-3 text-xs text-optavia-gray">
                          <Badge variant="outline" className="text-xs bg-gray-50"><Icon className="h-3 w-3 mr-1" />{lesson.type}</Badge>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{lesson.duration}</span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300">
              <CardContent className="pt-5">
                <p className="text-sm text-amber-900 italic leading-relaxed mb-2">&quot;The goal isn&apos;t to be busy. The goal is to build something that serves your life, not consumes it.&quot;</p>
                <p className="text-xs text-amber-700 font-semibold">— Coach Assistant Hub</p>
              </CardContent>
            </Card>
          </aside>

          <main>
            <Card>
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-semibold text-[hsl(var(--optavia-green))] uppercase mb-2">Lesson {currentLesson.id}</div>
                    <CardTitle className="text-2xl font-bold">{currentLesson.title}</CardTitle>
                  </div>
                  <Button onClick={() => toggleComplete(currentLesson.id)} variant={completedLessons.has(currentLesson.id) ? "default" : "outline"} className={completedLessons.has(currentLesson.id) ? "bg-[hsl(var(--optavia-green))]" : ""}>
                    {completedLessons.has(currentLesson.id) ? <><CheckCircle className="h-4 w-4 mr-2" />Completed</> : <><Circle className="h-4 w-4 mr-2" />Mark Complete</>}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                {/* Lesson 7.2.1 - 30 Days All In */}
                {currentLesson.id === "7.2.1" && (
                  <div className="space-y-8">
                    <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg">
                      <p className="text-base leading-relaxed">The &apos;30 Days All In&apos; challenge is an intensive growth strategy designed to create massive momentum. This isn&apos;t sustainable forever – it&apos;s a strategic push that creates breakthrough results and establishes new baseline behaviors.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">The 30-Day Framework</h3>
                      <div className="space-y-4">
                        {allInPhases.map((phase, i) => (
                          <div key={i} className="p-5 rounded-lg bg-gray-50" style={{ borderLeft: `5px solid ${phase.color}` }}>
                            <div className="font-bold mb-2" style={{ color: phase.color }}>{phase.phase}</div>
                            <p className="text-sm text-optavia-gray mb-3 italic">Focus: {phase.focus}</p>
                            <div className="p-3 bg-white rounded-lg text-sm">🎯 Weekly Goal: {phase.goal}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Overcoming 30-Day Challenges</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { week: "Week 1: Resistance", symptom: "This is too hard", solution: "Remember: you're building new muscles", mantra: "I can do anything for 30 days" },
                          { week: "Week 2: The Dip", symptom: "Effort doesn't match results", solution: "This is where most quit - trust the process", mantra: "Results are coming" },
                          { week: "Week 3: Fatigue", symptom: "Running out of steam", solution: "Reconnect with your WHY", mantra: "I'm closer than ever" },
                          { week: "Week 4: Finish Line Fade", symptom: "Tempted to coast", solution: "Push HARDER in the final stretch", mantra: "Finish stronger than I started" },
                        ].map((item, i) => (
                          <div key={i} className="p-4 rounded-lg bg-gray-50">
                            <div className="font-bold text-optavia-dark mb-2">{item.week}</div>
                            <div className="text-xs text-red-600 mb-2 p-2 bg-red-50 rounded">😰 {item.symptom}</div>
                            <div className="text-xs text-green-700 mb-2 p-2 bg-green-50 rounded">✅ {item.solution}</div>
                            <div className="text-sm font-semibold text-center text-blue-700 p-2 bg-white rounded">&quot;{item.mantra}&quot;</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Lesson 7.2.2 - MAP */}
                {currentLesson.id === "7.2.2" && (
                  <div className="space-y-8">
                    <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg">
                      <p className="text-base leading-relaxed">MAP (Monthly Action Plan) is your framework for intentional growth – ensuring that every month moves you closer to your vision, not just maintaining the status quo.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">The MAP Framework</h3>
                      <div className="space-y-4">
                        {mapFramework.map((item, i) => (
                          <div key={i} className="p-5 rounded-xl" style={{ background: `${item.color}15`, borderLeft: `5px solid ${item.color}` }}>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold" style={{ background: item.color }}>{item.step.charAt(0)}</div>
                              <div>
                                <div className="font-bold" style={{ color: item.color }}>{item.step}</div>
                                <div className="text-sm text-optavia-gray">{item.desc}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-300">
                      <h4 className="text-lg font-bold text-green-800 mb-4">📋 Your Monthly MAP</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold block mb-2">Monthly Theme</label>
                          <Input placeholder="e.g., 'Leadership Launch'" value={mapData.theme} onChange={(e) => setMapData(p => ({ ...p, theme: e.target.value }))} />
                        </div>
                        <div>
                          <label className="text-sm font-semibold block mb-2">Volume Goal</label>
                          <Input placeholder="Total team volume target" value={mapData.volumeGoal} onChange={(e) => setMapData(p => ({ ...p, volumeGoal: e.target.value }))} />
                        </div>
                        <div>
                          <label className="text-sm font-semibold block mb-2">New Clients Goal</label>
                          <Input placeholder="Number of new clients" value={mapData.newClients} onChange={(e) => setMapData(p => ({ ...p, newClients: e.target.value }))} />
                        </div>
                        <div>
                          <label className="text-sm font-semibold block mb-2">New Coaches Goal</label>
                          <Input placeholder="Number of new coaches" value={mapData.newCoaches} onChange={(e) => setMapData(p => ({ ...p, newCoaches: e.target.value }))} />
                        </div>
                        <div className="col-span-2">
                          <label className="text-sm font-semibold block mb-2">Key Events</label>
                          <Input placeholder="Trainings, team events, company events" value={mapData.keyEvents} onChange={(e) => setMapData(p => ({ ...p, keyEvents: e.target.value }))} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lesson 7.2.3 - Dream Life */}
                {currentLesson.id === "7.2.3" && (
                  <div className="space-y-8">
                    <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg">
                      <p className="text-base leading-relaxed">At the highest levels of leadership, your business exists to serve your life – not the other way around. This exercise helps you get crystal clear on what you&apos;re actually building toward.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">The Dream Life Categories</h3>
                      <div className="grid grid-cols-4 gap-3">
                        {dreamLifeCategories.map((cat, i) => (
                          <div key={i} className="p-4 rounded-lg text-center" style={{ background: `${cat.color}15`, border: `2px solid ${cat.color}` }}>
                            <span className="text-3xl block mb-2">{cat.icon}</span>
                            <span className="text-sm font-semibold" style={{ color: cat.color }}>{cat.category}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-2 border-amber-400">
                      <h4 className="text-lg font-bold text-amber-800 mb-4">✨ Your Dream Life Vision</h4>
                      <p className="text-sm text-amber-700 mb-4 italic">Take time to answer thoughtfully. This isn&apos;t about what&apos;s realistic right now – it&apos;s about what you truly want.</p>
                      <Textarea
                        placeholder="In 3 years, I am..."
                        className="min-h-[200px]"
                        value={dreamLifeVision}
                        onChange={(e) => setDreamLifeVision(e.target.value)}
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Connecting Vision to Daily Action</h3>
                      <div className="space-y-3">
                        {[
                          { level: "Dream Life Vision", timeframe: "3-5 years", icon: "🌟" },
                          { level: "Annual Goals", timeframe: "1 year", icon: "📅" },
                          { level: "Quarterly Milestones", timeframe: "90 days", icon: "🎯" },
                          { level: "Monthly Mission", timeframe: "30 days", icon: "📋" },
                          { level: "Weekly Priorities", timeframe: "7 days", icon: "✅" },
                          { level: "Daily Actions", timeframe: "Today", icon: "⚡" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <span className="text-2xl">{item.icon}</span>
                            <div className="flex-1">
                              <div className="font-semibold text-sm">{item.level}</div>
                              <div className="text-xs text-optavia-gray">{item.timeframe}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Takeaways */}
                <div className="mt-10 p-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                  <h4 className="text-base font-bold text-amber-900 mb-4 flex items-center gap-2"><Star className="h-5 w-5 fill-amber-600" />Key Takeaways</h4>
                  <ul className="space-y-2 text-sm text-amber-900">
                    {currentLesson.id === "7.2.1" && (
                      <>
                        <li>• 30 Days All In is a strategic push, not a sustainable pace – use it intentionally</li>
                        <li>• Expect resistance at specific points and have strategies ready</li>
                        <li>• The goal isn&apos;t just results – it&apos;s establishing a new baseline</li>
                      </>
                    )}
                    {currentLesson.id === "7.2.2" && (
                      <>
                        <li>• Every month needs a clear Mission, Actions, and Priorities (MAP)</li>
                        <li>• Spend 60-90 minutes planning each month – the ROI is massive</li>
                        <li>• Weekly check-ins keep your plan alive and adaptive</li>
                      </>
                    )}
                    {currentLesson.id === "7.2.3" && (
                      <>
                        <li>• Your business exists to serve your life vision, not the other way around</li>
                        <li>• Get specific about what you want in all life areas</li>
                        <li>• Connect your long-term vision to daily actions through a clear hierarchy</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>

              <div className="border-t bg-gray-50 p-6 flex justify-between">
                {prevLesson ? (
                  <Button variant="outline" onClick={() => setExpandedLesson(prevLesson.id)}><ArrowLeft className="h-4 w-4 mr-2" />Previous</Button>
                ) : (
                  <Button variant="outline" onClick={() => (window.location.href = "/training/leadership-development")}><ArrowLeft className="h-4 w-4 mr-2" />Back to Module 7.1</Button>
                )}
                {nextLesson ? (
                  <Button onClick={() => setExpandedLesson(nextLesson.id)} className="bg-[hsl(var(--optavia-green))]">Next<ArrowRight className="h-4 w-4 ml-2" /></Button>
                ) : (
                  <Button className="bg-[hsl(var(--optavia-green))]" onClick={() => (window.location.href = "/training/legacy-building")}>Continue to Phase 8<ArrowRight className="h-4 w-4 ml-2" /></Button>
                )}
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
