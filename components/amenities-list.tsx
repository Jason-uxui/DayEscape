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

import { Amenity } from "@/types/amenities";
import * as TablerIcons from "@tabler/icons-react";

type AmenitiesListProps = {
  amenities: Amenity[];
};



import React, { useState } from "react";

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleAmenities = showAll ? amenities.filter(Boolean) : amenities.filter(Boolean).slice(0, 10);
  const hasMore = amenities.filter(Boolean).length > 10;

  return (
    <section className="mt-16 rounded-lg border bg-white p-8">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-[#333333]">Amenities</h2>
        <p className="text-[#4f4f4f]">About the property's amenities and services</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {visibleAmenities.map((amenity, index) => {
          // Render Tabler icon directly from amenity.icon
          const Icon = (amenity.icon && (TablerIcons as any)[amenity.icon]) ? (TablerIcons as any)[amenity.icon] : TablerIcons.IconQuestionMark;
          return (
            <div key={amenity.id} className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f373d]/10">
                <Icon className="h-6 w-6 text-[#0f373d]" />
              </div>
              <span className="mt-3 text-sm text-[#4f4f4f]">{amenity.name}</span>
            </div>
          );
        })}
      </div>

      {hasMore && !showAll && (
        <Button
          variant="link"
          className="mt-8 h-auto p-0 text-sm font-medium text-[#0f373d] hover:text-[#0f373d]/80"
          onClick={() => setShowAll(true)}
        >
          View more amenities
        </Button>
      )}
      {hasMore && showAll && (
        <Button
          variant="link"
          className="mt-4 h-auto p-0 text-sm font-medium text-[#0f373d] hover:text-[#0f373d]/80"
          onClick={() => setShowAll(false)}
        >
          Collapse amenities
        </Button>
      )}
    </section>
  );
}

