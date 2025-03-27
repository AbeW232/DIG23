"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubscriptionPlans } from "./subscription-plans"
import { SubscriptionDetails } from "./subscription-details"
import { PaymentMethods } from "./payment-methods"
import { BillingHistory } from "./billing-history"

export function SubscriptionTabs() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("plans")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["plans", "details", "payment", "history"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/dashboard/subscription?tab=${value}`, { scroll: false })
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid grid-cols-4 w-full md:w-auto">
        <TabsTrigger value="plans">Plans</TabsTrigger>
        <TabsTrigger value="details">Current Plan</TabsTrigger>
        <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        <TabsTrigger value="history">Billing History</TabsTrigger>
      </TabsList>

      <TabsContent value="plans" className="mt-6">
        <SubscriptionPlans />
      </TabsContent>

      <TabsContent value="details" className="mt-6">
        <SubscriptionDetails />
      </TabsContent>

      <TabsContent value="payment" className="mt-6">
        <PaymentMethods />
      </TabsContent>

      <TabsContent value="history" className="mt-6">
        <BillingHistory />
      </TabsContent>
    </Tabs>
  )
}

