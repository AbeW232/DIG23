"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Plus, Trash2 } from "lucide-react"

// Mock data for demonstration
const paymentMethods = [
  {
    id: "card1",
    type: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2024,
    isDefault: true,
  },
  {
    id: "card2",
    type: "mastercard",
    last4: "5555",
    expMonth: 8,
    expYear: 2025,
    isDefault: false,
  },
]

export function PaymentMethods() {
  const [methods, setMethods] = useState(paymentMethods)
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [defaultMethod, setDefaultMethod] = useState(methods.find((m) => m.isDefault)?.id || "")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [methodToDelete, setMethodToDelete] = useState<string | null>(null)

  const handleSetDefault = (id: string) => {
    setDefaultMethod(id)
    setMethods(
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const handleDeleteMethod = (id: string) => {
    setMethodToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (methodToDelete) {
      setMethods(methods.filter((method) => method.id !== methodToDelete))
      if (defaultMethod === methodToDelete && methods.length > 1) {
        const newDefault = methods.find((m) => m.id !== methodToDelete)?.id || ""
        setDefaultMethod(newDefault)
      }
      setMethodToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  const getCardIcon = (type: string) => {
    // This would be replaced with actual card brand icons
    return <CreditCard className="h-5 w-5" />
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment Methods</CardTitle>
            <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                  <DialogDescription>Add a new credit or debit card to your account.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiration Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name-on-card">Name on Card</Label>
                    <Input id="name-on-card" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-zip">Billing Zip Code</Label>
                    <Input id="billing-zip" />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingCard(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddingCard(false)}>Add Card</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup value={defaultMethod} onValueChange={handleSetDefault} className="space-y-4">
            {methods.map((method) => (
              <div key={method.id} className="flex items-center justify-between space-x-2 border rounded-md p-4">
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <div className="flex items-center gap-3">
                    {getCardIcon(method.type)}
                    <div>
                      <Label htmlFor={method.id} className="font-normal">
                        {method.type.charAt(0).toUpperCase() + method.type.slice(1)} ending in {method.last4}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Expires {method.expMonth}/{method.expYear}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault && <Badge variant="outline">Default</Badge>}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteMethod(method.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </RadioGroup>

          {methods.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No payment methods</h3>
              <p className="text-muted-foreground mb-6">You haven't added any payment methods yet.</p>
              <Button onClick={() => setIsAddingCard(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove this payment method from your account. Any active subscriptions using this payment method
              will need to be updated.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

