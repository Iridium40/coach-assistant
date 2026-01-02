"use client"

import { useState, useEffect } from "react"
import { Copy, Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

interface TipState {
  checkedTips: string[]
}

const tips = [
  {
    id: "1",
    title: "Be coachable as you learn how to mentor",
    why: "You don't know what you don't know. Your leaders have launched dozens (or hundreds) of coaches. Let them guide you through the process — you'll learn faster and your new coach will benefit.",
    how: [
      "Invite your upline into your new coach's launch",
      "Ask questions before you give advice",
      "Debrief with your mentorship after key moments",
      "Be willing to be corrected — it helps you grow",
    ],
  },
  {
    id: "2",
    title: "Be brave so your new coach can lean into your bravery",
    why: "Your new coach is watching how YOU show up. If you're hesitant, they'll be hesitant. If you're bold, they'll find their boldness too. Your courage is contagious.",
    how: [
      "Do the things you're asking them to do (post, reach out, etc.)",
      "Let them watch you do a 3-way message",
      "Share your own stories — including the scary moments",
      "Celebrate your wins publicly so they see what's possible",
    ],
  },
  {
    id: "3",
    title: "Be a good role model with your own social media",
    why: "Your new coach will mirror what YOU do. If you're posting consistently with engaging content, they'll learn what good looks like. If you're not, they'll think that's okay too.",
    how: [
      "Post your own transformation stories regularly",
      "Share your \"why\" and journey authentically",
      "Engage with your audience (comments, stories, DMs)",
      "Show variety — progress pics, recipes, tips, lifestyle",
    ],
  },
  {
    id: "4",
    title: "Stay in close contact with your new coach",
    why: "New coaches need support, encouragement, and accountability — especially in the first 30 days. Close contact prevents them from feeling lost or giving up.",
    how: [
      "Check in daily (at minimum) in the first few weeks",
      "Schedule a weekly call to review progress",
      "Respond quickly to their questions",
      "Celebrate their small wins immediately",
      "Be proactive — don't wait for them to reach out",
    ],
    script: "Hey! How's it going today? What's one thing you worked on? Any questions I can help with?",
  },
  {
    id: "5",
    title: "Teach them to post frequently & effectively, and babysit their posts",
    why: "\"Babysitting posts\" means watching for engagement and responding quickly. When someone comments or DMs, that's a warm lead — speed matters! Teach them to be responsive.",
    how: [
      "Help them craft their first few posts",
      "Teach them to turn on post notifications",
      "Role play how to respond to comments and DMs",
      "Review their posts together and give feedback",
      "Remind them: post, then STAY CLOSE to engage",
    ],
    script: "After you post, don't just put your phone down! Stay close for the next 30-60 minutes. When someone comments, reply fast. When someone DMs, that's your cue — they're interested!",
  },
  {
    id: "6",
    title: "Show them how to set up 3-way messages that move to the phone",
    why: "The 3-way message is how your new coach learns to have enrollment conversations — by watching you. It's only weird if you think it's weird! The phone is where conversions happen.",
    how: [
      "When they have an interested lead, create a group message",
      "Introduce yourself and build rapport",
      "Ask discovery questions (their new coach watches)",
      "Move to a phone call quickly — don't stay in text too long",
      "Debrief with your new coach after each conversation",
    ],
    script: "Hey [PROSPECT]! I'm [YOUR NAME], [NEW COACH]'s mentor. She's told me a bit about you and I'd love to learn more! What made you reach out?",
  },
  {
    id: "7",
    title: "Teach them to send a jot form before the Health Assessment",
    why: "Having prospects fill out a Health Assessment form before the call ensures they're serious and gives valuable information to prepare for the conversation. It filters out tire-kickers.",
    how: [
      "Use YOUR form initially — they learn by seeing yours",
      "After they reach Senior Coach, teach them to clone their own",
      "Review their prospect's form answers TOGETHER before calls",
      "Show them how to use the form data in the conversation",
    ],
    script: "Before we chat, would you mind filling out this quick Health Assessment? It helps me understand where you're at so I can be most helpful on our call! [LINK]",
  },
  {
    id: "8",
    title: "Introduce them to the Coach Community early",
    why: "Community creates belonging. When your new coach feels like part of something bigger, they stay motivated. They also learn from others — not just you.",
    how: [
      "Week 1: New Coach Call (foundations)",
      "Week 2: All-Team Call (bigger community)",
      "Week 3: Power Hour (action & accountability)",
      "Introduce them personally — don't just send a link",
    ],
  },
]

export function SponsoringCoachProTipsContent() {
  const { toast } = useToast()
  const [checkedTips, setCheckedTips] = useState<Set<string>>(new Set())
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set([tips[0].id]))

  useEffect(() => {
    const saved = localStorage.getItem("sponsoringProTips")
    if (saved) {
      try {
        const state: TipState = JSON.parse(saved)
        if (state.checkedTips) {
          setCheckedTips(new Set(state.checkedTips))
        }
      } catch (e) {
        console.error("Failed to load saved state", e)
      }
    }
  }, [])

  useEffect(() => {
    const state: TipState = {
      checkedTips: Array.from(checkedTips),
    }
    localStorage.setItem("sponsoringProTips", JSON.stringify(state))
  }, [checkedTips])

  const toggleTip = (tipId: string) => {
    const newExpanded = new Set(expandedTips)
    if (newExpanded.has(tipId)) {
      newExpanded.delete(tipId)
    } else {
      newExpanded.add(tipId)
    }
    setExpandedTips(newExpanded)
  }

  const toggleCheck = (tipId: string) => {
    const newChecked = new Set(checkedTips)
    if (newChecked.has(tipId)) {
      newChecked.delete(tipId)
    } else {
      newChecked.add(tipId)
    }
    setCheckedTips(newChecked)
  }

  const copyScript = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Script copied to clipboard",
      })
    })
  }

  const progress = checkedTips.size
  const progressPercent = Math.round((progress / tips.length) * 100)

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <Card className="bg-amber-50 border-2 border-amber-400">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-start">
            <div className="text-3xl flex-shrink-0">⚠️</div>
            <div>
              <h3 className="font-bold text-amber-900 mb-1">Work With Your Mentorship</h3>
              <p className="text-sm text-amber-800">
                Until you are a <strong>Regional Director or above</strong>, your mentorship should be directly involved in the process of teaching you to launch new coaches. Be coachable as you learn how to mentor!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold text-slate-500">Your Mentoring Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercent} className="h-3 mb-2" />
          <div className="flex justify-between text-sm text-slate-500">
            <span>{progress} of {tips.length} tips implemented</span>
            <span className="font-bold text-purple-600">{progressPercent}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Core Principles */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center text-2xl">
            💡
          </div>
          <div>
            <h2 className="text-2xl font-bold text-optavia-dark">Core Principles</h2>
            <p className="text-sm text-optavia-gray">The mindset shifts that make great mentors</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-purple-600 to-purple-400 text-white col-span-full">
            <CardContent className="pt-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold mb-2 text-amber-200">CLEAR IS KIND</h3>
              <p className="text-white/90">
                Feed each step to them one bite at a time. It's tempting to teach your new coach everything you know — <strong>DON'T FIREHOSE!</strong>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl mb-2">👀</div>
              <h3 className="font-bold text-purple-600 mb-1">Watch & Listen</h3>
              <p className="text-sm text-slate-600">Your new coach learns by <strong>listening and watching</strong>, not by learning and reading.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl mb-2">🏀</div>
              <h3 className="font-bold text-purple-600 mb-1">Bounce the Ball</h3>
              <p className="text-sm text-slate-600">Give ONE action step at a time, then <strong>wait for them to execute</strong> before giving another.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl mb-2">🦁</div>
              <h3 className="font-bold text-purple-600 mb-1">Be Brave</h3>
              <p className="text-sm text-slate-600">Your new coach needs to <strong>lean into your bravery</strong>. Model the courage you want them to have.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-bold text-purple-600 mb-1">Be a Role Model</h3>
              <p className="text-sm text-slate-600">Your social media sets the example. <strong>Show them what good looks like</strong> with your own posts.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Don't Do / Do Boxes */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-red-50 border-2 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              🚫 Common Mistakes to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-red-900">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Firehosing them with information all at once</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Giving multiple action steps before they complete the first one</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Expecting them to learn by reading instead of watching</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Being hands-off and leaving them to figure it out alone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Skipping the 3-way message because it feels "weird"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Letting them struggle without involving your mentorship</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center gap-2">
              ✅ What Great Mentors Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-green-900">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Stay in close contact — check in daily in the beginning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Model everything on your own social media first</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Use 3-way messages to show them how it's done</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Introduce them to the community early</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Be patient — one action step at a time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Let your leaders guide YOU as you learn to mentor</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Pro Tips Section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center text-2xl">
            ⭐
          </div>
          <div>
            <h2 className="text-2xl font-bold text-optavia-dark">Sponsoring Pro Tips</h2>
            <p className="text-sm text-optavia-gray">The 8 essentials for launching your new coach</p>
          </div>
        </div>

        <div className="space-y-3">
          {tips.map((tip) => (
            <Card key={tip.id} className="overflow-hidden">
              <div
                className="bg-slate-50 border-b border-slate-200 p-4 cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => toggleTip(tip.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {tip.id}
                  </div>
                  <div className={`flex-1 font-bold text-slate-800 ${checkedTips.has(tip.id) ? "line-through opacity-60" : ""}`}>
                    {tip.title}
                  </div>
                  <div
                    className={`w-7 h-7 border-2 rounded-lg cursor-pointer flex items-center justify-center flex-shrink-0 transition-all ${
                      checkedTips.has(tip.id)
                        ? "bg-purple-600 border-purple-600"
                        : "border-slate-300 hover:border-purple-600 hover:bg-purple-50"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleCheck(tip.id)
                    }}
                  >
                    {checkedTips.has(tip.id) && <Check className="h-4 w-4 text-white" />}
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform ${
                      expandedTips.has(tip.id) ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {expandedTips.has(tip.id) && (
                <CardContent className="p-4 space-y-3">
                  <div>
                    <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                      💜 Why This Matters
                    </div>
                    <div className="bg-purple-50 border-l-4 border-purple-600 p-3 rounded-r-lg text-sm text-purple-900">
                      {tip.why}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                      ✅ How To Do It
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-600 p-3 rounded-r-lg">
                      <ul className="space-y-1 text-sm text-green-900">
                        {tip.how.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {tip.script && (
                    <div>
                      <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                        💬 {tip.id === "4" ? "Check-In Script" : tip.id === "5" ? "Teaching Script" : tip.id === "6" ? "3-Way Message Intro" : tip.id === "7" ? "Sending the Form" : "Script"}
                      </div>
                      <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded-r-lg text-sm text-blue-900 italic">
                        {tip.script}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyScript(tip.script!)}
                        className="mt-2 text-xs bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200 h-7"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📅 Community Introduction Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-1 bg-gradient-to-b from-purple-600 to-purple-400 rounded" />
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute -left-5 top-1.5 w-3 h-3 bg-white border-3 border-purple-600 rounded-full" />
                <div>
                  <div className="font-bold text-slate-800 text-sm">New Coach Call</div>
                  <div className="text-xs text-slate-500">First introduction — foundations and basics</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-5 top-1.5 w-3 h-3 bg-white border-3 border-purple-600 rounded-full" />
                <div>
                  <div className="font-bold text-slate-800 text-sm">All-Team Call</div>
                  <div className="text-xs text-slate-500">Expand their world — see the bigger community</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-5 top-1.5 w-3 h-3 bg-white border-3 border-purple-600 rounded-full" />
                <div>
                  <div className="font-bold text-slate-800 text-sm">Power Hour</div>
                  <div className="text-xs text-slate-500">Action-focused — builds momentum and accountability</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-5 top-1.5 w-3 h-3 bg-white border-3 border-purple-600 rounded-full" />
                <div>
                  <div className="font-bold text-slate-800 text-sm">Saturday Huddle</div>
                  <div className="text-xs text-slate-500">Weekly rhythm — Zoom 404 357 2439, passcode OPTAVIA</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference */}
      <Card className="bg-amber-50 border-2 border-amber-400">
        <CardHeader>
          <CardTitle className="text-amber-900 flex items-center gap-2">
            ⚡ Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">Your Role Until RD</div>
              <div className="text-sm text-amber-800 font-semibold">Work WITH your mentorship</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">When They Clone Form</div>
              <div className="text-sm text-amber-800 font-semibold">After reaching Senior Coach</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">3-Way Message Rule</div>
              <div className="text-sm text-amber-800 font-semibold">Move to phone quickly!</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">Remember</div>
              <div className="text-sm text-amber-800 font-semibold">Bounce ball, wait for return</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
