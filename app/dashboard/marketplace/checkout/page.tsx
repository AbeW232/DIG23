import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { MarketplaceCheckout } from "@/components/marketplace/marketplace-checkout"

export const metadata: Metadata = {
  title: "Checkout | Marketplace | Digital Legacy Platform",
  description: "Complete your purchase of digital legacy products and services",
}

export default function MarketplaceCheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Checkout"
        description="Complete your purchase"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Marketplace", href: "/dashboard/marketplace" },
          { label: "Cart", href: "/dashboard/marketplace/cart" },
          { label: "Checkout", href: "/dashboard/marketplace/checkout" },
        ]}
      />
      <MarketplaceCheckout />
    </div>
  )
}

