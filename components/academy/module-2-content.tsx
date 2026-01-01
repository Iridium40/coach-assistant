"use client"

import { LessonCard } from "./LessonCard"
import { Checklist } from "./Checklist"
import { QuoteBox } from "./QuoteBox"
import { ImportantBanner } from "./ImportantBanner"
import { RankLadder } from "./RankLadder"
import { PointsBox } from "./PointsBox"
import { BonusTiers } from "./BonusTiers"

export function Module2Content() {
  return (
    <div className="space-y-6">
      {/* Lesson 1: Understanding Rank Progression */}
      <LessonCard
        number={1}
        title="Understanding Rank Progression"
        subtitle="Your path from Senior Coach to Executive Director"
      >
        <p className="mb-4">From Senior Coach to Executive Director, you&apos;ll climb through ranks by earning <strong>Qualifying Points</strong>. Here&apos;s the ladder:</p>
        
        <RankLadder
          ranks={[
            {
              points: "5",
              rankName: "Executive Director",
              rankReq: "Qualified SC + 5 Qualifying Points",
              highlight: true,
            },
            {
              points: "4",
              rankName: "Director",
              rankReq: "Qualified SC + 4 Qualifying Points",
            },
            {
              points: "3",
              rankName: "Associate Director",
              rankReq: "Qualified SC + 3 Qualifying Points",
            },
            {
              points: "2",
              rankName: "Manager",
              rankReq: "Qualified SC + 2 Qualifying Points",
            },
            {
              points: "SC",
              rankName: "Senior Coach",
              rankReq: "1,200+ GQV + 5 Ordering Entities",
            },
          ]}
        />

        <QuoteBox>
          <strong>Key Insight:</strong> You must MAINTAIN Senior Coach status each month PLUS accumulate Qualifying Points to rank up.
        </QuoteBox>
      </LessonCard>

      {/* Lesson 2: Qualifying Points Explained */}
      <LessonCard
        number={2}
        title="Qualifying Points Explained"
        subtitle="Two ways to earn points"
      >
        <p className="mb-4">Qualifying Points are the currency of rank advancement. There are two ways to earn each point:</p>
        
        <PointsBox
          label="1 Qualifying Point = Either Option"
          items={[
            { value: "$1,200", desc: "FQV (Frontline Qualifying Volume)" },
            { value: "1 SC", desc: "Qualified Senior Coach Team" },
          ]}
        />

        <h3 className="text-lg font-bold mt-6 mb-3">Understanding Volume Types</h3>
        <Checklist
          items={[
            { text: "PV (Personal Volume): Your own orders" },
            { text: "FQV (Frontline Qualifying Volume): Orders from YOUR direct clients" },
            { text: "GQV (Group Qualifying Volume): Total volume from your entire team" },
          ]}
        />
      </LessonCard>

      {/* Lesson 3: Setting Up Your Finances */}
      <LessonCard
        number={3}
        title="Setting Up Your Finances"
        subtitle="Build a sustainable business foundation"
      >
        <p className="mb-4">As your income grows, set yourself up for success with smart financial habits:</p>

        <div className="grid md:grid-cols-3 gap-4 my-6">
          {[
            { percent: "30%", purpose: "Taxes", desc: "Set aside for quarterly estimated taxes" },
            { percent: "10%", purpose: "Events", desc: "Convention, training, team events" },
            { percent: "10%", purpose: "Tools", desc: "Scholarships, resources, business tools" },
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-[#00c760] mb-2">{item.percent}</div>
              <div className="font-semibold mb-1">{item.purpose}</div>
              <div className="text-sm text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>

        <QuoteBox>
          <strong>Remember:</strong> As an OPTAVIA coach, you&apos;re a 1099 independent contractor. Plan for taxes proactively!
        </QuoteBox>
      </LessonCard>

      {/* Lesson 4: Coach Consistency Bonus */}
      <LessonCard
        number={4}
        title="Coach Consistency Bonus"
        subtitle="Earn quarterly rewards for steady performance"
      >
        <p className="mb-4">OPTAVIA rewards coaches who maintain consistent client volume. Hit these FQV thresholds for 3 consecutive months:</p>

        <BonusTiers
          tiers={[
            { amount: "$250", fqv: "2,000+ FQV", months: "3 months" },
            { amount: "$500", fqv: "4,000+ FQV", months: "3 months" },
            { amount: "$750", fqv: "5,000+ FQV", months: "3 months" },
            { amount: "$1,000", fqv: "6,000+ FQV", months: "3 months" },
          ]}
        />

        <ImportantBanner
          bigText="💰 $1,000 EVERY QUARTER"
          subText="That's $4,000/year just for maintaining 6,000+ FQV!"
        />
      </LessonCard>

      {/* Lesson 5: Module 2 Milestones */}
      <LessonCard
        number={5}
        title="Module 2 Milestones"
        subtitle="Your checklist to Executive Director"
      >
        <Checklist
          items={[
            { text: "Maintain Senior Coach status monthly" },
            { text: "Complete your first Monthly Action Plan (MAP)" },
            { text: "Build to 2,000+ FQV consistently" },
            { text: "Sponsor your first coach" },
            { text: "Help your first coach achieve Senior Coach" },
            { text: "Set up business finances (30/10/10 rule)" },
            { text: "Accumulate 5 Qualifying Points" },
            { text: "🎉 Achieve Executive Director!" },
          ]}
        />
      </LessonCard>
    </div>
  )
}
