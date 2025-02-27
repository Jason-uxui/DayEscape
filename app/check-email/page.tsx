"use client"

import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { useRouter } from "next/navigation"

export default function CheckEmailPage() {
  const router = useRouter()

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
            onClick={() => router.push("/forgot-password")}
            className="text-[#0f373d] hover:text-[#0f373d]/80 inline-flex items-center"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-[#0f373d]">Check your email</h1>
            <p className="text-[#130f26] text-base">Please check your email for a link to reset your password</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

