"use client"

import { X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { DatePicker } from "@/components/common/date-picker"

// Additional CSS for the slide-in animation
const slideInStyles = `
  .cart-slide-in {
    transition: transform 0.3s ease-in-out;
  }
  .cart-slide-in.open {
    transform: translateX(0);
  }
  .cart-slide-in.closed {
    transform: translateX(100%);
  }
`;

export default function CartSidebar() {
    const { items, removeFromCart, total, updateEscapeDate } = useCart()
    const router = useRouter()
    const [date, setDate] = useState<Date>(new Date())
    const [isMobile, setIsMobile] = useState(false)
    const [mobileCartOpen, setMobileCartOpen] = useState(false)

    useEffect(() => {
        // Check if we're on client-side
        if (typeof window !== 'undefined') {
            const checkMobile = () => {
                setIsMobile(window.innerWidth < 1024)
            }

            // Initial check
            checkMobile()

            // Add event listener for window resize
            window.addEventListener('resize', checkMobile)

            // Clean up
            return () => window.removeEventListener('resize', checkMobile)
        }
    }, [])

    const handleDateSelect = (newDate: Date | undefined) => {
        if (newDate) {
            setDate(newDate)
            updateEscapeDate(newDate)
        }
    }

    const handleReserve = () => {
        router.push("/checkout-confirmation")
        if (isMobile) {
            setMobileCartOpen(false)
        }
    }

    // Handle bottom bar reserve button click
    const handleBottomBarReserve = () => {
        if (items.length > 0) {
            // If cart has items, open cart dialog
            setMobileCartOpen(true)
        } else {
            // If cart is empty, navigate to the current URL with a products tab indicator
            // Get the current path
            const currentPath = window.location.pathname;

            // Check if we're on a hotel detail page
            if (currentPath.includes('/hotels/')) {
                // Use Next.js router to avoid full page reload
                router.push(`${currentPath}?tab=products`);

                // Scroll to products section programmatically
                setTimeout(() => {
                    // Find the products tab or content by various selectors
                    const productsTab = document.querySelector('[role="tab"][data-state="active"]') ||
                        document.querySelector('[role="tab"][value="products"]');

                    const productsContent = document.querySelector('[role="tabpanel"][data-state="active"]') ||
                        document.querySelector('[value="products"]');

                    if (productsContent) {
                        // If we found the products content, scroll to it
                        productsContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else if (productsTab) {
                        // If we found the products tab, scroll to it
                        productsTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        // Fallback: just scroll down the page
                        window.scrollTo({
                            top: window.innerHeight * 0.4, // Scroll down 40% of viewport height
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            } else {
                // If not on a hotel page, redirect to hotels listing
                router.push('/hotels');
            }
        }
    }

    // Cart content component
    const cartContent = (
        <div className="bg-white rounded-md border flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="p-4">
                <h2 className="text-xl font-bold text-[#333333] mb-2">Your Cart</h2>

                {/* Escape Day Section */}
                <div className="bg-white rounded-lg border p-4 mb-4">
                    <div className="text-sm text-[#4f4f4f] mb-1">Escape day</div>
                    <DatePicker
                        date={date}
                        onDateChange={handleDateSelect}
                        buttonClassName="flex w-full items-center gap-2 text-left font-medium text-[#333333]"
                        formatString="MMM d, yyyy"
                        noBorder
                    />
                </div>
            </div>

            {/* Scrollable product list */}
            <div className="flex-grow overflow-y-auto p-4 max-h-[calc(100vh-250px)]">
                {items.length > 0 ? (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-start justify-between rounded-lg border p-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-[#333333]">{item.name}</span>
                                        <span className="text-sm text-[#4f4f4f]">
                                            - {item.options?.adults} adult, {item.options?.children} child, {item.options?.infants} infant
                                        </span>
                                    </div>
                                    <span className="text-sm text-[#4f4f4f]">(${item.price})</span>
                                    {item.options?.date && (
                                        <div className="text-sm text-[#4f4f4f] mt-1">
                                            Date: {format(new Date(item.options.date), "MMM d, yyyy")}
                                        </div>
                                    )}
                                </div>
                                <button className="text-[#4f4f4f] hover:text-[#333333]" onClick={() => removeFromCart(item.id)}>
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center text-[#9ca3af] text-sm h-20">
                        Please select a product to continue.
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                    <span className="font-medium text-[#333333]">Total</span>
                    <span className="text-xl font-bold text-[#333333]">${total}</span>
                </div>
                <Button
                    className="mt-6 w-full bg-[#0f373d] hover:bg-[#0f373d]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleReserve}
                    disabled={items.length === 0}
                >
                    Reserve
                </Button>
            </div>
        </div>
    )

    // Mobile bottom bar with subtotal and Reserve button
    const mobileCartBar = (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 px-4 py-3">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    {items.length > 0 ? (
                        <>
                            <span className="text-sm text-[#4f4f4f]">Subtotal:</span>
                            <span className="text-xl font-bold text-[#333333]">${total} USD</span>
                        </>
                    ) : (
                        <span className="text-sm text-[#4f4f4f]">Please choose product</span>
                    )}
                </div>
                <Button
                    onClick={handleBottomBarReserve}
                    className="bg-[#0f373d] hover:bg-[#0f373d]/90"
                >
                    Reserve
                </Button>
            </div>
        </div>
    );

    // Mobile cart slide-in panel
    const mobileCartPanel = (
        <>
            {/* Backdrop */}
            {mobileCartOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
                    onClick={() => setMobileCartOpen(false)}
                />
            )}

            {/* Slide-in panel */}
            <div className={`lg:hidden fixed top-0 right-0 bottom-0 w-[85%] xs:w-[80%] sm:w-[70%] md:w-[60%] max-w-md bg-white z-50 cart-slide-in ${mobileCartOpen ? 'open' : 'closed'} shadow-xl rounded-l-2xl`}>
                {mobileCartOpen && (
                    <div className="relative h-full overflow-auto">
                        <button
                            className="absolute right-4 top-4 z-10 rounded-sm opacity-70 text-gray-500 hover:text-gray-900"
                            onClick={() => setMobileCartOpen(false)}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>
                        {cartContent}
                    </div>
                )}
            </div>
        </>
    );

    // Return different components based on screen size
    return (
        <>
            <style jsx global>{slideInStyles}</style>
            {/* Desktop sidebar */}
            <div className="hidden lg:block w-[400px] sticky top-[88px] self-start">
                {cartContent}
            </div>

            {/* Mobile cart bar and slide-in panel */}
            {mobileCartBar}
            {mobileCartPanel}
        </>
    )
} 