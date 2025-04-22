"use client"

import { useEffect } from "react"
import Image from "next/image"

export function WaitlistSection() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fd) {
      (window as any).fd('form', {
        formId: '68075af7e5e20a3bfb24be5a',
        containerEl: '#fd-form-68075af7e5e20a3bfb24be5a'
      });
    }
  }, []);
  return (
    <section id="join-waitlist" className="relative bg-[#0c363e] min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-[600px] h-[600px] relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TYaHVnVJPNKNNsUxBzd9dyYXLMaErt.png"
            alt="Decorative arch pattern"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="container relative mx-auto px-4 text-center py-24">
        <div id="fd-form-68075af7e5e20a3bfb24be5a"></div>
      </div>
    </section>
  )
}

