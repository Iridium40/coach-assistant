"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Circle, ChevronRight, Play, FileText, ExternalLink, Clock, Star, ArrowLeft, ArrowRight, Camera, Image, Award, AlertTriangle, Smartphone, Instagram, Facebook, MessageCircle, Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useSupabaseData } from "@/hooks/use-supabase-data"

interface Lesson {
  id: string
  title: string
  type: "Video" | "Document"
  icon: typeof Smartphone
  duration: string
  videoType?: "vimeo" | "youtube"
  videoId?: string
  content: {
    intro: string
    sections: Array<{
      title: string
      content?: string
      bullets?: string[]
      photoTips?: Array<{
        label: string
        tips: string[]
      }>
      storyPrompts?: string[]
      checklist?: Array<{
        task: string
        done: boolean
      }>
      timeline?: Array<{
        day: string
        action: string
      }>
      mindset?: Array<{
        icon: string
        text: string
      }>
      apps?: Array<{
        name: string
        platform: string
        note: string
      }>
      donts?: string[]
      tips?: Array<{
        tip: string
        detail: string
      }>
      callout?: {
        type: "info" | "warning" | "tip"
        title: string
        content: string
      }
      important?: {
        type: "warning"
        title: string
        content: string
      }
      note?: string
    }>
    keyTakeaways: string[]
  }
}

const lessons: Lesson[] = [
  {
    id: "1.3.1",
    title: "How to Prepare for Your Social Media Launch",
    type: "Document",
    icon: Smartphone,
    duration: "10 min read",
    content: {
      intro: "Your social media launch is one of the most exciting moments of your coaching journey! This guide will help you prepare everything you need BEFORE you post, so your launch is smooth, professional, and sets you up for success.",
      sections: [
        {
          title: "Why Preparation Matters",
          content: "Your launch post will likely be seen by more people than any other post you make. Many coaches make the mistake of rushing their launch without preparation. Take the time to do this right - you only get one chance to make a first impression!",
          callout: {
            type: "tip",
            title: "The Goal of Your Launch",
            content: "Your launch isn't about making sales - it's about starting CONVERSATIONS. Every comment, like, and message is an opportunity for a 3-way conversation with your mentor.",
          },
        },
        {
          title: "Gather Your Transformation Photos",
          content: "Your transformation photos are your most powerful asset. Here's what you need:",
          photoTips: [
            {
              label: "Before Photo",
              tips: [
                "Choose a photo that shows where you started",
                "Ideally similar pose/angle to your after photo",
                "Don't use filters or editing (except the required disclaimer)",
              ],
            },
            {
              label: "After Photo",
              tips: [
                "Take a new, current photo in similar pose",
                "Good lighting (natural light is best)",
                "Wear fitted clothing that shows your progress",
                "Smile! Show your confidence and energy",
              ],
            },
          ],
          important: {
            type: "warning",
            title: "REQUIRED: Add Disclaimer to ALL Photos",
            content: 'Every transformation photo MUST include this disclaimer: "Average weight loss on the Optimal Weight 5 & 1 Plan® is 12 pounds. Clients are in weight loss, on average, for 12 weeks." Learn how in Lesson 1.3.2.',
          },
        },
        {
          title: "Prepare Your Story",
          content: "Your story is what connects you to potential clients. Write out answers to these questions:",
          storyPrompts: [
            "What was your life like BEFORE starting your health journey?",
            "What finally made you decide to make a change?",
            "How did you feel during your transformation?",
            "What's different about your life NOW?",
            "Why did you decide to become a coach?",
          ],
          callout: {
            type: "tip",
            title: "Be Authentic",
            content: "People connect with REAL stories, not perfect ones. Share your struggles, your doubts, and your victories. Vulnerability creates connection.",
          },
        },
        {
          title: "Audit Your Social Media Profiles",
          content: "Before you launch, make sure your profiles are ready for new connections:",
          checklist: [
            { task: "Profile photo is current and professional (smiling, good lighting)", done: false },
            { task: "Bio mentions health/wellness (but not OPTAVIA directly until launched)", done: false },
            { task: "Profile is set to PUBLIC (or friends can share your posts)", done: false },
            { task: "Remove or hide any content that contradicts your health message", done: false },
            { task: "Review privacy settings - can people message you?", done: false },
          ],
        },
        {
          title: "Build Anticipation (Optional)",
          content: "Some coaches like to build anticipation before their launch. Here are some ideas for the week before:",
          timeline: [
            { day: "7 days before", action: "Post about making a big decision that will change your life" },
            { day: "5 days before", action: "Share a throwback photo with a hint about transformation" },
            { day: "3 days before", action: "Post about being excited for something new" },
            { day: "1 day before", action: "Tease that you have a big announcement coming tomorrow" },
          ],
          note: "This is OPTIONAL - some coaches prefer to launch without buildup, and that works too!",
        },
        {
          title: "Prepare Your Support System",
          content: "Line up your support before you launch:",
          bullets: [
            "Confirm your mentor is available on launch day",
            "Have the 3-way message scripts ready (from Module 2.1)",
            "Know how to add your mentor to a conversation",
            "Set aside time to respond to comments and messages quickly",
          ],
        },
        {
          title: "Launch Day Mindset",
          content: "On launch day, remember:",
          mindset: [
            { icon: "heart", text: "This is about HELPING people, not selling to them" },
            { icon: "users", text: "Your mentor will help with every conversation" },
            { icon: "message", text: "Every comment is an opportunity for a 3-way message" },
            { icon: "star", text: "You've already done the hard part - your transformation!" },
          ],
        },
      ],
      keyTakeaways: [
        "Preparation prevents problems - take time to do this right",
        "Your transformation photos need the required disclaimer",
        "Your launch is about starting conversations, not making sales",
        "Your mentor will be there to help with every response",
      ],
    },
  },
  {
    id: "1.3.2",
    title: "How to Add a Disclaimer to Your Pictures",
    type: "Video",
    icon: Image,
    duration: "5 min video",
    videoType: "youtube",
    videoId: "Z4ABPUk5JHs",
    content: {
      intro: "OPTAVIA requires a specific disclaimer on all transformation photos. This video shows you exactly how to add it using free apps on your phone.",
      sections: [
        {
          title: "Why This Is Required",
          content: "The FTC (Federal Trade Commission) requires health and weight loss companies to display typical results, not just exceptional ones. This protects both you and your potential clients by setting realistic expectations.",
          callout: {
            type: "warning",
            title: "Required Disclaimer Text",
            content: '"Average weight loss on the Optimal Weight 5 & 1 Plan® is 12 pounds. Clients are in weight loss, on average, for 12 weeks."',
          },
        },
        {
          title: "What You'll Learn",
          content: "This video tutorial covers:",
          bullets: [
            "Which free apps to use for adding text to photos",
            "Where to position the disclaimer on your image",
            "Font size and color recommendations for readability",
            "How to save the edited photo to your camera roll",
            "Tips for making it look professional",
          ],
        },
        {
          title: "Recommended Apps",
          apps: [
            { name: "Canva", platform: "iOS & Android", note: "Free, easy to use, many templates" },
            { name: "InShot", platform: "iOS & Android", note: "Great for photos and videos" },
            { name: "Phonto", platform: "iOS & Android", note: "Simple text-on-photo app" },
            { name: "Over", platform: "iOS & Android", note: "Professional design features" },
          ],
        },
        {
          title: "Best Practices",
          content: "When adding your disclaimer:",
          bullets: [
            "Place it where it's readable but doesn't cover your face",
            "Use a contrasting color so it's visible",
            "Make sure the text is large enough to read on mobile",
            "Keep the same placement consistent across all photos",
          ],
        },
        {
          title: "Do NOT Do This",
          donts: [
            "Don't make the disclaimer so small it can't be read",
            "Don't hide it in a corner where it disappears",
            "Don't use a color that blends into the background",
            "Don't forget to add it - this is a compliance requirement",
          ],
        },
      ],
      keyTakeaways: [
        "The disclaimer is REQUIRED on all transformation photos - no exceptions",
        "Use a free app like Canva or InShot to add text",
        "Make sure it's readable - this protects you legally",
        "Be consistent with placement across all your photos",
      ],
    },
  },
  {
    id: "1.3.3",
    title: "How to Add a Wellness Credit",
    type: "Video",
    icon: Award,
    duration: "4 min video",
    videoType: "vimeo",
    videoId: "473831198",
    content: {
      intro: "A Wellness Credit is a special discount you can offer to clients. This video shows you how to set one up in the OPTAVIA system.",
      sections: [
        {
          title: "What Is a Wellness Credit?",
          content: "A Wellness Credit is a one-time discount that you can offer to new clients to help them get started on their journey. It's a tool in your OPTAVIA Connect account that creates a special link for discounted ordering.",
          callout: {
            type: "info",
            title: "When to Use Wellness Credits",
            content: "Wellness Credits are typically used as an incentive for clients who are on the fence, or as a special promotion. Discuss with your mentor about the best strategy for using them.",
          },
        },
        {
          title: "What You'll Learn",
          content: "This video tutorial covers:",
          bullets: [
            "How to access Wellness Credits in OPTAVIA Connect",
            "Step-by-step process to create a new credit",
            "How to share the special link with your client",
            "Tracking which credits have been used",
            "Best practices for when to offer credits",
          ],
        },
        {
          title: "Before You Watch",
          content: "Make sure you have:",
          bullets: [
            "Your OPTAVIA Connect login credentials",
            "A device with internet access",
            "About 5 minutes to follow along",
          ],
        },
        {
          title: "Pro Tips from Experienced Coaches",
          tips: [
            {
              tip: "Don't Lead with Discounts",
              detail: "The value of the program is the coaching and support, not the price. Use credits strategically, not as your main selling point.",
            },
            {
              tip: "Track Your Credits",
              detail: "Keep a simple log of who you've given credits to and whether they were used. This helps you understand what's working.",
            },
            {
              tip: "Ask Your Mentor",
              detail: "Before offering a credit, check with your mentor. They can help you decide if it's the right move for each situation.",
            },
          ],
        },
      ],
      keyTakeaways: [
        "Wellness Credits are a tool to help clients get started",
        "Use them strategically, not as your primary approach",
        "Always discuss with your mentor before offering credits",
        "Track which credits you've given and their results",
      ],
    },
  },
]

export function SocialMediaPreparationContent() {
  const { toast } = useToast()
  const { user } = useAuth()
  const { completedResources, toggleCompletedResource, loading } = useSupabaseData(user)
  const [expandedLesson, setExpandedLesson] = useState(lessons[0].id)

  // Map lesson IDs to resource IDs for database tracking
  const getResourceId = (lessonId: string) => `social-media-prep-${lessonId}`

  // Load completed lessons from database
  const completedLessons = new Set(
    lessons
      .map((lesson) => lesson.id)
      .filter((lessonId) => completedResources.includes(getResourceId(lessonId)))
  )

  // Load expanded lesson from localStorage (UI preference only)
  useEffect(() => {
    const saved = localStorage.getItem("socialMediaPrepExpanded")
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

  // Save expanded lesson to localStorage (UI preference only)
  useEffect(() => {
    localStorage.setItem("socialMediaPrepExpanded", JSON.stringify(expandedLesson))
  }, [expandedLesson])

  const toggleComplete = async (lessonId: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to track your progress.",
        variant: "destructive",
      })
      return
    }

    const resourceId = getResourceId(lessonId)
    await toggleCompletedResource(resourceId)

    const isNowCompleted = !completedLessons.has(lessonId)
    toast({
      title: isNowCompleted ? "Lesson completed!" : "Lesson unmarked",
      description: isNowCompleted ? "Great progress! Your coach can see this." : "You can complete it later.",
    })
  }

  const completedCount = completedLessons.size
  const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0

  const currentLessonIndex = lessons.findIndex((l) => l.id === expandedLesson)
  const currentLesson = lessons[currentLessonIndex]
  const prevLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null
  const nextLesson = currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null

  const renderCallout = (callout: { type: "info" | "warning" | "tip"; title: string; content: string }) => {
    const colors = {
      info: { bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-900", iconColor: "text-blue-600" },
      warning: { bg: "bg-amber-50", border: "border-amber-500", text: "text-amber-900", iconColor: "text-amber-600" },
      tip: { bg: "bg-green-50", border: "border-green-500", text: "text-green-900", iconColor: "text-green-600" },
    }
    const style = colors[callout.type] || colors.info

    return (
      <div className={`${style.bg} ${style.border} border-l-4 p-4 rounded-lg mt-4`}>
        <div className={`flex items-center gap-2 font-semibold ${style.text} mb-2`}>
          {callout.type === "warning" ? (
            <AlertTriangle className={`h-5 w-5 ${style.iconColor}`} />
          ) : (
            <Star className={`h-5 w-5 ${style.iconColor}`} />
          )}
          {callout.title}
        </div>
        <p className={`${style.text} text-sm`}>{callout.content}</p>
      </div>
    )
  }

  const renderVideoEmbed = (lesson: Lesson) => {
    if (lesson.videoType === "vimeo" && lesson.videoId) {
      return (
        <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg mb-8 shadow-lg">
          <iframe
            src={`https://player.vimeo.com/video/${lesson.videoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            title={lesson.title}
          />
        </div>
      )
    } else if (lesson.videoType === "youtube" && lesson.videoId) {
      return (
        <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg mb-8 shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${lesson.videoId}`}
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={lesson.title}
          />
        </div>
      )
    }
    return null
  }

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, typeof Heart> = {
      heart: Heart,
      users: Users,
      message: MessageCircle,
      star: Star,
    }
    return icons[iconName] || Star
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm opacity-90 mb-2 uppercase tracking-wide">
            <span>Training Center</span>
            <ChevronRight className="h-4 w-4" />
            <span>Phase 1: Pre-Launch</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold">Module 1.3</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Social Media Preparation</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Prepare everything you need for a successful, compliant social media launch announcement.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
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
                <CardTitle className="text-xs font-semibold text-optavia-gray uppercase tracking-wide">
                  Lessons in this Module
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {lessons.map((lesson, index) => {
                  const Icon = lesson.icon
                  const isActive = expandedLesson === lesson.id
                  const isComplete = completedLessons.has(lesson.id)

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setExpandedLesson(lesson.id)}
                      className={`w-full p-4 flex items-start gap-3 border-b border-gray-100 last:border-b-0 transition-colors text-left ${
                        isActive ? "bg-green-50 border-l-4 border-l-[hsl(var(--optavia-green))]" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="mt-1">
                        {isComplete ? (
                          <CheckCircle className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-[hsl(var(--optavia-green))] mb-1">
                          {lesson.id}
                        </div>
                        <div className={`text-sm font-semibold mb-2 ${isActive ? "text-[hsl(var(--optavia-green))]" : "text-optavia-dark"}`}>
                          {lesson.title}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-optavia-gray">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              lesson.type === "Video" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-gray-50"
                            }`}
                          >
                            {lesson.type === "Video" && <Play className="h-3 w-3 mr-1" />}
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

            {/* Compliance Reminder Card */}
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardHeader>
                <div className="flex items-center gap-2 font-semibold text-amber-900 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Compliance Reminder
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-900 leading-relaxed">
                  All transformation photos must include the required disclaimer before posting on social media.
                </p>
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
                    <div className="flex items-center gap-2 text-xs font-semibold text-[hsl(var(--optavia-green))] uppercase tracking-wide mb-2">
                      <span>Lesson {currentLesson.id}</span>
                      {currentLesson.type === "Video" && (
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                          <Play className="h-3 w-3 mr-1" />
                          VIDEO
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl font-bold text-optavia-dark">{currentLesson.title}</CardTitle>
                  </div>
                  <Button
                    onClick={() => toggleComplete(currentLesson.id)}
                    variant={completedLessons.has(currentLesson.id) ? "default" : "outline"}
                    className={completedLessons.has(currentLesson.id) ? "bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]" : ""}
                  >
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

              <CardContent className="p-8">
                {/* Video Embed */}
                {currentLesson.videoType && renderVideoEmbed(currentLesson)}

                {/* Intro */}
                <div className="bg-green-50 border-l-4 border-[hsl(var(--optavia-green))] p-5 rounded-lg mb-8">
                  <p className="text-base leading-relaxed text-optavia-dark">{currentLesson.content.intro}</p>
                </div>

                {/* Sections */}
                {currentLesson.content.sections.map((section, idx) => (
                  <div key={idx} className="mb-8">
                    <h3 className="text-lg font-bold text-optavia-dark mb-4 flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-white flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </span>
                      {section.title}
                    </h3>

                    {section.content && (
                      <p className="text-base leading-relaxed text-optavia-gray ml-10 mb-4">{section.content}</p>
                    )}

                    {section.bullets && (
                      <ul className="ml-10 space-y-2 mb-4">
                        {section.bullets.map((bullet, i) => (
                          <li key={i} className="text-base text-optavia-gray flex items-start gap-2">
                            <span className="text-[hsl(var(--optavia-green))] mt-1">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.callout && renderCallout(section.callout)}

                    {section.important && renderCallout(section.important)}

                    {/* Photo Tips */}
                    {section.photoTips && (
                      <div className="ml-10 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.photoTips.map((photo, i) => (
                          <div
                            key={i}
                            className={`p-5 rounded-lg ${
                              i === 0 ? "bg-gray-50 border border-gray-200" : "bg-green-50 border border-green-200"
                            }`}
                          >
                            <div
                              className={`flex items-center gap-2 font-semibold mb-3 ${
                                i === 0 ? "text-gray-700" : "text-[hsl(var(--optavia-green))]"
                              }`}
                            >
                              <Camera className="h-5 w-5" />
                              {photo.label}
                            </div>
                            <ul className="space-y-2">
                              {photo.tips.map((tip, j) => (
                                <li key={j} className="text-sm text-optavia-gray flex items-start gap-2">
                                  <span className="text-[hsl(var(--optavia-green))] mt-1">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Story Prompts */}
                    {section.storyPrompts && (
                      <div className="ml-10 mt-4 space-y-2">
                        {section.storyPrompts.map((prompt, i) => (
                          <div
                            key={i}
                            className={`flex gap-3 p-4 rounded-lg ${
                              i % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            <div className="w-6 h-6 rounded-full bg-green-100 text-[hsl(var(--optavia-green))] flex items-center justify-center font-bold text-xs flex-shrink-0">
                              {i + 1}
                            </div>
                            <span className="text-sm text-optavia-gray">{prompt}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Checklist */}
                    {section.checklist && (
                      <div className="ml-10 mt-4 space-y-2">
                        {section.checklist.map((item, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-3 p-3 rounded-lg ${
                              i % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            <div className="w-5 h-5 border-2 border-[hsl(var(--optavia-green))] rounded flex-shrink-0" />
                            <span className="text-sm text-optavia-gray">{item.task}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Timeline */}
                    {section.timeline && (
                      <div className="ml-10 mt-4 space-y-3">
                        {section.timeline.map((item, i) => (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="min-w-[100px] px-3 py-1.5 bg-green-100 rounded text-xs font-semibold text-[hsl(var(--optavia-green))] text-center">
                              {item.day}
                            </div>
                            <div className="flex-1 px-4 py-2 bg-gray-50 rounded text-sm text-optavia-gray">
                              {item.action}
                            </div>
                          </div>
                        ))}
                        {section.note && (
                          <p className="text-xs text-optavia-gray italic mt-3">{section.note}</p>
                        )}
                      </div>
                    )}

                    {/* Mindset */}
                    {section.mindset && (
                      <div className="ml-10 mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.mindset.map((item, i) => {
                          const IconComp = getIconComponent(item.icon)
                          return (
                            <div
                              key={i}
                              className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center gap-3"
                            >
                              <div className="w-9 h-9 rounded-full bg-[hsl(var(--optavia-green))] flex items-center justify-center flex-shrink-0">
                                <IconComp className="h-5 w-5 text-white" />
                              </div>
                              <span className="text-sm text-optavia-dark flex-1">{item.text}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Apps */}
                    {section.apps && (
                      <div className="ml-10 mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.apps.map((app, i) => (
                          <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="font-semibold text-optavia-dark mb-1">{app.name}</div>
                            <div className="text-xs text-[hsl(var(--optavia-green))] mb-1">{app.platform}</div>
                            <div className="text-xs text-optavia-gray">{app.note}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Don'ts */}
                    {section.donts && (
                      <div className="ml-10 mt-4 space-y-2">
                        {section.donts.map((dont, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200"
                          >
                            <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                              ✕
                            </div>
                            <span className="text-sm text-red-900">{dont}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tips */}
                    {section.tips && (
                      <div className="ml-10 mt-4 space-y-3">
                        {section.tips.map((item, i) => (
                          <div
                            key={i}
                            className="p-5 bg-gray-50 rounded-lg border-l-4 border-[hsl(var(--optavia-green))]"
                          >
                            <div className="font-semibold text-[hsl(var(--optavia-green))] mb-2">
                              {item.tip}
                            </div>
                            <div className="text-sm text-optavia-gray leading-relaxed">{item.detail}</div>
                          </div>
                        ))}
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
                  <Button variant="outline" onClick={() => (window.location.href = "/training/business-setup")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Module 1.2
                  </Button>
                )}

                {nextLesson ? (
                  <Button
                    onClick={() => setExpandedLesson(nextLesson.id)}
                    className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
                  >
                    Next: {nextLesson.title.split(" ").slice(0, 4).join(" ")}...
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
                    onClick={() => window.history.back()}
                  >
                    Continue to Module 1.4
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
