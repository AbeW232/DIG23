"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for demonstration
const plans = {
  monthly: [
    {
      id: "free",
      name: "Free",
      description: "Basic features for personal use",
      price: 0,
      features: ["1 memorial page", "Basic templates", "500MB storage", "Standard support"],
      limitations: ["No custom domains", "Limited media uploads", "No family tree", "Basic analytics only"],
      isPopular: false,
      buttonText: "Current Plan",
      disabled: true,
    },
    {
      id: "personal",
      name: "Personal",
      description: "Enhanced features for individuals",
      price: 9.99,
      features: [
        "5 memorial pages",
        "All templates",
        "5GB storage",
        "Priority support",
        "Family tree (up to 50 members)",
        "Custom domain",
        "Ad-free experience",
      ],
      limitations: ["Limited analytics", "Basic exhibition features"],
      isPopular: true,
      buttonText: "Upgrade",
      disabled: false,
    },
    {
      id: "family",
      name: "Family",
      description: "Complete features for families",
      price: 19.99,
      features: [
        "Unlimited memorial pages",
        "Premium templates",
        "20GB storage",
        "Priority support",
        "Family tree (unlimited)",
        "Custom domain",
        "Ad-free experience",
        "Advanced analytics",
        "Enhanced exhibition features",
        "API access",
      ],
      limitations: [],
      isPopular: false,
      buttonText: "Upgrade",
      disabled: false,
    },
  ],
  yearly: [
    {
      id: "free",
      name: "Free",
      description: "Basic features for personal use",
      price: 0,
      features: ["1 memorial page", "Basic templates", "500MB storage", "Standard support"],
      limitations: ["No custom domains", "Limited media uploads", "No family tree", "Basic analytics only"],
      isPopular: false,
      buttonText: "Current Plan",
      disabled: true,
    },
    {
      id: "personal",
      name: "Personal",
      description: "Enhanced features for individuals",
      price: 99.99,
      features: [
        "5 memorial pages",
        "All templates",
        "5GB storage",
        "Priority support",
        "Family tree (up to 50 members)",
        "Custom domain",
        "Ad-free experience",
      ],
      limitations: ["Limited analytics", "Basic exhibition features"],
      isPopular: true,
      buttonText: "Upgrade",
      disabled: false,
      savings: "Save $19.89",
    },
    {
      id: "family",
      name: "Family",
      description: "Complete features for families",
      price: 199.99,
      features: [
        "Unlimited memorial pages",
        "Premium templates",
        "20GB storage",
        "Priority support",
        "Family tree (unlimited)",
        "Custom domain",
        "Ad-free experience",
        "Advanced analytics",
        "Enhanced exhibition features",
        "API access",
      ],
      limitations: [],
      isPopular: false,
      buttonText: "Upgrade",
      disabled: false,
      savings: "Save $39.89",
    },
  ],
}

export function SubscriptionPlans() {
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState("monthly")

  const handleUpgrade = (planId: string) => {
    router.push(`/dashboard/subscription/checkout?plan=${planId}&cycle=${billingCycle}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-8">
        <Tabs value={billingCycle} onValueChange={setBillingCycle} className="w-full max-w-xs">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans[billingCycle as keyof typeof plans].map((plan) => (
          <Card key={plan.id} className={`flex flex-col ${plan.isPopular ? "border-primary shadow-md" : ""}`}>
            {plan.isPopular && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{plan.name}</span>
                {plan.savings && (
                  <Badge variant="secondary" className="ml-2">
                    {plan.savings}
                  </Badge>
                )}
              </CardTitle>
              <p className="text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <span className="text-3xl font-bold">${plan.price}</span>
                {plan.price > 0 && (
                  <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Features</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <div className="pt-2">
                    <h4 className="font-medium flex items-center gap-1">
                      Limitations
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Features not included in this plan</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </h4>
                    <ul className="space-y-2 mt-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="block w-5 text-center">-</span>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.disabled ? "outline" : "default"}
                disabled={plan.disabled}
                onClick={() => handleUpgrade(plan.id)}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>All plans include a 14-day free trial. No credit card required.</p>
        <p className="mt-1">
          Need a custom plan for your organization?{" "}
          <a href="#" className="text-primary hover:underline">
            Contact us
          </a>
        </p>
      </div>
    </div>
  )
}

