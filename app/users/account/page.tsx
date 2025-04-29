import AccountClient from "./client"

// Force static để ngăn pre-rendering
export const dynamic = "force-static"

export default function AccountDetailsPage() {
  return <AccountClient />;
}

