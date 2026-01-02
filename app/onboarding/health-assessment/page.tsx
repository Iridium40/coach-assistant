"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LessonCard } from "@/components/academy/LessonCard"
import { Checklist } from "@/components/academy/Checklist"
import { QuoteBox } from "@/components/academy/QuoteBox"

export default function OnboardingHealthAssessmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100/50" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Navigation Bar */}
      <div className="bg-white border-b border-green-100 sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/onboarding/acronyms">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#00A651]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous: Acronyms
              </Button>
            </Link>
            <Link href="/training">
              <Button size="sm" className="bg-[#00A651] hover:bg-[#00c760] text-white">
                Back to Training
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#00A651] via-[#00c760] to-[#00A651] rounded-b-3xl px-6 py-12 md:py-16 text-center text-white relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent animate-pulse"></div>
        <div className="relative z-10">
          <div className="text-5xl md:text-6xl mb-4">📞</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">How to Conduct a Health Assessment</h1>
          <p className="text-lg md:text-xl opacity-95">Learn the fundamentals of connecting with prospects and helping them discover if OPTAVIA is right for them</p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 pb-16">
        {/* Lesson 1: Understanding the Health Assessment */}
        <LessonCard number={1} title="Understanding the Health Assessment" subtitle="It's not a sales pitch — it's a conversation">
          <p className="mb-4">
            The Health Assessment call is often misunderstood. New coaches think it&apos;s about convincing someone to buy. It&apos;s not. It&apos;s about <strong>discovering if you can help them</strong> — and letting them discover that too.
          </p>

          <div className="bg-[hsl(var(--optavia-green-light))] border-2 border-[hsl(var(--optavia-green))] rounded-2xl p-6 my-6 text-center">
            <div className="text-3xl mb-3">💡</div>
            <div className="text-xl md:text-2xl font-bold text-[hsl(var(--optavia-green))] mb-2">The Goal: Understand, Don&apos;t Convince</div>
            <div className="text-optavia-dark">
              Your job is to understand their situation deeply enough to know if OPTAVIA is right for them — and help THEM realize it.
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">What an HA Call Actually Is</h3>
          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="bg-white border border-[hsl(var(--optavia-border))] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[hsl(var(--optavia-green))]">70%</div>
              <div className="text-sm text-optavia-gray mt-1">Listening</div>
            </div>
            <div className="bg-white border border-[hsl(var(--optavia-border))] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[hsl(var(--optavia-green))]">20%</div>
              <div className="text-sm text-optavia-gray mt-1">Asking Questions</div>
            </div>
            <div className="bg-white border border-[hsl(var(--optavia-border))] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[hsl(var(--optavia-green))]">10%</div>
              <div className="text-sm text-optavia-gray mt-1">Sharing Info</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-6 bg-gray-50 rounded-xl p-6">
            <div className="text-center">
              <div className="text-4xl mb-2">👂</div>
              <div className="text-3xl font-bold text-[hsl(var(--optavia-green))]">70%</div>
              <div className="text-sm text-optavia-gray">You Listen</div>
            </div>
            <div className="text-2xl font-bold text-optavia-gray">vs</div>
            <div className="text-center">
              <div className="text-4xl mb-2">🗣️</div>
              <div className="text-3xl font-bold text-orange-500">30%</div>
              <div className="text-sm text-optavia-gray">You Talk</div>
            </div>
          </div>

          <QuoteBox>
            &quot;People don&apos;t care how much you know until they know how much you care.&quot;
          </QuoteBox>

          <h3 className="text-lg font-bold mt-6 mb-3">The 3 Outcomes of Every HA Call</h3>
          <Checklist
            items={[
              { text: "They enroll — They're ready, it's a fit, they start today" },
              { text: "They need more time — You schedule a follow-up" },
              { text: "It's not a fit — That's okay! Not everyone is your client" },
            ]}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-4">
            <div className="font-bold text-blue-700 mb-1 flex items-center gap-2">
              <span>💡</span>
              <span className="text-xs uppercase tracking-wider">Mindset Shift</span>
            </div>
            <div className="text-sm text-blue-800">
              You&apos;re not trying to &quot;close&quot; anyone. You&apos;re having a conversation to see if you can help. If you can, great! If not, that&apos;s okay too. This removes all pressure — from you AND them.
            </div>
          </div>
        </LessonCard>

        {/* Lesson 2: Pre-Call Preparation */}
        <LessonCard number={2} title="Pre-Call Preparation" subtitle="Win the call before it starts">
          <p className="mb-4">
            The best HA calls are won in the preparation. Taking 5 minutes to review their Health Assessment form gives you a massive advantage — you&apos;ll ask better questions and make deeper connections.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Your Pre-Call Checklist</h3>
          <Checklist
            items={[
              { text: "Reviewed their form answers — Read their 'current state' and 'why' sections carefully" },
              { text: "Noted their commitment level — Did they rate themselves 8+? They're ready. Below 6? Dig deeper." },
              { text: "Checked for medical flags — Pregnant? Nursing? Diabetes? Medications? Know before you call." },
              { text: "Found connection points — Similar background? Same struggles you had? Use these to build rapport." },
              { text: "Prepared your space — Quiet room, water nearby, HA Checklist Tool open, notifications off" },
            ]}
          />

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4">
            <div className="flex items-start gap-3">
              <span>⚠️</span>
              <div>
                <div className="font-bold text-optavia-dark mb-1">Medical Considerations</div>
                <div className="text-sm text-optavia-gray">
                  If they checked pregnant, nursing, Type 1 diabetes, or listed medications, you MUST discuss consulting their doctor before starting. This is non-negotiable.
                </div>
              </div>
            </div>
          </div>
        </LessonCard>

        {/* Lesson 3: The Call Structure */}
        <LessonCard number={3} title="The 6-Phase Call Structure" subtitle="A roadmap for every conversation">
          <p className="mb-4">
            Every great HA call follows the same basic structure. This isn&apos;t a rigid script — it&apos;s a framework that keeps you on track while allowing natural conversation.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
            {[
              { num: "Phase 1", name: "Opening & Rapport", time: "2-3 minutes", desc: "Warm greeting, confirm time, set agenda, ice-breaker" },
              { num: "Phase 2", name: "Discovery", time: "10-12 minutes", desc: "Deep dive into their situation, goals, why, and obstacles" },
              { num: "Phase 3", name: "Your Story", time: "2-3 minutes", desc: "Brief personal story to build connection and credibility" },
              { num: "Phase 4", name: "Present Solution", time: "3-5 minutes", desc: "Explain OPTAVIA and connect it to their specific goals" },
              { num: "Phase 5", name: "Close", time: "3-5 minutes", desc: "Ask closing question, handle objections, determine next steps" },
              { num: "Phase 6", name: "Follow-Up", time: "After call", desc: "Thank you text, log notes, schedule next touch" },
            ].map((phase) => (
              <div key={phase.num} className="bg-white border border-[hsl(var(--optavia-border))] rounded-xl p-4 hover:border-[hsl(var(--optavia-green))] transition-colors">
                <div className="text-xs font-bold text-optavia-gray uppercase tracking-wider mb-2">{phase.num}</div>
                <div className="font-bold text-optavia-dark mb-1">{phase.name}</div>
                <div className="text-sm text-[hsl(var(--optavia-green))] mb-2">{phase.time}</div>
                <div className="text-sm text-optavia-gray">{phase.desc}</div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Phase 1: Opening Scripts</h3>
          <div className="space-y-4 my-4">
            <div className="bg-[hsl(var(--optavia-green-light))] border-l-4 border-[hsl(var(--optavia-green))] rounded-r-xl p-4">
              <div className="text-xs font-bold text-[hsl(var(--optavia-green))] uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>💬</span>
                <span>Greeting</span>
              </div>
              <div className="text-sm text-optavia-dark italic">
                &quot;Hi [NAME]! It&apos;s so great to connect with you. Thank you for taking the time to fill out the Health Assessment — I really appreciated reading your story.&quot;
              </div>
            </div>
            <div className="bg-[hsl(var(--optavia-green-light))] border-l-4 border-[hsl(var(--optavia-green))] rounded-r-xl p-4">
              <div className="text-xs font-bold text-[hsl(var(--optavia-green))] uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>💬</span>
                <span>Confirm Time</span>
              </div>
              <div className="text-sm text-optavia-dark italic">
                &quot;Do you have about 20-30 minutes right now? I want to make sure we have enough time to chat without rushing.&quot;
              </div>
            </div>
            <div className="bg-[hsl(var(--optavia-green-light))] border-l-4 border-[hsl(var(--optavia-green))] rounded-r-xl p-4">
              <div className="text-xs font-bold text-[hsl(var(--optavia-green))] uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>💬</span>
                <span>Set Agenda</span>
              </div>
              <div className="text-sm text-optavia-dark italic">
                &quot;Here&apos;s what I&apos;d love to do today: First, I want to hear more about YOU — your goals and what&apos;s brought you here. Then I&apos;ll share a bit about myself and how I might be able to help. Sound good?&quot;
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Phase 2: Discovery Questions</h3>
          <div className="space-y-3 my-4">
            {[
              { q: "Tell me more about where you are right now with your health...", purpose: "Opens the conversation, lets them share their story" },
              { q: "Why is making a change important to you right now?", purpose: "Uncovers their emotional 'why' — the key to commitment" },
              { q: "What have you tried before? What worked? What didn't?", purpose: "Reveals patterns and what to avoid" },
              { q: "If you could wave a magic wand and remove ONE obstacle, what would it be?", purpose: "Identifies their biggest barrier to address" },
              { q: "On a scale of 1-10, how important is it to make a change right now?", purpose: "Gauges urgency and readiness" },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-4 bg-gray-50 border border-[hsl(var(--optavia-border))] rounded-xl">
                <div className="w-8 h-8 bg-[hsl(var(--optavia-green))] text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-optavia-dark mb-1">&quot;{item.q}&quot;</div>
                  <div className="text-sm text-optavia-gray">{item.purpose}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-4">
            <div className="font-bold text-blue-700 mb-1 flex items-center gap-2">
              <span>💡</span>
              <span className="text-xs uppercase tracking-wider">The Magic Follow-Up</span>
            </div>
            <div className="text-sm text-blue-800">
              When they give you a number, ask: &quot;Why that number and not lower?&quot; This gets them to sell themselves on why it&apos;s important!
            </div>
          </div>
        </LessonCard>

        {/* Lesson 4: Your Story */}
        <LessonCard number={4} title="Sharing Your Story" subtitle="Connect, don't convince">
          <p className="mb-4">
            Your personal story is powerful — but only when used correctly. It builds connection and credibility. It shows them you understand because you&apos;ve been there.
          </p>

          <div className="bg-[hsl(var(--optavia-green-light))] border-2 border-[hsl(var(--optavia-green))] rounded-2xl p-6 my-6 text-center">
            <div className="text-3xl mb-3">⏱️</div>
            <div className="text-xl md:text-2xl font-bold text-[hsl(var(--optavia-green))] mb-2">60-90 Seconds Max</div>
            <div className="text-optavia-dark">
              Your story should be brief. This call is about THEM, not you. Hit the highlights and move on.
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">The 3-Part Story Formula</h3>
          <Checklist
            items={[
              { text: "Where you were — 'I was struggling with [SIMILAR THING THEY MENTIONED]...'" },
              { text: "What changed — 'Then I found OPTAVIA and everything shifted...'" },
              { text: "Where you are now — 'Now I [RESULT], and that's why I'm so passionate about helping others.'" },
            ]}
          />
        </LessonCard>

        {/* Lesson 5: Handling Objections */}
        <LessonCard number={5} title="Handling Objections" subtitle="Objections are questions in disguise">
          <p className="mb-4">
            When someone raises an objection, they&apos;re not saying &quot;no&quot; — they&apos;re saying &quot;I need more information&quot; or &quot;I&apos;m scared.&quot; Your job is to understand the real concern and address it with empathy.
          </p>

          <div className="bg-[hsl(var(--optavia-green-light))] border-2 border-[hsl(var(--optavia-green))] rounded-2xl p-6 my-6 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <div className="text-xl md:text-2xl font-bold text-[hsl(var(--optavia-green))] mb-2">Feel → Felt → Found</div>
            <div className="text-optavia-dark">
              &quot;I understand how you feel. Others have felt the same way. What they found was...&quot;
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">The Top 4 Objections (and How to Handle Them)</h3>
          <div className="space-y-4 my-4">
            {[
              {
                objection: "It's too expensive",
                response: "I totally understand — I had the same concern at first. Let me ask: how much are you spending now on food, snacks, drive-thrus, coffee runs? Most clients find it's actually comparable when you add it up. And here's the real question: what is it costing you NOT to fix this? Your health, your energy, your confidence?",
              },
              {
                objection: "I need to think about it",
                response: "I completely respect that. Can I ask — what specifically do you need to think through? Sometimes it helps to talk it out together. Is it the cost, the time commitment, or something else?",
              },
              {
                objection: "I need to talk to my spouse",
                response: "That's great that you make decisions together! Would it help if I hopped on a quick call with both of you? I'm happy to answer any questions they might have. When would be a good time for all three of us?",
              },
              {
                objection: "I've tried everything and nothing works",
                response: "I hear you — that's so frustrating, and honestly, I felt the same way. Here's what's different about this: you've never had a coach with you every single day. That's the missing piece for most people. You're not doing this alone — I'm texting you, checking in, and walking beside you the whole way.",
              },
            ].map((obj, i) => (
              <div key={i} className="bg-white border border-[hsl(var(--optavia-border))] rounded-xl overflow-hidden">
                <div className="bg-red-50 border-b border-red-200 p-4">
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Objection #{i + 1}</div>
                  <div className="font-bold text-red-800">&quot;{obj.objection}&quot;</div>
                </div>
                <div className="p-4">
                  <div className="text-xs font-bold text-[hsl(var(--optavia-green))] uppercase tracking-wider mb-2">✅ Your Response</div>
                  <div className="text-sm text-optavia-dark">{obj.response}</div>
                </div>
              </div>
            ))}
          </div>
        </LessonCard>

        {/* Lesson 6: Follow-Up */}
        <LessonCard number={6} title="The Follow-Up System" subtitle="Where most enrollments actually happen">
          <p className="mb-4">
            Here&apos;s the truth: most people don&apos;t enroll on the first call. That&apos;s normal! The coaches who succeed are the ones with a solid follow-up system.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Immediate Follow-Up (Within 1 Hour)</h3>
          <div className="bg-[hsl(var(--optavia-green-light))] border-l-4 border-[hsl(var(--optavia-green))] rounded-r-xl p-4 my-4">
            <div className="text-xs font-bold text-[hsl(var(--optavia-green))] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>💬</span>
              <span>Thank You Text</span>
            </div>
            <div className="text-sm text-optavia-dark italic">
              &quot;Hey [NAME]! It was so great talking with you today. I&apos;m really excited about your goals and I&apos;m here whenever you&apos;re ready. No rush — just know I&apos;m cheering you on! 💚&quot;
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">If They Didn&apos;t Enroll: The 5-Touch System</h3>
          <Checklist
            items={[
              { text: "Day 1: Thank you text (see above)" },
              { text: "Day 2-3: Send value — a recipe, tip, or article related to what they mentioned" },
              { text: "Day 5-7: Check in: 'Hey! Just thinking about you. How are you feeling about everything?'" },
              { text: "Day 10-14: Share a success story similar to their situation" },
              { text: "Day 21-30: 'No pressure, but I wanted to let you know I have some availability opening up. Would you like to hop on another quick call?'" },
            ]}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-4">
            <div className="font-bold text-blue-700 mb-1 flex items-center gap-2">
              <span>💡</span>
              <span className="text-xs uppercase tracking-wider">The Key to Follow-Up</span>
            </div>
            <div className="text-sm text-blue-800">
              Always provide VALUE, not just &quot;checking in.&quot; Share recipes, tips, success stories. Be helpful, not salesy. The goal is to stay top of mind until they&apos;re ready.
            </div>
          </div>
        </LessonCard>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center gap-4 pt-8 border-t border-green-200 mt-8">
          <Link href="/onboarding/acronyms">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: Acronyms
            </Button>
          </Link>
          <Link href="/training">
            <Button className="bg-[#00A651] hover:bg-[#00c760] text-white">
              Back to Training
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
