"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Copy, Check, ExternalLink, Sparkles, RotateCcw, Lightbulb } from "lucide-react"

// ============================================================================
// CONFIGURATION OPTIONS
// ============================================================================

const MOOD_OPTIONS = [
  { value: "inspiring", label: "✨ Inspiring", description: "Uplifting and motivational" },
  { value: "vulnerable", label: "💜 Vulnerable", description: "Real, raw, and relatable" },
  { value: "educational", label: "📚 Educational", description: "Teaching something valuable" },
  { value: "fun", label: "🎉 Fun & Playful", description: "Light-hearted and engaging" },
  { value: "celebratory", label: "🎊 Celebratory", description: "Wins and milestones" },
  { value: "reflective", label: "🪞 Reflective", description: "Thoughtful and introspective" },
  { value: "urgent", label: "🔥 Urgent/Exciting", description: "Time-sensitive energy" },
]

const TOPIC_OPTIONS = [
  { value: "transformation", label: "🦋 My Transformation", description: "Your personal journey" },
  { value: "client_win", label: "🏆 Client Success", description: "Celebrating a client" },
  { value: "habits", label: "📋 Healthy Habits", description: "Daily routines that work" },
  { value: "water", label: "💧 Water/Hydration", description: "Importance of hydration" },
  { value: "cravings", label: "🍫 Handling Cravings", description: "Tips for cravings" },
  { value: "exercise", label: "🏃 Movement/Exercise", description: "Fitness and activity" },
  { value: "sleep", label: "😴 Sleep & Rest", description: "Rest and recovery" },
  { value: "mindset", label: "🧠 Mindset", description: "Mental game and beliefs" },
  { value: "family", label: "👨‍👩‍👧 Family & Balance", description: "Family life and health" },
  { value: "meal_prep", label: "🥗 Meal Prep/Recipes", description: "Food planning tips" },
  { value: "fuelings", label: "📦 Fuelings", description: "OPTAVIA products" },
  { value: "why", label: "❤️ My Why", description: "Your deeper motivation" },
  { value: "before_after", label: "📸 Before/After", description: "Transformation photos" },
  { value: "day_in_life", label: "🌅 Day in the Life", description: "Daily routine content" },
  { value: "myth_busting", label: "🚫 Myth Busting", description: "Correcting misconceptions" },
  { value: "motivation_monday", label: "💪 Motivation Monday", description: "Weekly motivation" },
  { value: "testimonial", label: "💬 Testimonial", description: "Sharing feedback received" },
  { value: "struggle", label: "🌧️ Overcoming Struggles", description: "Real challenges faced" },
  { value: "tip", label: "💡 Quick Tip", description: "Single actionable tip" },
  { value: "question", label: "❓ Engagement Question", description: "Ask your audience" },
]

const PLATFORM_OPTIONS = [
  { value: "instagram", label: "📷 Instagram", description: "Visual, hashtags, reels-friendly" },
  { value: "facebook", label: "📘 Facebook", description: "Longer form, community-focused" },
  { value: "both", label: "📱 Both Platforms", description: "Adaptable for either" },
]

const POST_TYPE_OPTIONS = [
  { value: "feed", label: "📝 Feed Post", description: "Standard photo + caption" },
  { value: "story", label: "📱 Story Idea", description: "Quick story content" },
  { value: "reel", label: "🎬 Reel/Video Idea", description: "Short video concept" },
  { value: "carousel", label: "🎠 Carousel", description: "Multiple slides/images" },
]

const CTA_OPTIONS = [
  { value: "none", label: "No CTA", description: "Just share, no ask" },
  { value: "engage", label: "💬 Engagement", description: "Ask for comments/shares" },
  { value: "dm", label: "📩 DM Me", description: "Invite to message you" },
  { value: "link", label: "🔗 Link in Bio", description: "Direct to your link" },
  { value: "soft_offer", label: "🌱 Soft Offer", description: "Gentle invitation to learn more" },
]

const LENGTH_OPTIONS = [
  { value: "short", label: "Short", description: "1-2 sentences" },
  { value: "medium", label: "Medium", description: "3-5 sentences" },
  { value: "long", label: "Long", description: "Full story format" },
]

const PERSONAL_TOUCH_OPTIONS = [
  { value: "kids", label: "👶 Mention Kids" },
  { value: "spouse", label: "💑 Mention Spouse/Partner" },
  { value: "pet", label: "🐕 Mention Pet" },
  { value: "work", label: "💼 Mention Day Job" },
  { value: "busy_mom", label: "🏃‍♀️ Busy Mom Life" },
  { value: "working_parent", label: "👔 Working Parent" },
  { value: "empty_nester", label: "🏠 Empty Nester" },
  { value: "grandparent", label: "👴 Grandparent" },
  { value: "fitness", label: "🏋️ Fitness Journey" },
  { value: "foodie", label: "🍳 Love of Cooking" },
  { value: "travel", label: "✈️ Travel/Adventure" },
  { value: "faith", label: "🙏 Faith-Based" },
]

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function SocialMediaPromptGenerator() {
  const { toast } = useToast()
  
  // Form state
  const [mood, setMood] = useState("")
  const [topic, setTopic] = useState("")
  const [platform, setPlatform] = useState("both")
  const [postType, setPostType] = useState("feed")
  const [cta, setCta] = useState("engage")
  const [length, setLength] = useState("medium")
  const [personalTouches, setPersonalTouches] = useState<string[]>([])
  const [customContext, setCustomContext] = useState("")
  const [specificDetail, setSpecificDetail] = useState("")
  
  // Output state
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [copied, setCopied] = useState(false)

  // Toggle personal touch
  const togglePersonalTouch = (value: string) => {
    setPersonalTouches(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  // Generate the ChatGPT prompt
  const generatePrompt = () => {
    if (!mood || !topic) {
      toast({
        title: "Missing required fields",
        description: "Please select a mood and topic",
        variant: "destructive",
      })
      return
    }

    const moodLabel = MOOD_OPTIONS.find(m => m.value === mood)?.label || mood
    const topicLabel = TOPIC_OPTIONS.find(t => t.value === topic)?.label || topic
    const platformLabel = PLATFORM_OPTIONS.find(p => p.value === platform)?.label || platform
    const postTypeLabel = POST_TYPE_OPTIONS.find(p => p.value === postType)?.label || postType
    const ctaLabel = CTA_OPTIONS.find(c => c.value === cta)?.label || cta
    const lengthLabel = LENGTH_OPTIONS.find(l => l.value === length)?.label || length
    
    const personalTouchLabels = personalTouches.map(pt => 
      PERSONAL_TOUCH_OPTIONS.find(p => p.value === pt)?.label || pt
    )

    // Build the prompt
    let prompt = `You are an expert social media copywriter for health and wellness coaches. Create 3 different versions of a social media post with the following specifications:

**TONE/MOOD:** ${moodLabel}
**TOPIC:** ${topicLabel}
**PLATFORM:** ${platformLabel}
**POST TYPE:** ${postTypeLabel}
**LENGTH:** ${lengthLabel}
**CALL TO ACTION:** ${ctaLabel}`

    if (personalTouchLabels.length > 0) {
      prompt += `\n**PERSONAL ELEMENTS TO WEAVE IN:** ${personalTouchLabels.join(", ")}`
    }

    if (specificDetail.trim()) {
      prompt += `\n**SPECIFIC DETAIL TO INCLUDE:** ${specificDetail.trim()}`
    }

    if (customContext.trim()) {
      prompt += `\n**ADDITIONAL CONTEXT:** ${customContext.trim()}`
    }

    prompt += `

---

**IMPORTANT GUIDELINES:**
- Write as a real person sharing their genuine experience, NOT as a salesperson
- Use conversational, relatable language (not corporate or overly polished)
- Include emotional hooks that make people stop scrolling
- Make it feel authentic and personal, not generic
- Do NOT mention specific product names or make income claims
- Focus on lifestyle transformation, not just weight loss
- Include relevant emojis naturally (not excessively)
${platform === "instagram" || platform === "both" ? "- Suggest 5-10 relevant hashtags for Instagram" : ""}
${postType === "carousel" ? "- Include slide-by-slide breakdown for carousel" : ""}
${postType === "reel" ? "- Include a hook for the first 3 seconds and a simple video concept" : ""}

---

**Please provide 3 DISTINCT versions:**

**VERSION 1 - HOOK STYLE:** Start with a pattern-interrupt or controversial/curiosity-driven opening

**VERSION 2 - STORY STYLE:** Start with a mini-story or "moment in time" narrative

**VERSION 3 - VALUE-FIRST STYLE:** Lead with the tip/insight/value before personal context

For each version, include:
1. The complete post caption
2. A suggested image/visual description
3. Best time to post suggestion
${platform === "instagram" || platform === "both" ? "4. Hashtag suggestions" : ""}`

    setGeneratedPrompt(prompt)
    setCopied(false)
    
    toast({
      title: "Prompt generated!",
      description: "Copy it and paste into ChatGPT",
    })
  }

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      })
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement("textarea")
      textarea.value = generatedPrompt
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  // Reset form
  const resetForm = () => {
    setMood("")
    setTopic("")
    setPlatform("both")
    setPostType("feed")
    setCta("engage")
    setLength("medium")
    setPersonalTouches([])
    setCustomContext("")
    setSpecificDetail("")
    setGeneratedPrompt("")
    setCopied(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT: Form Inputs */}
      <div className="space-y-4">
        {/* Mood Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              1. What's the mood/tone? <span className="text-red-500">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {MOOD_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => setMood(option.value)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    mood === option.value
                      ? "border-[hsl(var(--optavia-green))] bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="font-medium text-sm">{option.label}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Topic Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              2. What's the topic? <span className="text-red-500">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger>
                <SelectValue placeholder="Select a topic..." />
              </SelectTrigger>
              <SelectContent>
                {TOPIC_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} - {option.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Platform & Post Type */}
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">3. Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORM_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-semibold mb-2 block">4. Post Type</Label>
                <Select value={postType} onValueChange={setPostType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {POST_TYPE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA & Length */}
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">5. Call to Action</Label>
                <Select value={cta} onValueChange={setCta}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CTA_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-semibold mb-2 block">6. Length</Label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LENGTH_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Touches */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              7. Personal touches to include (optional)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {PERSONAL_TOUCH_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => togglePersonalTouch(option.value)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    personalTouches.includes(option.value)
                      ? "bg-[hsl(var(--optavia-green))] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Details */}
        <Card>
          <CardContent className="pt-4 space-y-4">
            <div>
              <Label className="text-sm font-semibold mb-2 block">
                8. Specific detail to include (optional)
              </Label>
              <Input
                value={specificDetail}
                onChange={(e) => setSpecificDetail(e.target.value)}
                placeholder="e.g., 'I just hit 50 lbs lost' or 'My son said I look happier'"
              />
            </div>
            
            <div>
              <Label className="text-sm font-semibold mb-2 block">
                9. Any other context? (optional)
              </Label>
              <Textarea
                value={customContext}
                onChange={(e) => setCustomContext(e.target.value)}
                placeholder="e.g., 'I'm posting this on a Monday morning' or 'I want to address people who have tried other diets'"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="flex gap-3">
          <Button
            onClick={generatePrompt}
            disabled={!mood || !topic}
            className="flex-1 bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Prompt
          </Button>
          <Button variant="outline" onClick={resetForm}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* RIGHT: Generated Prompt Output */}
      <div className="lg:sticky lg:top-6 h-fit space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                📋 Your ChatGPT Prompt
              </CardTitle>
              {generatedPrompt && (
                <Button
                  onClick={copyToClipboard}
                  size="sm"
                  className={copied 
                    ? "bg-green-100 text-green-700 hover:bg-green-100" 
                    : "bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
                  }
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy Prompt
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generatedPrompt ? (
              <>
                <div className="bg-gray-50 rounded-lg p-4 max-h-[400px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {generatedPrompt}
                  </pre>
                </div>
                
                {/* Instructions */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Next Steps
                  </h3>
                  <ol className="text-sm text-blue-700 space-y-1.5">
                    <li>1. Click <strong>"Copy Prompt"</strong> above</li>
                    <li>2. Open ChatGPT in a new tab</li>
                    <li>3. Paste the prompt and press Enter</li>
                    <li>4. Review the 3 versions and pick your favorite!</li>
                    <li>5. Edit to add your personal voice</li>
                  </ol>
                </div>

                {/* Quick Actions */}
                <div className="mt-4">
                  <a
                    href="https://chat.openai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open ChatGPT
                  </a>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="text-4xl mb-3">✏️</div>
                <p className="text-gray-500">
                  Fill out the form and click "Generate Prompt" to create your ChatGPT prompt
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  You'll get 3 unique post variations to choose from
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              🎯 Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Add specific details for more personalized posts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Mix up moods throughout the week for variety</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Always edit AI output to sound like YOU</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Save your favorites to a swipe file for later</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
