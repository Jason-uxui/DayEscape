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
import { SupabaseStatus } from "@/components/supabase-status"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5]">
      <SiteHeader />
      <main>
        <HeroSection />
        <BenefitsSection />
        <PerfectDaycationSection />
        <WaitlistSection />
        <IndulgeSection />
        <EscapeTypesSection />
        <ExperiencesSection />
        <PerfectDaySection />
        {/* Component kiểm tra kết nối Supabase - Chỉ hiển thị trong môi trường development */}
        {process.env.NODE_ENV === "development" && (
          <div className="container mx-auto px-4 py-8">
            <SupabaseStatus />
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}

