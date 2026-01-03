"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Circle, ChevronRight, Clock, Star, ArrowLeft, ArrowRight, TrendingUp, Share2, ShoppingCart, AlertTriangle, Copy, Check, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useSupabaseData } from "@/hooks/use-supabase-data"

const lessons = [
  { id: "6.3.1", title: "Moving to ED and Beyond", type: "Strategy Guide", icon: TrendingUp, duration: "20 min read" },
  { id: "6.3.2", title: "How to Teach Clients to Use the Referral Feature", type: "Training", icon: Share2, duration: "15 min read" },
  { id: "6.3.3", title: "How to Create and Use a Shared Cart", type: "Training", icon: ShoppingCart, duration: "15 min read" },
]

const rankPath = [
  { rank: "Executive Director (ED)", focus: "Personal production + initial team building", keyMetric: "Consistent personal volume + 2-3 active legs", timeframe: "6-18 months from start", color: "#4caf50" },
  { rank: "Field Independent Business Coach (FIBC)", focus: "Team development + leadership cultivation", keyMetric: "Multiple EDs in organization + consistent team volume", timeframe: "12-24 months from ED", color: "#2196f3" },
  { rank: "Global Director", focus: "Building leaders who build leaders", keyMetric: "FIBCs in organization + significant depth", timeframe: "18-36 months from FIBC", color: "#9c27b0" },
  { rank: "Presidential Director", focus: "Organization-wide leadership + culture", keyMetric: "Multiple Global Directors + massive leverage", timeframe: "Varies widely", color: "#f44336" },
]

const mindsetShifts = [
  { from: "I need to do more", to: "I need to develop more leaders", explanation: "Your personal output has a ceiling. Your leaders' output is unlimited.", icon: "🧠" },
  { from: "My success", to: "My team's success", explanation: "When you obsess over helping your team win, you win automatically.", icon: "🏆" },
  { from: "I'm building a business", to: "I'm building leaders who build businesses", explanation: "True leverage comes from duplication, not just addition.", icon: "🌳" },
  { from: "How can I hit my goals?", to: "How can I help THEM hit their goals?", explanation: "Servant leadership creates loyalty and sustainable growth.", icon: "🎯" },
]

const pillars = [
  { pillar: "Personal Production", atED: "50-60%", atFIBC: "20-30%", beyond: "10-20%", color: "#4caf50" },
  { pillar: "Leadership Development", atED: "20-30%", atFIBC: "40-50%", beyond: "50-60%", color: "#2196f3" },
  { pillar: "Team Building Systems", atED: "10-15%", atFIBC: "15-20%", beyond: "15-20%", color: "#ff9800" },
  { pillar: "Culture Building", atED: "5-10%", atFIBC: "10-15%", beyond: "15-20%", color: "#9c27b0" },
]

const referralScripts = [
  { situation: "Client mentions someone asking about their transformation", script: "That's so cool that [Name] noticed! If you want, there's a super easy way to share info with them – you have a personal referral link in your app. Want me to show you how to find it?", copyId: "mention" },
  { situation: "After a major milestone (20 lbs, goal weight, etc.)", script: "I'm SO proud of you for hitting [milestone]! Transformations like yours inspire others. If you ever want to help someone you care about start their journey, you have a referral link that makes it really easy.", copyId: "milestone" },
  { situation: "During VIP call or celebration", script: "One of the most rewarding parts of this journey is getting to share it with people we love. If you have anyone who might be curious, you can share your personal link from the app. I'll take care of everything from there!", copyId: "vip" },
]

const cartScripts = [
  { scenario: "After Health Assessment (Same Day)", script: "I'm so excited for you to start! I put together your order based on what we discussed – I included the [Kit Name] with the flavors you mentioned. Here's the link: [LINK]. Everything is ready to go!", copyId: "after-ha" },
  { scenario: "Follow-Up After 'I'll Think About It'", script: "Hey [Name]! I wanted to make your next step super easy. I put together a cart with exactly what I'd recommend for you. No pressure, but if you decide to move forward, it's ready: [LINK]", copyId: "followup-cart" },
  { scenario: "Helping with Reorder", script: "Hi [Name]! I noticed it's getting close to reorder time. I set up your cart with your usual favorites so you don't have to search. Take a look: [LINK]", copyId: "reorder" },
]

export function MovingBeyondEdContent() {
  const { toast } = useToast()
  const { user } = useAuth()
  const { completedResources, toggleCompletedResource } = useSupabaseData(user)
  const [expandedLesson, setExpandedLesson] = useState(lessons[0].id)
  const [copiedScript, setCopiedScript] = useState<string | null>(null)

  const getResourceId = (lessonId: string) => `moving-beyond-ed-${lessonId}`
  const completedLessons = new Set(lessons.map((lesson) => lesson.id).filter((lessonId) => completedResources.includes(getResourceId(lessonId))))

  useEffect(() => {
    const saved = localStorage.getItem("movingBeyondEdExpanded")
    if (saved) {
      try {
        const lessonId = JSON.parse(saved)
        if (lessons.some((l) => l.id === lessonId)) setExpandedLesson(lessonId)
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("movingBeyondEdExpanded", JSON.stringify(expandedLesson))
  }, [expandedLesson])

  const toggleComplete = async (lessonId: string) => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be signed in to track your progress.", variant: "destructive" })
      return
    }
    await toggleCompletedResource(getResourceId(lessonId))
    toast({ title: !completedLessons.has(lessonId) ? "Lesson completed!" : "Lesson unmarked" })
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedScript(id)
    toast({ title: "Copied!", description: "Script copied to clipboard" })
    setTimeout(() => setCopiedScript(null), 2000)
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
            <span>Phase 6: ED to FIBC</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold">Module 6.3</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Moving Beyond ED</h1>
          <p className="text-lg opacity-90 max-w-2xl">Understand what it takes to advance to FIBC and beyond.</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          <aside className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-900 to-purple-800 text-white text-center border-0">
              <CardContent className="pt-6">
                <div className="text-4xl mb-2">🚀</div>
                <div className="font-bold text-sm">PHASE 6</div>
                <div className="text-sm opacity-90">Executive Director → FIBC</div>
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

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300">
              <CardContent className="pt-5">
                <p className="text-sm text-blue-900 italic leading-relaxed mb-2">&quot;Your level of success is determined by the success of those you help succeed.&quot;</p>
                <p className="text-xs text-blue-700 font-semibold">— Network Marketing Wisdom</p>
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
                {/* Lesson 6.3.1 - Moving to ED and Beyond */}
                {currentLesson.id === "6.3.1" && (
                  <div className="space-y-8">
                    <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg">
                      <p className="text-base leading-relaxed">Executive Director is a significant milestone, but it&apos;s just the beginning of building a truly independent business. Understanding what it takes to move beyond ED – to FIBC and higher ranks – requires a fundamental shift in how you think about your business.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[hsl(var(--optavia-green))] to-green-500 text-white flex items-center justify-center text-sm">1</span>
                        The Rank Progression Path
                      </h3>
                      <div className="relative space-y-4">
                        {rankPath.map((rank, i) => (
                          <div key={i} className="flex gap-4">
                            {i < rankPath.length - 1 && <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200" style={{ height: "calc(100% - 40px)" }} />}
                            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10" style={{ background: rank.color }}>
                              <ArrowUpRight className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 p-4 bg-gray-50 rounded-lg" style={{ borderLeft: `4px solid ${rank.color}` }}>
                              <div className="font-bold mb-1" style={{ color: rank.color }}>{rank.rank}</div>
                              <p className="text-sm text-optavia-gray mb-1"><strong>Focus:</strong> {rank.focus}</p>
                              <p className="text-xs text-optavia-gray mb-1"><strong>Key Metric:</strong> {rank.keyMetric}</p>
                              <p className="text-xs text-gray-400">⏱️ Typical Timeline: {rank.timeframe}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[hsl(var(--optavia-green))] to-green-500 text-white flex items-center justify-center text-sm">2</span>
                        The Mindset Shifts Required
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {mindsetShifts.map((shift, i) => (
                          <div key={i} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <div className="text-2xl mb-2">{shift.icon}</div>
                            <div className="text-xs text-red-600 line-through mb-1">{shift.from}</div>
                            <div className="text-xs text-gray-400 my-1">↓</div>
                            <div className="text-sm text-green-700 font-semibold mb-2">{shift.to}</div>
                            <div className="text-xs text-optavia-gray">{shift.explanation}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[hsl(var(--optavia-green))] to-green-500 text-white flex items-center justify-center text-sm">3</span>
                        The 4 Pillars of Advancement
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {pillars.map((pillar, i) => (
                          <div key={i} className="p-5 rounded-lg border-2 bg-white" style={{ borderColor: pillar.color }}>
                            <div className="font-bold mb-3" style={{ color: pillar.color }}>{pillar.pillar}</div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="p-2 bg-gray-50 rounded text-center">
                                <div className="text-xs text-optavia-gray">At ED</div>
                                <div className="text-sm font-semibold" style={{ color: pillar.color }}>{pillar.atED}</div>
                              </div>
                              <div className="p-2 bg-gray-50 rounded text-center">
                                <div className="text-xs text-optavia-gray">At FIBC</div>
                                <div className="text-sm font-semibold" style={{ color: pillar.color }}>{pillar.atFIBC}</div>
                              </div>
                              <div className="p-2 bg-gray-50 rounded text-center">
                                <div className="text-xs text-optavia-gray">Beyond</div>
                                <div className="text-sm font-semibold" style={{ color: pillar.color }}>{pillar.beyond}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[hsl(var(--optavia-green))] to-green-500 text-white flex items-center justify-center text-sm">4</span>
                        Common Mistakes at ED Level
                      </h3>
                      <div className="space-y-3">
                        {[
                          { mistake: "Stopping Personal Production", consequence: "Lose credibility, lose touch with client experience", solution: "Always maintain some personal clients – quality over quantity" },
                          { mistake: "Trying to Be Everything to Everyone", consequence: "Burnout, shallow relationships, no one gets your best", solution: "Focus your deep investment on 3-5 key leaders" },
                          { mistake: "Not Letting Go", consequence: "Your leaders never develop, you become the bottleneck", solution: "Push responsibility down, let them struggle and grow" },
                          { mistake: "Skip-Level Management", consequence: "Undermines your leaders, creates dependency on you", solution: "Work through your leaders, not around them" },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-red-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <span className="font-bold text-red-800">{item.mistake}</span>
                            </div>
                            <p className="text-sm text-optavia-gray mb-2"><strong>Consequence:</strong> {item.consequence}</p>
                            <div className="bg-green-50 p-2 rounded text-sm text-green-800">✅ {item.solution}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Lesson 6.3.2 - Referral Feature */}
                {currentLesson.id === "6.3.2" && (
                  <div className="space-y-8">
                    <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg">
                      <p className="text-base leading-relaxed">One of the most powerful yet underutilized tools in OPTAVIA is the referral feature. When your successful clients learn to use it, they essentially become an extension of your reach – connecting you with warm leads who already trust the person referring them.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Why Referrals Matter</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: "🤝", reason: "Pre-Built Trust", stat: "Referred leads convert 4x higher" },
                          { icon: "👀", reason: "Social Proof in Action", stat: "Visual proof is 6x more convincing" },
                          { icon: "🔥", reason: "Warm Introduction", stat: "Warm leads are 10x easier to convert" },
                          { icon: "🌱", reason: "Organic Growth", stat: "Each happy client knows 250+ prospects" },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-green-50 rounded-lg">
                            <span className="text-2xl block mb-2">{item.icon}</span>
                            <div className="font-bold text-green-800 mb-1">{item.reason}</div>
                            <div className="text-xs bg-white px-2 py-1 rounded text-[hsl(var(--optavia-green))] inline-block">📊 {item.stat}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Best Moments to Introduce Referrals</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-green-50 rounded-lg">
                          <div className="font-bold text-green-800 mb-3 flex items-center gap-2"><Check className="h-4 w-4" /> Good Timing</div>
                          {["After a significant win", "When they mention others asking", "At VIP celebrations", "During transition to maintenance"].map((item, i) => (
                            <div key={i} className="text-sm text-green-700 mb-2">✓ {item}</div>
                          ))}
                        </div>
                        <div className="p-5 bg-red-50 rounded-lg">
                          <div className="font-bold text-red-800 mb-3 flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Avoid</div>
                          {["During struggles or plateaus", "In the first 1-2 weeks", "When they seem overwhelmed", "If they've expressed discomfort"].map((item, i) => (
                            <div key={i} className="text-sm text-red-700 mb-2">✗ {item}</div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Scripts for Different Situations</h3>
                      <div className="space-y-3">
                        {referralScripts.map((script, i) => (
                          <div key={i} className="rounded-lg border overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                              <span className="font-semibold text-sm">{script.situation}</span>
                              <Button variant="outline" size="sm" onClick={() => copyToClipboard(script.script, script.copyId)} className={copiedScript === script.copyId ? "bg-green-50 text-[hsl(var(--optavia-green))] border-green-300" : ""}>
                                {copiedScript === script.copyId ? <><Check className="h-3 w-3 mr-1" />Copied</> : <><Copy className="h-3 w-3 mr-1" />Copy</>}
                              </Button>
                            </div>
                            <div className="p-4 bg-green-50 text-sm text-optavia-gray italic">&quot;{script.script}&quot;</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Best Practices</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: "💝", practice: "Make It About Service", desc: "Position referrals as helping others, not selling" },
                          { icon: "📱", practice: "Teach Live, Not Via Text", desc: "Walk them through in real-time" },
                          { icon: "🎯", practice: "Connect to Specific People", desc: "Ask about specific people they've mentioned" },
                          { icon: "🎉", practice: "Celebrate Referrals", desc: "Make a big deal when they refer someone" },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xl">{item.icon}</span>
                              <span className="font-bold text-green-800 text-sm">{item.practice}</span>
                            </div>
                            <div className="text-xs text-green-700">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Lesson 6.3.3 - Shared Cart */}
                {currentLesson.id === "6.3.3" && (
                  <div className="space-y-8">
                    <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg">
                      <p className="text-base leading-relaxed">The Shared Cart feature is one of the most powerful tools for converting interested prospects into clients. It removes friction, simplifies the ordering process, and allows you to create a personalized recommendation for each person.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Benefits of Shared Carts</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { icon: "🎯", benefit: "Removes Decision Paralysis", desc: "They see YOUR recommendation" },
                          { icon: "✨", benefit: "Simplifies the Process", desc: "One click to review and buy" },
                          { icon: "🏆", benefit: "Demonstrates Expertise", desc: "Personalized to their needs" },
                          { icon: "⚡", benefit: "Creates Urgency", desc: "Ready-to-buy feels more real" },
                          { icon: "📈", benefit: "Reduces Drop-Off", desc: "Fewer steps = more sales" },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-blue-50 rounded-lg text-center">
                            <span className="text-2xl block mb-2">{item.icon}</span>
                            <div className="font-bold text-blue-800 text-sm mb-1">{item.benefit}</div>
                            <div className="text-xs text-blue-600">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Step-by-Step: Creating a Shared Cart</h3>
                      <div className="space-y-3">
                        {[
                          { step: 1, title: "Log Into OPTAVIA Connect", desc: "Access your coach portal through the app or website" },
                          { step: 2, title: "Navigate to 'Create Cart'", desc: "Find the shared cart feature in coach tools" },
                          { step: 3, title: "Select Products", desc: "Add the products you recommend for this client" },
                          { step: 4, title: "Review the Cart", desc: "Double-check quantities and pricing" },
                          { step: 5, title: "Generate the Share Link", desc: "Click 'Create Link' to generate a unique URL" },
                          { step: 6, title: "Send to Your Prospect", desc: "Share via text, email, or message with context" },
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">{item.step}</div>
                            <div className="flex-1 p-4 bg-gray-50 rounded-lg">
                              <div className="font-bold text-optavia-dark mb-1">{item.title}</div>
                              <div className="text-sm text-optavia-gray">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Scripts for Sharing the Cart</h3>
                      <div className="space-y-3">
                        {cartScripts.map((script, i) => (
                          <div key={i} className="rounded-lg border overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                              <span className="font-semibold text-sm">{script.scenario}</span>
                              <Button variant="outline" size="sm" onClick={() => copyToClipboard(script.script, script.copyId)} className={copiedScript === script.copyId ? "bg-green-50 text-[hsl(var(--optavia-green))] border-green-300" : ""}>
                                {copiedScript === script.copyId ? <><Check className="h-3 w-3 mr-1" />Copied</> : <><Copy className="h-3 w-3 mr-1" />Copy</>}
                              </Button>
                            </div>
                            <div className="p-4 bg-green-50 text-sm text-optavia-gray italic">&quot;{script.script}&quot;</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Best Practices for Success</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: "⚡", practice: "Create BEFORE Conversation Ends", desc: "Momentum matters – send while they're excited" },
                          { icon: "💝", practice: "Personalize Every Cart", desc: "Reference their specific preferences" },
                          { icon: "✨", practice: "Keep It Simple", desc: "One kit + maybe one add-on" },
                          { icon: "💬", practice: "Always Include Context", desc: "Explain what's in the cart and why" },
                          { icon: "📱", practice: "Follow Up", desc: "Check in if they haven't clicked in 24-48 hours" },
                          { icon: "💰", practice: "Make the Total Clear", desc: "People want to know the price upfront" },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xl">{item.icon}</span>
                              <span className="font-bold text-green-800 text-sm">{item.practice}</span>
                            </div>
                            <div className="text-xs text-green-700">{item.desc}</div>
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
                    {currentLesson.id === "6.3.1" && (
                      <>
                        <li>• Moving beyond ED requires a fundamental shift from doing to developing</li>
                        <li>• Focus 50%+ of your time on leadership development at FIBC and beyond</li>
                        <li>• Build a healthy leadership pipeline at every stage</li>
                        <li>• Maintain personal production but shift the ratio as you advance</li>
                      </>
                    )}
                    {currentLesson.id === "6.3.2" && (
                      <>
                        <li>• Referrals are your highest-quality leads – warm, trusting, and ready</li>
                        <li>• Teach the feature live, not via text – walk clients through it in real-time</li>
                        <li>• Position referrals as service, not sales – they&apos;re helping people they care about</li>
                        <li>• Build a referral culture through recognition, ease, and celebration</li>
                      </>
                    )}
                    {currentLesson.id === "6.3.3" && (
                      <>
                        <li>• Shared carts remove friction and simplify the buying process</li>
                        <li>• Create the cart while momentum is high – same day as Health Assessment</li>
                        <li>• Always personalize and include context with your link</li>
                        <li>• Follow up on unopened or abandoned carts with empathy</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>

              <div className="border-t bg-gray-50 p-6 flex justify-between">
                {prevLesson ? (
                  <Button variant="outline" onClick={() => setExpandedLesson(prevLesson.id)}><ArrowLeft className="h-4 w-4 mr-2" />Previous</Button>
                ) : (
                  <Button variant="outline" onClick={() => (window.location.href = "/training/ten-x-system")}><ArrowLeft className="h-4 w-4 mr-2" />Back to Module 6.2</Button>
                )}
                {nextLesson ? (
                  <Button onClick={() => setExpandedLesson(nextLesson.id)} className="bg-[hsl(var(--optavia-green))]">Next<ArrowRight className="h-4 w-4 ml-2" /></Button>
                ) : (
                  <Button className="bg-[hsl(var(--optavia-green))]" onClick={() => window.history.back()}>🎉 Complete Phase 6!<ArrowRight className="h-4 w-4 ml-2" /></Button>
                )}
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
