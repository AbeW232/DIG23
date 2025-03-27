import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { PaymentForm } from "@/components/subscription/payment-form"

export const metadata: Metadata = {
  title: "Checkout | Subscription | Digital Legacy Platform",
  description: "Complete your subscription purchase",
}

export default function SubscriptionCheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Complete Your Purchase"
        description="Finalize your subscription plan"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Subscription", href: "/dashboard/subscription" },
          { label: "Checkout", href: "/dashboard/subscription/checkout" },
        ]}
      />
      <PaymentForm />
    </div>
  )
}

