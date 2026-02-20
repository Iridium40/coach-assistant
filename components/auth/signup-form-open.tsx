"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { Eye, EyeOff, Check, ShieldCheck, Mail } from "lucide-react"

interface SignupFormOpenProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export function SignupFormOpen({ onSuccess, onSwitchToLogin }: SignupFormOpenProps) {
  const [fullName, setFullName] = useState("")
  const [coachName, setCoachName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [accessCode, setAccessCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { signUp } = useAuth()
  const { toast } = useToast()
  const supabase = createClient()

  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword
  const passwordLongEnough = password.length >= 6

  const validateAccessCode = async (code: string): Promise<{ valid: boolean; reason?: string }> => {
    const { data, error } = await supabase
      .from("signup_access_codes")
      .select("id, code, is_active, max_uses, usage_count, expires_at")
      .eq("code", code.trim().toUpperCase())
      .eq("is_active", true)
      .maybeSingle()

    if (error) {
      console.error("Access code validation error:", error.message, error.code)
      return { valid: false, reason: "Access code verification is temporarily unavailable. Please try again in a moment." }
    }
    if (!data) return { valid: false, reason: "Access code not found. Please check the code and try again." }
    if (data.expires_at && new Date(data.expires_at) < new Date()) return { valid: false, reason: "This access code has expired. Please contact your coach for a new one." }
    if (data.max_uses != null && (data.usage_count ?? 0) >= data.max_uses) return { valid: false, reason: "This access code has reached its usage limit. Please contact your coach." }

    return { valid: true }
  }

  const incrementCodeUsage = async (code: string) => {
    const { data } = await supabase
      .from("signup_access_codes")
      .select("id, usage_count")
      .eq("code", code.trim().toUpperCase())
      .maybeSingle()

    if (data) {
      await supabase
        .from("signup_access_codes")
        .update({ usage_count: (data.usage_count ?? 0) + 1 })
        .eq("id", data.id)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName.trim()) {
      toast({ title: "Required", description: "Please enter your full name.", variant: "destructive" })
      return
    }

    if (!coachName.trim()) {
      toast({ title: "Required", description: "Please enter your coach's name.", variant: "destructive" })
      return
    }

    if (!passwordLongEnough) {
      toast({ title: "Password Too Short", description: "Password must be at least 6 characters.", variant: "destructive" })
      return
    }

    if (!passwordsMatch) {
      toast({ title: "Passwords Don't Match", description: "Please make sure your passwords match.", variant: "destructive" })
      return
    }

    if (!accessCode.trim()) {
      toast({ title: "Access Code Required", description: "Please enter the access code provided by your coach or organization.", variant: "destructive" })
      return
    }

    setLoading(true)

    const { valid, reason } = await validateAccessCode(accessCode)
    if (!valid) {
      toast({
        title: "Invalid Access Code",
        description: reason || "The access code is invalid, expired, or has reached its usage limit. Please check with your coach.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    const { data: signUpData, error } = await signUp(email, password, fullName.trim(), coachName.trim())

    if (error) {
      console.error("Signup error:", error.message, error)
      if (error.message?.includes("already registered") || error.message?.includes("already exists")) {
        toast({
          title: "Account Already Exists",
          description: "An account with this email already exists. Please sign in instead.",
          variant: "destructive",
        })
        setLoading(false)
        setTimeout(() => onSwitchToLogin?.(), 2000)
        return
      }
      toast({
        title: "Sign Up Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (!signUpData?.user) {
      toast({
        title: "Sign Up Failed",
        description: "Could not create your account. Please try again.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    await incrementCodeUsage(accessCode)

    await supabase
      .from("profiles")
      .update({
        ...(coachName.trim() ? { coach_name: coachName.trim() } : {}),
        signup_access_code: accessCode.trim().toUpperCase(),
      })
      .eq("id", signUpData.user.id)

    setEmailSent(true)
    setLoading(false)
  }

  if (emailSent) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-[hsl(var(--optavia-green))]/10 flex items-center justify-center">
              <Mail className="h-7 w-7 text-[hsl(var(--optavia-green))]" />
            </div>
            <h2 className="text-xl font-heading font-bold text-optavia-dark">Check Your Email</h2>
            <p className="text-optavia-gray text-sm leading-relaxed px-4">
              We&apos;ve sent a confirmation link to <strong className="text-optavia-dark">{email}</strong>.
              Please click the link in the email to verify your account, then sign in.
            </p>
            <div className="pt-2">
              <Button
                onClick={() => onSwitchToLogin?.()}
                className="w-full bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
              >
                Go to Sign In
              </Button>
            </div>
            <p className="text-xs text-optavia-gray">
              Didn&apos;t receive the email? Check your spam folder.
            </p>
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
          Sign up for Coach Assistant Hub
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
              disabled={loading}
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
            <Label htmlFor="signup-password" className="text-optavia-dark">Password</Label>
            <div className="relative">
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                autoComplete="new-password"
                className={`bg-white border-gray-300 text-optavia-dark pr-10 ${
                  passwordsMatch ? "border-green-500 focus:border-green-500" : ""
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
              <div className={`flex items-center gap-1 text-xs ${passwordsMatch ? "text-green-600" : "text-red-500"}`}>
                {passwordsMatch ? (
                  <><Check className="h-3 w-3" /><span>Passwords match</span></>
                ) : (
                  <span>Passwords do not match</span>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessCode" className="text-optavia-dark flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[hsl(var(--optavia-green))]" />
              Access Code
            </Label>
            <Input
              id="accessCode"
              type="text"
              placeholder="Enter your access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              required
              disabled={loading}
              className="bg-white border-gray-300 text-optavia-dark uppercase tracking-wider"
            />
            <p className="text-xs text-optavia-gray">
              Ask your coach or organization for an access code to sign up.
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t">
            <p className="text-xs text-optavia-gray text-center">
              By creating an account, you agree to our{" "}
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
                className="text-[hsl(var(--optavia-green))] hover:underline font-medium"
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
