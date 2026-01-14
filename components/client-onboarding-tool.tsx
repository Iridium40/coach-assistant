"use client"

import { useState, useEffect } from "react"
import { RotateCcw, Printer, Copy, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

type TabId = "welcome" | "tips" | "followup" | "quick"

interface OnboardingState {
  clientName: string
  startDate: string
  tipChecks: string[]
  taskChecks: number[]
  followupChecks: string[]
}

// First Week Follow-Up Checklist Items (from Setting Your Clients Up for Success)
interface FollowupChecklistItem {
  id: string
  title: string
  tip?: string
  link?: string
  linkText?: string
  section: string
  isBold?: boolean
}

const FOLLOWUP_CHECKLIST_ITEMS: FollowupChecklistItem[] = [
  // Initial Order Section
  { id: "initial-1", title: "Add Kit, customize as needed, and Register for Optavia Premier (check for 20% discount prior to order.)", section: "initial-order" },
  { id: "initial-2", title: "Send Welcome Text", section: "initial-order" },
  { id: "initial-3", title: "Add client to Client page on Facebook (For Team Tarleton clients, use Optavia Strong Client, for Team Healthy Edge clients, use Healthy Edge 3.0)", section: "initial-order" },
  { id: "initial-4", title: "Schedule a Kickoff Call for your new client. All clients MUST have a kickoff call, and it's best to do this the Sunday before the Monday Start", section: "initial-order" },
  
  // New Client Videos Section
  { id: "video-1", title: "KICKOFF CALL VIDEO", link: "https://vimeo.com/781160772/25fbd1633a?share=copy", linkText: "UNIVERSAL KICKOFF VIDEO", section: "videos", isBold: true },
  { id: "video-2", title: "LEAN AND GREEN VIDEO", link: "https://vimeo.com/414057972", linkText: "https://vimeo.com/414057972", section: "videos", isBold: true },
  
  // FAQ Texts Section (prior to start date)
  { id: "faq-1", title: "WELCOME AND 9 TIPS", link: "https://docs.google.com/document/d/1x9k469K6XvuQ8rcPdgR3z4i9iXKLxBvSIR_77UuDgpM/edit?usp=sharing", linkText: "WELCOME AND 9 TIPS", section: "faq-texts", isBold: true },
  { id: "faq-2", title: "Digital Guides (Please ask client to save to phone and/or print)", link: "https://docs.google.com/document/d/1TtZoQcKzTT77PZP0XNlMH-e8HiYzwKhS1UL8ZW5BcT8/edit?usp=sharing", linkText: "Digital Guides", section: "faq-texts", isBold: true },
  { id: "faq-3", title: "THE DAY BEFORE THE START DAY, SEND THE", link: "https://docs.google.com/document/d/1V4vgLqx6-0uE9ZRfIp7024tTCB5NoqjHa0YAbV0_RlU/edit?usp=sharing", linkText: "METABOLIC RESET DAY BEFORE TEXT", section: "faq-texts" },
  { id: "faq-4", title: "DAY ONE, BEGIN SENDING", link: "https://docs.google.com/document/d/1gtH2fYDKLA6f3sv6-yxFUM8b6rLBqp8jF5R7h4ec6i4/edit?usp=sharing", linkText: "THE DAILY METABOLIC HEALTH TEXTS", section: "faq-texts" },
  
  // Daily/Weekly Check-ins
  { id: "checkin-1", title: "3-5 minute daily check-in call Days 1-5 using", link: "https://docs.google.com/document/d/1HLqL_l7IELKgjlx5d3SBuXi2xdyBSaawJ5JmcKDoGHM/edit?usp=sharing", linkText: "DAILY CHECK IN QUESTIONS", tip: "EXACTLY as written", section: "check-ins" },
  { id: "checkin-2", title: "Week 1 Celebration Call", section: "check-ins", isBold: true },
  { id: "checkin-3", title: "OPTIONAL- send", link: "https://docs.google.com/document/d/1G9YtI07xIvazS4KZcCkLlB4N_E1axueXVeV4R0Na4Yc/edit?usp=sharing", linkText: "Day 10-30 Metabolic Health Texts", section: "check-ins" },
  { id: "checkin-4", title: "Weekly 5-10 minute check-in call weeks 1-4", section: "check-ins" },
  { id: "checkin-5", title: "Weekly check-in after month 1", section: "check-ins" },
  { id: "checkin-6", title: "Invite Client to VIP Call (can be as early as Week 2, check with your mentorship to clarify)", section: "check-ins" },
]

const FOLLOWUP_SECTIONS = [
  { id: "initial-order", title: "INITIAL ORDER", icon: "📋" },
  { id: "videos", title: "SEND NEW CLIENT VIDEOS PRIOR TO KICKOFF CALL", icon: "🎬" },
  { id: "faq-texts", title: "FAQ TEXTS (Send prior to start date)", icon: "📱", note: "Send these FAQ Texts to your client prior to their start date. These can be found in the CLIENT COMMUNICATION file." },
  { id: "check-ins", title: "ONGOING CHECK-INS", icon: "📞" },
]

export function ClientOnboardingTool() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<TabId>("welcome")
  const [clientName, setClientName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [checkedTips, setCheckedTips] = useState<Set<string>>(new Set())
  const [checkedTasks, setCheckedTasks] = useState<Set<number>>(new Set())
  const [checkedFollowup, setCheckedFollowup] = useState<Set<string>>(new Set())

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("clientOnboarding")
    if (saved) {
      try {
        const state: OnboardingState = JSON.parse(saved)
        if (state.clientName) setClientName(state.clientName)
        if (state.startDate) setStartDate(state.startDate)
        if (state.tipChecks) setCheckedTips(new Set(state.tipChecks))
        if (state.taskChecks) setCheckedTasks(new Set(state.taskChecks))
        if (state.followupChecks) setCheckedFollowup(new Set(state.followupChecks))
      } catch (e) {
        console.error("Failed to load saved state", e)
      }
    }
  }, [])

  // Save state to localStorage
  const saveState = () => {
    const state: OnboardingState = {
      clientName,
      startDate,
      tipChecks: Array.from(checkedTips),
      taskChecks: Array.from(checkedTasks),
      followupChecks: Array.from(checkedFollowup),
    }
    localStorage.setItem("clientOnboarding", JSON.stringify(state))
  }

  useEffect(() => {
    saveState()
  }, [clientName, startDate, checkedTips, checkedTasks, checkedFollowup])

  const copyToClipboard = (text: string) => {
    const finalText = text.replace(/Name/g, clientName || "Name")
    navigator.clipboard.writeText(finalText).then(() => {
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      })
    })
  }

  const toggleTip = (tipId: string) => {
    const newChecked = new Set(checkedTips)
    if (newChecked.has(tipId)) {
      newChecked.delete(tipId)
    } else {
      newChecked.add(tipId)
    }
    setCheckedTips(newChecked)
  }

  const toggleTask = (taskIndex: number) => {
    const newChecked = new Set(checkedTasks)
    if (newChecked.has(taskIndex)) {
      newChecked.delete(taskIndex)
    } else {
      newChecked.add(taskIndex)
    }
    setCheckedTasks(newChecked)
  }

  const toggleFollowup = (itemId: string) => {
    const newChecked = new Set(checkedFollowup)
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId)
    } else {
      newChecked.add(itemId)
    }
    setCheckedFollowup(newChecked)
  }

  const resetAll = () => {
    if (confirm("Reset all data for this client? This will clear all checkboxes and info.")) {
      localStorage.removeItem("clientOnboarding")
      setClientName("")
      setStartDate("")
      setCheckedTips(new Set())
      setCheckedTasks(new Set())
      setCheckedFollowup(new Set())
      toast({
        title: "Reset complete",
        description: "All data has been cleared",
      })
    }
  }

  const tipProgress = checkedTips.size
  const tipProgressPercent = Math.round((tipProgress / 9) * 100)

  // Followup progress calculations
  const getFollowupSectionProgress = (sectionId: string) => {
    const sectionItems = FOLLOWUP_CHECKLIST_ITEMS.filter((item) => item.section === sectionId)
    const checked = sectionItems.filter((item) => checkedFollowup.has(item.id)).length
    return { checked, total: sectionItems.length }
  }

  const getFollowupOverallProgress = () => {
    const total = FOLLOWUP_CHECKLIST_ITEMS.length
    const checked = checkedFollowup.size
    return total > 0 ? Math.round((checked / total) * 100) : 0
  }

  const welcomeText = `Hello ${clientName || "Name"}!!! I am so honored to be on this journey with you! 👏 Together, we're going to work toward your health goals in a way that's simple, sustainable, and truly life-changing. WE KNOW you can do this and we can't wait to walk alongside you every step of the way!

This is the start of a new chapter for you, one that's not just about weight loss, but about restoring your metabolic health and helping your body work the way it was designed to. 💪 There's some amazing new research showing how this program helps reverse the effects of metabolic dysfunction ... things like energy dips, stubborn weight, and sluggish metabolism and we are so excited for you to start feeling the difference! ✨

To set you up for success, please watch this quick video:
🎥 https://youtu.be/GitLueKKsO0

Here are 9 simple tips to prepare for your journey:

1️⃣ Write down your WHYs and keep them somewhere visible, like your bathroom mirror!

2️⃣ Take before pictures (front, back, and side) in fitted clothing ... you'll be SO glad you did!

3️⃣ On the Monday that you start, weigh yourself first thing in the morning. Use a digital body scale to track your progress, using it from the beginning will give you a whole new perspective to your journey!! 
Here's a great option to grab if you don't have one yet: https://amzn.to/47zW8xq

4️⃣ Take your measurements and keep them somewhere safe.

5️⃣ Aim for at least 64 oz of water daily.

6️⃣ Start practicing your Lean & Green meals. You'll need a digital food scale (it doesn't have to be fancy!) this one works great: https://amzn.to/47fOcmc

7️⃣ Read Dr. A's Stop. Challenge. Choose. eBook (linktr.ee below).

8️⃣ Save this Client Resource Link for quick access to guides, videos, and tools: 👇 https://linktr.ee/clientresourcetools

9️⃣ Download the Optavia App (login: your email / password: Welcome1!) & the EatWise app (for meal reminders).

✨ Let us know when your box arrives because that's when the magic really begins!`

  const tips = [
    {
      id: "1",
      title: "Write Down Your WHYs",
      what: "Keep their reasons for starting somewhere visible — bathroom mirror, phone wallpaper, or journal.",
      why: "When motivation dips (and it will), their \"why\" brings them back. Visual reminders create daily reconnection to their goals. Clients who write their why are 42% more likely to stick with the program.",
      script: "\"Hey! Quick question — have you had a chance to write down your WHYs yet? I'd love to hear what's driving you. Sometimes saying it out loud makes it even more real!\"",
    },
    {
      id: "2",
      title: "Take Before Pictures",
      what: "Front, back, and side photos in fitted clothing. Store somewhere private but accessible.",
      why: "The scale doesn't tell the whole story. Many clients lose inches before pounds. Before photos become their most powerful motivation during plateaus — they can SEE the change even when the scale stalls.",
      script: "\"I know before photos feel awkward, but I promise — you'll thank yourself later! They're just for YOU. Take them, put them away, and we'll look back in 30 days. Every single client who does this is SO glad they did.\"",
    },
    {
      id: "3",
      title: "Get a Digital Body Scale",
      what: "Weigh first thing Monday morning before starting. Use the same scale consistently.",
      why: "Consistent data = accurate tracking. Digital scales with body composition give clients a fuller picture (muscle vs. fat). Weekly weigh-ins (same day, same time) reduce anxiety from daily fluctuations.",
      link: "https://amzn.to/47zW8xq",
      linkText: "Recommended Scale (Amazon)",
      script: "\"Remember — weigh yourself first thing in the morning, after using the bathroom, before eating or drinking. Same conditions every time for the most accurate comparison!\"",
    },
    {
      id: "4",
      title: "Take Measurements",
      what: "Measure chest, waist, hips, thighs, and arms. Record and store safely.",
      why: "Non-scale victories are HUGE for motivation. Clients often lose 2-3 inches before seeing significant scale movement. Measurements prove progress when the scale lies.",
      script: "\"Let's plan to retake measurements every 2-4 weeks. That's when you'll really start to see the inches drop. Some clients lose 10+ inches before hitting their goal weight!\"",
    },
    {
      id: "5",
      title: "Drink 64+ oz Water Daily",
      what: "Minimum 64 oz, ideally half their body weight in ounces. Spread throughout the day.",
      why: "Hydration is critical for fat metabolism. Dehydration mimics hunger and causes fatigue. Proper water intake improves energy, reduces cravings, and accelerates results. It's the #1 free tool for weight loss.",
      script: "\"Take your weight, divide by 2 — that's your goal in ounces. So if you weigh 180 lbs, aim for 90 oz. Get a big water bottle and track your refills!\"",
    },
    {
      id: "6",
      title: "Practice Lean & Green + Get Food Scale",
      what: "Start practicing Lean & Green meals before Day 1. A food scale ensures proper portions.",
      why: "Portion distortion is real — most people underestimate portions by 30-50%. A food scale removes guesswork. Practicing L&G before starting reduces overwhelm on Day 1.",
      link: "https://amzn.to/47fOcmc",
      linkText: "Recommended Food Scale (Amazon)",
      script: "\"This week, try making 2-3 Lean & Green meals just to get the hang of it. Keep it simple — grilled chicken + a big salad is a perfect L&G. Once your box arrives, you'll feel confident!\"",
    },
    {
      id: "7",
      title: "Read Stop. Challenge. Choose.",
      what: "Dr. A's eBook on mindset and decision-making. Available in the resource link.",
      why: "This program is about more than food — it's about habits and mindset. Stop. Challenge. Choose. teaches the mental framework for making healthy decisions automatically. It's the foundation of lasting change.",
      script: "\"Have you had a chance to check out Dr. A's Stop. Challenge. Choose. book? It's short but powerful — it'll change how you think about cravings and choices. Total game-changer!\"",
    },
    {
      id: "8",
      title: "Save Client Resource Link",
      what: "Bookmark the Linktree with guides, videos, recipes, and tools.",
      why: "Self-service resources reduce overwhelm and dependency. When clients can find answers themselves, they feel empowered. This also reduces repetitive questions for coaches.",
      link: "https://linktr.ee/clientresourcetools",
      linkText: "Client Resource Tools",
      script: "\"I'm always here for you, AND you have 24/7 access to guides, recipes, and videos in that resource link. Bookmark it on your phone — it's like having a coach in your pocket!\"",
    },
    {
      id: "9",
      title: "Download OPTAVIA + EatWise Apps",
      what: "OPTAVIA App (login: email / password: Welcome1!) and EatWise for meal reminders.",
      why: "The OPTAVIA app has recipes, tracking, and community. EatWise sends fueling reminders so they never forget to eat. Consistent eating = stable blood sugar = no cravings = better results.",
      script: "\"Did you get the apps downloaded? The OPTAVIA one uses your email as the login and 'Welcome1!' as the password. And EatWise will remind you when it's time to eat — super helpful in the first few weeks!\"",
    },
  ]

  const quickCopyMessages = {
    "Daily Check-Ins": [
      { title: "Morning Check-In", text: "Good morning! 🌞 How are you feeling today? Remember to get that water in early!" },
      { title: "Midday Check-In", text: "Hey! Just checking in — how's your day going? Getting all your fuelings in? 💚" },
      { title: "Evening Check-In", text: "How did today go? What was your win for the day? 🌟" },
      { title: "Monday Motivation", text: "Happy Monday! 🚀 New week, fresh start. What's one thing you're focusing on this week?" },
    ],
    "Celebrations": [
      { title: "Scale Victory", text: "OMG YES!!! 🎉🎉🎉 I am SO proud of you! That is AMAZING! Keep going — you're doing incredible!" },
      { title: "Non-Scale Victory", text: "That's a HUGE non-scale victory! 🙌 Those are the wins that really matter. Your body is changing!" },
      { title: "First Week Complete", text: "ONE WEEK DOWN! 🔥 You should be SO proud of yourself. The hardest part is starting — and you've already done that!" },
      { title: "Consistency Win", text: "Look at you staying consistent! 💪 That's what builds lasting results. You're doing this!" },
    ],
    "Encouragement": [
      { title: "Plateau Support", text: "Plateaus are NORMAL and they're temporary. Your body is adjusting. Trust the process — the scale will catch up! 💚" },
      { title: "After a Slip", text: "One off day doesn't undo your progress. Just start fresh at your next fueling. You've got this! 🙌" },
      { title: "Struggling Client", text: "I know it feels hard right now, but remember your WHY. You started for a reason. I believe in you! 💚" },
      { title: "Transition Symptoms", text: "Those transition symptoms are actually a GOOD sign — your body is switching to fat-burning mode. Hang in there! 💪" },
    ],
    "Reminders": [
      { title: "Water Reminder", text: "Water check! 💧 How many ounces are you at so far today? Remember, hydration = results!" },
      { title: "Photo Reminder", text: "Just a reminder to take your weekly progress photo! 📸 Same outfit, same spot, same pose. Future you will thank you!" },
      { title: "Reorder Reminder", text: "Time to reorder! 📦 Let me know if you need help placing your order so there's no gap in your journey." },
      { title: "App Tracking Reminder", text: "Don't forget to log your fuelings in the app today! 📱 Tracking = accountability = results!" },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      {/* Tool Header */}
      <div className="sticky top-[73px] z-40 bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[#52BEBC] text-white shadow-lg shadow-teal-500/30">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-xl font-bold flex items-center gap-2">
              🎉 <span className="hidden sm:inline">New Client</span> Onboarding Tool
            </h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetAll}
                className="bg-white/10 border-white/50 text-white hover:bg-white/20"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="bg-white text-[hsl(var(--optavia-green))] hover:bg-gray-50 border-white"
              >
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-6 pt-4 bg-white border-b border-slate-200">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
          <TabsList className="flex flex-wrap gap-1 h-auto p-1 bg-muted">
            <TabsTrigger value="welcome" className="text-xs sm:text-sm px-3 py-2">Welcome Message</TabsTrigger>
            <TabsTrigger value="tips" className="text-xs sm:text-sm px-3 py-2">Tips Explained</TabsTrigger>
            <TabsTrigger value="followup" className="text-xs sm:text-sm px-3 py-2">First Week Follow-Up</TabsTrigger>
            <TabsTrigger value="quick" className="text-xs sm:text-sm px-3 py-2">Quick Copy</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-6">
        {/* Client Info Card */}
        <Card className="mb-6 bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-[hsl(var(--optavia-green))]">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider text-[hsl(var(--optavia-green))] font-semibold">
              👤 Client Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-xs font-semibold text-teal-900">
                  Client First Name
                </Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter name..."
                  className="border-teal-200 focus:border-[hsl(var(--optavia-green))] focus:ring-[hsl(var(--optavia-green))]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-xs font-semibold text-teal-900">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border-teal-200 focus:border-[hsl(var(--optavia-green))] focus:ring-[hsl(var(--optavia-green))]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
          {/* Welcome Message Tab */}
          <TabsContent value="welcome" className="space-y-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 font-bold text-blue-800 mb-2">
                  💡 Why This Message Works
                </div>
                <p className="text-sm text-blue-700">
                  This welcome message sets the tone for the entire client relationship. It's warm, sets expectations, provides immediate action items, and gives them resources to succeed. Send this as soon as they enroll!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📱 Welcome & 9 Tips Text</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    📋 Copy & Send via Text/DM
                  </div>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(welcomeText)}
                      className="absolute top-3 right-3 bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 pr-20">
                    {welcomeText}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 9 Tips Explained Tab */}
          <TabsContent value="tips" className="space-y-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 font-bold text-blue-800 mb-2">
                  🎓 Why Each Tip Matters
                </div>
                <p className="text-sm text-blue-700">
                  Understanding the "why" behind each tip helps you explain it to clients and troubleshoot when they skip steps. These aren't random suggestions — each one is proven to increase client success rates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold text-slate-500">Client Prep Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={tipProgressPercent} className="h-3 mb-2" />
                <div className="flex justify-between text-sm text-slate-500">
                  <span>{tipProgress} of 9 completed</span>
                  <span className="font-bold text-[hsl(var(--optavia-green))]">{tipProgressPercent}%</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {tips.map((tip) => (
                <Card key={tip.id} className="overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-[hsl(var(--optavia-green))] to-[#52BEBC] text-white rounded-lg flex items-center justify-center font-extrabold text-base flex-shrink-0">
                      {tip.id}
                    </div>
                    <div className="font-bold text-slate-800 flex-1">{tip.title}</div>
                    <div
                      className={`w-6 h-6 border-2 rounded-md cursor-pointer flex items-center justify-center transition-all ${
                        checkedTips.has(tip.id)
                          ? "bg-[hsl(var(--optavia-green))] border-[hsl(var(--optavia-green))]"
                              : "border-slate-300 hover:border-[hsl(var(--optavia-green))] hover:bg-teal-50"
                      }`}
                      onClick={() => toggleTip(tip.id)}
                    >
                      {checkedTips.has(tip.id) && <Check className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm text-slate-700">{tip.what}</p>
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded-r-lg">
                      <div className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1">
                        🧠 Why This Works
                      </div>
                      <p className="text-sm text-purple-800">{tip.why}</p>
                    </div>
                    {tip.link && (
                      <div>
                        <a
                          href={tip.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-[hsl(var(--optavia-green))] font-semibold hover:underline"
                        >
                          🔗 {tip.linkText}
                        </a>
                      </div>
                    )}
                    <div className="bg-teal-50 border-l-4 border-[hsl(var(--optavia-green))] p-3 rounded-r-lg">
                      <div className="text-xs font-bold text-[hsl(var(--optavia-green))] uppercase tracking-wide mb-1">
                        💬 {tip.id === "3" ? "Coaching Note" : tip.id === "4" ? "When to Remeasure" : tip.id === "5" ? "Quick Math" : tip.id === "6" ? "Getting Started" : tip.id === "7" ? "Introducing It" : tip.id === "8" ? "How to Use It" : tip.id === "9" ? "App Setup Help" : "If They Haven't Done It"}
                      </div>
                      <p className="text-sm text-teal-900 italic">{tip.script}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* First Week Follow-Up Tab - Setting Your Clients Up for Success */}
          <TabsContent value="followup" className="space-y-6">
            {/* Header */}
            <div className="text-center border-b-4 border-black pb-4">
              <h2 className="text-xl md:text-2xl font-bold text-optavia-dark tracking-wider uppercase">
                Setting Your Clients Up for Success
              </h2>
            </div>

            {/* Progress Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Overall Progress</span>
                  <span className="font-semibold text-[hsl(var(--optavia-green))]">{getFollowupOverallProgress()}%</span>
                </div>
                <Progress value={getFollowupOverallProgress()} className="h-2" />
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 font-bold text-blue-800 mb-2">
                  📅 The First Week is Critical
                </div>
                <p className="text-sm text-blue-700">
                  The first 7 days set the tone for the entire journey. Consistent check-ins during this window dramatically increase retention and results. Use this timeline to stay on track with each new client.
                </p>
              </CardContent>
            </Card>

            {/* Checklist Sections */}
            {FOLLOWUP_SECTIONS.map((section) => {
              const sectionItems = FOLLOWUP_CHECKLIST_ITEMS.filter((item) => item.section === section.id)
              const progress = getFollowupSectionProgress(section.id)
              
              return (
                <Card key={section.id} className="overflow-hidden">
                  <CardHeader className="bg-slate-50 border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-bold uppercase underline decoration-2 underline-offset-4">
                        {section.icon} {section.title}
                      </CardTitle>
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        progress.checked === progress.total && progress.total > 0 
                          ? "bg-teal-100 text-teal-800" 
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {progress.checked}/{progress.total}
                      </span>
                    </div>
                    {section.note && (
                      <p className="text-sm text-slate-500 mt-2">{section.note}</p>
                    )}
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    {sectionItems.map((item) => (
                      <div
                        key={item.id}
                        className={`flex gap-3 p-3 rounded-lg border transition-all ${
                          checkedFollowup.has(item.id)
                            ? "bg-teal-50 border-teal-200"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="pt-0.5">
                          <Checkbox
                            checked={checkedFollowup.has(item.id)}
                            onCheckedChange={() => toggleFollowup(item.id)}
                            className="h-5 w-5 border-2 data-[state=checked]:bg-[hsl(var(--optavia-green))] data-[state=checked]:border-[hsl(var(--optavia-green))]"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className={`${checkedFollowup.has(item.id) ? "line-through text-slate-500" : "text-slate-800"} ${item.isBold ? "font-semibold" : ""}`}>
                            {item.title}
                            {item.link && (
                              <>
                                {" "}
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {item.linkText}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </>
                            )}
                          </div>
                          {item.tip && (
                            <div className="text-sm text-amber-700 bg-amber-50 p-2 rounded font-medium">
                              ⚠️ {item.tip}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}

            {/* Footer Note */}
            <div className="text-center text-sm text-slate-600 italic bg-teal-50 p-4 rounded-lg border border-teal-200">
              💚 Remember: Consistent check-ins are key to client success!
            </div>
          </TabsContent>

          {/* Quick Copy Tab */}
          <TabsContent value="quick" className="space-y-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 font-bold text-blue-800 mb-2">
                  ⚡ Quick Copy Messages
                </div>
                <p className="text-sm text-blue-700">
                  One-click copy for common messages. Click any card to copy the text, then paste into your text/DM conversation.
                </p>
              </CardContent>
            </Card>

            {Object.entries(quickCopyMessages).map(([category, messages]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category === "Daily Check-Ins" && "📱"}
                    {category === "Celebrations" && "🎉"}
                    {category === "Encouragement" && "💪"}
                    {category === "Reminders" && "📋"}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {messages.map((msg, idx) => (
                      <button
                        key={idx}
                        onClick={() => copyToClipboard(msg.text)}
                        className="text-left p-4 bg-slate-50 border border-slate-200 rounded-lg hover:border-[hsl(var(--optavia-green))] hover:bg-teal-50 transition-all"
                      >
                        <div className="font-semibold text-slate-800 text-sm mb-1">{msg.title}</div>
                        <div className="text-xs text-slate-500 truncate">{msg.text}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="text-center py-10 px-6 text-slate-500 text-sm">
        <p>New Client Onboarding Tool • Coach Tools</p>
        <p className="mt-1 text-xs">The first week sets the tone for the entire journey! 🚀</p>
      </footer>
    </div>
  )
}
