"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createClient, resetClient } from "@/lib/supabase/client"
import { Eye, EyeOff, CheckCircle, XCircle, Loader2, AlertTriangle } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [success, setSuccess] = useState(false)
  const [sessionError, setSessionError] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword
  const passwordLongEnough = password.length >= 6
  const canSubmit = passwordsMatch && passwordLongEnough && !loading

  useEffect(() => {
    let resolved = false

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (resolved) return

      if (event === "PASSWORD_RECOVERY") {
        resolved = true
        setReady(true)
        return
      }

      if (event === "SIGNED_IN" && window.location.hash.includes("type=recovery")) {
        resolved = true
        setReady(true)
        return
      }
    })

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session && !resolved) {
        resolved = true
        setReady(true)
      }
    }
    checkSession()

    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true
        setSessionError(true)
      }
    }, 3000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    await supabase.auth.signOut()
    resetClient()
    setSuccess(true)
    setLoading(false)
  }

  const logoBlock = (
    <div className="mb-8">
      <picture>
        <source srcSet="/branding/calogo_large.svg" type="image/svg+xml" />
        <img src="/branding/calogo_large.png" alt="Coach Assistant Hub" className="h-24 sm:h-32 md:h-40 w-auto mx-auto" />
      </picture>
    </div>
  )

  // Loading state — verifying the reset link
  if (!ready && !sessionError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
        {logoBlock}
        <Card className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--optavia-green))] mb-4" />
            <p className="text-optavia-gray">Verifying reset link...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Invalid or expired link
  if (sessionError && !ready) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
        {logoBlock}
        <Card className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-heading text-optavia-dark">Link Expired</CardTitle>
            <CardDescription className="text-optavia-gray">
              This password reset link is invalid or has expired. Please request a new one.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/forgot-password" className="block">
              <Button className="w-full bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white">
                Request New Link
              </Button>
            </Link>
            <Link href="/login" className="block">
              <Button variant="ghost" className="w-full text-[hsl(var(--optavia-green))]">
                Back to Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
        {logoBlock}
        <Card className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-heading text-optavia-dark">Password Updated</CardTitle>
            <CardDescription className="text-optavia-gray">
              Your password has been successfully changed. Please sign in with your new password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Password form
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      {logoBlock}
      <Card className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-optavia-dark">Set New Password</CardTitle>
          <CardDescription className="text-optavia-gray">
            Enter your new password below. Must be at least 6 characters.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-optavia-dark">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-white border-gray-300 text-optavia-dark pr-10"
                  minLength={6}
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
              {password.length > 0 && !passwordLongEnough && (
                <p className="text-xs text-red-500">Password must be at least 6 characters</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-optavia-dark">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-white border-gray-300 text-optavia-dark pr-16"
                  minLength={6}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {confirmPassword.length > 0 && (
                    passwordsMatch ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
              disabled={!canSubmit}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
