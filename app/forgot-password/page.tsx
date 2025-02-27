"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await resetPassword(email)
      setSuccess(true)
    } catch (error) {
      console.error("Password reset error:", error)
      setError("Error sending reset email. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex items-center justify-center p-4 relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50 z-10" />
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.avif-1vQYbIRW13Iq2qumaGk7HQl3gDdAYP.png"
            alt="Luxury pool background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full max-w-[400px] mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg relative z-20">
          {/* Back Button */}
          <button
            onClick={() => router.push("/login")}
            className="text-[#0f373d] hover:text-[#0f373d]/80 inline-flex items-center"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-[#0f373d]">Forgot Password?</h1>
            <p className="text-[#130f26] text-base">
              Enter your email address below, and if an account exists, we'll send you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9e9e9e]" />
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-12 border-[#e5e7eb]"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mt-2">Password reset email sent. Please check your inbox.</p>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#0f373d] hover:bg-[#0f373d]/90 text-white rounded-full"
            >
              {isSubmitting ? "Sending..." : "Send Link"}
            </Button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

