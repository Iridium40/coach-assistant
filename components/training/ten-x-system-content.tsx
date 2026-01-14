"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Circle, ChevronRight, ChevronDown, Clock, Star, ArrowLeft, ArrowRight, Video, Play, Rocket, AlertTriangle, Copy, Clipboard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useSupabaseData } from "@/hooks/use-supabase-data"

const lessons = [
  { id: "6.2.1", title: "Coaching 10X", type: "System Overview", icon: Rocket, duration: "20 min read" },
  { id: "6.2.2", title: "10X Kickoff Call with Kristen Glass", type: "Video Training", icon: Video, duration: "25 min watch" },
  { id: "6.2.3", title: "10 Questions That Will Help You Gauge Metabolic Health", type: "Assessment Tool", icon: Clipboard, duration: "15 min read" },
]

const tenXPrinciples = [
  { principle: "High Accountability", description: "Clients commit to specific, measurable actions and report daily", icon: "📊" },
  { principle: "Proactive Support", description: "You reach out before problems arise, not just when clients reach out", icon: "🎯" },
  { principle: "Structured Communication", description: "Every touchpoint follows a proven framework for maximum impact", icon: "📋" },
  { principle: "Rapid Response", description: "Issues are addressed within hours, not days", icon: "⚡" },
  { principle: "Celebration Culture", description: "Wins are recognized immediately and consistently", icon: "🎉" },
  { principle: "Duplication Focus", description: "Systems are designed to be taught to your team", icon: "🔄" },
]

const whyItWorks = [
  { reason: "Closes the Gap Between Intention and Action", explanation: "Most clients know what to do but struggle with follow-through. Daily accountability closes this gap.", stat: "Clients with daily accountability are 65% more likely to stay on program" },
  { reason: "Creates Emotional Connection", explanation: "Frequent, meaningful contact builds deep trust and loyalty. Clients don't want to let you down.", stat: "High-touch clients refer 3x more often than low-touch" },
  { reason: "Catches Problems Early", explanation: "Small issues become big problems when ignored. Proactive check-ins prevent derailment.", stat: "Early intervention saves 80% of at-risk clients" },
  { reason: "Builds Habits Through Repetition", explanation: "Daily reporting creates automatic behaviors. After 21-30 days, it becomes second nature.", stat: "Habit formation requires consistent touchpoints" },
]

const scripts = [
  {
    type: "Morning Motivation",
    variations: [
      "Rise and shine! 🌅 Day [X] of your transformation. Remember why you started – today is another step toward becoming who you want to be. You've got this!",
      "Good morning superstar! ⭐ Every choice today is a vote for the healthier you. What's one thing you're looking forward to today?",
      "Morning! ☀️ Did you know your body is literally rebuilding itself? Every Fueling, every healthy choice – you're creating a new you. Make today count!",
    ]
  },
  {
    type: "Daily Check-In Request",
    variations: [
      "Hey! Quick check-in time 📝 How'd today go? Fuelings ✅, Water ✅, L&G ✅? Any wins or challenges to share?",
      "Evening check-in! 🌙 Rate your day 1-10 and tell me one thing you're proud of from today.",
      "How's my favorite client doing tonight? 💚 Give me the rundown – what worked today? What was tricky?",
    ]
  },
  {
    type: "Celebration Responses",
    variations: [
      "YES! 🎉 That's what I'm talking about! I'm so proud of you. Keep stacking these wins!",
      "Amazing! ⭐ You're proving to yourself that you CAN do this. That's the biggest win of all!",
      "Look at you GO! 🚀 This consistency is exactly what creates lasting transformation. You're doing incredible!",
    ]
  },
  {
    type: "Struggle Support",
    variations: [
      "I hear you, and I'm so glad you told me. 💚 One tough moment doesn't define your journey. What do you need right now?",
      "Thank you for being honest with me. That takes courage. Let's talk about what happened and how we can navigate it together.",
      "It's okay – this is part of the process. What matters is that you're still here, still communicating. We'll figure this out together.",
    ]
  },
]

const metabolicQuestions = [
  { number: 1, question: "How would you describe your energy levels throughout the day?", whatItReveals: "Steady energy suggests good metabolic function. Energy crashes, especially mid-afternoon, often indicate blood sugar instability.", greenFlags: ["Consistent energy", "No afternoon crashes", "Wake up refreshed"], redFlags: ["Severe afternoon crashes", "Need caffeine to function", "Exhausted despite enough sleep"], followUp: "What time of day do you feel most/least energetic?" },
  { number: 2, question: "Do you experience cravings? What do you typically crave and when?", whatItReveals: "Sugar/carb cravings often indicate blood sugar dysregulation. Cravings after meals suggest poor satiety signals.", greenFlags: ["Minimal cravings", "Can go hours without thinking about food", "Cravings manageable"], redFlags: ["Constant sugar cravings", "Can't go 2-3 hours without eating", "Cravings feel uncontrollable"], followUp: "What happens if you don't give in to a craving?" },
  { number: 3, question: "How would you describe your hunger patterns?", whatItReveals: "Steady hunger that builds gradually is healthy. Sudden, intense hunger (hangry) suggests blood sugar issues.", greenFlags: ["Gradual hunger", "Can delay meals if needed", "Feel satisfied after eating"], redFlags: ["Sudden intense hunger", "'Hangry' episodes", "Never feel satisfied"], followUp: "What happens physically when you get hungry?" },
  { number: 4, question: "Have you been diagnosed with insulin resistance, pre-diabetes, diabetes, PCOS, or thyroid issues?", whatItReveals: "These conditions directly impact metabolism and weight loss. They're not barriers but do require adjusted expectations.", greenFlags: ["No diagnoses", "Conditions well-managed", "Working with doctor"], redFlags: ["Unmanaged conditions", "Multiple metabolic diagnoses", "Not seeing a doctor"], followUp: "What medications are you taking?" },
  { number: 5, question: "How many times have you tried to lose weight before? What happened?", whatItReveals: "History of yo-yo dieting can slow metabolism. Understanding past patterns helps prevent repeating them.", greenFlags: ["Few previous attempts", "Lost weight and kept some off", "Understands why past diets failed"], redFlags: ["Many failed attempts", "Pattern of lose/regain", "Increasingly difficult to lose"], followUp: "What do you think went wrong with previous attempts?" },
]

const metabolicTiers = [
  { tier: "Tier 1: Healthy Metabolism", description: "Few red flags. Good energy, minimal cravings, no metabolic conditions.", expectations: "May lose weight more quickly, transition to fat burn faster (2-3 days), fewer symptoms.", coaching: "Standard 10X approach. Celebrate quick wins while building sustainable habits.", color: "#37B6AE" },
  { tier: "Tier 2: Mild Metabolic Challenges", description: "Some red flags – energy crashes, cravings, or a history of yo-yo dieting.", expectations: "May take longer to enter fat burn (4-7 days), may have more significant transition symptoms.", coaching: "Extra support during first week. Normalize slower initial progress. Focus on non-scale victories.", color: "#ffc107" },
  { tier: "Tier 3: Significant Metabolic Challenges", description: "Multiple red flags – metabolic conditions, severe symptoms, extensive dieting history.", expectations: "May take 7-14 days to fully adapt. Progress may be slower. Non-scale victories are crucial.", coaching: "Ensure medical clearance. More frequent check-ins. Celebrate every win. Prepare for longer journey.", color: "#ff9800" },
  { tier: "Tier 4: Medical Supervision Recommended", description: "Multiple unmanaged conditions, on medications that affect blood sugar, or severe symptoms.", expectations: "Must work closely with healthcare provider. Medication adjustments may be needed.", coaching: "Require doctor's approval before starting. Coordinate care. More cautious approach.", color: "#f44336" },
]

export function TenXSystemContent() {
  const { toast } = useToast()
  const { user } = useAuth()
  const { completedResources, toggleCompletedResource } = useSupabaseData(user)
  const [expandedLesson, setExpandedLesson] = useState(lessons[0].id)
  const [copiedScript, setCopiedScript] = useState<string | null>(null)
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const getResourceId = (lessonId: string) => `ten-x-system-${lessonId}`
  const completedLessons = new Set(lessons.map((lesson) => lesson.id).filter((lessonId) => completedResources.includes(getResourceId(lessonId))))

  useEffect(() => {
    const saved = localStorage.getItem("tenXSystemExpanded")
    if (saved) {
      try {
        const lessonId = JSON.parse(saved)
        if (lessons.some((l) => l.id === lessonId)) setExpandedLesson(lessonId)
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tenXSystemExpanded", JSON.stringify(expandedLesson))
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
            <span className="font-semibold">Module 6.2</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">The 10X System</h1>
          <p className="text-lg opacity-90 max-w-2xl">Implement high-accountability coaching systems that multiply your results.</p>
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

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300">
              <CardContent className="pt-5">
                <p className="text-sm text-amber-900 italic leading-relaxed mb-2">&quot;The difference between ordinary and extraordinary is that little &apos;extra&apos; – consistent, daily attention to your clients.&quot;</p>
                <p className="text-xs text-amber-700 font-semibold">— The 10X Philosophy</p>
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
                {/* Lesson 6.2.1 - Coaching 10X */}
                {currentLesson.id === "6.2.1" && (
                  <div className="space-y-8">
                    <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg">
                      <p className="text-base leading-relaxed">The 10X System is a high-accountability coaching framework designed to multiply your impact and results. It&apos;s called &apos;10X&apos; because it&apos;s designed to help you achieve 10 times the results of traditional coaching through structured accountability, systematic follow-up, and intentional client development.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[hsl(var(--optavia-green))] to-green-500 text-white flex items-center justify-center text-sm">1</span>
                        What is the 10X System?
                      </h3>
                      <p className="text-optavia-gray mb-4">10X is a structured coaching methodology that transforms how you support clients. Instead of passive check-ins, you implement an active, high-touch system that dramatically increases client success rates and retention.</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {tenXPrinciples.map((item, i) => (
                          <div key={i} className="p-4 bg-green-50 rounded-lg text-center">
                            <span className="text-2xl block mb-2">{item.icon}</span>
                            <div className="font-bold text-green-800 text-sm mb-1">{item.principle}</div>
                            <div className="text-xs text-green-700">{item.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[hsl(var(--optavia-green))] to-green-500 text-white flex items-center justify-center text-sm">2</span>
                        Why 10X Works
                      </h3>
                      <div className="space-y-3">
                        {whyItWorks.map((item, i) => (
                          <div key={i} className={`p-4 rounded-lg border-l-4 border-[hsl(var(--optavia-green))] ${i % 2 === 0 ? "bg-green-50" : "bg-white"}`}>
                            <div className="font-bold text-optavia-dark mb-2">{item.reason}</div>
                            <p className="text-sm text-optavia-gray mb-2">{item.explanation}</p>
                            <span className="inline-block text-xs bg-white px-3 py-1 rounded text-[hsl(var(--optavia-green))] font-semibold">📊 {item.stat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[hsl(var(--optavia-green))] to-green-500 text-white flex items-center justify-center text-sm">3</span>
                        The 10X Daily Framework
                      </h3>
                      <p className="text-optavia-gray mb-4">Every day in the 10X system follows this pattern. It takes only 10-15 minutes of your time but creates massive value for clients.</p>
                      
                      <div className="space-y-4">
                        <div className="rounded-lg overflow-hidden border border-amber-200">
                          <div className="bg-amber-50 px-4 py-3 font-bold text-amber-800 flex items-center gap-2">☀️ Morning Actions</div>
                          <div className="p-4 space-y-3">
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">Morning Motivation Message</span>
                                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">7-9 AM</span>
                              </div>
                              <p className="text-sm text-optavia-gray mb-2">Send an encouraging text or voice message to start their day right</p>
                              <div className="text-xs text-optavia-gray">⏱️ 30 seconds per client</div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">Review Overnight Messages</span>
                                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">8-10 AM</span>
                              </div>
                              <p className="text-sm text-optavia-gray mb-2">Check for any messages that came in overnight and respond promptly</p>
                              <div className="text-xs text-optavia-gray">⏱️ 5-10 minutes total</div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg overflow-hidden border border-blue-200">
                          <div className="bg-blue-50 px-4 py-3 font-bold text-blue-800 flex items-center gap-2">🌙 Evening Actions</div>
                          <div className="p-4 space-y-3">
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">Request Daily Check-In</span>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">6-8 PM</span>
                              </div>
                              <p className="text-sm text-optavia-gray mb-2">Ask clients to report on their day – Fuelings, water, Lean &amp; Green, challenges</p>
                              <div className="text-xs text-optavia-gray">⏱️ 30 seconds per client</div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">Respond to Check-Ins</span>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">8-10 PM</span>
                              </div>
                              <p className="text-sm text-optavia-gray mb-2">Review every check-in and respond personally – celebrate wins, address concerns</p>
                              <div className="text-xs text-optavia-gray">⏱️ 1-2 minutes per client</div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg overflow-hidden border border-green-200">
                          <div className="bg-green-50 px-4 py-3 font-bold text-green-800 flex items-center gap-2">📅 Weekly Actions</div>
                          <div className="p-4 space-y-3">
                            {[
                              { action: "Weekly Voice/Video Call", timing: "Same time each week", focus: "Progress celebration, obstacle troubleshooting, goal setting" },
                              { action: "Weigh-In Support", timing: "Weigh-in day", focus: "Celebrate progress, contextualize numbers, maintain motivation" },
                              { action: "Week Ahead Planning", timing: "Sunday evening", focus: "Proactive problem-solving, meal prep support" },
                            ].map((item, i) => (
                              <div key={i} className="p-3 bg-white rounded-lg border border-green-100">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-semibold">{item.action}</span>
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{item.timing}</span>
                                </div>
                                <div className="text-sm text-[hsl(var(--optavia-green))]">Focus: {item.focus}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[hsl(var(--optavia-green))] to-green-500 text-white flex items-center justify-center text-sm">4</span>
                        10X Communication Scripts
                      </h3>
                      <div className="space-y-4">
                        {scripts.map((scriptGroup, i) => (
                          <div key={i} className="rounded-lg border overflow-hidden">
                            <div className={`px-4 py-3 font-bold ${i === 0 ? "bg-amber-50 text-amber-800" : i === 1 ? "bg-blue-50 text-blue-800" : i === 2 ? "bg-green-50 text-green-800" : "bg-pink-50 text-pink-800"}`}>
                              {i === 0 ? "☀️" : i === 1 ? "📝" : i === 2 ? "🎉" : "💚"} {scriptGroup.type}
                            </div>
                            <div className="p-4 space-y-2">
                              {scriptGroup.variations.map((script, j) => (
                                <div key={j} className={`flex justify-between items-start gap-3 p-3 rounded-lg ${j % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                  <p className="text-sm text-optavia-gray flex-1">&quot;{script}&quot;</p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => copyToClipboard(script, `${i}-${j}`)}
                                    className={`shrink-0 ${copiedScript === `${i}-${j}` ? "bg-green-50 text-[hsl(var(--optavia-green))] border-green-300" : ""}`}
                                  >
                                    {copiedScript === `${i}-${j}` ? <><Check className="h-3 w-3 mr-1" />Copied</> : <><Copy className="h-3 w-3 mr-1" />Copy</>}
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[hsl(var(--optavia-green))] to-green-500 text-white flex items-center justify-center text-sm">5</span>
                        Common 10X Mistakes to Avoid
                      </h3>
                      <div className="space-y-3">
                        {[
                          { mistake: "Being Inconsistent", consequence: "Clients lose trust if you skip days.", solution: "Schedule it like a non-negotiable appointment." },
                          { mistake: "Generic Messages", consequence: "Copy-paste messages feel impersonal.", solution: "Always personalize with name, day number, or something specific." },
                          { mistake: "Not Responding to Struggles", consequence: "If clients share challenges and you only celebrate wins, they'll stop being honest.", solution: "Always acknowledge struggles first, then problem-solve together." },
                          { mistake: "Overwhelming Clients", consequence: "Too many messages can feel like nagging.", solution: "Stick to the framework: morning message, evening check-in. Quality over quantity." },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-red-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <span className="font-bold text-red-800">{item.mistake}</span>
                            </div>
                            <p className="text-sm text-optavia-gray mb-2"><strong>Consequence:</strong> {item.consequence}</p>
                            <div className="bg-green-50 p-2 rounded text-sm text-green-800">✅ Solution: {item.solution}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Lesson 6.2.2 - 10X Kickoff Call */}
                {currentLesson.id === "6.2.2" && (
                  <div className="space-y-8">
                    <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg">
                      <p className="text-base leading-relaxed">This training video from Kristen Glass walks you through exactly how to launch a client into the 10X system. The kickoff call sets the tone for your entire coaching relationship and establishes the accountability that makes 10X so effective.</p>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[hsl(var(--optavia-green))] to-green-500 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white fill-white" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">10X Kickoff Call Masterclass</div>
                          <div className="text-sm text-optavia-gray">~25 minutes • Kristen Glass</div>
                        </div>
                      </div>
                      <div className="aspect-video bg-gray-300 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center text-optavia-gray">
                          <Play className="h-12 w-12 mx-auto mb-2" />
                          <div>Video Player</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {["Setting expectations from day one", "The 10X commitment conversation", "Explaining daily check-ins", "Getting client buy-in", "Addressing resistance to accountability", "First-week communication cadence"].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-optavia-gray">
                            <CheckCircle className="h-4 w-4 text-[hsl(var(--optavia-green))]" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Kickoff Call Structure</h3>
                      <div className="space-y-4">
                        {[
                          { section: "1. Welcome & Celebration", duration: "3-5 min", script: "I am SO excited for you! This decision you've made – to invest in your health – is one of the most important decisions you'll ever make." },
                          { section: "2. Your Commitment to Them", duration: "3-5 min", script: "Every morning, you'll get a message from me to start your day right. Every evening, I'll check in to see how your day went. And I promise to respond." },
                          { section: "3. Their Commitment to You", duration: "5-7 min", script: "I need you to respond to my evening check-ins – even if it's just 'great day!' That response tells me how to support you." },
                          { section: "4. Why Accountability Works", duration: "3-5 min", script: "Most people know WHAT to do, but struggle with actually DOING it. That gap is where accountability comes in." },
                          { section: "5. First Week Preview", duration: "3-5 min", script: "Days 1-3, your body is adjusting – you might feel tired or have cravings. That's NORMAL and temporary. By days 4-5, you should start feeling the shift." },
                          { section: "6. Questions & Commitment", duration: "5-7 min", script: "Are you ready to commit to this partnership? The check-ins, the honesty, the follow-through? Because if you're all in, I'm all in." },
                        ].map((item, i) => (
                          <div key={i} className="rounded-lg border overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                              <span className="font-bold text-[hsl(var(--optavia-green))]">{item.section}</span>
                              <span className="text-xs bg-white px-2 py-1 rounded text-optavia-gray">⏱️ {item.duration}</span>
                            </div>
                            <div className="p-4">
                              <div className="bg-green-50 p-3 rounded-lg text-sm text-green-800 italic">💬 &quot;{item.script}&quot;</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Handling Resistance to Accountability</h3>
                      <div className="space-y-3">
                        {[
                          { objection: "That sounds like a lot of checking in...", response: "The check-ins take about 30 seconds. A quick 'good day!' is all I need. After a week, it'll feel totally natural.", key: "Minimize the burden, emphasize the benefit" },
                          { objection: "I don't want to bother you every day", response: "You're not bothering me – you're exactly why I'm here! Supporting you IS my job, and honestly, it's my favorite part.", key: "Flip the script – it's a gift, not a burden" },
                          { objection: "What if I have a bad day?", response: "You're definitely going to have bad days – we all do! Those are the MOST important days to check in. No judgment, only support.", key: "Normalize struggle, emphasize support" },
                        ].map((item, i) => (
                          <div key={i} className="rounded-lg border overflow-hidden">
                            <div className="bg-amber-50 px-4 py-3">
                              <span className="font-semibold text-amber-800">&quot;{item.objection}&quot;</span>
                            </div>
                            <div className="p-4">
                              <p className="text-sm text-optavia-gray mb-3">{item.response}</p>
                              <span className="inline-block bg-green-50 px-3 py-1 rounded text-sm text-green-800">🎯 {item.key}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Lesson 6.2.3 - 10 Questions */}
                {currentLesson.id === "6.2.3" && (
                  <div className="space-y-8">
                    <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg">
                      <p className="text-base leading-relaxed">Understanding your client&apos;s metabolic health is crucial for setting realistic expectations and providing personalized support. These 10 questions help you assess where a client is starting from and what challenges they might face.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Why Assess Metabolic Health?</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { reason: "Set Realistic Expectations", desc: "Clients with metabolic challenges may lose weight more slowly initially." },
                          { reason: "Personalize Your Coaching", desc: "Someone with insulin resistance needs different support." },
                          { reason: "Identify Red Flags", desc: "Some metabolic issues require medical supervision." },
                          { reason: "Celebrate Appropriate Wins", desc: "For some clients, stable blood sugar is a bigger win than the scale." },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-blue-50 rounded-lg">
                            <div className="font-bold text-blue-800 mb-1">{item.reason}</div>
                            <div className="text-sm text-blue-700">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">The Metabolic Health Questions</h3>
                      <div className="space-y-3">
                        {metabolicQuestions.map((q, i) => (
                          <div key={i} className="rounded-lg border overflow-hidden">
                            <button
                              onClick={() => setExpandedQuestion(expandedQuestion === i ? null : i)}
                              className={`w-full px-4 py-4 flex justify-between items-center text-left ${expandedQuestion === i ? "bg-green-50" : "bg-gray-50"}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[hsl(var(--optavia-green))] to-green-500 text-white flex items-center justify-center text-sm font-bold">{q.number}</span>
                                <span className="font-semibold text-sm">{q.question}</span>
                              </div>
                              <ChevronDown className={`h-5 w-5 text-optavia-gray transition-transform ${expandedQuestion === i ? "rotate-180" : ""}`} />
                            </button>
                            {expandedQuestion === i && (
                              <div className="p-4 border-t space-y-4">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                  <div className="text-xs font-semibold text-blue-700 mb-1">What This Reveals:</div>
                                  <div className="text-sm text-blue-900">{q.whatItReveals}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="bg-green-50 p-3 rounded-lg">
                                    <div className="text-xs font-semibold text-green-700 mb-2">✅ Green Flags</div>
                                    {q.greenFlags.map((flag, j) => (
                                      <div key={j} className="text-sm text-green-800">• {flag}</div>
                                    ))}
                                  </div>
                                  <div className="bg-red-50 p-3 rounded-lg">
                                    <div className="text-xs font-semibold text-red-700 mb-2">🚩 Red Flags</div>
                                    {q.redFlags.map((flag, j) => (
                                      <div key={j} className="text-sm text-red-800">• {flag}</div>
                                    ))}
                                  </div>
                                </div>
                                <div className="bg-amber-50 p-3 rounded-lg text-sm text-amber-800">
                                  💬 Follow-Up: &quot;{q.followUp}&quot;
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Interpreting the Results</h3>
                      <div className="space-y-3">
                        {metabolicTiers.map((tier, i) => (
                          <div key={i} className="p-4 bg-gray-50 rounded-lg" style={{ borderLeft: `4px solid ${tier.color}` }}>
                            <div className="font-bold mb-2" style={{ color: tier.color }}>{tier.tier}</div>
                            <p className="text-sm text-optavia-gray mb-2">{tier.description}</p>
                            <div className="text-sm text-optavia-gray mb-1"><strong>Expectations:</strong> {tier.expectations}</div>
                            <div className="text-sm text-[hsl(var(--optavia-green))]"><strong>Coaching:</strong> {tier.coaching}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Red Flag Actions</h3>
                      <div className="space-y-3">
                        {[
                          { flag: "Unmanaged diabetes or pre-diabetes", action: "Require medical clearance before starting. Blood sugar may need monitoring." },
                          { flag: "On medications that affect blood sugar", action: "MUST involve their doctor. Medications may need adjustment as they lose weight." },
                          { flag: "History of eating disorders", action: "Proceed with caution. Consider whether this program is appropriate. May need mental health support." },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <span className="font-bold text-red-800">{item.flag}</span>
                            </div>
                            <div className="text-sm text-optavia-gray"><strong>Action:</strong> {item.action}</div>
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
                    {currentLesson.id === "6.2.1" && (
                      <>
                        <li>• 10X is about proactive, high-accountability support – not more work, smarter work</li>
                        <li>• Follow the daily framework: morning motivation + evening check-in + personal response</li>
                        <li>• Create templates but always personalize – connection is everything</li>
                        <li>• The system works best when duplicated across your team</li>
                      </>
                    )}
                    {currentLesson.id === "6.2.2" && (
                      <>
                        <li>• The kickoff call establishes the 10X partnership from day one</li>
                        <li>• You share YOUR commitments first – lead by investing</li>
                        <li>• Frame accountability as a BENEFIT, not a burden</li>
                        <li>• Address resistance with empathy and reframes, not pressure</li>
                      </>
                    )}
                    {currentLesson.id === "6.2.3" && (
                      <>
                        <li>• Metabolic assessment helps you personalize coaching and set realistic expectations</li>
                        <li>• Categorize clients into tiers to determine support level needed</li>
                        <li>• Red flags don&apos;t mean they can&apos;t succeed – they mean they need extra support</li>
                        <li>• Always refer medical concerns to healthcare providers – you&apos;re a coach, not a doctor</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>

              <div className="border-t bg-gray-50 p-6 flex justify-between">
                {prevLesson ? (
                  <Button variant="outline" onClick={() => setExpandedLesson(prevLesson.id)}><ArrowLeft className="h-4 w-4 mr-2" />Previous</Button>
                ) : (
                  <Button variant="outline" onClick={() => (window.location.href = "/training/team-building")}><ArrowLeft className="h-4 w-4 mr-2" />Back to Module 6.1</Button>
                )}
                {nextLesson ? (
                  <Button onClick={() => setExpandedLesson(nextLesson.id)} className="bg-[hsl(var(--optavia-green))]">Next<ArrowRight className="h-4 w-4 ml-2" /></Button>
                ) : (
                  <Button className="bg-[hsl(var(--optavia-green))]" onClick={() => (window.location.href = "/training/moving-beyond-ed")}>Continue to Module 6.3<ArrowRight className="h-4 w-4 ml-2" /></Button>
                )}
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
