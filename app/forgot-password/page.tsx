"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { resetPassword } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await resetPassword(email)

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <Card className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg">
        {sent ? (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-heading text-optavia-dark">Check Your Email</CardTitle>
              <CardDescription className="text-optavia-gray">
                If an account exists for <span className="font-medium text-optavia-dark">{email}</span>, you&apos;ll receive a password reset link shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-center text-optavia-gray">
                Didn&apos;t receive it? Check your spam folder or try again.
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSent(false)
                    setEmail("")
                  }}
                  className="w-full"
                >
                  Try Again
                </Button>
                <Link href="/login" className="w-full">
                  <Button variant="ghost" className="w-full text-[hsl(var(--optavia-green))]">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-optavia-dark">Reset Password</CardTitle>
              <CardDescription className="text-optavia-gray">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-optavia-dark">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      className="bg-white border-gray-300 text-optavia-dark pl-10"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
                  disabled={loading || !email}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
                <Link href="/login" className="block">
                  <Button variant="ghost" type="button" className="w-full text-[hsl(var(--optavia-green))]">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}
