import Link from "next/link"
import Image from "next/image"

const popularLocations = [
  "Brisbane",
  "Gold Coast",
  "Byron Bay",
  "Sydney",
  "Melbourne",
  "Cairns",
  "Hobart",
  "Adelaide",
  "Perth",
  "Christchurch",
  "Bali",
  "Philippines",
]

const partnerLinks = ["List your hotel", "Creators", "Refferals", "Press"]

const companyLinks = ["Contact us", "About us", "How it works", "Terms and Conditions", "Privacy policy"]

export function SiteFooter() {
  return (
    <footer className="border-t bg-[#fdfaf5]">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link href="/" className="text-[#0c363e]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-bKGMGzLORzYLaKr6UcGZqfRhgoIgNL.png"
                alt="DayEscape"
                width={130}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <div className="mt-6 flex gap-4">
              <Link href="#" className="text-[#4b5563] hover:text-[#0c363e]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-fYKfonpOl70I8XgfmgcMmPU3DGLcbt.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </Link>
              <Link href="#" className="text-[#4b5563] hover:text-[#0c363e]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-lqhMtCCTtgzl9VNFA51F0RbBxuM49O.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </Link>
              <Link href="#" className="text-[#4b5563] hover:text-[#0c363e]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-f45kvsh52SLJsA179IeDKe6Fjzqxm0.png"
                  alt="Play"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#0c363e]">Popular Locations</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {popularLocations.map((location) => (
                <li key={location}>
                  <Link href="#" className="text-sm text-[#4b5563] hover:text-[#0c363e]">
                    {location}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#0c363e]">Partners</h3>
            <ul className="mt-4 space-y-2">
              {partnerLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-[#4b5563] hover:text-[#0c363e]">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#0c363e]">Company</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-[#4b5563] hover:text-[#0c363e]">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

