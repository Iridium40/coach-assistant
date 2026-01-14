import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/providers"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "Coach Assistant Hub",
  description: "Support for coaches with resources, training modules, and Lean & Green recipes",
  generator: "v0.app",
  metadataBase: new URL("http://www.coachingamplifier.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Coach Assistant Hub",
    description: "Support for coaches with resources, training modules, and Lean & Green recipes",
    url: "http://www.coachingamplifier.com",
    siteName: "Coach Assistant Hub",
  },
  icons: {
    icon: [
      {
        url: "/branding/favicon.ico",
      },
      {
        url: "/branding/ca_icon.png",
      },
      {
        url: "/branding/ca_icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/branding/ca_icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="impact-site-verification"
          value="e0712f42-87d1-4221-b367-98caf8613037"
        />
      </head>
      <body className={`${montserrat.variable} ${openSans.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
