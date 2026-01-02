"use client"

import { LessonCard } from "./LessonCard"
import { Checklist } from "./Checklist"
import { QuoteBox } from "./QuoteBox"
import { ImportantBanner } from "./ImportantBanner"

export function Module1Content() {
  return (
    <div className="space-y-6">
      {/* Lesson 1: Welcome */}
      <LessonCard number={1} title="Welcome, New Coach!" subtitle="The secret to your success">
        <p className="mb-4">Congratulations on taking this step! Your journey to helping others transform their lives starts now.</p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 my-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-700 font-bold mb-2">
            <span>🔑</span>
            <span>The Secret to New Coach Growth</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-amber-800">SIMPLE, CONSISTENT ACTION</div>
        </div>

        <p className="mb-4">
          This training gives you all the tools you need, but the tools are NOT the secret to growth. Just like you leaned into your Health Coach to create health wins, you&apos;ll lean into your coach as a <strong>Business Coach</strong>, and they will mentor you to success.
        </p>

        <QuoteBox>
          You will <strong>NEVER</strong> be alone on your coaching journey! You&apos;ll have help from your own coach AND their upline mentors.
        </QuoteBox>
      </LessonCard>

      {/* Lesson 2: Apprenticeship Model */}
      <LessonCard number={2} title="The Apprenticeship Model" subtitle="Learn by doing, not just reading">
        <p className="mb-4">At OPTAVIA, we use an apprenticeship model. Think of it like being a student teacher who shadows an experienced teacher to learn how to do the job.</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-6">
          <div className="bg-[hsl(var(--optavia-green-light))] border border-[hsl(var(--optavia-green))] px-6 py-4 rounded-xl text-center font-semibold text-[hsl(var(--optavia-green))]">
            Your Coach SHOWS
          </div>
          <div className="text-2xl text-[hsl(var(--optavia-green))]">→</div>
          <div className="bg-[hsl(var(--optavia-green-light))] border border-[hsl(var(--optavia-green))] px-6 py-4 rounded-xl text-center font-semibold text-[hsl(var(--optavia-green))]">
            You WATCH
          </div>
          <div className="text-2xl text-[hsl(var(--optavia-green))]">→</div>
          <div className="bg-[hsl(var(--optavia-green-light))] border border-[hsl(var(--optavia-green))] px-6 py-4 rounded-xl text-center font-semibold text-[hsl(var(--optavia-green))]">
            You LEARN
          </div>
        </div>

        <h3 className="text-lg font-bold mt-6 mb-3">How It Works</h3>
        <Checklist
          items={[
            { text: "You'll be added to a message thread with your Upline coaches" },
            { text: "Keep ALL communication in that thread for best support" },
            { text: "Your mentors will guide you through every step" },
            { text: "You'll listen to real Health Assessment calls" },
            { text: "You'll co-coach clients WITH your mentor before going solo" },
          ]}
        />

        <h3 className="text-lg font-bold mt-6 mb-3">Client → Coach Parallel</h3>
        <p className="mb-4">Launching as a coach is a lot like starting as a client:</p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-[hsl(var(--optavia-green-light))] border border-[hsl(var(--optavia-green))] p-5 rounded-xl">
            <div className="font-semibold text-[hsl(var(--optavia-green))] mb-2">As a New Client</div>
            <p className="text-sm text-optavia-dark">Daily, step-by-step guidance from your <strong>Health Coach</strong></p>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
            <div className="font-semibold text-blue-600 mb-2">As a New Coach</div>
            <p className="text-sm text-optavia-dark">Daily, step-by-step guidance from your <strong>Business Coach</strong> mentorship team</p>
          </div>
        </div>

        <QuoteBox>
          💚 Lean in, ask questions, and stay in close contact with your mentors as you learn the ropes!
        </QuoteBox>
      </LessonCard>

      {/* Lesson 3: First 30 Days */}
      <LessonCard number={3} title="Your First 30 Days" subtitle="Focus on these 4 core activities">
        <p className="mb-4">Your first month is all about building habits and momentum. Focus on these four activities:</p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          {[
            { icon: "📱", word: "SHARE", desc: "Your story on social media" },
            { icon: "🤝", word: "CONNECT", desc: "Your mentorship in 3-way messages" },
            { icon: "👂", word: "LISTEN", desc: "To Health Assessment calls" },
            { icon: "💪", word: "SUPPORT", desc: "New clients by co-coaching with mentors" },
          ].map((action, i) => (
            <div key={i} className="bg-white border border-[hsl(var(--optavia-border))] rounded-2xl p-6 text-center hover:border-[hsl(var(--optavia-green))] transition-colors">
              <div className="text-4xl mb-3">{action.icon}</div>
              <div className="text-xl font-bold text-[hsl(var(--optavia-green))] mb-2">{action.word}</div>
              <div className="text-sm text-optavia-gray">{action.desc}</div>
            </div>
          ))}
        </div>

        <QuoteBox color="yellow">
          <strong>That&apos;s it!</strong> You will learn by doing it WITH your coach, not by memorizing this manual.
        </QuoteBox>

        <ImportantBanner
          bigText="🚀 COACHES WHO ATTEND WEEKLY THEIR FIRST MONTH GROW FASTER!"
          subText="Consistency is the key to your success"
        />
      </LessonCard>

      {/* Lesson 4: Saturday Huddle */}
      <LessonCard number={4} title="Saturday New Coach Huddle" subtitle="Your weekly connection with the team">
        <p className="mb-4">Every Saturday, join your leadership team to learn the ropes, meet your coaching family, and feel the love from your team!</p>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-7 my-6 text-center">
          <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Every Saturday</div>
          <div className="text-3xl md:text-4xl font-bold text-blue-700 font-mono tracking-wider mb-3">404 357 2439</div>
          <div className="inline-block bg-[hsl(var(--optavia-green))] text-white px-5 py-2 rounded-lg font-semibold mb-6">
            Passcode: OPTAVIA
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
            {[
              { time: "7:00 AM", zone: "Pacific" },
              { time: "8:00 AM", zone: "Mountain" },
              { time: "9:00 AM", zone: "Central" },
              { time: "10:00 AM", zone: "Eastern" },
            ].map((slot, i) => (
              <div key={i} className="bg-white p-3 rounded-lg text-center">
                <div className="font-bold text-blue-600 text-base">{slot.time}</div>
                <div className="text-xs text-optavia-gray mt-1">{slot.zone}</div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-bold mt-6 mb-3">What to Expect</h3>
        <Checklist
          items={[
            { text: "Updates and announcements from leadership" },
            { text: "Training on core coaching skills" },
            { text: "Recognition and celebration" },
            { text: "Q&A with experienced coaches" },
          ]}
        />
      </LessonCard>

      {/* Lesson 5: CAB Bonus */}
      <LessonCard number={5} title="Earn Your CAB Bonus" subtitle="Client Acquisition Bonus — your first milestone">
        <p className="mb-4">New coaches can earn a special bonus in their first 30 days by helping new clients start their journey!</p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-[hsl(var(--optavia-green-light))] border border-[hsl(var(--optavia-green))] p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-[hsl(var(--optavia-green))] mb-2">💵 Earn $150</div>
            <p className="text-sm text-optavia-dark">Develop <strong>3 new clients</strong> who each order at least 275 PQV in a month</p>
          </div>
          <div className="bg-[hsl(var(--optavia-green-light))] border border-[hsl(var(--optavia-green))] p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-[hsl(var(--optavia-green))] mb-2">💵 Earn $250</div>
            <p className="text-sm text-optavia-dark">Develop <strong>5 new clients</strong> who each order at least 275 PQV in a month</p>
          </div>
        </div>

        <QuoteBox>
          <strong>Pro Tip:</strong> You can earn CAB during your first THREE months as a coach. If you don&apos;t hit it in month 1, keep going!
        </QuoteBox>

        <h3 className="text-lg font-bold mt-6 mb-3">Your First 30 Day Checklist</h3>
        <Checklist
          items={[
            { text: "Complete your Coach Kit setup" },
            { text: "Set up OPTAVIA CONNECT" },
            { text: "Create your Contact List (Top 10 candidates)" },
            { text: "Share your story on social media" },
            { text: "Attend 4 Saturday Huddles" },
            { text: "Listen to 3+ Health Assessment calls" },
            { text: "Enroll your first 5 clients (earn CAB!)" },
            { text: "Achieve Senior Coach rank" },
          ]}
        />

        <h3 className="text-lg font-bold mt-6 mb-3">Senior Coach Requirements</h3>
        <p className="mb-3">To achieve Senior Coach (your first rank), you need:</p>
        <Checklist
          items={[
            { text: "5 Ordering Entities (clients or coaches)" },
            { text: "1,200+ GQV (Group Qualifying Volume)" },
          ]}
        />
      </LessonCard>
    </div>
  )
}
