"use client"

import { Calendar, MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format, isBefore, startOfDay } from "date-fns"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { enAU } from "date-fns/locale"

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

export function Search() {
  const router = useRouter()
  const today = startOfDay(new Date())
  
  // Form state
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [location, setLocation] = useState<string>("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [errors, setErrors] = useState<{location?: string; date?: string}>({})
  
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle showing suggestions when typing in location field
  useEffect(() => {
    if (location.trim() === "") {
      setSuggestions([])
      return
    }

    const filteredLocations = POPULAR_LOCATIONS.filter(loc => 
      loc.toLowerCase().includes(location.toLowerCase())
    )
    setSuggestions(filteredLocations)
  }, [location])

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
  const handleSelectSuggestion = (suggestion: string) => {
    setLocation(suggestion)
    setShowSuggestions(false)
    setErrors(prev => ({...prev, location: undefined}))
  }

  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setErrors(prev => ({...prev, date: undefined}))
    }
  }

  // Validate form before submit
  const validateForm = (): boolean => {
    const newErrors: {location?: string; date?: string} = {}
    
    if (!location || location.trim() === "") {
      newErrors.location = "Please enter a location"
    }
    
    if (!date) {
      newErrors.date = "Please select a date"
    } else if (isBefore(date, today)) {
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
    <div className="rounded-3xl bg-white p-4 shadow-lg">
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
              onFocus={() => setShowSuggestions(true)}
              placeholder="Where's your next Day Escape to?"
              className="flex-1 bg-transparent outline-none placeholder:text-[#4b5563]"
            />
          </div>
          {errors.location && (
            <p className="text-red-500 text-xs mt-1 ml-9">{errors.location}</p>
          )}
          
          {/* Suggestions list */}
          {showSuggestions && suggestions.length > 0 && (
            <div 
              ref={suggestionsRef}
              className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion}
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
                <Calendar className="h-5 w-5 text-[#4b5563]" />
                <span className="flex-1 text-left text-[#4b5563]">
                  {date ? format(date, "PPP", { locale: enAU }) : "Pick a date"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) => isBefore(date, today)}
                initialFocus
                locale={enAU}
                className="rounded-md border"
                classNames={{
                  day_selected:
                    "bg-[#0C363E] text-white hover:bg-[#0C363E] hover:text-white focus:bg-[#0C363E] focus:text-white",
                  day_today: "bg-accent text-accent-foreground",
                  day: cn("h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
                }}
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

