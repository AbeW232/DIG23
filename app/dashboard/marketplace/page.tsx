import { DashboardLayout } from "@/components/dashboard-layout"
import { MarketplaceListings } from "@/components/marketplace/marketplace-listings"

export default function MarketplacePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
            <p className="text-muted-foreground mt-1">Browse and purchase digital legacy products and services</p>
          </div>
        </div>
        <MarketplaceListings />
      </div>
    </DashboardLayout>
  )
}

