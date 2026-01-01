"use client"

import { LessonCard } from "./LessonCard"
import { Checklist } from "./Checklist"
import { QuoteBox } from "./QuoteBox"
import { ImportantBanner } from "./ImportantBanner"
import { EliteBonusGrid } from "./EliteBonusGrid"
import { GenerationDiagram } from "./GenerationDiagram"

export function Module5Content() {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-700 rounded-2xl p-6 md:p-8 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-[#00c760] to-white bg-clip-text text-transparent">
          Executive Leadership
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          At Global Director, you step into company-wide influence. You&apos;re not just building your business — you&apos;re shaping the culture and systems that support thousands of coaches.
        </p>
      </div>

      {/* Lesson 1: Multi-Generation Mastery */}
      <LessonCard
        number={1}
        title="Multi-Generation Mastery"
        subtitle="Building 6 generations of ED teams"
      >
        <p className="mb-4">
          At Global Director, you can earn bonuses on up to 6 generations of Executive Directors. This is where your organization&apos;s depth truly compounds.
        </p>

        <GenerationDiagram
          generations={[
            { label: "You", count: 0 },
            { label: "Gen 1", count: 6, bonus: "2.5%" },
            { label: "Gen 2", count: 4, bonus: "2.5%" },
            { label: "Gen 3", count: 3, bonus: "2.5%" },
            { label: "Gen 4", count: 2, bonus: "2.5%" },
            { label: "Gen 5", count: 2, bonus: "2.5%" },
            { label: "Gen 6", count: 1, bonus: "2.5%" },
          ]}
        />

        <QuoteBox>
          <strong>Compound Effect:</strong> When you have EDs at 6 generations deep, you&apos;re earning on hundreds of coaches&apos; volume across your entire organization.
        </QuoteBox>
      </LessonCard>

      {/* Lesson 2: All Elite Bonuses Unlocked */}
      <LessonCard
        number={2}
        title="All Elite Leadership Bonuses Unlocked"
        subtitle="The complete 1.5% on organization volume"
      >
        <p className="mb-4">
          At Global Director, you unlock all three tiers of Elite Leadership Bonuses, earning 1.5% on your entire organization&apos;s Group Qualifying Volume.
        </p>

        <EliteBonusGrid
          bonuses={[
            { rank: "Tier 1", percent: "0.5%", desc: "Unlocked at ND" },
            { rank: "Tier 2", percent: "0.5%", desc: "Unlocked at GD" },
            { rank: "Tier 3", percent: "0.5%", desc: "Unlocked at Presidential" },
          ]}
        />

        <ImportantBanner
          bigText="💎 TOTAL: 1.5% ON ORGANIZATION VOLUME"
          subText="Plus 2.5% on 6 ED generations, plus all standard bonuses"
        />
      </LessonCard>

      {/* Lesson 3: Event Leadership */}
      <LessonCard
        number={3}
        title="Event Leadership & Company Influence"
        subtitle="Your role in shaping OPTAVIA culture"
      >
        <p className="mb-4">
          At Global Director and Presidential, you&apos;re not just running a business — you&apos;re influencing the entire company culture through events, training, and leadership.
        </p>

        <h3 className="text-lg font-bold mt-6 mb-3">Leadership Opportunities</h3>
        <Checklist
          items={[
            { text: "Lead training sessions at company events" },
            { text: "Mentor upcoming leaders in regional programs" },
            { text: "Share best practices in company publications" },
            { text: "Host regional leadership retreats" },
            { text: "Serve on company advisory councils" },
            { text: "Influence product and program development" },
          ]}
        />

        <QuoteBox color="blue">
          <strong>Mindset Shift:</strong> Your impact is no longer just measured in income or rank — it&apos;s measured in lives transformed through the systems you&apos;ve built.
        </QuoteBox>
      </LessonCard>

      {/* Lesson 4: Strategic Vision */}
      <LessonCard
        number={4}
        title="Strategic Vision: Building for Legacy"
        subtitle="What you&apos;re really building"
      >
        <p className="mb-4">
          At this level, you&apos;re not just building for this month or this year — you&apos;re building systems and culture that will outlast you.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          {[
            { icon: "🎯", title: "Culture", desc: "The values and behaviors that define your organization" },
            { icon: "⚙️", title: "Systems", desc: "Processes that work without your direct involvement" },
            { icon: "👥", title: "Leaders", desc: "EDs who can develop their own EDs" },
            { icon: "🌱", title: "Legacy", desc: "Something that transforms lives for generations" },
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-bold text-white mb-2">{item.title}</div>
              <div className="text-sm text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </LessonCard>

      {/* Lesson 5: Milestones */}
      <LessonCard
        number={5}
        title="Module 5 Milestones"
        subtitle="Your checklist to Presidential Director"
      >
        <Checklist
          items={[
            { text: "Maintain Integrated Global Director status" },
            { text: "Build 6 generations of ED teams" },
            { text: "Unlock all 3 Elite Leadership Bonus tiers (1.5% total)" },
            { text: "Lead company training events" },
            { text: "Develop systems that work at scale" },
            { text: "Build culture that outlasts you" },
            { text: "Mentor upcoming company leaders" },
            { text: "Build organization to 10+ Executive Directors" },
            { text: "🎉 Achieve Presidential Director!" },
          ]}
        />
      </LessonCard>
    </div>
  )
}
