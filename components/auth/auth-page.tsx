"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"

interface AuthPageProps {
  onSuccess?: () => void
}

export function AuthPage({ onSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      {isLogin ? (
        <LoginForm onSuccess={onSuccess} onSwitchToSignup={() => setIsLogin(false)} />
      ) : (
        <SignupForm onSuccess={onSuccess} onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  )
}

