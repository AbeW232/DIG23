import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { MarketplaceItemDetail } from "@/components/marketplace/marketplace-item-detail"

export const metadata: Metadata = {
  title: "Product Details | Marketplace | Digital Legacy Platform",
  description: "View detailed information about marketplace products and services",
}

export default function MarketplaceItemPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Product Details"
        description="View detailed information about this product"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Marketplace", href: "/dashboard/marketplace" },
          { label: "Product Details", href: `/dashboard/marketplace/item/${params.id}` },
        ]}
      />
      <MarketplaceItemDetail itemId={params.id} />
    </div>
  )
}

