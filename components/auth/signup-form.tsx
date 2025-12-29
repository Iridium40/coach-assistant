"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

interface SignupFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [isNewCoach, setIsNewCoach] = useState(true)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)
  const [acceptedCookies, setAcceptedCookies] = useState(false)
  const [acceptedDataDeletion, setAcceptedDataDeletion] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptedTerms || !acceptedPrivacy || !acceptedCookies || !acceptedDataDeletion) {
      toast({
        title: "Required",
        description: "Please accept all terms and policies to continue.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    const { error } = await signUp(email, password, fullName)

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Account created! Please check your email to verify your account.",
      })
      // Note: We'll update the profile with isNewCoach after email verification
      onSuccess?.()
    }

    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-heading">Create Account</CardTitle>
        <CardDescription>Sign up for Coaching Amplifier</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isNewCoach"
              checked={isNewCoach}
              onCheckedChange={(checked) => setIsNewCoach(checked === true)}
              disabled={loading}
            />
            <Label htmlFor="isNewCoach" className="text-sm font-normal cursor-pointer">
              I'm a new coach
            </Label>
          </div>

          <div className="space-y-3 pt-2 border-t">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                disabled={loading}
                required
              />
              <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-tight">
                I have read and agree to the{" "}
                <Link href="/terms" target="_blank" className="text-[hsl(var(--optavia-green))] hover:underline">
                  Terms and Conditions
                </Link>
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="privacy"
                checked={acceptedPrivacy}
                onCheckedChange={(checked) => setAcceptedPrivacy(checked === true)}
                disabled={loading}
                required
              />
              <Label htmlFor="privacy" className="text-sm font-normal cursor-pointer leading-tight">
                I have read and agree to the{" "}
                <Link href="/privacy" target="_blank" className="text-[hsl(var(--optavia-green))] hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="cookies"
                checked={acceptedCookies}
                onCheckedChange={(checked) => setAcceptedCookies(checked === true)}
                disabled={loading}
                required
              />
              <Label htmlFor="cookies" className="text-sm font-normal cursor-pointer leading-tight">
                I have read and agree to the{" "}
                <Link href="/cookies" target="_blank" className="text-[hsl(var(--optavia-green))] hover:underline">
                  Cookie Usage Policy
                </Link>
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="dataDeletion"
                checked={acceptedDataDeletion}
                onCheckedChange={(checked) => setAcceptedDataDeletion(checked === true)}
                disabled={loading}
                required
              />
              <Label htmlFor="dataDeletion" className="text-sm font-normal cursor-pointer leading-tight">
                I understand that my information will be stored and that I can request deletion of my account and data
                at any time. I acknowledge that data deletion will result in permanent loss of access to the Service and
                I will no longer be able to use the app.
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading || !acceptedTerms || !acceptedPrivacy || !acceptedCookies || !acceptedDataDeletion}>
            {loading ? "Creating account..." : "Sign Up"}
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

