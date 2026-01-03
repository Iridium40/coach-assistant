"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Circle, ChevronRight, Clock, Star, ArrowLeft, ArrowRight, PieChart, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useSupabaseData } from "@/hooks/use-supabase-data"

const lessons = [
  { id: "8.1.1", title: "IPD Bubble Tracker", type: "Interactive Tool", icon: PieChart, duration: "15 min + ongoing" },
  { id: "8.1.2", title: "Building Multiple FIBC Teams", type: "Strategic Training", icon: Network, duration: "25 min read" },
]

const bubbleColors = ["#2196f3", "#4caf50", "#ff9800", "#e91e63", "#00bcd4", "#795548"]

const ipdRequirements = [
  { requirement: "6 FIBC Teams", description: "Six personally sponsored coaches who have achieved FIBC status", icon: "🎯" },
  { requirement: "Volume Requirements", description: "Sustained organizational volume meeting IPD thresholds", icon: "📊" },
  { requirement: "Leadership Depth", description: "Multiple generations of leaders developing within each team", icon: "👥" },
  { requirement: "Consistency", description: "Maintained qualification over consecutive months", icon: "📅" },
]

const developmentStages = [
  { stage: "Stage 1: Identification", color: "#2196f3", bgColor: "#e3f2fd", criteria: ["Shows consistent production", "Demonstrates leadership potential", "Has coachable attitude"] },
  { stage: "Stage 2: Development", color: "#ff9800", bgColor: "#fff8e1", criteria: ["Actively building team", "Developing their own leaders", "Growing organizational volume"] },
  { stage: "Stage 3: Qualification", color: "#4caf50", bgColor: "#e8f5e9", criteria: ["Meeting FIBC thresholds", "Has qualified leaders", "Operating independently"] },
  { stage: "Stage 4: Maintenance", color: "#9c27b0", bgColor: "#f3e5f5", criteria: ["Consistent FIBC qualification", "Developing their own FIBCs", "Minimal support needed"] },
]

const healthIndicators = [
  { indicator: "Volume Trend", icon: "📈", healthy: "Growing or stable", warning: "Declining 2+ months", critical: "FIBC at risk" },
  { indicator: "Leader Engagement", icon: "💬", healthy: "Regular, proactive", warning: "Sporadic, reactive", critical: "Unresponsive" },
  { indicator: "Team Depth", icon: "👥", healthy: "Multiple leaders", warning: "Reliant on 1-2", critical: "No development" },
  { indicator: "Personal Production", icon: "💪", healthy: "Maintains clients", warning: "Declining activity", critical: "No production" },
]

interface BubbleData {
  name: string
  currentRank: string
  volumeAvg: string
  fibcDate: string
  notes: string
}

export function LegacyBuildingContent() {
  const { toast } = useToast()
  const { user } = useAuth()
  const { completedResources, toggleCompletedResource } = useSupabaseData(user)
  const [expandedLesson, setExpandedLesson] = useState(lessons[0].id)
  const [bubbleData, setBubbleData] = useState<Record<string, BubbleData>>({
    bubble1: { name: "", currentRank: "", volumeAvg: "", fibcDate: "", notes: "" },
    bubble2: { name: "", currentRank: "", volumeAvg: "", fibcDate: "", notes: "" },
    bubble3: { name: "", currentRank: "", volumeAvg: "", fibcDate: "", notes: "" },
    bubble4: { name: "", currentRank: "", volumeAvg: "", fibcDate: "", notes: "" },
    bubble5: { name: "", currentRank: "", volumeAvg: "", fibcDate: "", notes: "" },
    bubble6: { name: "", currentRank: "", volumeAvg: "", fibcDate: "", notes: "" },
  })

  const getResourceId = (lessonId: string) => `legacy-building-${lessonId}`
  const completedLessons = new Set(lessons.map((lesson) => lesson.id).filter((lessonId) => completedResources.includes(getResourceId(lessonId))))

  useEffect(() => {
    const saved = localStorage.getItem("legacyBuildingExpanded")
    if (saved) {
      try {
        const lessonId = JSON.parse(saved)
        if (lessons.some((l) => l.id === lessonId)) setExpandedLesson(lessonId)
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("legacyBuildingExpanded", JSON.stringify(expandedLesson))
  }, [expandedLesson])

  const toggleComplete = async (lessonId: string) => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be signed in to track your progress.", variant: "destructive" })
      return
    }
    await toggleCompletedResource(getResourceId(lessonId))
    toast({ title: !completedLessons.has(lessonId) ? "Lesson completed!" : "Lesson unmarked" })
  }

  const updateBubble = (bubbleKey: string, field: keyof BubbleData, value: string) => {
    setBubbleData((prev) => ({
      ...prev,
      [bubbleKey]: { ...prev[bubbleKey], [field]: value },
    }))
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
            <span>Phase 8: Presidential to IPD</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold">Module 8.1</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Legacy Building</h1>
          <p className="text-lg opacity-90 max-w-2xl">Create lasting impact and income through multiple FIBC teams.</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          <aside className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-900 to-purple-800 text-white text-center border-0">
              <CardContent className="pt-6">
                <div className="text-4xl mb-2">💎</div>
                <div className="font-bold text-sm">PHASE 8</div>
                <div className="text-sm opacity-90">Presidential → IPD</div>
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

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300">
              <CardContent className="pt-5">
                <p className="text-sm text-purple-900 italic leading-relaxed mb-2">&quot;The greatest legacy one can pass on is not money, but a legacy of character and faith.&quot;</p>
                <p className="text-xs text-purple-700 font-semibold">— Billy Graham</p>
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
                {/* Lesson 8.1.1 - IPD Bubble Tracker */}
                {currentLesson.id === "8.1.1" && (
                  <div className="space-y-8">
                    <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg">
                      <p className="text-base leading-relaxed">The path to Integrated Presidential Director (IPD) requires developing multiple FIBC-qualified teams or &apos;bubbles.&apos; This tracker helps you visualize your IPD progression, identify gaps, and strategically develop the leaders who will form your legacy organization.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">IPD Qualification Requirements</h3>
                      <div className="grid grid-cols-4 gap-3">
                        {ipdRequirements.map((item, i) => (
                          <div key={i} className="p-4 bg-green-50 rounded-lg text-center">
                            <span className="text-2xl block mb-2">{item.icon}</span>
                            <div className="font-bold text-green-800 text-sm mb-1">{item.requirement}</div>
                            <div className="text-xs text-green-700">{item.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <h3 className="text-lg font-bold text-purple-800 mb-4">📊 Your 6 FIBC Bubbles</h3>
                      <p className="text-sm text-purple-700 mb-6">Track each of your potential FIBC bubbles below. Focus on developing leaders who can achieve and maintain FIBC status.</p>
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((num) => {
                          const key = `bubble${num}` as keyof typeof bubbleData
                          return (
                            <div key={num} className="bg-white rounded-xl p-4" style={{ borderTop: `4px solid ${bubbleColors[num - 1]}` }}>
                              <div className="font-bold mb-3 flex items-center gap-2" style={{ color: bubbleColors[num - 1] }}>
                                <span className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center" style={{ background: bubbleColors[num - 1] }}>{num}</span>
                                Bubble {num}
                              </div>
                              <div className="space-y-2">
                                <Input placeholder="Leader Name" value={bubbleData[key].name} onChange={(e) => updateBubble(key, "name", e.target.value)} className="text-sm" />
                                <Select value={bubbleData[key].currentRank} onValueChange={(val) => updateBubble(key, "currentRank", val)}>
                                  <SelectTrigger className="text-sm"><SelectValue placeholder="Current Rank" /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="coach">Coach</SelectItem>
                                    <SelectItem value="senior">Senior Coach</SelectItem>
                                    <SelectItem value="ed">Executive Director</SelectItem>
                                    <SelectItem value="regional">Regional Director</SelectItem>
                                    <SelectItem value="presidential">Presidential Director</SelectItem>
                                    <SelectItem value="fibc">FIBC ✓</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input placeholder="Avg Monthly Volume" value={bubbleData[key].volumeAvg} onChange={(e) => updateBubble(key, "volumeAvg", e.target.value)} className="text-sm" />
                                <Input placeholder="Est. FIBC Date" value={bubbleData[key].fibcDate} onChange={(e) => updateBubble(key, "fibcDate", e.target.value)} className="text-sm" />
                                <Textarea placeholder="Notes..." value={bubbleData[key].notes} onChange={(e) => updateBubble(key, "notes", e.target.value)} className="text-sm min-h-[60px]" />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Bubble Development Stages</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {developmentStages.map((stage, i) => (
                          <div key={i} className="p-5 rounded-lg" style={{ background: stage.bgColor, borderLeft: `5px solid ${stage.color}` }}>
                            <div className="font-bold mb-2" style={{ color: stage.color }}>{stage.stage}</div>
                            <ul className="space-y-1">
                              {stage.criteria.map((c, j) => (
                                <li key={j} className="text-xs text-optavia-gray">✓ {c}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Bubble Health Assessment</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="p-3 text-left font-semibold">Indicator</th>
                              <th className="p-3 text-center font-semibold text-green-600">🟢 Healthy</th>
                              <th className="p-3 text-center font-semibold text-amber-600">🟡 Warning</th>
                              <th className="p-3 text-center font-semibold text-red-600">🔴 Critical</th>
                            </tr>
                          </thead>
                          <tbody>
                            {healthIndicators.map((ind, i) => (
                              <tr key={i} className="border-b">
                                <td className="p-3 font-semibold"><span className="mr-2">{ind.icon}</span>{ind.indicator}</td>
                                <td className="p-3 text-center text-xs bg-green-50 text-green-700">{ind.healthy}</td>
                                <td className="p-3 text-center text-xs bg-amber-50 text-amber-700">{ind.warning}</td>
                                <td className="p-3 text-center text-xs bg-red-50 text-red-700">{ind.critical}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lesson 8.1.2 - Building Multiple FIBC Teams */}
                {currentLesson.id === "8.1.2" && (
                  <div className="space-y-8">
                    <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg">
                      <p className="text-base leading-relaxed">The path to IPD is paved with FIBC teams. This training covers the structure, strategy, and systems needed to build not just one, but six independently functioning FIBC organizations.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">The FIBC Team Structure</h3>
                      <div className="space-y-4">
                        {[
                          { icon: "👑", component: "FIBC Leader (Frontline)", role: "The personally sponsored leader who achieved FIBC status", yourRole: "Strategic partner, occasional advisor" },
                          { icon: "⭐", component: "Second Generation Leaders", role: "Leaders sponsored by your FIBC building their own teams", yourRole: "Skip-level support when needed" },
                          { icon: "🌱", component: "Emerging Coaches", role: "Active coaches building their client base", yourRole: "Training resources, event exposure" },
                          { icon: "💚", component: "Client Base", role: "Active clients throughout the organization", yourRole: "Culture that celebrates client success" },
                        ].map((item, i) => (
                          <div key={i} className="p-5 rounded-lg bg-gray-50 border-l-4 border-[hsl(var(--optavia-green))]">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{item.icon}</span>
                              <span className="font-bold">{item.component}</span>
                            </div>
                            <p className="text-sm text-optavia-gray mb-3">{item.role}</p>
                            <div className="text-xs text-green-700 bg-green-50 p-2 rounded">Your Role: {item.yourRole}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">The 6-Bubble Portfolio Strategy</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { type: "Anchor Bubbles (2-3)", desc: "Your strongest, most established FIBC teams", color: "#4caf50", strategy: "Quarterly strategy, peer mastermind" },
                          { type: "Growth Bubbles (2-3)", desc: "Leaders in active FIBC development", color: "#2196f3", strategy: "Weekly to bi-weekly engagement" },
                          { type: "Emerging Bubbles (1-2)", desc: "Early-stage potential FIBC candidates", color: "#ff9800", strategy: "Vision conversations, skills development" },
                        ].map((item, i) => (
                          <div key={i} className="p-5 rounded-xl bg-white" style={{ border: `3px solid ${item.color}` }}>
                            <div className="font-bold mb-2" style={{ color: item.color }}>{item.type}</div>
                            <p className="text-sm text-optavia-gray mb-3">{item.desc}</p>
                            <div className="text-xs p-2 rounded" style={{ background: `${item.color}15`, color: item.color }}>📋 {item.strategy}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Common IPD Journey Mistakes</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { icon: "🎯", mistake: "Spreading Too Thin", solution: "Focus on 2-3 bubbles at a time" },
                          { icon: "👀", mistake: "Ignoring Established Bubbles", solution: "Maintain relationships with FIBCs" },
                          { icon: "🚫", mistake: "Forcing Leadership", solution: "Focus on willing leaders" },
                          { icon: "🏋️", mistake: "Doing Their Work", solution: "Coach, don't carry" },
                          { icon: "⏰", mistake: "Timeline Pressure", solution: "IPD is a marathon, not a sprint" },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-red-50 rounded-lg">
                            <span className="text-xl block mb-2">{item.icon}</span>
                            <div className="font-bold text-red-800 text-sm mb-2">{item.mistake}</div>
                            <div className="text-xs text-green-700 bg-green-50 p-2 rounded">✅ {item.solution}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-300">
                      <h4 className="text-lg font-bold text-purple-800 mb-4">✨ Legacy Mindset Principles</h4>
                      <div className="space-y-3">
                        {[
                          { principle: "Impact Over Income", desc: "Focus on the lives you're changing, and income follows" },
                          { principle: "Build to Release", desc: "Your goal is independent leaders, not dependent followers" },
                          { principle: "Generational Thinking", desc: "You're creating leaders who will create leaders" },
                          { principle: "Values First", desc: "Your legacy is defined by the culture you create" },
                          { principle: "Abundance Mentality", desc: "There's enough success for everyone" },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-white rounded-lg">
                            <div className="font-bold text-purple-800 mb-1">{item.principle}</div>
                            <div className="text-sm text-purple-700">{item.desc}</div>
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
                    {currentLesson.id === "8.1.1" && (
                      <>
                        <li>• IPD requires 6 personally sponsored FIBC leaders (bubbles)</li>
                        <li>• Track each bubble&apos;s stage: Identification → Development → Qualification → Maintenance</li>
                        <li>• Assess bubble health regularly across volume, engagement, depth, and production</li>
                        <li>• Build bubbles sequentially, not all at once – depth before breadth</li>
                      </>
                    )}
                    {currentLesson.id === "8.1.2" && (
                      <>
                        <li>• Each FIBC team needs a frontline leader, second-generation leaders, emerging coaches, and a client base</li>
                        <li>• Manage your 6 bubbles like a portfolio with Anchor, Growth, and Emerging categories</li>
                        <li>• Not all bubbles will succeed – know when to rescue, transition, or replace</li>
                        <li>• Build with a legacy mindset: impact over income, leaders who can succeed without you</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>

              <div className="border-t bg-gray-50 p-6 flex justify-between">
                {prevLesson ? (
                  <Button variant="outline" onClick={() => setExpandedLesson(prevLesson.id)}><ArrowLeft className="h-4 w-4 mr-2" />Previous</Button>
                ) : (
                  <Button variant="outline" onClick={() => (window.location.href = "/training/scaling-your-business")}><ArrowLeft className="h-4 w-4 mr-2" />Back to Phase 7</Button>
                )}
                {nextLesson ? (
                  <Button onClick={() => setExpandedLesson(nextLesson.id)} className="bg-[hsl(var(--optavia-green))]">Next<ArrowRight className="h-4 w-4 ml-2" /></Button>
                ) : (
                  <Button className="bg-[hsl(var(--optavia-green))]" onClick={() => (window.location.href = "/training/advanced-tools")}>Continue to Module 8.2<ArrowRight className="h-4 w-4 ml-2" /></Button>
                )}
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
