"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Check, CreditCard, HelpCircle, Info } from "lucide-react"

// Mock data for demonstration
const subscriptionData = {
  plan: "Personal",
  status: "active",
  billingCycle: "monthly",
  price: 9.99,
  nextBillingDate: "May 15, 2023",
  startDate: "April 15, 2023",
  paymentMethod: "Visa ending in 4242",
  features: [
    "5 memorial pages",
    "All templates",
    "5GB storage",
    "Priority support",
    "Family tree (up to 50 members)",
    "Custom domain",
    "Ad-free experience",
  ],
  usage: {
    memorialPages: {
      used: 2,
      total: 5,
      percentage: 40,
    },
    storage: {
      used: 1.2,
      total: 5,
      percentage: 24,
    },
  },
}

export function SubscriptionDetails() {
  const router = useRouter()
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)

  const handleUpgrade = () => {
    router.push("/dashboard/subscription?tab=plans")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                Current Plan: {subscriptionData.plan}
                <Badge variant="outline" className="ml-2">
                  {subscriptionData.billingCycle}
                </Badge>
              </CardTitle>
              <p className="text-muted-foreground mt-1">${subscriptionData.price}/month</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleUpgrade}>
                Upgrade Plan
              </Button>
              <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                    Cancel Plan
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your subscription will remain active until the end of your current billing period on{" "}
                      {subscriptionData.nextBillingDate}. After that, your account will be downgraded to the Free plan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Cancel Subscription
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Next billing date</p>
                  <p className="text-sm text-muted-foreground">{subscriptionData.nextBillingDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Payment method</p>
                  <p className="text-sm text-muted-foreground">{subscriptionData.paymentMethod}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Subscription started</p>
                  <p className="text-sm text-muted-foreground">{subscriptionData.startDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Plan Features</h3>
              <ul className="space-y-2">
                {subscriptionData.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 space-y-6">
            <h3 className="text-lg font-medium">Usage</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Memorial Pages</p>
                  <p className="text-sm text-muted-foreground">
                    {subscriptionData.usage.memorialPages.used} of {subscriptionData.usage.memorialPages.total} used
                  </p>
                </div>
                <Progress value={subscriptionData.usage.memorialPages.percentage} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Storage</p>
                  <p className="text-sm text-muted-foreground">
                    {subscriptionData.usage.storage.used}GB of {subscriptionData.usage.storage.total}GB used
                  </p>
                </div>
                <Progress value={subscriptionData.usage.storage.percentage} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 flex items-start gap-2 text-sm">
          <HelpCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-muted-foreground">
            Need help with your subscription?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact support
            </a>{" "}
            or visit our{" "}
            <a href="#" className="text-primary hover:underline">
              FAQ
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

