"use client"

import { Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Search() {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <div className="rounded-3xl bg-white p-4 shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <label className="text-sm font-medium text-[#374151] ml-9">Location</label>
          <div className="mt-1 flex items-center gap-2 rounded-full p-2">
            <MapPin className="h-5 w-5 text-[#4b5563]" />
            <input
              type="text"
              placeholder="Where's your next Day Escape to?"
              className="flex-1 bg-transparent outline-none placeholder:text-[#4b5563]"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium text-[#374151] ml-9">Escape day</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="mt-1 flex w-full items-center gap-2 rounded-full p-2">
                <Calendar className="h-5 w-5 text-[#4b5563]" />
                <span className="flex-1 text-left text-[#4b5563]">{date ? format(date, "PPP") : "Pick a date"}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
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
        </div>

        <Button className="w-full sm:w-auto bg-[#0c363e] px-8 text-white hover:bg-[#0c363e]/90 rounded-full">
          Search
        </Button>
      </div>
    </div>
  )
}

