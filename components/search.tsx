"use client"

import { Calendar as CalendarIcon, MapPin, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, isBefore, startOfDay, parse, isValid } from "date-fns"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { enAU, vi } from "date-fns/locale"
import { AUSTRALIA_POSTCODES, PostcodeData, findMatchingPostcodes } from "@/lib/postcodes"

// List of popular locations for suggestions
const POPULAR_LOCATIONS = [
  "Sydney, Australia",
  "Melbourne, Australia",
  "Brisbane, Australia",
  "Perth, Australia",
  "Adelaide, Australia",
  "Gold Coast, Australia",
  "Canberra, Australia",
  "Hobart, Australia",
  "Darwin, Australia",
  "Cairns, Australia",
]

// Create combined location data with postcodes
const LOCATIONS_WITH_POSTCODES = [
  { location: "Sydney, Australia", postcodes: ["2000", "2010", "2020", "2030", "2040", "2050", "2060", "2070"] },
  { location: "Melbourne, Australia", postcodes: ["3000", "3010", "3020", "3030", "3040", "3050", "3060", "3070"] },
  { location: "Brisbane, Australia", postcodes: ["4000", "4010", "4020", "4030", "4050", "4060", "4070"] },
  { location: "Perth, Australia", postcodes: ["6000", "6010", "6020", "6030", "6050", "6060"] },
  { location: "Adelaide, Australia", postcodes: ["5000", "5010", "5020", "5030", "5040"] },
  { location: "Gold Coast, Australia", postcodes: ["4210", "4211", "4212", "4215", "4217", "4220"] },
  { location: "Canberra, Australia", postcodes: ["2600", "2601", "2602", "2603", "2604", "2605", "2606"] },
  { location: "Hobart, Australia", postcodes: ["7000", "7001", "7004", "7005", "7007"] },
  { location: "Darwin, Australia", postcodes: ["0800", "0810", "0820", "0830", "0840"] },
  { location: "Cairns, Australia", postcodes: ["4870", "4878", "4879", "4880", "4881"] },
]

// Interface for combined suggestions
interface CombinedSuggestion {
  display: string;
  value: string;
  type: 'location' | 'postcode';
  postcode?: string;
}

export function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const today = startOfDay(new Date())

  // Form state with default date as today
  const [date, setDate] = useState<Date>(today)
  const [location, setLocation] = useState<string>("")
  const [suggestions, setSuggestions] = useState<CombinedSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ location?: string; date?: string }>({})

  const suggestionsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize form values from URL parameters if on hotels page
  useEffect(() => {
    if (pathname === '/hotels') {
      const locationParam = searchParams.get('location')
      const dateParam = searchParams.get('date')

      if (locationParam) {
        setLocation(decodeURIComponent(locationParam))
      }

      if (dateParam) {
        const parsedDate = parse(dateParam, 'yyyy-MM-dd', new Date())
        if (isValid(parsedDate)) {
          setDate(parsedDate)
        }
      }
    }
  }, [searchParams, pathname])

  // Generate combined suggestions
  const generateCombinedSuggestions = (searchTerm: string = "") => {
    const combinedResults: CombinedSuggestion[] = [];
    const searchTermLower = searchTerm.toLowerCase();

    // If input is numeric, prioritize postcode search
    if (/^\d+$/.test(searchTerm.trim())) {
      // Add matching postcodes
      const matchingPostcodes = findMatchingPostcodes(searchTerm.trim());

      matchingPostcodes.forEach(postcodeData => {
        const locationData = LOCATIONS_WITH_POSTCODES.find(
          item => item.location === postcodeData.location
        );

        if (locationData) {
          combinedResults.push({
            display: `${postcodeData.location} (${postcodeData.postcode})`,
            value: postcodeData.location,
            type: 'postcode',
            postcode: postcodeData.postcode
          });
        }
      });
    }

    // Add matching locations
    LOCATIONS_WITH_POSTCODES.forEach(locationData => {
      const locationLower = locationData.location.toLowerCase();

      if (searchTerm === "" || locationLower.includes(searchTermLower)) {
        // Add main location with primary postcode
        combinedResults.push({
          display: `${locationData.location} (${locationData.postcodes[0]})`,
          value: locationData.location,
          type: 'location',
          postcode: locationData.postcodes[0]
        });
      }
    });

    // Remove duplicates (prefer postcode matches over location matches)
    const uniqueResults = combinedResults.filter((suggestion, index, self) =>
      index === self.findIndex(s => s.value === suggestion.value)
    );

    return uniqueResults;
  };

  // Handle showing suggestions when typing in location field or when focused
  useEffect(() => {
    if (location.trim() === "") {
      // Show all locations when input is empty but focused
      if (showSuggestions) {
        setSuggestions(generateCombinedSuggestions());
      } else {
        setSuggestions([]);
      }
      return;
    }

    // Generate suggestions based on input
    setSuggestions(generateCombinedSuggestions(location.trim()));
  }, [location, showSuggestions]);

  // Handle click outside to close suggestions list
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle selecting a suggestion
  const handleSelectSuggestion = (suggestion: CombinedSuggestion) => {
    setLocation(suggestion.value)
    setShowSuggestions(false)
    setErrors(prev => ({ ...prev, location: undefined }))
  }

  // Handle focus on input
  const handleInputFocus = () => {
    setShowSuggestions(true)
    // If input is empty, show all locations
    if (location.trim() === "") {
      setSuggestions(generateCombinedSuggestions());
    }
  }

  // Handle date selection - Date can be undefined from the Calendar component
  const handleDateSelect = (selectedDate: Date | undefined) => {
    // If a date is selected, use it; otherwise keep using the current date
    if (selectedDate) {
      setDate(selectedDate)
      setErrors(prev => ({ ...prev, date: undefined }))
    }
  }

  // Validate form before submit
  const validateForm = (): boolean => {
    const newErrors: { location?: string; date?: string } = {}

    if (!location || location.trim() === "") {
      newErrors.location = "Please enter a location"
    }

    // Only check if date is in the past since we now have a default date
    if (isBefore(date, today)) {
      newErrors.date = "Cannot select a date in the past"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle search button click
  const handleSearch = () => {
    if (!validateForm()) return

    setIsSearching(true)

    // Simulate search process
    setTimeout(() => {
      // Navigate to search results page with query params
      router.push(`/hotels?location=${encodeURIComponent(location)}&date=${date ? format(date, 'yyyy-MM-dd') : ''}`)
      setIsSearching(false)
    }, 800)
  }

  return (
    <div className="rounded-3xl bg-white p-4 shadow-lg relative z-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1 relative">
          <label className="text-sm font-medium text-[#374151] ml-9">Location</label>
          <div className={`mt-1 flex items-center gap-2 rounded-full p-2 border ${errors.location ? 'border-red-500' : 'border-transparent'} transition-colors`}>
            <MapPin className="h-5 w-5 text-[#4b5563]" />
            <input
              ref={inputRef}
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={handleInputFocus}
              onClick={handleInputFocus}
              placeholder="Where's your next Day Escape to?"
              className="flex-1 bg-transparent outline-none placeholder:text-[#4b5563]"
            />
          </div>
          {errors.location && (
            <p className="text-red-500 text-xs mt-1 ml-9">{errors.location}</p>
          )}

          {/* Combined suggestions list */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg overflow-y-auto"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                maxHeight: '200px',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={`suggestion-${index}`}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <MapPin className="h-4 w-4 text-[#4b5563] flex-shrink-0" />
                  <span>
                    {suggestion.type === 'postcode' ? (
                      <>
                        <span>{suggestion.value}</span>
                        <span className="text-gray-500 ml-1">({suggestion.postcode})</span>
                      </>
                    ) : (
                      <>
                        <span>{suggestion.value}</span>
                        <span className="text-gray-500 ml-1">({suggestion.postcode})</span>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium text-[#374151] ml-9">Escape day</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className={`mt-1 flex w-full items-center gap-2 rounded-full p-2 border ${errors.date ? 'border-red-500' : 'border-transparent'} transition-colors`}>
                <CalendarIcon className="h-5 w-5 text-[#4b5563]" />
                <span className="flex-1 text-left text-[#4b5563]">
                  {date ? <span className="font-medium text-[#0c363e]">{format(date, "PPP", { locale: enAU })}</span> : "Pick a date"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="center" sideOffset={5}>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) => isBefore(date, today)}
                locale={enAU}
                weekStartsOn={0}
                className="custom-calendar"
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-red-500 text-xs mt-1 ml-9">{errors.date}</p>
          )}
        </div>

        <Button
          className="w-full sm:w-auto bg-[#0c363e] px-8 text-white hover:bg-[#0c363e]/90 rounded-full transition-all duration-300 hover:shadow-lg disabled:opacity-70"
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            "Search"
          )}
        </Button>
      </div>
    </div>
  )
}

