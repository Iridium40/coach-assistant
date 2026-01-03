"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Circle, ChevronRight, FileText, Clock, Star, ArrowLeft, ArrowRight, Rocket, CheckSquare, AlertTriangle, Lightbulb, ExternalLink, BarChart3, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useSupabaseData } from "@/hooks/use-supabase-data"

interface Metric {
  id: string
  label: string
  placeholder: string
  icon: string
  tip: string
}

interface AssessmentQuestion {
  id: string
  question: string
  scale: string[]
}

interface AssessmentArea {
  category: string
  questions: AssessmentQuestion[]
}

interface WinCategory {
  id: string
  label: string
  placeholder: string
  icon: string
}

interface GoalCategory {
  id: string
  label: string
  prompt: string
  placeholder: string
  icon: string
  examples: string[]
}

interface ActionSlot {
  id: string
  label: string
  placeholder: string
}

interface Commitment {
  text: string
  signaturePrompt: string
}

interface Benefit {
  benefit: string
  detail: string
}

interface RequirementTip {
  requirement: string
  icon: string
  description: string
  tips: string[]
}

interface TimelinePhase {
  phase: string
  title: string
  activities: string[]
  milestone: string
}

interface FunnelStage {
  stage: string
  number: string
  icon: string
}

interface MathSection {
  description: string
  funnel: FunnelStage[]
  insight: string
}

interface DailyAction {
  action: string
  detail: string
  priority: string
}

interface Roadblock {
  problem: string
  solution: string
}

interface RankInfo {
  rank: string
  requirement: string
  icon: string
  current?: boolean
}

interface Section {
  title: string
  description?: string
  metrics?: Metric[]
  assessmentAreas?: AssessmentArea[]
  winCategories?: WinCategory[]
  challengeCategories?: WinCategory[]
  goalCategories?: GoalCategory[]
  actionSlots?: ActionSlot[]
  commitment?: Commitment
  benefits?: Benefit[]
  requirements?: RequirementTip[]
  timeline?: TimelinePhase[]
  math?: MathSection
  dailyActions?: DailyAction[]
  roadblocks?: Roadblock[]
  nextRanks?: RankInfo[]
  message?: string
}

interface Lesson {
  id: string
  title: string
  type: string
  icon: typeof BarChart3
  duration: string
  canvaLink?: string
  content: {
    intro: string
    sections: Section[]
    keyTakeaways: string[]
  }
}

const lessons: Lesson[] = [
  {
    id: "3.4.1",
    title: "30-Day New Coach Self-Evaluation",
    type: "Assessment",
    icon: BarChart3,
    duration: "20 min activity",
    content: {
      intro: "Congratulations on completing your first 30 days as a coach! 🎉 This self-evaluation helps you reflect on your progress, identify wins, and set intentional goals for the next 30 days. Be honest with yourself – this is for YOUR growth!",
      sections: [
        {
          title: "Your First 30 Days by the Numbers",
          description: "Track your key metrics from the first month. These numbers tell the story of your activity level.",
          metrics: [
            { id: "clients", label: "New Clients Acquired", placeholder: "How many new clients did you get?", icon: "👥", tip: "Any number above 0 is a win!" },
            { id: "health_assessments", label: "Health Assessments Completed", placeholder: "How many HA calls did you do?", icon: "📞", tip: "More HAs = more opportunities" },
            { id: "conversations", label: "New Conversations Started", placeholder: "How many people did you reach out to?", icon: "💬", tip: "Activity leads to results" },
            { id: "posts", label: "Social Media Posts Made", placeholder: "How many posts did you share?", icon: "📱", tip: "Consistency matters most" },
            { id: "mentor_calls", label: "Mentor Check-ins", placeholder: "How many times did you connect with your mentor?", icon: "🎯", tip: "Stay connected for support" },
          ],
        },
        {
          title: "Self-Assessment: Rate Your First Month",
          description: "Rate yourself honestly in each area. This isn't about being perfect – it's about knowing where to focus.",
          assessmentAreas: [
            {
              category: "Activity & Effort",
              questions: [
                { id: "consistency", question: "How consistent was I with daily income-producing activities?", scale: ["Rarely", "Sometimes", "Often", "Daily"] },
                { id: "social_presence", question: "How active was I on social media?", scale: ["Barely posted", "1-2x/week", "3-4x/week", "Daily"] },
                { id: "reach_outs", question: "How many new conversations did I start each week?", scale: ["0-2", "3-5", "6-10", "10+"] },
              ],
            },
            {
              category: "Client Support",
              questions: [
                { id: "client_checkins", question: "How well did I support my client(s) daily?", scale: ["Struggled", "Inconsistent", "Pretty good", "Excellent"] },
                { id: "resources", question: "Did I share helpful resources with my clients?", scale: ["Rarely", "Sometimes", "Often", "Always"] },
                { id: "systems", question: "Did I use the 10X text system for client support?", scale: ["Didn't use", "Tried a bit", "Mostly used", "Fully used"] },
              ],
            },
            {
              category: "Personal Development",
              questions: [
                { id: "training", question: "How much training did I complete?", scale: ["None", "Some", "Most", "All available"] },
                { id: "coachable", question: "How coachable was I with my mentor?", scale: ["Resistant", "Sometimes open", "Usually open", "Very coachable"] },
                { id: "mindset", question: "How was my mindset and attitude?", scale: ["Struggled", "Up and down", "Mostly positive", "Consistently positive"] },
              ],
            },
            {
              category: "Business Building",
              questions: [
                { id: "pipeline", question: "How strong is my prospect pipeline?", scale: ["Empty", "A few names", "Solid list", "Overflowing"] },
                { id: "followup", question: "How consistent was I with follow-up?", scale: ["Rarely", "Sometimes", "Often", "Always"] },
                { id: "vision", question: "How clear am I on my 'why' and goals?", scale: ["Unclear", "Somewhat clear", "Clear", "Crystal clear"] },
              ],
            },
          ],
        },
        {
          title: "Wins to Celebrate",
          description: "What went WELL this month? List your victories, no matter how small. Celebrating wins builds momentum!",
          winCategories: [
            { id: "biggest_win", label: "My BIGGEST win this month was...", placeholder: "What are you most proud of?", icon: "🏆" },
            { id: "client_win", label: "A client success I helped create...", placeholder: "How did you help someone?", icon: "💚" },
            { id: "personal_win", label: "Something I learned about myself...", placeholder: "What did you discover?", icon: "🌟" },
            { id: "skill_win", label: "A skill I improved...", placeholder: "What got easier?", icon: "💪" },
          ],
        },
        {
          title: "Challenges & Growth Areas",
          description: "What was HARD this month? Identifying challenges helps you find solutions.",
          challengeCategories: [
            { id: "biggest_challenge", label: "My biggest challenge was...", placeholder: "What held you back?", icon: "🚧" },
            { id: "fear", label: "A fear I need to overcome...", placeholder: "What scared you?", icon: "😰" },
            { id: "skill_gap", label: "A skill I need to develop...", placeholder: "Where do you need training?", icon: "📚" },
            { id: "support_needed", label: "Support I need from my mentor...", placeholder: "How can they help?", icon: "🤝" },
          ],
        },
        {
          title: "Next 30 Days: Goal Setting",
          description: "Set specific, measurable goals for your next month. Write them down – goals that are written are more likely to be achieved!",
          goalCategories: [
            { id: "client_goal", label: "Client Goal", prompt: "How many new clients will I get?", placeholder: "e.g., 2 new clients", icon: "👥", examples: ["1 new client", "2 new clients", "3+ clients"] },
            { id: "ha_goal", label: "Health Assessment Goal", prompt: "How many Health Assessments will I complete?", placeholder: "e.g., 8 Health Assessments", icon: "📞", examples: ["4 HAs", "8 HAs", "12+ HAs"] },
            { id: "activity_goal", label: "Activity Goal", prompt: "What daily activity will I commit to?", placeholder: "e.g., 5 new reach-outs daily", icon: "📱", examples: ["3 reach-outs/day", "5 reach-outs/day", "Post daily"] },
            { id: "training_goal", label: "Training Goal", prompt: "What training will I complete?", placeholder: "e.g., Complete Phase 4 training", icon: "📚", examples: ["Finish all Phase 4", "Watch 2 trainings/week", "Attend team call"] },
            { id: "income_goal", label: "Income Goal", prompt: "What is my income target?", placeholder: "e.g., Earn my first commission", icon: "💰", examples: ["First commission", "$500", "$1,000+"] },
          ],
        },
        {
          title: "Action Items for Next Week",
          description: "What are the TOP 3 things you'll do THIS WEEK to hit your goals?",
          actionSlots: [
            { id: "action1", label: "Action #1", placeholder: "What will you do first?" },
            { id: "action2", label: "Action #2", placeholder: "What's next?" },
            { id: "action3", label: "Action #3", placeholder: "And then?" },
          ],
        },
        {
          title: "Commitment Statement",
          commitment: {
            text: "I commit to showing up fully for the next 30 days. I will take consistent action, stay coachable, and trust the process. My 'why' is bigger than my fear, and I will not quit on myself or my clients.",
            signaturePrompt: "Type your name to commit:",
          },
        },
      ],
      keyTakeaways: ["Honest self-reflection leads to intentional growth", "Celebrate your wins – they fuel your momentum", "Identify specific challenges so you can solve them", "Written goals with deadlines get accomplished"],
    },
  },
  {
    id: "3.4.2",
    title: "Fast Track to Senior Coach",
    type: "Roadmap",
    icon: Rocket,
    duration: "15 min read",
    canvaLink: "https://www.canva.com/design/DAGRyr_F44Y/3_36EEwhi6JmMZfl1ZKKAvw/edit",
    content: {
      intro: "Senior Coach is your FIRST promotion in OPTAVIA, and it's completely achievable in your first 30-60 days! This roadmap shows you exactly what's required and how to get there. Your promotion is just a few clients away!",
      sections: [
        {
          title: "What is Senior Coach?",
          description: "Senior Coach is the first rank in the OPTAVIA compensation plan. It's a milestone that shows you're serious about your business and opens up additional income opportunities.",
          benefits: [
            { benefit: "Higher commission rates", detail: "Earn more on client orders" },
            { benefit: "Team building unlocked", detail: "Start earning on your team's success" },
            { benefit: "Recognition", detail: "Celebrated in your community" },
            { benefit: "Confidence boost", detail: "Proof that you CAN do this" },
          ],
        },
        {
          title: "Requirements for Senior Coach",
          requirements: [
            { requirement: "3 Personally-Sponsored Clients", icon: "👥", description: "You need 3 clients who order through you. These are clients YOU brought in.", tips: ["Focus on your warm market first", "Every Health Assessment is an opportunity", "Follow up consistently with 'not yets'"] },
            { requirement: "OR 1 Client + 1 Coach", icon: "🌟", description: "Alternatively, you can have 1 client AND bring on 1 new coach to your team.", tips: ["Look for clients who love the program", "Share the business opportunity when appropriate", "Your coach sponsors you if they join through you"] },
            { requirement: "Maintain Personal Orders", icon: "📦", description: "You need to be an active client yourself with a qualifying personal order.", tips: ["Set up your Premier Order", "This is usually automatic if you're on the program", "Stay consistent with your own health journey"] },
          ],
        },
        {
          title: "Your Path to Senior Coach",
          timeline: [
            { phase: "Week 1-2", title: "Foundation", activities: ["Complete your launch post", "Start 10+ conversations", "Schedule 3-5 Health Assessments", "Work closely with your mentor"], milestone: "First Health Assessment completed" },
            { phase: "Week 2-3", title: "Momentum", activities: ["Convert HAs to clients", "Support your first client(s)", "Continue daily reach-outs", "Follow up with 'not yets'"], milestone: "First client acquired" },
            { phase: "Week 3-4", title: "Acceleration", activities: ["Replicate what's working", "Ask for referrals", "Increase activity", "Stay connected to your 'why'"], milestone: "2nd and 3rd clients" },
            { phase: "Week 4+", title: "Promotion!", activities: ["Hit Senior Coach!", "Celebrate your achievement", "Set sights on next rank", "Start helping others achieve"], milestone: "🎉 SENIOR COACH!" },
          ],
        },
        {
          title: "The Math to Senior Coach",
          math: {
            description: "Here's the typical conversion funnel to get 3 clients:",
            funnel: [
              { stage: "Conversations Started", number: "30-50", icon: "💬" },
              { stage: "Interest Shown", number: "10-15", icon: "👀" },
              { stage: "Health Assessments", number: "6-8", icon: "📞" },
              { stage: "New Clients", number: "3", icon: "🎉" },
            ],
            insight: "If you talk to 30-50 people and do 6-8 Health Assessments, you'll likely get 3 clients. The key is ACTIVITY!",
          },
        },
        {
          title: "Daily Actions for Senior Coach",
          dailyActions: [
            { action: "5 new reach-outs", detail: "Start 5 new conversations daily", priority: "high" },
            { action: "Follow up with prospects", detail: "Check in with people who showed interest", priority: "high" },
            { action: "Post on social media", detail: "Stay visible with valuable content", priority: "medium" },
            { action: "Support current clients", detail: "Their success is your success", priority: "high" },
            { action: "Connect with mentor", detail: "Stay accountable and get coaching", priority: "medium" },
          ],
        },
        {
          title: "Common Roadblocks & Solutions",
          roadblocks: [
            { problem: '"I don\'t know enough people"', solution: "You know more people than you think! Use social media to reconnect. Every person knows 200+ people – ask for referrals." },
            { problem: '"People aren\'t responding"', solution: "Follow up! Most sales happen after 5-7 touchpoints. Don't give up after one message. Stay visible on social media." },
            { problem: '"I\'m getting a lot of \'no\'s"', solution: "'No' usually means 'not yet.' Stay in touch, keep posting your journey, and they'll come back when the timing is right." },
            { problem: '"I don\'t have time"', solution: "15-30 minutes daily is enough. Send messages while waiting in line, on lunch, before bed. Small pockets of time add up." },
            { problem: '"I\'m scared of rejection"', solution: "Rejection isn't personal – it's about their timing, not your worth. Every 'no' gets you closer to a 'yes.' Your mentor got rejected too!" },
          ],
        },
        {
          title: "After Senior Coach: What's Next?",
          nextRanks: [
            { rank: "Coach", requirement: "You start here", icon: "🌱" },
            { rank: "Senior Coach", requirement: "3 clients OR 1 client + 1 coach", icon: "⭐", current: true },
            { rank: "Certified Coach", requirement: "6+ clients, training certification", icon: "🏅" },
            { rank: "Manager", requirement: "Team building, volume requirements", icon: "📈" },
            { rank: "Executive Director", requirement: "Larger team, higher volume", icon: "🎯" },
            { rank: "...and beyond!", requirement: "Presidential Director, IPD", icon: "👑" },
          ],
          message: "Senior Coach is just the beginning! Once you prove you can do it once, you'll know you can keep going. Each rank unlocks more income and impact.",
        },
      ],
      keyTakeaways: ["Senior Coach requires just 3 clients – very achievable!", "Activity is the key – talk to more people", "Most new coaches hit Senior Coach in 30-60 days", "Your mentor did this – you can too!"],
    },
  },
]

export function ThirtyDayEvaluationContent() {
  const { toast } = useToast()
  const { user } = useAuth()
  const { completedResources, toggleCompletedResource } = useSupabaseData(user)
  const [expandedLesson, setExpandedLesson] = useState(lessons[0].id)
  const [evaluationResponses, setEvaluationResponses] = useState<Record<string, string | number>>({})
  const [goals, setGoals] = useState<Record<string, string>>({})

  const getResourceId = (lessonId: string) => `thirty-day-evaluation-${lessonId}`

  const completedLessons = new Set(lessons.map((lesson) => lesson.id).filter((lessonId) => completedResources.includes(getResourceId(lessonId))))

  useEffect(() => {
    const saved = localStorage.getItem("thirtyDayEvaluationExpanded")
    if (saved) {
      try {
        const lessonId = JSON.parse(saved)
        if (lessons.some((l) => l.id === lessonId)) {
          setExpandedLesson(lessonId)
        }
      } catch (e) {
        console.error("Failed to load expanded lesson", e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("thirtyDayEvaluationExpanded", JSON.stringify(expandedLesson))
  }, [expandedLesson])

  const toggleComplete = async (lessonId: string) => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be signed in to track your progress.", variant: "destructive" })
      return
    }

    const resourceId = getResourceId(lessonId)
    await toggleCompletedResource(resourceId)

    const isNowCompleted = !completedLessons.has(lessonId)
    toast({ title: isNowCompleted ? "Lesson completed!" : "Lesson unmarked", description: isNowCompleted ? "Great progress! Your coach can see this." : "You can complete it later." })
  }

  const updateEvaluation = (questionId: string, value: string | number) => {
    setEvaluationResponses((prev) => ({ ...prev, [questionId]: value }))
  }

  const updateGoal = (goalId: string, value: string) => {
    setGoals((prev) => ({ ...prev, [goalId]: value }))
  }

  const completedCount = completedLessons.size
  const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0

  const currentLessonIndex = lessons.findIndex((l) => l.id === expandedLesson)
  const currentLesson = lessons[currentLessonIndex]
  const prevLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null
  const nextLesson = currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm opacity-90 mb-2 uppercase tracking-wide">
            <span>Training Center</span>
            <ChevronRight className="h-4 w-4" />
            <span>Phase 3: First 30 Days</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold">Module 3.4</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <Trophy className="h-8 w-8" />
            Your 30-Day Evaluation
          </h1>
          <p className="text-lg opacity-90 max-w-2xl">Assess your first month, celebrate wins, and set goals for your path to Senior Coach.</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Milestone Card */}
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300 text-center">
              <CardContent className="pt-6">
                <div className="text-5xl mb-2">🎉</div>
                <div className="font-bold text-amber-700 text-lg">30 Days Complete!</div>
                <p className="text-sm text-amber-800 mt-2">You've made it through your first month. Time to reflect and set your sights higher!</p>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-semibold text-optavia-dark">Module Progress</CardTitle>
                  <span className="text-sm font-semibold text-[hsl(var(--optavia-green))]">
                    {completedCount}/{lessons.length} Complete
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercent} className="h-2" />
              </CardContent>
            </Card>

            {/* Lesson List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-semibold text-optavia-gray uppercase tracking-wide">Lessons in this Module</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {lessons.map((lesson) => {
                  const Icon = lesson.icon
                  const isActive = expandedLesson === lesson.id
                  const isComplete = completedLessons.has(lesson.id)

                  return (
                    <button key={lesson.id} onClick={() => setExpandedLesson(lesson.id)} className={`w-full p-4 flex items-start gap-3 border-b border-gray-100 last:border-b-0 transition-colors text-left ${isActive ? "bg-green-50 border-l-4 border-l-[hsl(var(--optavia-green))]" : "hover:bg-gray-50"}`}>
                      <div className="mt-1">{isComplete ? <CheckCircle className="h-5 w-5 text-[hsl(var(--optavia-green))]" /> : <Circle className="h-5 w-5 text-gray-300" />}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-[hsl(var(--optavia-green))] mb-1">{lesson.id}</div>
                        <div className={`text-sm font-semibold mb-2 ${isActive ? "text-[hsl(var(--optavia-green))]" : "text-optavia-dark"}`}>{lesson.title}</div>
                        <div className="flex items-center gap-3 text-xs text-optavia-gray">
                          <Badge variant="outline" className="text-xs bg-gray-50">
                            <Icon className="h-3 w-3 mr-1" />
                            {lesson.type}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Senior Coach Goal */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-300">
              <CardHeader>
                <div className="flex items-center gap-2 font-semibold text-green-900">
                  <Rocket className="h-5 w-5 text-green-600" />
                  Your Next Goal
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-900 leading-relaxed">Senior Coach is just 3 clients away! Use this evaluation to set your path to promotion.</p>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main>
            <Card>
              {/* Content Header */}
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-semibold text-[hsl(var(--optavia-green))] uppercase tracking-wide mb-2">Lesson {currentLesson.id}</div>
                    <CardTitle className="text-2xl font-bold text-optavia-dark">{currentLesson.title}</CardTitle>
                  </div>
                  <Button onClick={() => toggleComplete(currentLesson.id)} variant={completedLessons.has(currentLesson.id) ? "default" : "outline"} className={completedLessons.has(currentLesson.id) ? "bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]" : ""}>
                    {completedLessons.has(currentLesson.id) ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Circle className="h-4 w-4 mr-2" />
                        Mark Complete
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>

              {/* Canva Link if available */}
              {currentLesson.canvaLink && (
                <div className="px-8 pt-6">
                  <a href={currentLesson.canvaLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-colors">
                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-purple-900">View Fast Track to Senior Coach Guide</div>
                      <div className="text-sm text-purple-700">Full visual roadmap in Canva</div>
                    </div>
                    <ExternalLink className="h-5 w-5 text-purple-600" />
                  </a>
                </div>
              )}

              <CardContent className="p-8">
                {/* Intro */}
                <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg mb-8">
                  <p className="text-base leading-relaxed text-optavia-dark">{currentLesson.content.intro}</p>
                </div>

                {/* Sections */}
                {currentLesson.content.sections.map((section, idx) => (
                  <div key={idx} className="mb-10">
                    <h3 className="text-lg font-bold text-optavia-dark mb-2 flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-white flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                      {section.title}
                    </h3>

                    {section.description && <p className="text-base leading-relaxed text-optavia-gray mb-5 ml-10">{section.description}</p>}

                    {/* Metrics Input */}
                    {section.metrics && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-10">
                        {section.metrics.map((metric) => (
                          <div key={metric.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xl">{metric.icon}</span>
                              <span className="font-semibold text-optavia-dark text-sm">{metric.label}</span>
                            </div>
                            <Input placeholder={metric.placeholder} value={(evaluationResponses[metric.id] as string) || ""} onChange={(e) => updateEvaluation(metric.id, e.target.value)} className="mb-2" />
                            <div className="text-xs text-optavia-gray italic">💡 {metric.tip}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Assessment Areas */}
                    {section.assessmentAreas && (
                      <div className="ml-10 space-y-6">
                        {section.assessmentAreas.map((area, areaIdx) => (
                          <div key={areaIdx} className="p-5 bg-gray-50 rounded-xl">
                            <div className="font-bold text-[hsl(var(--optavia-green))] mb-4 text-sm uppercase">{area.category}</div>
                            {area.questions.map((q) => (
                              <div key={q.id} className="mb-4">
                                <div className="text-sm text-optavia-dark mb-2 font-medium">{q.question}</div>
                                <div className="grid grid-cols-4 gap-2">
                                  {q.scale.map((option, i) => (
                                    <Button key={i} onClick={() => updateEvaluation(q.id, i)} variant={evaluationResponses[q.id] === i ? "default" : "outline"} size="sm" className={`text-xs ${evaluationResponses[q.id] === i ? "bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]" : ""}`}>
                                      {option}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Win Categories */}
                    {section.winCategories && (
                      <div className="ml-10 space-y-3">
                        {section.winCategories.map((win) => (
                          <div key={win.id} className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xl">{win.icon}</span>
                              <span className="font-semibold text-amber-800 text-sm">{win.label}</span>
                            </div>
                            <Textarea placeholder={win.placeholder} value={(evaluationResponses[win.id] as string) || ""} onChange={(e) => updateEvaluation(win.id, e.target.value)} className="border-amber-200 min-h-[60px]" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Challenge Categories */}
                    {section.challengeCategories && (
                      <div className="ml-10 space-y-3">
                        {section.challengeCategories.map((challenge) => (
                          <div key={challenge.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xl">{challenge.icon}</span>
                              <span className="font-semibold text-optavia-gray text-sm">{challenge.label}</span>
                            </div>
                            <Textarea placeholder={challenge.placeholder} value={(evaluationResponses[challenge.id] as string) || ""} onChange={(e) => updateEvaluation(challenge.id, e.target.value)} className="min-h-[60px]" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Goal Categories */}
                    {section.goalCategories && (
                      <div className="ml-10 space-y-3">
                        {section.goalCategories.map((goal) => (
                          <div key={goal.id} className="p-5 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-300">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xl">{goal.icon}</span>
                              <span className="font-bold text-green-800 text-sm">{goal.label}</span>
                            </div>
                            <div className="text-sm text-green-700 mb-3">{goal.prompt}</div>
                            <Input placeholder={goal.placeholder} value={goals[goal.id] || ""} onChange={(e) => updateGoal(goal.id, e.target.value)} className="border-2 border-green-400 mb-2" />
                            <div className="flex gap-2 flex-wrap">
                              {goal.examples.map((ex, i) => (
                                <Badge key={i} variant="outline" className="text-xs cursor-pointer hover:bg-white border-green-300 text-green-800" onClick={() => updateGoal(goal.id, ex)}>
                                  {ex}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Slots */}
                    {section.actionSlots && (
                      <div className="ml-10 space-y-3">
                        {section.actionSlots.map((action, i) => (
                          <div key={action.id} className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-white flex items-center justify-center font-bold flex-shrink-0">{i + 1}</div>
                            <Input placeholder={action.placeholder} value={(evaluationResponses[action.id] as string) || ""} onChange={(e) => updateEvaluation(action.id, e.target.value)} className="border-2 border-[hsl(var(--optavia-green))]" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Commitment */}
                    {section.commitment && (
                      <div className="ml-10">
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-2 border-blue-300 text-center">
                          <div className="text-3xl mb-3">✍️</div>
                          <p className="text-base text-blue-800 leading-relaxed italic mb-5">"{section.commitment.text}"</p>
                          <div className="mb-3 text-blue-700 font-semibold">{section.commitment.signaturePrompt}</div>
                          <Input placeholder="Your name here" value={(evaluationResponses["signature"] as string) || ""} onChange={(e) => updateEvaluation("signature", e.target.value)} className="max-w-[200px] mx-auto text-center font-semibold border-2 border-blue-300" />
                        </div>
                      </div>
                    )}

                    {/* Benefits */}
                    {section.benefits && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-10">
                        {section.benefits.map((item, i) => (
                          <div key={i} className="p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <CheckCircle className="h-4 w-4 text-[hsl(var(--optavia-green))]" />
                              <span className="font-bold text-green-800">{item.benefit}</span>
                            </div>
                            <div className="text-sm text-green-900 pl-6">{item.detail}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Requirements */}
                    {section.requirements && (
                      <div className="ml-10 space-y-3">
                        {section.requirements.map((req, i) => (
                          <div key={i} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-3xl">{req.icon}</span>
                              <span className="font-bold text-optavia-dark text-lg">{req.requirement}</span>
                            </div>
                            <p className="text-sm text-optavia-gray mb-3">{req.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {req.tips.map((tip, j) => (
                                <Badge key={j} variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  💡 {tip}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Timeline */}
                    {section.timeline && !section.math && (
                      <div className="ml-10 space-y-4 relative">
                        {section.timeline.map((item, i) => (
                          <div key={i} className="flex gap-4 relative">
                            {i < section.timeline!.length - 1 && <div className="absolute left-[45px] top-[60px] w-0.5 h-[calc(100%-20px)] bg-gray-200" />}
                            <div className="w-[90px] text-center flex-shrink-0">
                              <Badge className="text-xs bg-green-100 text-green-800 border-green-300">{item.phase}</Badge>
                            </div>
                            <div className={`flex-1 p-4 rounded-xl ${i === section.timeline!.length - 1 ? "bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-300" : "bg-gray-50 border border-gray-200"}`}>
                              <div className="font-bold text-optavia-dark mb-3">{item.title}</div>
                              {item.activities.map((act, j) => (
                                <div key={j} className="flex items-center gap-2 text-sm text-optavia-gray mb-1">
                                  <CheckSquare className="h-4 w-4 text-[hsl(var(--optavia-green))]" />
                                  {act}
                                </div>
                              ))}
                              <div className={`mt-3 p-2 rounded text-xs font-semibold ${i === section.timeline!.length - 1 ? "bg-amber-300 text-amber-900" : "bg-green-100 text-green-800"}`}>🎯 Milestone: {item.milestone}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Math/Funnel */}
                    {section.math && (
                      <div className="ml-10">
                        <p className="text-sm text-optavia-gray mb-4">{section.math.description}</p>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                          {section.math.funnel.map((stage, i) => (
                            <div key={i} className={`p-4 rounded-xl text-center ${i === section.math!.funnel.length - 1 ? "bg-gradient-to-br from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-white" : "bg-gray-50 border border-gray-200"}`}>
                              <div className="text-2xl mb-1">{stage.icon}</div>
                              <div className={`text-2xl font-bold ${i === section.math!.funnel.length - 1 ? "" : "text-optavia-dark"}`}>{stage.number}</div>
                              <div className={`text-xs ${i === section.math!.funnel.length - 1 ? "opacity-90" : "text-optavia-gray"}`}>{stage.stage}</div>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-[hsl(var(--optavia-green))]">
                          <Lightbulb className="h-4 w-4 text-green-800 inline mr-2" />
                          <span className="text-sm text-green-900">{section.math.insight}</span>
                        </div>
                      </div>
                    )}

                    {/* Daily Actions */}
                    {section.dailyActions && (
                      <div className="ml-10 space-y-2">
                        {section.dailyActions.map((action, i) => (
                          <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${action.priority === "high" ? "bg-green-50 border-l-4 border-[hsl(var(--optavia-green))]" : "bg-gray-50 border-l-4 border-gray-200"}`}>
                            <CheckSquare className={`h-5 w-5 ${action.priority === "high" ? "text-[hsl(var(--optavia-green))]" : "text-optavia-gray"}`} />
                            <div className="flex-1">
                              <span className="font-semibold text-optavia-dark">{action.action}</span>
                              <span className="text-optavia-gray text-sm"> — {action.detail}</span>
                            </div>
                            {action.priority === "high" && <Badge className="text-xs bg-white text-[hsl(var(--optavia-green))] border border-green-300">HIGH PRIORITY</Badge>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Roadblocks */}
                    {section.roadblocks && (
                      <div className="ml-10 space-y-3">
                        {section.roadblocks.map((block, i) => (
                          <div key={i} className="p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                              <AlertTriangle className="h-4 w-4 text-amber-600" />
                              <span className="font-semibold text-amber-800">{block.problem}</span>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg text-sm text-green-900">
                              ✅ <strong>Solution:</strong> {block.solution}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Next Ranks */}
                    {section.nextRanks && (
                      <div className="ml-10">
                        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                          {section.nextRanks.map((rank, i) => (
                            <div key={i} className={`min-w-[120px] p-4 rounded-xl text-center ${rank.current ? "bg-gradient-to-br from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-white" : "bg-gray-50 border border-gray-200"}`}>
                              <div className="text-3xl mb-2">{rank.icon}</div>
                              <div className={`font-bold text-sm mb-1 ${rank.current ? "" : "text-optavia-dark"}`}>{rank.rank}</div>
                              <div className={`text-xs ${rank.current ? "opacity-90" : "text-optavia-gray"}`}>{rank.requirement}</div>
                            </div>
                          ))}
                        </div>
                        {section.message && (
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl text-sm text-blue-800 leading-relaxed">💙 {section.message}</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Key Takeaways */}
                {currentLesson.content.keyTakeaways && (
                  <div className="mt-10 p-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                    <h4 className="text-base font-bold text-amber-900 mb-4 flex items-center gap-2">
                      <Star className="h-5 w-5 fill-amber-600 text-amber-600" />
                      Key Takeaways
                    </h4>
                    <ul className="space-y-2">
                      {currentLesson.content.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="text-sm text-amber-900 flex items-start gap-2">
                          <span className="text-amber-600 mt-1">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>

              {/* Navigation Footer */}
              <div className="border-t bg-gray-50 p-6 flex justify-between items-center">
                {prevLesson ? (
                  <Button variant="outline" onClick={() => setExpandedLesson(prevLesson.id)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => (window.location.href = "/training/client-resources")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Module 3.3
                  </Button>
                )}

                {nextLesson ? (
                  <Button onClick={() => setExpandedLesson(nextLesson.id)} className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white">
                    Next: {nextLesson.title.split(" ").slice(0, 3).join(" ")}...
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white" onClick={() => (window.location.href = "/training/social-media-business")}>
                    🎉 Complete Phase 3 - Continue to Phase 4
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
