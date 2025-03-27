import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { MarketplaceCart } from "@/components/marketplace/marketplace-cart"

export const metadata: Metadata = {
  title: "Shopping Cart | Marketplace | Digital Legacy Platform",
  description: "View and manage items in your shopping cart",
}

export default function MarketplaceCartPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Shopping Cart"
        description="Review and manage items in your cart"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Marketplace", href: "/dashboard/marketplace" },
          { label: "Cart", href: "/dashboard/marketplace/cart" },
        ]}
      />
      <MarketplaceCart />
    </div>
  )
}

