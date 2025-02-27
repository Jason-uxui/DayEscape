import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"

export default function ComponentsDocumentationPage() {
  const components = [
    {
      name: "HotelSearchResults",
      dataSource: "Supabase",
      responsibilities: [
        "Fetches hotel data and product data from Supabase",
        "Combines hotel and product data",
        "Passes data to child components (HotelList and MapView)",
      ],
      integrationStatus: "Complete",
      dependencies: "None",
    },
    {
      name: "HotelList",
      dataSource: "Receives data from HotelSearchResults",
      responsibilities: ["Displays a list of hotel cards", "Handles hotel selection"],
      integrationStatus: "Complete",
      dependencies: "HotelSearchResults for data",
    },
    {
      name: "HotelCard",
      dataSource: "Receives data from HotelList",
      responsibilities: ["Displays individual hotel information", "Handles user interaction for hotel selection"],
      integrationStatus: "Complete",
      dependencies: "HotelList for data",
    },
    {
      name: "MapView",
      dataSource: "Receives data from HotelSearchResults, Mapbox API",
      responsibilities: [
        "Displays hotel locations on a map",
        "Handles map interactions (zoom, pan)",
        "Shows hotel information on marker click",
      ],
      integrationStatus: "Complete",
      dependencies: "HotelSearchResults for data, Mapbox for map rendering",
    },
    {
      name: "Search",
      dataSource: "None currently",
      responsibilities: [
        "Handles user input for search queries",
        "Should trigger search functionality (not implemented yet)",
      ],
      integrationStatus: "Needs implementation for actual search functionality",
      dependencies: "None currently, but will likely depend on a search API or Supabase query",
    },
    {
      name: "ProductList",
      dataSource: "Supabase",
      responsibilities: [
        "Fetches product data for a specific hotel",
        "Displays available products (day passes, cabanas, etc.)",
      ],
      integrationStatus: "Complete",
      dependencies: "None",
    },
    {
      name: "ProductDialog",
      dataSource: "Receives data from ProductList",
      responsibilities: ["Displays detailed product information", "Handles product selection and addition to cart"],
      integrationStatus: "Complete",
      dependencies: "ProductList for data, CartContext for cart operations",
    },
    {
      name: "CartSidebar",
      dataSource: "CartContext",
      responsibilities: ["Displays items in the cart", "Handles cart operations (remove items, update quantities)"],
      integrationStatus: "Complete",
      dependencies: "CartContext for data and operations",
    },
    {
      name: "CheckoutConfirmationSection",
      dataSource: "CartContext",
      responsibilities: ["Displays order summary", "Handles final order confirmation"],
      integrationStatus: "Complete",
      dependencies: "CartContext for order data",
    },
    {
      name: "BillingDetailsSection",
      dataSource: "None currently",
      responsibilities: [
        "Collects user billing information",
        "Should integrate with payment processing (not implemented yet)",
      ],
      integrationStatus: "Needs implementation for payment processing",
      dependencies: "None currently, but will likely depend on a payment API",
    },
    {
      name: "BookingConfirmedSection",
      dataSource: "CartContext",
      responsibilities: ["Displays booking confirmation details"],
      integrationStatus: "Complete",
      dependencies: "CartContext for booking data",
    },
    {
      name: "MyBookingsSection",
      dataSource: "Mock data currently",
      responsibilities: ["Should display user's bookings (needs real data integration)"],
      integrationStatus: "Needs implementation for fetching real booking data",
      dependencies: "Will depend on Supabase or an API for user booking data",
    },
    {
      name: "DiscoverMoreSection",
      dataSource: "Hardcoded data currently",
      responsibilities: ["Displays suggested hotels", "Should fetch real hotel recommendations (needs implementation)"],
      integrationStatus: "Needs implementation for fetching real hotel recommendations",
      dependencies: "Will depend on Supabase or an API for hotel recommendation data",
    },
  ]

  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0c363e] mb-6">Components Documentation</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#0c363e] text-white">
                <th className="p-3 text-left">Component</th>
                <th className="p-3 text-left">Data Source</th>
                <th className="p-3 text-left">Responsibilities</th>
                <th className="p-3 text-left">Integration Status</th>
                <th className="p-3 text-left">Dependencies</th>
              </tr>
            </thead>
            <tbody>
              {components.map((component, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3 border">{component.name}</td>
                  <td className="p-3 border">{component.dataSource}</td>
                  <td className="p-3 border">
                    <ul className="list-disc pl-4">
                      {component.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 border">{component.integrationStatus}</td>
                  <td className="p-3 border">{component.dependencies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

