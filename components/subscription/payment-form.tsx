"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CreditCard, LockIcon } from "lucide-react"

// Mock data for demonstration
const plans = {
  free: {
    name: "Free",
    price: 0,
    billingCycle: "monthly",
  },
  personal: {
    name: "Personal",
    price: {
      monthly: 9.99,
      yearly: 99.99,
    },
  },
  family: {
    name: "Family",
    price: {
      monthly: 19.99,
      yearly: 199.99,
    },
  },
}

export function PaymentForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "personal"
  const cycle = searchParams.get("cycle") || "monthly"

  const [paymentMethod, setPaymentMethod] = useState("new-card")
  const [isProcessing, setIsProcessing] = useState(false)

  const plan = plans[planId as keyof typeof plans]
  const price = typeof plan.price === "number" ? plan.price : plan.price[cycle as keyof typeof plan.price]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      router.push("/dashboard/subscription?tab=details&success=true")
    }, 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" className="flex items-center gap-2 mb-6" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-2 border rounded-md p-4">
                    <RadioGroupItem value="new-card" id="new-card" />
                    <Label htmlFor="new-card" className="flex items-center gap-2 font-normal cursor-pointer">
                      <CreditCard className="h-5 w-5" />
                      Add new card
                    </Label>
                  </div>

                  {paymentMethod === "new-card" && (
                    <div className="space-y-4 pl-6 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiration Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name-on-card">Name on Card</Label>
                        <Input id="name-on-card" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-zip">Billing Zip Code</Label>
                        <Input id="billing-zip" required />
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <LockIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Your payment information is secure</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 border rounded-md p-4">
                    <RadioGroupItem value="saved-card" id="saved-card" />
                    <Label htmlFor="saved-card" className="flex items-center gap-2 font-normal cursor-pointer">
                      <CreditCard className="h-5 w-5" />
                      Visa ending in 4242
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-1" required />
              <div>
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </div>

            <div className="md:hidden">
              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? <>Processing Payment...</> : <>Complete Purchase</>}
              </Button>
            </div>
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">{plan.name} Plan</h3>
                  <p className="text-sm text-muted-foreground capitalize">{cycle} billing</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(price * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(price + price * 0.08).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {cycle === "monthly" ? "Billed monthly" : "Billed annually"}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="hidden md:block">
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? <>Processing Payment...</> : <>Complete Purchase</>}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

