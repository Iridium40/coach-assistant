"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inviteKey = searchParams.get("invite")

  useEffect(() => {
    // Redirect to set-password if invite key exists, otherwise redirect to login
    if (inviteKey) {
      router.replace(`/set-password?invite=${inviteKey}`)
    } else {
      router.replace("/login")
    }
  }, [inviteKey, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <div className="mb-8 sm:mb-12">
        <img 
          src="/branding/ca_logo.png" 
          alt="Coaching Amplifier" 
          className="h-16 sm:h-20 md:h-24 w-auto mx-auto"
        />
      </div>
      <Card className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-optavia-dark">Sign Up Not Available</CardTitle>
          <CardDescription className="text-optavia-gray">
            New accounts can only be created through an invitation from an existing user.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-optavia-gray">
              If you have an invitation link, please use it to set your password and create your account.
            </p>
            <Link href="/login" className="inline-block text-[hsl(var(--optavia-green))] hover:underline">
              Go to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

