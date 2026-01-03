"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Circle, ChevronRight, Clock, Star, ArrowLeft, ArrowRight, Bot, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useSupabaseData } from "@/hooks/use-supabase-data"

const lessons = [
  { id: "8.2.1", title: "Teaching Your ChatGPT to Know You", type: "AI Training Guide", icon: Bot, duration: "30 min read + setup" },
]

const aiBenefits = [
  { icon: "✍️", benefit: "Content Creation at Scale", desc: "Generate posts, emails, and training materials in minutes", example: "Create a week's worth of posts in 10 minutes" },
  { icon: "🎯", benefit: "Consistent Messaging", desc: "Maintain your voice across all communications", example: "Every team email sounds like you wrote it" },
  { icon: "💡", benefit: "24/7 Brainstorming Partner", desc: "Get ideas and overcome writer's block anytime", example: "Generate 20 conversation starters at midnight" },
  { icon: "📚", benefit: "Training Resource Creation", desc: "Develop scripts and guides for your team", example: "Create a complete onboarding guide" },
  { icon: "⏰", benefit: "Time Liberation", desc: "Automate repetitive content tasks", example: "Reclaim 5+ hours per week" },
]

const powerPromptCategories = [
  {
    category: "Social Media Content",
    icon: "📱",
    color: "#e91e63",
    prompts: [
      { title: "Weekly Content Batch", prompt: "Create 7 social media posts for this week. Include: 2 motivational posts, 2 educational posts about healthy habits, 2 client success celebration templates, and 1 curiosity post about the coaching opportunity." },
      { title: "Story Sequence", prompt: "Create a 5-story Instagram/Facebook story sequence about [TOPIC]. First story should hook attention, middle stories provide value, last story should have a call to action." },
    ]
  },
  {
    category: "Client Communication",
    icon: "💬",
    color: "#2196f3",
    prompts: [
      { title: "Check-In Messages", prompt: "Create 5 different morning check-in messages I can rotate through for my clients. Each should be encouraging and under 50 words." },
      { title: "Plateau Support", prompt: "A client has been on a plateau for 2 weeks. Write a supportive message that validates frustration, explains why plateaus happen, and gives 3 specific things to focus on." },
    ]
  },
  {
    category: "Team Training",
    icon: "👥",
    color: "#4caf50",
    prompts: [
      { title: "Training Module", prompt: "Create a training guide on [TOPIC] for my team. Include: overview, step-by-step process, common mistakes to avoid, scripts they can use, and action items." },
      { title: "Role-Play Scenarios", prompt: "Create 5 role-play scenarios for practicing Health Assessments. For each, provide: prospect's background, their objection, and ideal coaching response." },
    ]
  },
  {
    category: "Business Building",
    icon: "📈",
    color: "#ff9800",
    prompts: [
      { title: "Objection Responses", prompt: "Give me thoughtful responses to: 1) 'I don't have time', 2) 'It's too expensive', 3) 'I've tried everything', 4) 'I need to think about it'. Keep responses empathetic, not pushy." },
      { title: "Follow-Up Sequence", prompt: "Create a 5-message follow-up sequence for someone interested but hasn't committed. Space messages 3-4 days apart. Each should provide value, not just ask 'have you decided?'" },
    ]
  },
]

const advancedTechniques = [
  { icon: "🎤", technique: "Voice Training", howTo: "Share 3-5 posts you've written. Say: 'Analyze these examples of my writing and identify my unique voice characteristics.'" },
  { icon: "🏛️", technique: "Content Pillars", howTo: "Tell ChatGPT: 'My content pillars are: 1) [Pillar], 2) [Pillar], 3) [Pillar]. All content should align with these themes.'" },
  { icon: "👤", technique: "Persona Creation", howTo: "Define personas like: 'When writing for prospects, assume they're busy professionals skeptical of diets.'" },
  { icon: "📁", technique: "Template Library", howTo: "Save your best prompts organized by category. Copy-paste and customize as needed." },
  { icon: "🔄", technique: "Iteration Prompts", howTo: "Use follow-ups like: 'Make it shorter', 'More casual tone', 'Add more emotion', 'Give me 3 more variations'" },
  { icon: "✅", technique: "Compliance Check", howTo: "After generating content, ask: 'Review this for potential compliance issues. Flag any medical advice or income guarantees.'" },
]

const box1Template = `I am an OPTAVIA health coach at the [YOUR RANK] level. I have been coaching for [X] years and have helped [X] clients achieve their health goals.

My business focus:
- Building and leading a team of [X] coaches
- Supporting clients through their weight loss and optimal health journey
- Creating content for social media and team training
- Developing leaders within my organization

My target audience:
- Prospective clients interested in health and weight loss
- My existing clients on program
- My team of coaches at various levels
- Potential business builders

My communication style is [warm/professional/casual/motivational] and I value [authenticity/encouragement/education/inspiration].

My unique story: [Brief 2-3 sentence version of your transformation]

Key programs I work with: OPTAVIA 5&1 Plan, 4&2&1 Plan, Optimal Health 3&3`

const box2Template = `Communication style:
- Use a [warm and encouraging / professional yet friendly / casual and relatable] tone
- Write at a 6th-8th grade reading level for accessibility
- Be concise – social posts should be under 200 words unless specified
- Use emojis sparingly (1-3 per post maximum)
- Never use the word "journey" – use "path" or "transformation" instead
- Avoid clichés like "game-changer" or "crushing it"

Content guidelines:
- Follow OPTAVIA compliance – never make medical claims or guarantee results
- Focus on habits, lifestyle, and the coaching relationship
- Celebrate non-scale victories alongside weight loss
- Always maintain positivity without toxic positivity

Formatting preferences:
- Use bullet points for lists
- Keep paragraphs short (2-3 sentences max)
- Include a clear call-to-action when appropriate
- For social posts, suggest relevant hashtags

When I ask for content:
- Provide 2-3 options/variations when possible
- Ask clarifying questions if my request is vague
- Remind me to personalize before posting`

export function AdvancedToolsContent() {
  const { toast } = useToast()
  const { user } = useAuth()
  const { completedResources, toggleCompletedResource } = useSupabaseData(user)
  const [expandedLesson, setExpandedLesson] = useState(lessons[0].id)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [customInstructions, setCustomInstructions] = useState({ aboutYou: "", responseStyle: "" })

  const getResourceId = (lessonId: string) => `advanced-tools-${lessonId}`
  const completedLessons = new Set(lessons.map((lesson) => lesson.id).filter((lessonId) => completedResources.includes(getResourceId(lessonId))))

  useEffect(() => {
    const saved = localStorage.getItem("advancedToolsExpanded")
    if (saved) {
      try {
        const lessonId = JSON.parse(saved)
        if (lessons.some((l) => l.id === lessonId)) setExpandedLesson(lessonId)
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("advancedToolsExpanded", JSON.stringify(expandedLesson))
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
    setCopiedText(id)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const currentLessonIndex = lessons.findIndex((l) => l.id === expandedLesson)
  const currentLesson = lessons[currentLessonIndex]
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
            <span className="font-semibold">Module 8.2</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Advanced Tools</h1>
          <p className="text-lg opacity-90 max-w-2xl">Leverage technology and AI systems to scale your impact.</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          <aside className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-900 to-purple-800 text-white text-center border-0">
              <CardContent className="pt-6">
                <div className="text-4xl mb-2">🤖</div>
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

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300">
              <CardContent className="pt-5">
                <p className="text-sm text-blue-900 italic leading-relaxed mb-2">&quot;The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency.&quot;</p>
                <p className="text-xs text-blue-700 font-semibold">— Bill Gates</p>
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
                <div className="space-y-10">
                  {/* Intro */}
                  <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg">
                    <p className="text-base leading-relaxed">AI tools like ChatGPT can become powerful assistants in your coaching business – but only if they understand who you are, what you do, and how you communicate. This lesson teaches you how to &apos;train&apos; AI to be your personalized business partner.</p>
                  </div>

                  {/* Why AI */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">1. Why AI for Your Coaching Business?</h3>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {aiBenefits.map((item, i) => (
                        <div key={i} className="p-4 bg-green-50 rounded-lg">
                          <span className="text-2xl block mb-2">{item.icon}</span>
                          <div className="font-bold text-green-800 text-sm mb-1">{item.benefit}</div>
                          <div className="text-xs text-green-700 mb-2">{item.desc}</div>
                          <div className="text-xs text-optavia-gray bg-white p-2 rounded">💡 {item.example}</div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="font-bold text-amber-800 mb-2">⚠️ Important: AI is a Tool, Not a Replacement</div>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• AI assists YOUR expertise – it doesn&apos;t replace your experience and judgment</li>
                        <li>• Always review and personalize AI-generated content before using</li>
                        <li>• Authentic connection with clients and team requires YOU</li>
                      </ul>
                    </div>
                  </div>

                  {/* Box 1 Template */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">2. Box 1: What ChatGPT Should Know About You</h3>
                    <p className="text-sm text-optavia-gray mb-4">Copy and customize this template for the first Custom Instructions box:</p>
                    <div className="relative mb-4">
                      <pre className="p-5 bg-gray-900 rounded-lg text-green-400 text-xs leading-relaxed overflow-auto whitespace-pre-wrap font-mono">{box1Template}</pre>
                      <button
                        onClick={() => copyToClipboard(box1Template, "box1")}
                        className={`absolute top-3 right-3 px-3 py-1.5 rounded text-xs text-white flex items-center gap-1 ${copiedText === "box1" ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}
                      >
                        {copiedText === "box1" ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy</>}
                      </button>
                    </div>
                  </div>

                  {/* Box 2 Template */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">3. Box 2: How ChatGPT Should Respond</h3>
                    <p className="text-sm text-optavia-gray mb-4">Copy and customize this template for the second Custom Instructions box:</p>
                    <div className="relative mb-4">
                      <pre className="p-5 bg-gray-900 rounded-lg text-blue-400 text-xs leading-relaxed overflow-auto whitespace-pre-wrap font-mono">{box2Template}</pre>
                      <button
                        onClick={() => copyToClipboard(box2Template, "box2")}
                        className={`absolute top-3 right-3 px-3 py-1.5 rounded text-xs text-white flex items-center gap-1 ${copiedText === "box2" ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}
                      >
                        {copiedText === "box2" ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy</>}
                      </button>
                    </div>
                  </div>

                  {/* Interactive Builder */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">4. Build Your Custom Instructions</h3>
                    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <p className="text-sm text-green-800 mb-6">Use the fields below to draft your custom instructions. Copy and paste into ChatGPT when ready.</p>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-semibold block mb-2">Box 1: About You</label>
                          <Textarea
                            value={customInstructions.aboutYou}
                            onChange={(e) => setCustomInstructions((prev) => ({ ...prev, aboutYou: e.target.value }))}
                            placeholder="I am an OPTAVIA health coach at the... My business focus... My target audience..."
                            className="min-h-[120px] border-green-300"
                          />
                          <div className="text-xs text-optavia-gray mt-1">{customInstructions.aboutYou.length}/1500 characters</div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold block mb-2">Box 2: Response Style</label>
                          <Textarea
                            value={customInstructions.responseStyle}
                            onChange={(e) => setCustomInstructions((prev) => ({ ...prev, responseStyle: e.target.value }))}
                            placeholder="Communication style... Content guidelines... Formatting preferences..."
                            className="min-h-[120px] border-blue-300"
                          />
                          <div className="text-xs text-optavia-gray mt-1">{customInstructions.responseStyle.length}/1500 characters</div>
                        </div>
                        <div className="flex gap-3">
                          <Button onClick={() => copyToClipboard(customInstructions.aboutYou, "builder1")} className={copiedText === "builder1" ? "bg-green-600" : "bg-green-700"}>
                            {copiedText === "builder1" ? <><Check className="h-4 w-4 mr-2" /> Copied Box 1</> : <><Copy className="h-4 w-4 mr-2" /> Copy Box 1</>}
                          </Button>
                          <Button onClick={() => copyToClipboard(customInstructions.responseStyle, "builder2")} className={copiedText === "builder2" ? "bg-green-600" : "bg-blue-700"}>
                            {copiedText === "builder2" ? <><Check className="h-4 w-4 mr-2" /> Copied Box 2</> : <><Copy className="h-4 w-4 mr-2" /> Copy Box 2</>}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Power Prompts */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">5. Power Prompts for OPTAVIA Coaches</h3>
                    <p className="text-sm text-optavia-gray mb-4">Once your Custom Instructions are set, use these prompts to get great results:</p>
                    <div className="space-y-6">
                      {powerPromptCategories.map((cat, i) => (
                        <div key={i}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl">{cat.icon}</span>
                            <span className="font-bold" style={{ color: cat.color }}>{cat.category}</span>
                          </div>
                          <div className="space-y-3">
                            {cat.prompts.map((prompt, j) => (
                              <div key={j} className="p-4 bg-gray-50 rounded-lg" style={{ borderLeft: `4px solid ${cat.color}` }}>
                                <div className="flex justify-between items-start mb-2">
                                  <span className="font-semibold text-sm">{prompt.title}</span>
                                  <button
                                    onClick={() => copyToClipboard(prompt.prompt, `prompt-${i}-${j}`)}
                                    className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${copiedText === `prompt-${i}-${j}` ? "bg-green-500 text-white" : "bg-gray-200 text-optavia-gray hover:bg-gray-300"}`}
                                  >
                                    {copiedText === `prompt-${i}-${j}` ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                                  </button>
                                </div>
                                <div className="text-xs text-optavia-gray bg-white p-3 rounded font-mono">{prompt.prompt}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Techniques */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">6. Advanced Techniques</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {advancedTechniques.map((tech, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{tech.icon}</span>
                            <span className="font-bold text-sm">{tech.technique}</span>
                          </div>
                          <div className="text-xs text-green-700 bg-green-50 p-3 rounded">
                            💡 <strong>How to:</strong> {tech.howTo}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ethics */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">7. AI Ethics & Best Practices</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="font-bold text-green-600 mb-3">✅ DO</div>
                        <div className="space-y-2">
                          {[
                            { icon: "✏️", do: "Always Personalize", desc: "Review and customize every piece before using" },
                            { icon: "💡", do: "Use for Drafts & Ideas", desc: "Think of AI as a first draft generator" },
                            { icon: "❤️", do: "Maintain Authenticity", desc: "Your story and relationships are irreplaceable" },
                            { icon: "🔒", do: "Protect Privacy", desc: "Never share client info with AI tools" },
                          ].map((item, i) => (
                            <div key={i} className="p-3 bg-green-50 rounded-lg">
                              <div className="flex items-center gap-2 text-green-800 font-semibold text-sm">{item.icon} {item.do}</div>
                              <div className="text-xs text-green-700 mt-1">{item.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-red-600 mb-3">❌ DON&apos;T</div>
                        <div className="space-y-2">
                          {[
                            { icon: "🚫", dont: "Copy-Paste Without Review", desc: "Unedited AI content is obvious and inauthentic" },
                            { icon: "💔", dont: "Use for Sensitive Conversations", desc: "Emotional situations require your personal touch" },
                            { icon: "⚠️", dont: "Make Claims AI Generates", desc: "Verify and likely remove income/health claims" },
                            { icon: "🔐", dont: "Share Proprietary Info", desc: "Don't input confidential materials into AI" },
                          ].map((item, i) => (
                            <div key={i} className="p-3 bg-red-50 rounded-lg">
                              <div className="flex items-center gap-2 text-red-800 font-semibold text-sm">{item.icon} {item.dont}</div>
                              <div className="text-xs text-red-700 mt-1">{item.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Takeaways */}
                  <div className="p-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                    <h4 className="text-base font-bold text-amber-900 mb-4 flex items-center gap-2"><Star className="h-5 w-5 fill-amber-600" />Key Takeaways</h4>
                    <ul className="space-y-2 text-sm text-amber-900">
                      <li>• Custom Instructions are the foundation – tell AI who you are and how you communicate</li>
                      <li>• Use AI for first drafts and brainstorming, then always personalize before using</li>
                      <li>• Build a library of power prompts for your recurring content needs</li>
                      <li>• Advanced techniques like voice training make AI even more effective</li>
                      <li>• Always prioritize authenticity, compliance, and privacy when using AI tools</li>
                      <li>• Start with one use case, master it, then expand to other areas</li>
                    </ul>
                  </div>
                </div>
              </CardContent>

              <div className="border-t bg-gray-50 p-6 flex justify-between">
                <Button variant="outline" onClick={() => (window.location.href = "/training/legacy-building")}><ArrowLeft className="h-4 w-4 mr-2" />Back to Module 8.1</Button>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700" onClick={() => window.history.back()}>🎉💎 Complete All Training!<ArrowRight className="h-4 w-4 ml-2" /></Button>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
