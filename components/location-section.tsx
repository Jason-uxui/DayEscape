"use client"

import { useState, useEffect } from "react"
import { MapView } from "./map-view"

interface LocationSectionProps {
  displayAddress: string
  latitude: number | null
  longitude: number | null
  products: Array<{
    type: string
    base_price: number
  }>
}

export default function LocationSection({ displayAddress, latitude, longitude, products }: LocationSectionProps) {
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    if (!latitude || !longitude) {
      setMapError("Location coordinates are not available for this hotel.")
    } else {
      setMapError(null)
    }
  }, [latitude, longitude])

  const dayPassProduct = products?.find(
    (product) => product.type?.toLowerCase().includes("day") && product.type?.toLowerCase().includes("pass"),
  )
  const dayPassPrice = dayPassProduct?.base_price ? `$${dayPassProduct.base_price.toFixed(2)}` : "N/A"

  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold text-[#333333]">Location</h2>
      <div className="mt-2 text-[#4f4f4f]">
        <p>{displayAddress}</p>
      </div>

      <div className="mt-6 h-[300px] rounded-lg overflow-hidden">
        {mapError ? (
          <div className="flex items-center justify-center h-full bg-gray-100 text-[#4f4f4f]">{mapError}</div>
        ) : (
          <MapView
            hotels={[
              {
                id: "1",
                latitude: latitude!,
                longitude: longitude!,
                name: "Hotel",
                display_address: displayAddress,
                products: products,
              },
            ]}
            selectedHotel="1"
            onSelectHotel={() => {}}
          />
        )}
      </div>
    </section>
  )
}

