"use client"

import dynamic from "next/dynamic"
import type { Hotel } from "@/types/hotel"

// Import MapBox component với ssr: false để đảm bảo nó chỉ được render ở phía client
const MapBox = dynamic(() => import("./map-box"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <p className="text-gray-500">Đang tải bản đồ...</p>
    </div>
  ),
})

interface MapViewProps {
  hotels: Hotel[]
  selectedHotel: string | null
  onSelectHotel: (id: string) => void
}

export function MapView(props: MapViewProps) {
  return (
    <div className="h-full w-full relative bg-gray-100 rounded-lg overflow-hidden lg:sticky lg:top-[64px] lg:h-[calc(100vh-64px)]">
      <MapBox {...props} />
    </div>
  )
}

