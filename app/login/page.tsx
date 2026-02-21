"use client"

import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()

  const handleSuccess = () => {
    // Redirect to home page after successful login
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <div className="mb-8 sm:mb-12">
          <picture>
            <source srcSet="/branding/calogo_large.svg" type="image/svg+xml" />
            <img
              src="/branding/calogo_large.png"
              alt="Coach Assistant Hub"
              className="h-24 sm:h-32 md:h-40 w-auto mx-auto"
            />
          </picture>
        </div>

        <div className="w-full max-w-md space-y-4">
          <LoginForm onSuccess={handleSuccess} />
          <div className="text-center text-sm text-optavia-gray">
            <p>
              Need an account?{" "}
              <Link href="/signup" className="text-[hsl(var(--optavia-green))] hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
