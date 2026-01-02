"use client"

import { LessonCard } from "./LessonCard"
import { Checklist } from "./Checklist"
import { QuoteBox } from "./QuoteBox"
import { GenerationDiagram } from "./GenerationDiagram"
import { EliteBonusGrid } from "./EliteBonusGrid"
import { SystemsGrid } from "./SystemsGrid"

export function Module4Content() {
  return (
    <div className="space-y-6">
      {/* Lesson 1: Understanding ED Generations */}
      <LessonCard
        number={1}
        title="Understanding ED Generations"
        subtitle="How your organization grows in depth"
      >
        <p className="mb-4">
          As your organization grows, you&apos;ll develop Executive Directors who develop their own EDs. Each level down is called a &quot;generation.&quot;
        </p>

        <GenerationDiagram
          generations={[
            { label: "You", count: 0 },
            { label: "Gen 1", count: 3, bonus: "2.5%" },
            { label: "Gen 2", count: 2, bonus: "2.5%" },
            { label: "Gen 3+", count: 1, bonus: "2.5%" },
          ]}
        />

        <h3 className="text-lg font-bold mt-6 mb-3">ED Generation Bonus</h3>
        <p className="mb-4">
          You earn <strong>2.5% on each ED generation</strong> in your organization. The number of generations you can earn on depends on your rank:
        </p>

        <Checklist
          items={[
            { text: "Regional Director: 1 Generation (your direct EDs)" },
            { text: "National Director: 3 Generations" },
            { text: "Global Director: 5 Generations" },
            { text: "Presidential Director: 6 Generations" },
          ]}
        />
      </LessonCard>

      {/* Lesson 2: Elite Leadership Bonuses */}
      <LessonCard
        number={2}
        title="Elite Leadership Bonuses"
        subtitle="Unlocked at National Director and above"
      >
        <p className="mb-4">
          Starting at National Director, you unlock <strong>Elite Leadership Bonuses</strong> — additional percentage earnings on your entire organization&apos;s volume.
        </p>

        <EliteBonusGrid
          bonuses={[
            { rank: "National Director", percent: "0.5%", desc: "on organization GQV" },
            { rank: "Global Director", percent: "0.5%", desc: "additional (1% total)" },
            { rank: "Presidential", percent: "0.5%", desc: "additional (1.5% total)" },
          ]}
        />

        <QuoteBox>
          <strong>Big Picture:</strong> Elite Leadership Bonuses compound on top of everything else. As your organization grows, these percentages become significant income streams.
        </QuoteBox>
      </LessonCard>

      {/* Lesson 3: Rank Requirements */}
      <LessonCard
        number={3}
        title="Rank Requirements: ND to GD"
        subtitle="Building multiple ED teams"
      >
        <p className="mb-4">
          From Regional Director to Global Director, the primary requirement is developing more Executive Director teams:
        </p>

        <div className="space-y-3 my-6">
          {[
            { count: "1", name: "Regional Director", req: "1 Executive Director Team" },
            { count: "2-3", name: "National Director", req: "Multiple ED Teams + Volume Requirements" },
            { count: "4-6", name: "Global Director", req: "Multiple ED Teams across organization", highlight: true },
          ].map((rank, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-xl border ${
                rank.highlight
                  ? "bg-[hsl(var(--optavia-green-light))] border-[hsl(var(--optavia-green))]"
                  : "bg-white border-[hsl(var(--optavia-border))]"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-lg flex items-center justify-center text-lg font-bold ${
                  rank.highlight
                    ? "bg-gradient-to-br from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green))]"
                    : "bg-gray-200"
                }`}
              >
                {rank.count}
              </div>
              <div className="flex-1">
                <div className={`font-bold ${rank.highlight ? "text-[hsl(var(--optavia-green))]" : "text-optavia-dark"}`}>
                  {rank.name}
                </div>
                <div className="text-sm text-optavia-gray">{rank.req}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-optavia-gray text-sm">
          Remember: For &quot;Integrated&quot; titles (IND, IGD), you must also maintain FIBC status.
        </p>
      </LessonCard>

      {/* Lesson 4: Systems at Scale */}
      <LessonCard
        number={4}
        title="Systems at Scale"
        subtitle="What changes when you lead hundreds"
      >
        <p className="mb-4">
          As your organization grows to hundreds of coaches, you can&apos;t personally mentor everyone. You need <strong>systems</strong>.
        </p>

        <SystemsGrid
          systems={[
            {
              icon: "📅",
              title: "Consistent Team Calls",
              desc: "Weekly calls that anyone in your org can join. Same time, same Zoom, every week.",
            },
            {
              icon: "📚",
              title: "Training Resources",
              desc: "Documented processes, video trainings, onboarding checklists that work without you.",
            },
            {
              icon: "👥",
              title: "Leadership Pipeline",
              desc: "Identify and develop EDs who can lead their own teams. Leaders develop leaders.",
            },
            {
              icon: "🎉",
              title: "Recognition Culture",
              desc: "Celebrate wins publicly. Rank achievements, bonuses, personal breakthroughs.",
            },
          ]}
        />

        <QuoteBox>
          <strong>Leadership Truth:</strong> Your job shifts from doing the work to creating the environment where others can do their best work.
        </QuoteBox>
      </LessonCard>

      {/* Lesson 5: Milestones */}
      <LessonCard
        number={5}
        title="Module 4 Milestones"
        subtitle="Your checklist to Global Director"
      >
        <Checklist
          items={[
            { text: "Maintain Integrated Regional Director status" },
            { text: "Continue maintaining FIBC status quarterly" },
            { text: "Develop your 2nd Executive Director" },
            { text: "Achieve National Director rank" },
            { text: "Unlock 1st Elite Leadership Bonus (0.5%)" },
            { text: "Unlock ED Generation Bonuses (3 generations)" },
            { text: "Build team systems (weekly calls, resources)" },
            { text: "Develop 4-6 Executive Director teams" },
            { text: "Unlock 5 generations of ED bonuses" },
            { text: "🎉 Achieve Integrated Global Director!" },
          ]}
        />
      </LessonCard>
    </div>
  )
}
