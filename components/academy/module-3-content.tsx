"use client"

import { LessonCard } from "./LessonCard"
import { Checklist } from "./Checklist"
import { QuoteBox } from "./QuoteBox"
import { ImportantBanner } from "./ImportantBanner"
import { RequirementBox } from "./RequirementBox"
import { ComparisonGrid } from "./ComparisonGrid"

export function Module3Content() {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-gradient-to-br from-white to-gray-50 border border-[hsl(var(--optavia-border))] rounded-2xl p-6 md:p-8 mb-6">
        <p className="text-optavia-dark text-lg leading-relaxed">
          You&apos;ve reached Executive Director — congratulations! Now it&apos;s time to shift from building your business to developing leaders. This is where duplication begins.
        </p>
      </div>

      {/* FIBC Requirements */}
      <LessonCard
        number={1}
        title="Achieving FIBC Status"
        subtitle="Fully Integrated Business Coach — Master Both Competencies"
      >
        <p className="mb-4">
          FIBC means you&apos;ve mastered BOTH health coaching AND business building. To achieve FIBC, you must qualify in BOTH areas for the same month:
        </p>

        <RequirementBox title="Health Coaching Competency" highlight>
          <ul className="space-y-2">
            <li>• Maintain 275+ Personal Qualifying Volume (PQV)</li>
            <li>• Support active clients on their health journey</li>
            <li>• Demonstrate proficiency in the Habits of Health system</li>
          </ul>
        </RequirementBox>

        <RequirementBox title="Business Building Competency" highlight>
          <ul className="space-y-2">
            <li>• Maintain Executive Director rank (1,200+ GQV, 5 Qualifying Points)</li>
            <li>• Actively sponsor and develop coaches</li>
            <li>• Show consistent team growth and leadership</li>
          </ul>
        </RequirementBox>

        <ImportantBanner
          bigText="💰 EARN $1,000 BONUS"
          subText="When you achieve FIBC status, you unlock a $1,000 bonus!"
        />
      </LessonCard>

      {/* Role Transition */}
      <LessonCard
        number={2}
        title="The Role Transition"
        subtitle="From Builder to Developer"
      >
        <p className="mb-4">
          At Executive Director, your role fundamentally changes. You&apos;re no longer just building your own business — you&apos;re developing others.
        </p>

        <ComparisonGrid
          items={[
            {
              label: "As a Builder (SC → ED)",
              content: (
                <>
                  <p>Focus on your own clients and volume</p>
                  <p>Build your personal team</p>
                  <p>Accumulate Qualifying Points</p>
                </>
              ),
              color: "green",
            },
            {
              label: "As a Developer (ED → IRD)",
              content: (
                <>
                  <p>Focus on developing your coaches</p>
                  <p>Help others build their teams</p>
                  <p>Create leaders who create leaders</p>
                </>
              ),
              color: "blue",
            },
          ]}
        />

        <QuoteBox>
          <strong>The Shift:</strong> Your success is no longer measured by what you do, but by what your team does.
        </QuoteBox>
      </LessonCard>

      {/* Developing Your First ED */}
      <LessonCard
        number={3}
        title="Developing Your First Executive Director"
        subtitle="This is where duplication begins"
      >
        <p className="mb-4">
          Your first ED represents the beginning of true duplication. When someone in your organization achieves ED, you&apos;ve successfully duplicated your leadership.
        </p>

        <h3 className="text-lg font-bold mt-6 mb-3">How to Develop an ED</h3>
        <Checklist
          items={[
            { text: "Identify high-potential Senior Coaches in your organization" },
            { text: "Provide consistent mentorship and support" },
            { text: "Share best practices and successful strategies" },
            { text: "Help them understand the Qualifying Points system" },
            { text: "Support their client acquisition and retention efforts" },
            { text: "Celebrate their milestones and progress" },
            { text: "Guide them through their first MAP (Monthly Action Plan)" },
          ]}
        />

        <ImportantBanner
          bigText="🎯 YOUR FIRST ED = REGIONAL DIRECTOR RANK"
          subText="Once you develop your first Executive Director, you achieve Integrated Regional Director!"
        />
      </LessonCard>

      {/* Module 3 Milestones */}
      <LessonCard
        number={4}
        title="Module 3 Milestones"
        subtitle="Your checklist to Integrated Regional Director"
      >
        <Checklist
          items={[
            { text: "Maintain Executive Director status consistently" },
            { text: "Achieve FIBC status (health + business competency)" },
            { text: "Identify and mentor high-potential Senior Coaches" },
            { text: "Help a Senior Coach understand Qualifying Points" },
            { text: "Support your first coach through their ED journey" },
            { text: "Develop your first Executive Director" },
            { text: "🎉 Achieve Integrated Regional Director!" },
          ]}
        />
      </LessonCard>
    </div>
  )
}
