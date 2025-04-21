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

          // Đảm bảo luôn gán các hàm carousel lên window (toàn cục)
          if (typeof window !== "undefined") {
            window.prevCarousel = function(id) {
              const box = document.getElementById(id);
              const track = box.querySelector('.carousel-track');
              const imgs = box.querySelectorAll('.carousel-img');
              const dots = box.querySelectorAll('.carousel-dot');
              let idx = parseInt(track.getAttribute('data-active-idx') || '0');
              if (dots[idx]) dots[idx].style.background = '#ccc';
              idx = (idx - 1 + imgs.length) % imgs.length;
              track.style.transform = `translateX(-${idx * 100}%)`;
              track.setAttribute('data-active-idx', idx);
              dots.forEach((dot, i) => {
                dot.style.background = (i === idx) ? '#fff' : '#ccc';
              });
            };
            window.nextCarousel = function(id, len) {
              const box = document.getElementById(id);
              const track = box.querySelector('.carousel-track');
              const imgs = box.querySelectorAll('.carousel-img');
              const dots = box.querySelectorAll('.carousel-dot');
              let idx = parseInt(track.getAttribute('data-active-idx') || '0');
              if (dots[idx]) dots[idx].style.background = '#ccc';
              idx = (idx + 1) % len;
              track.style.transform = `translateX(-${idx * 100}%)`;
              track.setAttribute('data-active-idx', idx);
              dots.forEach((dot, i) => {
                dot.style.background = (i === idx) ? '#fff' : '#ccc';
              });
            };
          }

          const renderHotelPopup = (hotel) => {
            console.log('DEBUG hotel.images:', hotel.images, 'typeof:', typeof hotel.images, 'hotel:', hotel);
            // Đảm bảo lấy đúng mảng ảnh từ cột images (ưu tiên cột images)
            let images = [];
            if (Array.isArray(hotel.images)) {
              images = hotel.images;
            } else if (typeof hotel.images === "string") {
              try {
                images = JSON.parse(hotel.images);
                if (!Array.isArray(images)) images = [];
              } catch {
                images = [];
              }
            }
            // Chỉ fallback sang card_image nếu images rỗng hoặc không hợp lệ
            if (!images.length && hotel.card_image) images = [hotel.card_image];
            if (!images.length) images = ["/placeholder.svg?height=300&width=400"];

            // Carousel HTML
            const carouselId = `carousel-${hotel.id}`;
            const carouselImages = `
              <div class="carousel-track" style="display:flex;flex-direction:row;width:320px;height:180px;position:relative;transition:transform 0.5s cubic-bezier(.4,0,.2,1);will-change:transform;" data-active-idx="0">
                ${images.map((img, idx) => `
                  <img src="${img}" alt="${hotel.name}" 
                    style="width:320px;height:180px;object-fit:cover;flex-shrink:0;flex-basis:320px;border-radius:12px 12px 0 0;" 
                    class="carousel-img" data-idx="${idx}"/>
                `).join("")}
              </div>
            `;

            // Nút chuyển ảnh nếu có nhiều ảnh
            const carouselNav = images.length > 1 ? `
              <button style="position:absolute;top:50%;left:12px;transform:translateY(-50%);background:rgba(255,255,255,0.8);border:none;border-radius:50%;width:32px;height:32px;cursor:pointer;z-index:2;font-size:18px;" onclick="window.prevCarousel('${carouselId}')">&#8592;</button>
              <button style="position:absolute;top:50%;right:12px;transform:translateY(-50%);background:rgba(255,255,255,0.8);border:none;border-radius:50%;width:32px;height:32px;cursor:pointer;z-index:2;font-size:18px;" onclick="window.nextCarousel('${carouselId}', ${images.length})">&#8594;</button>
              <div style="position:absolute;bottom:12px;left:0;width:100%;display:flex;justify-content:center;gap:6px;z-index:3;">
                ${images.map((_, idx) => `<span class='carousel-dot' data-dot-idx='${idx}' style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${idx === 0 ? '#fff' : '#ccc'};transition:background 0.2s;"></span>`).join('')}
              </div>
            ` : "";

            const dayPassProduct = hotel.products?.find(
              (product) => product.type?.toLowerCase().includes("day") && product.type?.toLowerCase().includes("pass")
            );
            const dayPassPrice = dayPassProduct?.base_price ? `$${dayPassProduct.base_price}` : "N/A";
            return `
              <div style="width:320px; border-radius:14px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.08); background:#fff; cursor:pointer;" onclick="window.location.href='/hotels/${encodeURIComponent(hotel.name.replace(/ /g, '-').toLowerCase())}'">
                <div id="${carouselId}" style="position:relative;width:100%;height:180px;overflow:hidden;">
                  ${carouselImages}
                  ${carouselNav}
                </div>
                <div style="padding:12px 16px;">
                  <h3 style="font-size:1.1rem; margin:0 0 4px 0; color:#0f373d; font-weight:600;">${hotel.name}</h3>
                  <p style="margin:0; color:#4f4f4f; font-size:0.95rem;">${hotel.display_address}</p>
                  <div style="margin-top:10px; font-weight:500; color:#0f373d;">
                    Day Pass: <span>${dayPassPrice}</span>
                  </div>
                  
                </div>
              </div>
            `;
          };

          const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(renderHotelPopup(hotel));

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