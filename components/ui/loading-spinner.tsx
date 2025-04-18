import React from "react"

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    containerClassName?: string
}

/**
 * Hiển thị loading spinner với kích thước có thể tùy chỉnh
 */
export function LoadingSpinner({ size = 'md', containerClassName }: LoadingSpinnerProps) {
    // Map kích thước
    const sizeClasses = {
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-10 w-10"
    }

    return (
        <div className={`flex justify-center items-center py-8 ${containerClassName || ''}`}>
            <div
                className={`animate-spin rounded-full border-b-2 border-[#0f373d] ${sizeClasses[size]}`}
                aria-label="Loading"
            />
        </div>
    )
}

/**
 * Hiển thị loading screen đầy đủ có thể được sử dụng cho toàn bộ trang
 */
export function LoadingScreen() {
    return (
        <div className="container max-w-6xl mx-auto px-4 py-8 h-64 flex items-center justify-center">
            <LoadingSpinner size="lg" />
        </div>
    )
} 