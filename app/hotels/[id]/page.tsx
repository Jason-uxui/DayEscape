"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Share, Heart, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductList from "@/components/product-list"
import ReviewsSection from "@/components/reviews-section"
import KeyInfoSection from "@/components/key-info-section"
import AmenitiesList from "@/components/amenities-list"
import LocationSection from "@/components/location-section"
import CartSidebar from "@/components/cart-sidebar"
import { SiteHeader } from "@/components/site-header"
import { DiscoverMoreSection } from "@/components/sections/discover-more-section"
import { SiteFooter } from "@/components/sections/site-footer"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { useSearchParams, useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

async function getHotel(idOrName: string) {
  let query = supabase.from("hotels").select(`
    *,
    products(*),
    images,
    check_in,
    check_out,
    facility_hours,
    custom_note
  `)

  // Check if the idOrName is a valid UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (uuidRegex.test(idOrName)) {
    query = query.eq("id", idOrName)
  } else {
    // Replace hyphens with spaces and use case-insensitive matching
    const formattedName = idOrName.replace(/-/g, " ")
    query = query.ilike("name", formattedName)
  }

  const { data, error, count } = await query

  if (error) {
    console.error("Error fetching hotel:", error)
    return { hotel: null, error: error.message }
  }

  if (!data || data.length === 0) {
    return { hotel: null, error: "Hotel not found" }
  }

  if (data.length > 1) {
    console.warn("Multiple hotels found with the same name:", idOrName)
    // For now, we'll return the first result, but this should be handled more robustly in a production environment
  }

  return { hotel: data[0], error: null }
}

export default function HotelPage() {
  const params = useParams();
  const hotelId = params.id as string;
  const router = useRouter();

  const [hotel, setHotel] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const searchParams = useSearchParams()
  const isUpdatingBooking = searchParams.get("updateBooking") === "true"

  useEffect(() => {
    async function fetchHotel() {
      const { hotel, error } = await getHotel(hotelId)
      if (error) {
        setError(error)
      } else {
        setHotel(hotel)
      }
    }
    fetchHotel()
  }, [hotelId])

  useEffect(() => {
    if (isUpdatingBooking) {
      const checkInDate = searchParams.get("checkInDate")
      const adults = searchParams.get("adults")
      const children = searchParams.get("children")
      const infants = searchParams.get("infants")
      const productType = searchParams.get("productType")

      // TODO: Update the UI with the booking details
      // This could involve setting state variables or calling functions to update the UI
      console.log("Updating booking with:", { checkInDate, adults, children, infants, productType })
    }
  }, [isUpdatingBooking, searchParams])

  const handleShare = async () => {
    if (!hotel) return;

    const shareUrl = window.location.href;
    const shareTitle = `DayEscape - ${hotel.name}`;
    const shareText = `Check out ${hotel.name} on DayEscape - ${hotel.description?.substring(0, 100)}...`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        toast.success("Shared successfully!");
      } catch (error) {
        // Don't show error for user cancellations
        if (error instanceof Error &&
          error.message !== "Abort due to cancellation of share." &&
          error.message !== "Share canceled") {
          console.error("Error sharing:", error);
          copyToClipboard(shareUrl);
        }
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    // Check if we're in a secure context (HTTPS or localhost)
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setIsCopied(true);
          toast.success("Link copied to clipboard!");
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((error) => {
          // Don't show permission errors in console
          if (!(error instanceof Error) ||
            !error.message.includes("not allowed by the user agent") &&
            !error.message.includes("denied permission")) {
            console.error("Failed to copy:", error);
          }

          // Fallback to manual copy instruction
          toast.info("Copy this link manually: " + text);
        });
    } else {
      // Fallback for insecure contexts
      try {
        // Create a temporary input element
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);

        // Focus and select the text
        textArea.focus();
        textArea.select();

        // Execute the copy command
        const successful = document.execCommand('copy');

        // Clean up
        document.body.removeChild(textArea);

        if (successful) {
          setIsCopied(true);
          toast.success("Link copied to clipboard!");
          setTimeout(() => setIsCopied(false), 2000);
        } else {
          toast.info("Copy this link manually: " + text);
        }
      } catch (err) {
        toast.info("Copy this link manually: " + text);
      }
    }
  };

  const handleSaveToggle = () => {
    if (isSaved) {
      setIsSaved(false);
      toast.success(
        <div className="flex flex-col">
          <span>Removed from your Favourites</span>
        </div>
      );
    } else {
      setIsSaved(true);
      toast.success(
        <div className="flex flex-col space-y-2">
          <span>Saved to your Favourites</span>
          <Link
            href="/users/favorites"
            className="text-sm bg-[#0c363e] text-white py-1 px-3 rounded-md inline-block text-center hover:bg-[#0c363e]/90"
          >
            View Favourites
          </Link>
        </div>
      );
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
        <SiteHeader />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0c363e] mb-4">Error</h1>
            <p className="text-[#4f4f4f]">{error}</p>
            <Button className="mt-4" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
        <SiteHeader />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0c363e] mb-4">Loading...</h1>
            <p className="text-[#4f4f4f]">Please wait while we fetch the hotel details.</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const images = hotel.images || []
  const mainImage = images.length > 0 ? images[0] : "/placeholder.svg?height=600&width=800"
  const smallImages = images.slice(1, 5)

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded)
  }

  return (
    <>
      <SiteHeader />
      <div className="bg-[#fdfaf5]">
        <div className="container max-w-6xl mx-auto px-4 py-8 bg-[#fdfaf5]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="md:col-span-2 md:row-span-2 h-[400px] md:h-[500px]">
              <Image
                src={mainImage || "/placeholder.svg"}
                alt={`Main view of ${hotel.name}`}
                width={800}
                height={600}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            {smallImages.map((src: string, index: number) => (
              <div key={index} className="hidden md:block h-[240px]">
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`${hotel.name} view ${index + 2}`}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            ))}
            {[...Array(Math.max(0, 4 - smallImages.length))].map((_, index) => (
              <div key={`placeholder-${index}`} className="hidden md:block h-[240px]">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt={`Placeholder for ${hotel.name}`}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <div className="flex-1 p-8 bg-white border rounded-md">
              <header className="mb-8">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-[#4f4f4f]">
                      <span>{hotel.display_address}</span>
                      <span className="rounded bg-[#0f373d]/10 px-2 py-0.5 text-[#0f373d]">
                        {hotel.rating} Star Hotel
                      </span>
                    </div>
                    <h1 className="mt-2 text-3xl font-bold text-[#0f373d]">{hotel.name}</h1>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      {isCopied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Share className="mr-2 h-4 w-4" />
                          Share
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSaveToggle}>
                      <Heart
                        className={`mr-2 h-4 w-4 ${isSaved ? "fill-[#e11d48]" : ""}`}
                        color={isSaved ? "#e11d48" : "currentColor"}
                      />
                      {isSaved ? "Saved" : "Save"}
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-[#4f4f4f]">
                  <p className={`${isDescriptionExpanded ? "" : "line-clamp-3"}`}>{hotel.description}</p>
                  <button onClick={toggleDescription} className="mt-2 text-[#0f373d] font-medium hover:underline">
                    {isDescriptionExpanded ? "See Less" : "See More"}
                  </button>
                </div>
              </header>

              <Tabs defaultValue="products" className="mt-8">
                <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto">
                  <TabsTrigger
                    value="products"
                    className="text-[#4f4f4f] data-[state=active]:text-[#0f373d] rounded-none border-b-2 border-transparent data-[state=active]:border-[#0f373d] bg-transparent"
                  >
                    Products
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="text-[#4f4f4f] data-[state=active]:text-[#0f373d] rounded-none border-b-2 border-transparent data-[state=active]:border-[#0f373d] bg-transparent"
                  >
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger
                    value="info"
                    className="text-[#4f4f4f] data-[state=active]:text-[#0f373d] rounded-none border-b-2 border-transparent data-[state=active]:border-[#0f373d] bg-transparent"
                  >
                    Key Info
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="products" className="mt-6">
                  <ProductList hotelId={hotel.id} />
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                  <ReviewsSection />
                </TabsContent>
                <TabsContent value="info" className="mt-6">
                  <KeyInfoSection
                    hotelInfo={{
                      check_in: hotel.check_in,
                      check_out: hotel.check_out,
                      facility_hours: hotel.facility_hours,
                      custom_note: hotel.custom_note,
                    }}
                  />
                </TabsContent>
              </Tabs>

              <AmenitiesList />
              <LocationSection
                displayAddress={hotel.display_address}
                latitude={hotel.latitude}
                longitude={hotel.longitude}
                products={hotel.products}
              />
            </div>
            <CartSidebar />
          </div>
        </div>
      </div>
      <DiscoverMoreSection />
      <SiteFooter />
    </>
  )
}

