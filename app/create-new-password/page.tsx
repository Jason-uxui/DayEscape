"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { useRouter } from "next/navigation"

export default function CreateNewPasswordPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Password update requested")
      // Navigate to login page after successful update
      router.push("/login")
    } catch (error) {
      console.error("Error:", error)
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
            onClick={() => router.push("/check-email")}
            className="text-[#0f373d] hover:text-[#0f373d]/80 inline-flex items-center"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-[#0f373d]">Create New Password</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9e9e9e]" />
              <Input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                required
                className="pl-10 pr-10 h-12 border-[#e5e7eb]"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9e9e9e] hover:text-[#130f26]"
              >
                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9e9e9e]" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="pl-10 pr-10 h-12 border-[#e5e7eb]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9e9e9e] hover:text-[#130f26]"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#0f373d] hover:bg-[#0f373d]/90 text-white rounded-full"
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

