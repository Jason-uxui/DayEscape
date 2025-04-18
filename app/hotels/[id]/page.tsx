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
import { HotelImageCarousel } from "@/components/hotel-image-carousel"
import { useToast } from "@/components/ui/use-toast"
import { LoadingScreen } from "@/components/ui/loading-spinner"

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  // Check if there's a tab query parameter
  const tabParam = searchParams.get('tab');
  const defaultTab = tabParam && ['products', 'reviews', 'info'].includes(tabParam) ? tabParam : 'products';
  const isUpdatingBooking = searchParams.get("updateBooking") === "true"

  const [hotel, setHotel] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHotel() {
      const { hotel, error } = await getHotel(params.id as string)
      if (error) {
        setError(error)
      } else if (hotel) {
        setHotel(hotel)

        // Check if this hotel is saved by the user
        const savedHotels = JSON.parse(localStorage.getItem("savedHotels") || "[]")
        setIsSaved(savedHotels.includes(hotel.id))
      }
      setIsLoading(false)
    }
    fetchHotel()
  }, [params.id])

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

  // Scroll to products section if tab=products is in the URL
  useEffect(() => {
    if (tabParam === 'products' && !isLoading) {
      // Give time for the page to render
      setTimeout(() => {
        const productsSection = document.querySelector('[value="products"]');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [tabParam, isLoading]);

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
        toast({
          variant: "default",
          title: "Shared successfully!",
          className: "rounded-full",
        });
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
          toast({
            variant: "default",
            title: "Link copied to clipboard!",
            className: "rounded-full",
          });
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
          toast({
            variant: "default",
            title: "Copy this link manually: " + text,
            className: "rounded-full",
          });
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
          toast({
            variant: "default",
            title: "Link copied to clipboard!",
            className: "rounded-full",
          });
          setTimeout(() => setIsCopied(false), 2000);
        } else {
          toast({
            variant: "default",
            title: "Copy this link manually: " + text,
            className: "rounded-full",
          });
        }
      } catch (err) {
        toast({
          variant: "default",
          title: "Copy this link manually: " + text,
          className: "rounded-full",
        });
      }
    }
  };

  const handleSaveToggle = () => {
    if (isSaved) {
      setIsSaved(false);
      toast({
        variant: "default",
        description: (
          <div className="flex items-center">
            <Heart className="h-4 w-4 mr-2" color="#e11d48" />
            <span>Removed from your Favourites</span>
          </div>
        ),
        className: "rounded-full",
      });
    } else {
      setIsSaved(true);
      toast({
        variant: "default",
        description: (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-2 fill-[#e11d48]" color="#e11d48" />
              <span>The hotel has been added to your favourites.</span>
            </div>
            <Link
              href="/users/favorites"
              className="text-sm text-[#0c363e] underline hover:text-[#0c363e]/80 font-medium ml-2"
            >
              View
            </Link>
          </div>
        ),
        className: "rounded-full",
      });
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

  if (isLoading) {
    return <LoadingScreen />
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
          {/* Mobile Image Carousel */}
          <div className="md:hidden mb-4">
            <HotelImageCarousel images={images} hotelName={hotel.name} />
          </div>

          {/* Desktop Grid Layout */}
          <div className="hidden md:grid grid-cols-4 gap-4 md:gap-6">
            <div className="col-span-2 row-span-2 h-[500px]">
              <Image
                src={mainImage || "/placeholder.svg"}
                alt={`Main view of ${hotel.name}`}
                width={800}
                height={600}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            {smallImages.map((src: string, index: number) => (
              <div key={`small-image-${index}-${src.substring(0, 20)}`} className="h-[240px]">
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
              <div key={`placeholder-image-${index}`} className="h-[240px]">
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
            <div className="flex-1 p-4 sm:p-6 md:p-8 bg-white border rounded-md">
              <header className="mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-0">
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
                    <Button variant="outline" size="sm" onClick={handleShare} className="px-4">
                      {isCopied ? (
                        <>
                          <Check className="mr-1 h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Share className="mr-1 h-4 w-4" />
                          Share
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSaveToggle} className="px-4">
                      <Heart
                        className={`mr-1 h-4 w-4 ${isSaved ? "fill-[#e11d48]" : ""}`}
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

              <Tabs defaultValue={defaultTab} className="mt-8">
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
      <DiscoverMoreSection
        currentHotelId={hotel.id}
        currentLatitude={hotel.latitude}
        currentLongitude={hotel.longitude}
        currentCity={hotel.display_address?.split(',')[0]?.trim()}
      />
      <SiteFooter />
    </>
  )
}

