"use client"

interface KeyInfoSectionProps {
  hotelInfo: {
    check_in: string | null
    check_out: string | null
    facility_hours: {
      pool?: string
      restaurant?: {
        breakfast?: string
        lunch?: string
        dinner?: string
      }
    } | null
    custom_note: string | null
  }
}

export default function KeyInfoSection({ hotelInfo }: KeyInfoSectionProps) {
  // Fallback message for missing data
  const NOT_AVAILABLE = "Information not available"

  // Helper function to format facility hours
  const formatFacilityHours = (hours: string | undefined) => {
    return hours || NOT_AVAILABLE
  }

  return (
    <div className="space-y-12">
      {/* How it works */}
      <section>
        <h2 className="text-2xl font-semibold text-[#111827]">How it works</h2>
        <div className="mt-6 space-y-4">
          {[
            "Select an available day in the calendar, the number of guests, and complete booking",
            "Receive booking confirmation with details and instructions",
            "Bring valid photo ID and check-in at the Pool Concierge",
            "Enjoy your daycation!",
          ].map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#b6e2eb] text-sm font-medium text-[#0f373d]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="mt-1 text-[#374151]">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Day Pass hours */}
      <section>
        <h2 className="text-2xl font-semibold text-[#111827]">Day Pass hours</h2>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between">
            <span className="text-[#374151]">Check-in</span>
            <span className="text-[#374151]">
              {hotelInfo.check_in ? `Anytime from ${hotelInfo.check_in}` : NOT_AVAILABLE}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#374151]">Check-out</span>
            <span className="text-[#374151]">{hotelInfo.check_out ? `By ${hotelInfo.check_out}` : NOT_AVAILABLE}</span>
          </div>
        </div>
      </section>

      {/* Facility Hours */}
      <section>
        <h2 className="text-2xl font-semibold text-[#111827]">Facility Hours</h2>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between">
            <span className="text-[#374151]">Pool:</span>
            <span className="text-[#374151]">
              {hotelInfo.facility_hours?.pool ? formatFacilityHours(hotelInfo.facility_hours.pool) : NOT_AVAILABLE}
            </span>
          </div>
          {hotelInfo.facility_hours?.restaurant && (
            <div className="flex flex-col">
              <div className="flex justify-between">
                <span className="text-[#374151]">Social club restaurant:</span>
                <div className="text-right">
                  {hotelInfo.facility_hours.restaurant.breakfast && (
                    <p className="text-[#374151]">{hotelInfo.facility_hours.restaurant.breakfast} (Breakfast)</p>
                  )}
                  {hotelInfo.facility_hours.restaurant.lunch && (
                    <p className="text-[#374151]">{hotelInfo.facility_hours.restaurant.lunch} (Lunch)</p>
                  )}
                  {hotelInfo.facility_hours.restaurant.dinner && (
                    <p className="text-[#374151]">{hotelInfo.facility_hours.restaurant.dinner} (Dinner)</p>
                  )}
                  {!hotelInfo.facility_hours.restaurant.breakfast &&
                    !hotelInfo.facility_hours.restaurant.lunch &&
                    !hotelInfo.facility_hours.restaurant.dinner && <p className="text-[#374151]">{NOT_AVAILABLE}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Special Note */}
      {hotelInfo.custom_note && (
        <section>
          <h2 className="text-2xl font-semibold text-[#111827]">Special Note</h2>
          <div className="mt-4">
            <p className="text-[#374151]">{hotelInfo.custom_note}</p>
          </div>
        </section>
      )}
    </div>
  )
}

