'use client'

import React, { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HotelImageCarouselProps {
    images: string[]
    hotelName: string
}

export function HotelImageCarousel({ images, hotelName }: HotelImageCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setPrevBtnEnabled(emblaApi.canScrollPrev())
        setNextBtnEnabled(emblaApi.canScrollNext())
    }, [emblaApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, setScrollSnaps, onSelect])

    // Use default image if no images are provided
    const safeImages = images.length > 0
        ? images
        : ['/placeholder.svg?height=600&width=800']

    return (
        <div className="relative w-full h-[350px]">
            <div className="overflow-hidden h-full rounded-lg" ref={emblaRef}>
                <div className="flex h-full">
                    {safeImages.map((src, index) => (
                        <div className="relative flex-[0_0_100%] h-full" key={index}>
                            <Image
                                src={src || "/placeholder.svg"}
                                alt={`${hotelName} view ${index + 1}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 h-10 w-10 rounded-full flex items-center justify-center shadow-md"
                onClick={scrollPrev}
                aria-label="Previous image"
            >
                <ChevronLeft className="h-6 w-6 text-[#0c363e]" />
            </button>

            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 h-10 w-10 rounded-full flex items-center justify-center shadow-md"
                onClick={scrollNext}
                aria-label="Next image"
            >
                <ChevronRight className="h-6 w-6 text-[#0c363e]" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === selectedIndex ? 'bg-white' : 'bg-white/40'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                        onClick={() => emblaApi?.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    )
} 