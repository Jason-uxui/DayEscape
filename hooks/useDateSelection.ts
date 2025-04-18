"use client"

import { useState, useCallback } from "react"
import { isBefore, startOfDay } from "date-fns"

interface UseDateSelectionOptions {
    defaultDate?: Date
    minDate?: Date
    onDateChange?: (date: Date) => void
}

export const useDateSelection = ({
    defaultDate = new Date(),
    minDate = startOfDay(new Date()),
    onDateChange
}: UseDateSelectionOptions = {}) => {
    const [date, setDate] = useState<Date | undefined>(defaultDate)
    const [dateError, setDateError] = useState<string | undefined>()

    const validateDate = (selectedDate: Date | undefined): boolean => {
        if (!selectedDate) {
            setDateError("Please select a date")
            return false
        }

        if (isBefore(selectedDate, minDate)) {
            setDateError("Cannot select a date in the past")
            return false
        }

        setDateError(undefined)
        return true
    }

    const handleDateChange = useCallback((newDate: Date | undefined) => {
        setDate(newDate)

        if (newDate && validateDate(newDate)) {
            onDateChange?.(newDate)
        }
    }, [onDateChange, minDate])

    return {
        date,
        dateError,
        setDate: handleDateChange,
        validateDate
    }
} 