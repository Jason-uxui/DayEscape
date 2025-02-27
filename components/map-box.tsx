"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import type { Hotel } from "@/types/hotel"
import { Plus, Minus } from "lucide-react"
import "mapbox-gl/dist/mapbox-gl.css"

const markerStyle = `
.marker {
  transition: opacity 0.2s;
}
.marker:hover {
  opacity: 0.8;
}
.mapboxgl-popup-content {
  padding: 0 !important;
  background: none !important;
  box-shadow: none !important;
}
.mapboxgl-popup-tip {
  border-top-color: white !important;
  border-width: 11px !important;
  margin-top: -1px;
}
`

interface MapBoxProps {
  hotels: Hotel[]
  selectedHotel: string | null
  onSelectHotel: (id: string) => void
}

// Set access token - sử dụng token cố định để đảm bảo hoạt động
mapboxgl.accessToken = "pk.eyJ1IjoiamFtZXNsbTAwIiwiYSI6ImNtNWdnNzhtMTA3bXgya29yNmlhdGduc2MifQ.-oSDcLb1gE5dYMGhuPpAyg";

export default function MapBox({ hotels, selectedHotel, onSelectHotel }: MapBoxProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng, setLng] = useState(-153.2917)
  const [lat, setLat] = useState(-27.4698)
  const [zoom, setZoom] = useState(9)
  const [mapInitialized, setMapInitialized] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  // Khởi tạo map
  useEffect(() => {
    console.log("MapBox component mounted, initializing map")
    
    // Nếu map đã được khởi tạo hoặc container chưa sẵn sàng, không làm gì cả
    if (map.current || !mapContainer.current) return;
    
    try {
      // Tạo bản đồ với các tùy chọn đơn giản
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      // Thêm sự kiện để theo dõi quá trình tải
      map.current.on("load", () => {
        console.log("Map loaded successfully")
        setMapInitialized(true)
        
        // Thêm markers sau khi map đã tải xong
        if (map.current) {
          addMarkersToMap();
        }
      });

      map.current.on("error", (e) => {
        console.error("Mapbox error:", e)
        setMapError(e.error?.message || "Unknown Mapbox error")
      });

      // Thêm navigation control (zoom buttons)
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      
      // Thêm style cho markers
      const style = document.createElement("style")
      style.textContent = markerStyle
      document.head.appendChild(style)
    } catch (error: any) {
      console.error("Error initializing map:", error)
      setMapError(error.message || "Unknown error initializing map")
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, []);

  // Hàm thêm markers vào map
  const addMarkersToMap = () => {
    if (!map.current || !mapInitialized || !hotels.length) {
      console.log("Cannot add markers: Map not initialized or no hotels")
      return;
    }

    console.log("Adding markers to map", hotels.length)

    // Clear existing markers
    const existingMarkers = document.getElementsByClassName("mapboxgl-marker")
    while (existingMarkers[0]) {
      existingMarkers[0].remove()
    }

    // Add markers for each hotel
    const bounds = new mapboxgl.LngLatBounds()
    let markersAdded = 0

    hotels.forEach((hotel) => {
      try {
        if (hotel.latitude && hotel.longitude) {
          console.log(`Adding marker for hotel: ${hotel.name} at [${hotel.longitude}, ${hotel.latitude}]`)
          
          const el = document.createElement("div")
          el.className = "marker"
          el.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 13.54 12 24 12 24C12 24 20 13.54 20 8C20 3.58 16.42 0 12 0ZM12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11Z" fill="#FF0000"/>
            </svg>
          `
          el.style.width = "24px"
          el.style.height = "24px"
          el.style.cursor = "pointer"

          const marker = new mapboxgl.Marker(el).setLngLat([hotel.longitude, hotel.latitude]).addTo(map.current)
          markersAdded++

          const dayPassProduct = hotel.products?.find(
            (product) => product.type?.toLowerCase().includes("day") && product.type?.toLowerCase().includes("pass"),
          )
          const dayPassPrice = dayPassProduct?.base_price ? `$${dayPassProduct.base_price.toFixed(2)}` : "N/A"

          const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`
              <div class="relative">
                <div class="p-3 rounded-lg bg-white shadow-md">
                  <h3 class="text-lg font-semibold text-[#0f373d]">${hotel.name}</h3>
                  <p class="text-sm text-[#4f4f4f]">${hotel.display_address}</p>
                  <p class="text-sm font-medium text-[#0f373d] mt-2">Day Pass: ${dayPassPrice}</p>
                </div>
              </div>
            `)

          marker.setPopup(popup)

          marker.getElement().addEventListener("click", () => {
            marker.togglePopup()
            onSelectHotel(hotel.id)
          })

          bounds.extend([hotel.longitude, hotel.latitude])
        }
      } catch (error) {
        console.error(`Error adding marker for hotel ${hotel.name}:`, error)
      }
    })

    console.log(`Added ${markersAdded} markers to the map`)

    if (!bounds.isEmpty() && map.current) {
      try {
        console.log("Fitting bounds to markers")
        map.current.fitBounds(bounds, { padding: 50 })
      } catch (error) {
        console.error("Error fitting bounds:", error)
      }
    } else {
      console.log("No bounds to fit or map not initialized")
    }
  }

  // Thêm markers khi hotels thay đổi và map đã được khởi tạo
  useEffect(() => {
    if (mapInitialized) {
      addMarkersToMap();
    }
  }, [hotels, mapInitialized]);

  // Hiển thị lỗi nếu có
  if (mapError) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-100">
        <div className="text-red-500 p-4 bg-white rounded shadow">
          <h3 className="font-bold">Map Error</h3>
          <p>{mapError}</p>
        </div>
      </div>
    )
  }

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut()
    }
  }

  return (
    <div className="relative h-full w-full map-container" data-map-container>
      <div ref={mapContainer} className="h-full w-full absolute inset-0" />
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
          aria-label="Zoom in"
        >
          <Plus className="h-6 w-6 text-gray-600" />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
          aria-label="Zoom out"
        >
          <Minus className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  )
} 