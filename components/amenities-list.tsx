import {
  Wifi,
  Building2,
  PocketIcon as Pool,
  Users,
  SpadeIcon as Spa,
  Building,
  GlassWaterIcon as Water,
  UserSquare2,
  ChefHat,
  Waves,
  Bath,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const amenities = [
  { icon: Wifi, name: "High-Speed Wifi" },
  { icon: Building2, name: "Quiet Work Lounge" },
  { icon: UserSquare2, name: "Private Meeting Rooms" },
  { icon: Building, name: "Poolside Workspace" },
  { icon: Building2, name: "Business Center Access" },
  { icon: Pool, name: "Outdoor Pool" },
  { icon: Water, name: "Kids Pool" },
  { icon: Waves, name: "Waterpark" },
  { icon: Users, name: "Kid's Club Activities" },
  { icon: ChefHat, name: "Family Dining Areas" },
  { icon: Spa, name: "Full-service Spa" },
  { icon: Bath, name: "Sauna & Steam Room" },
]

export default function AmenitiesList() {
  return (
    <section className="mt-16 rounded-lg border bg-white p-8">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-[#333333]">Amenities</h2>
        <p className="text-[#4f4f4f]">About the property's amenities and services</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f373d]/10">
              <amenity.icon className="h-6 w-6 text-[#0f373d]" />
            </div>
            <span className="mt-3 text-sm text-[#4f4f4f]">{amenity.name}</span>
          </div>
        ))}
      </div>

      <Button variant="link" className="mt-8 h-auto p-0 text-sm font-medium text-[#0f373d] hover:text-[#0f373d]/80">
        View more 20 amenities
      </Button>
    </section>
  )
}

