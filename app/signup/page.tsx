"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"

export default function SignUpPage() {
  const { signUp } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        console.error("Signup error:", JSON.stringify(error, null, 2))
        if (error.status === 500) {
          setError("An unexpected server error occurred. Please try again later.")
        } else if (error.message) {
          setError(error.message)
        } else {
          setError("An error occurred during signup. Please try again.")
        }
        return
      }

      if (data.user) {
        toast({
          variant: "success",
          title: "Account created successfully",
          description: "Please check your email to confirm your account.",
          className: "rounded-full",
        })
        router.push("/login")
      } else {
        setError("No user data returned. Please try again.")
      }
    } catch (error: any) {
      console.error("Unexpected error during signup:", error)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
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
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MXUxYWhg7U40KMLH6DBMnfI6e02rp9.png"
              alt="DayEscape Logo"
              width={56}
              height={56}
              className="h-14 w-14"
            />
          </div>

          {/* Welcome Text */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-[#0f373d]">Create New Account</h1>
            <p className="text-[#757575] text-base">
              Already have account?{" "}
              <Link href="/login" className="text-[#0f373d] hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9e9e9e]" />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 h-12 border-[#e5e7eb]"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9e9e9e]" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10 h-12 border-[#e5e7eb]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9e9e9e] hover:text-[#130f26]"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9e9e9e]" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                className="border-[#e5e7eb] data-[state=checked]:bg-[#0f373d] data-[state=checked]:border-[#0f373d]"
              />
              <label htmlFor="rememberMe" className="text-sm text-[#130f26] cursor-pointer">
                Remember me
              </label>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <Button
              type="submit"
              className="w-full h-12 bg-[#0f373d] hover:bg-[#0f373d]/90 text-white rounded-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Social Login */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e5e7eb]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-[#757575]">or Sign Up with</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button className="p-3 rounded-full border border-[#e5e7eb] hover:border-[#0f373d] transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12Z" />
                </svg>
              </button>
              <button className="p-3 rounded-full border border-[#e5e7eb] hover:border-[#0f373d] transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M24 12.073c0-.814-.071-1.599-.217-2.355H12.25v4.451h6.608a5.72 5.72 0 0 1-2.449 3.725v3.092h3.972C22.478 18.497 24 15.583 24 12.073Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.25 24c3.318 0 6.109-1.101 8.131-2.988l-3.972-3.092c-1.101.737-2.51 1.171-4.159 1.171-3.197 0-5.907-2.159-6.874-5.063H1.262v3.193C3.259 21.294 7.424 24 12.25 24Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.376 13.028A7.13 7.13 0 0 1 5.01 11c0-.703.132-1.388.366-2.028V5.779H1.262A11.943 11.943 0 0 0 0 11c0 1.936.464 3.769 1.262 5.221l4.114-3.193Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.25 4.909c1.804 0 3.423.62 4.698 1.837l3.523-3.523C18.331 1.219 15.541 0 12.25 0 7.424 0 3.259 2.706 1.262 6.779l4.114 3.193c.967-2.904 3.677-5.063 6.874-5.063Z"
                    fill="#EA4335"
                  />
                </svg>
              </button>
              <button className="p-3 rounded-full border border-[#e5e7eb] hover:border-[#0f373d] transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#000000">
                  <path d="M17.05 20.28c-.98.954-2.035 1.81-3.231 1.81-1.216 0-1.557-.782-3.222-.782-1.685 0-2.187.807-3.222.807-1.216 0-2.187-.831-3.222-1.81-2.177-2.26-3.953-6.197-3.953-9.743 0-6.197 4.241-9.09 7.649-9.09 1.947 0 3.519 1.318 4.748 1.318 1.167 0 2.972-1.392 5.017-1.392.831 0 3.814.318 5.647 2.751-4.935 3.18-4.143 9.353.789 11.662-.831 2.554-2.015 5.092-4 7.47Zm-3.084-19.52C13.165-.19 11.827.083 11.034.083c-.318-1.066.318-3.519 1.947-4.51 1.81-1.14 3.962-.831 4.51-.073.074 1.066-.717 3.18-3.525 5.263Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

