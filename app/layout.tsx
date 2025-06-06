import React from "react"
import { Playfair_Display, Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { CartProvider } from "@/components/providers/cart-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { FlodeskScript } from "@/components/flodesk-script"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "DayEscape",
  description: "Access world-class hotel experiences without checking in.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Head meta, fonts, etc. */}
      </head>
      <body className="font-sans" style={{}} suppressHydrationWarning>
        <FlodeskScript />
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Toaster />
        <SonnerToaster position="top-right" />
      </body>
    </html>
  )
}