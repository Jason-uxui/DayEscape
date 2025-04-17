"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

interface SiteNavigationProps {
  isOpen: boolean
  onClose: () => void
}

export function SiteNavigation({ isOpen, onClose }: SiteNavigationProps) {
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleMouseLeave(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.relatedTarget as Node)) {
        onClose()
      }
    }

    const nav = navRef.current
    if (nav) {
      nav.addEventListener("mouseleave", handleMouseLeave)
      return () => nav.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [onClose])

  if (!isOpen) return null

  return (
    <nav
      ref={navRef}
      className="absolute left-0 top-16 z-50 w-full border-b bg-white px-4 py-4 md:px-6 md:py-8 overflow-y-auto max-h-[calc(100vh-4rem)]"
    >
      <div className="container mx-auto">
        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          <div className="md:col-span-3 lg:col-span-1">
            <h2 className="text-xl font-bold leading-tight text-[#0c363e] md:text-3xl">
              Access world-class hotel experiences without checking in.
            </h2>
          </div>

          <div className="space-y-3 md:space-y-4">
            <Link href="/about" className="block text-base md:text-lg text-[#0c363e] hover:text-[#0c363e]/80">
              About DayEscape
            </Link>
            <Link href="/hotels" className="block text-base md:text-lg text-[#0c363e] hover:text-[#0c363e]/80">
              Explore Hotels
            </Link>
            <Link href="/favorites" className="block text-base md:text-lg text-[#0c363e] hover:text-[#0c363e]/80">
              My Favorites
            </Link>
            <Link href="/users/my-bookings" className="block text-base md:text-lg text-[#0c363e] hover:text-[#0c363e]/80">
              Bookings
            </Link>
            <Link href="/partners" className="block text-base md:text-lg text-[#0c363e] hover:text-[#0c363e]/80">
              Become Partner
            </Link>
            <Link href="/contact" className="block text-base md:text-lg text-[#0c363e] hover:text-[#0c363e]/80">
              Contact
            </Link>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-[#0c363e]">Contact</h3>
            <div className="space-y-1 md:space-y-2 text-[#4f4f4f] text-sm md:text-base">
              <p>
                <span className="font-medium">T</span>: +62 39399 44551
              </p>
              <p>
                <span className="font-medium">E</span>: contact@dayescape.com
              </p>
              <p>
                <span className="font-medium">Reception</span>: Whatsapp
              </p>
            </div>
            <div className="flex gap-4 pt-2 md:pt-4">
              <Link href="#" className="text-[#4b5563] hover:text-[#0c363e]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-fYKfonpOl70I8XgfmgcMmPU3DGLcbt.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="h-5 w-5 md:h-6 md:w-6"
                />
              </Link>
              <Link href="#" className="text-[#4b5563] hover:text-[#0c363e]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-lqhMtCCTtgzl9VNFA51F0RbBxuM49O.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="h-5 w-5 md:h-6 md:w-6"
                />
              </Link>
              <Link href="#" className="text-[#4b5563] hover:text-[#0c363e]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-f45kvsh52SLJsA179IeDKe6Fjzqxm0.png"
                  alt="Play"
                  width={24}
                  height={24}
                  className="h-5 w-5 md:h-6 md:w-6"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

