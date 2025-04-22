import type React from "react"
import { Playfair_Display, Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { CartProvider } from "@/components/providers/cart-provider"
import { AuthProvider } from "@/contexts/AuthContext"

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
        {/* Flodesk Header code */}
        <script dangerouslySetInnerHTML={{
          __html: `!function(w,d,t,h,s,n){w.FlodeskObject=n;var fn=function(){(w[n].q=w[n].q||[]).push(arguments)};w[n]=w[n]||fn;var e=d.createElement(t);e.async=1;e.src='https://assets.flodesk.com/universal.js';var f=d.getElementsByTagName(t)[0];f.parentNode.insertBefore(e,f);}(window,document,'script',0,0,'fd');`
        }} />
      </head>
      <body className="font-sans" style={{}} suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Toaster />
        <SonnerToaster position="top-right" />
      </body>
    </html>
  )
}