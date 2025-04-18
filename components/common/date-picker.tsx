"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { startOfDay } from "date-fns"

export interface DatePickerProps {
    date: Date | undefined
    onDateChange: (date: Date | undefined) => void
    buttonClassName?: string
    calendarClassName?: string
    placeholder?: string
    formatString?: string
    disabled?: boolean
    minDate?: Date
    noBorder?: boolean
    width?: "auto" | "full"
    iconClassName?: string
}

export function DatePicker({
    date,
    onDateChange,
    buttonClassName,
    calendarClassName,
    placeholder = "Select date",
    formatString = "EEE dd MMM yyyy",
    disabled = false,
    minDate = startOfDay(new Date()), // Default minDate is today
    noBorder = false,
    width = "full",
    iconClassName,
}: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "flex items-center gap-2 pl-3 text-left justify-start font-normal bg-transparent",
                        width === "full" ? "w-full" : "w-auto",
                        !date && "text-muted-foreground",
                        noBorder && "border-0 p-0 hover:bg-transparent focus:ring-0 shadow-none",
                        "hover:bg-transparent",
                        buttonClassName
                    )}
                    disabled={disabled}
                >
                    <CalendarIcon className={cn("h-4 w-4", iconClassName)} />
                    {date ? format(date, formatString) : placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-auto p-0 z-[100]", calendarClassName)} align="start" sideOffset={5}>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onDateChange}
                    initialFocus
                    disabled={(date) => date < minDate}
                />
            </PopoverContent>
        </Popover>
    )
} 