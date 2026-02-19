"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { sendWelcomeEmail } from "@/lib/email"
import { Eye, EyeOff, Check } from "lucide-react"

interface SignupFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
  inviteKey?: string | null
}

export function SignupForm({ onSuccess, onSwitchToLogin, inviteKey }: SignupFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [coachName, setCoachName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [validatingInvite, setValidatingInvite] = useState(!!inviteKey)
  const [inviteValid, setInviteValid] = useState<boolean | null>(null)
  const [inviteEmail, setInviteEmail] = useState<string | null>(null)
  const { signUp } = useAuth()
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    if (!inviteKey) {
      setValidatingInvite(false)
      return
    }

    const validateInvite = async () => {
      try {
        const { data, error } = await supabase
          .from("invites")
          .select("*")
          .eq("invite_key", inviteKey)
          .eq("is_active", true)
          .single()

        if (error || !data) {
          setInviteValid(false)
          toast({
            title: "Invalid Invite",
            description: "This invite link is invalid or has expired",
            variant: "destructive",
          })
          return
        }

        if (data.expires_at && new Date(data.expires_at) < new Date()) {
          setInviteValid(false)
          toast({
            title: "Invite Expired",
            description: "This invite link has expired",
            variant: "destructive",
          })
          return
        }

        if (data.used_by) {
          setInviteValid(false)
          toast({
            title: "Invite Already Used",
            description: "This invite link has already been used",
            variant: "destructive",
          })
          return
        }

        setInviteValid(true)
        if (data.invited_email) {
          setInviteEmail(data.invited_email)
          setEmail(data.invited_email)
        }
        if (data.invited_full_name) {
          setFullName(data.invited_full_name)
        }
      } catch {
        setInviteValid(false)
        toast({
          title: "Error",
          description: "Failed to validate invite",
          variant: "destructive",
        })
      } finally {
        setValidatingInvite(false)
      }
    }

    validateInvite()
  }, [inviteKey, supabase, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (inviteKey && inviteValid === false) {
      toast({
        title: "Invalid Invite",
        description: "The invite link is no longer valid. You can still sign up without it.",
        variant: "destructive",
      })
      return
    }

    if (inviteKey && inviteEmail && inviteEmail !== email) {
      toast({
        title: "Email Mismatch",
        description: `This invite is for ${inviteEmail}. Please use that email or sign up without the invite.`,
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    const { data: signUpData, error } = await signUp(email, password, fullName, coachName || undefined)

    if (error) {
      if (error.message?.includes("already registered") || error.message?.includes("already exists")) {
        toast({
          title: "Account Exists",
          description: "An account with this email already exists. Please sign in instead.",
          variant: "destructive",
        })
        setLoading(false)
        setTimeout(() => onSwitchToLogin?.(), 2000)
        return
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (signUpData?.user && coachName) {
      await supabase
        .from("profiles")
        .update({ coach_name: coachName })
        .eq("id", signUpData.user.id)
    }

    if (inviteKey && inviteValid && signUpData?.user) {
      await supabase
        .from("invites")
        .update({
          used_by: signUpData.user.id,
          used_at: new Date().toISOString(),
        })
        .eq("invite_key", inviteKey)
    }

    if (signUpData?.user && email && fullName) {
      try {
        await sendWelcomeEmail({
          to: email,
          fullName: fullName,
        })
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError)
      }
    }

    toast({
      title: "Account Created!",
      description: "Please check your email to verify your account, then sign in.",
    })
    onSuccess?.()
    setLoading(false)
  }

  if (validatingInvite) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--optavia-green))] mx-auto mb-4"></div>
            <p className="text-optavia-gray">Validating invite...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (inviteKey && inviteValid === false) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-optavia-dark">Invalid Invite</CardTitle>
          <CardDescription className="text-optavia-gray">
            This invite link is invalid, expired, or has already been used.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-optavia-gray">
              You can still create an account without an invite.
            </p>
            <Button
              onClick={() => {
                setInviteValid(null)
                window.history.replaceState({}, "", "/signup")
              }}
              className="w-full bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
            >
              Sign Up Without Invite
            </Button>
            {onSwitchToLogin && (
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-sm text-[hsl(var(--optavia-green))] hover:underline"
              >
                Back to Sign In
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-heading text-optavia-dark">Create Account</CardTitle>
        <CardDescription className="text-optavia-gray">
          {inviteKey && inviteValid
            ? "Complete your account setup"
            : "Sign up for Coach Assistant Hub"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-optavia-dark">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading || !!(inviteKey && inviteValid && fullName)}
              className="bg-white border-gray-300 text-optavia-dark"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coachName" className="text-optavia-dark">Who is your coach?</Label>
            <Input
              id="coachName"
              type="text"
              placeholder="Your coach's name"
              value={coachName}
              onChange={(e) => setCoachName(e.target.value)}
              required
              disabled={loading}
              className="bg-white border-gray-300 text-optavia-dark"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-optavia-dark">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || !!inviteEmail}
              className={`bg-white border-gray-300 text-optavia-dark ${inviteEmail ? "bg-gray-50" : ""}`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-optavia-dark">Password</Label>
            <div className="relative">
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                autoComplete="new-password"
                className="bg-white border-gray-300 text-optavia-dark pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-optavia-gray">Must be at least 6 characters</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-optavia-dark">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                autoComplete="new-password"
                className={`bg-white border-gray-300 text-optavia-dark pr-10 ${
                  confirmPassword && password && confirmPassword === password
                    ? "border-green-500 focus:border-green-500"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {confirmPassword && (
              <div className={`flex items-center gap-1 text-xs ${
                password === confirmPassword ? "text-green-600" : "text-red-500"
              }`}>
                {password === confirmPassword ? (
                  <>
                    <Check className="h-3 w-3" />
                    <span>Passwords match</span>
                  </>
                ) : (
                  <span>Passwords do not match</span>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3 pt-2 border-t">
            <p className="text-sm text-optavia-gray text-center">
              By clicking &ldquo;Create Account&rdquo;, you agree to our{" "}
              <Link href="/terms" target="_blank" className="text-[hsl(var(--optavia-green))] hover:underline">
                Terms
              </Link>
              {", "}
              <Link href="/privacy" target="_blank" className="text-[hsl(var(--optavia-green))] hover:underline">
                Privacy Policy
              </Link>
              {", and "}
              <Link href="/cookies" target="_blank" className="text-[hsl(var(--optavia-green))] hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>

          {onSwitchToLogin && (
            <div className="text-center text-sm text-optavia-gray">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-[hsl(var(--optavia-green))] hover:underline"
              >
                Sign in
              </button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
