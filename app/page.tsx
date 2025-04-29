import { HeroSection } from "@/components/sections/hero-section"
import { PerfectDaycationSection } from "@/components/sections/perfect-daycation-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { ExperiencesSection } from "@/components/sections/experiences-section"
import { WaitlistSection } from "@/components/sections/waitlist-section"
import { IndulgeSection } from "@/components/sections/indulge-section"
import { EscapeTypesSection } from "@/components/sections/escape-types-section"
import { SiteFooter } from "@/components/sections/site-footer"
import { SiteHeader } from "@/components/site-header"
import { PerfectDaySection } from "@/components/sections/perfect-day-section"
import { Suspense } from "react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5]">
      <SiteHeader />
      <main>
        <Suspense fallback={<div className="relative min-h-[80vh] px-4 pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f373d]"></div>
        </div>}>
          <HeroSection />
        </Suspense>
        <BenefitsSection />
        <PerfectDaycationSection />
        <WaitlistSection />
        <IndulgeSection />
        <EscapeTypesSection />
        <ExperiencesSection />
        <PerfectDaySection />
      </main>
      <SiteFooter />
    </div>
  )
}

