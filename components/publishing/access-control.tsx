"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, DollarSign, Eye, Globe, Link, Lock, Save } from "lucide-react"

export function AccessControl() {
  const [activeTab, setActiveTab] = useState("visibility")
  const [isPaid, setIsPaid] = useState(false)
  const [price, setPrice] = useState("4.99")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Lock className="h-5 w-5 mr-2 text-primary" />
          Access Control
        </CardTitle>
        <CardDescription>Manage who can view your content and how they can access it</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="visibility" className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Visibility
            </TabsTrigger>
            <TabsTrigger value="sharing" className="flex items-center">
              <Link className="h-4 w-4 mr-2" />
              Sharing
            </TabsTrigger>
            <TabsTrigger value="monetization" className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Monetization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visibility" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="radio"
                        id="visibility-public"
                        name="visibility"
                        className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <Label htmlFor="visibility-public" className="font-medium flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-primary" />
                        Public
                      </Label>
                      <p className="text-muted-foreground mt-1">Anyone can view this content without restrictions.</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="radio"
                        id="visibility-private"
                        name="visibility"
                        className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <Label htmlFor="visibility-private" className="font-medium flex items-center">
                        <Lock className="h-4 w-4 mr-2 text-primary" />
                        Private
                      </Label>
                      <p className="text-muted-foreground mt-1">Only you can view this content.</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="radio"
                        id="visibility-link"
                        name="visibility"
                        className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <Label htmlFor="visibility-link" className="font-medium flex items-center">
                        <Link className="h-4 w-4 mr-2 text-primary" />
                        Link Sharing
                      </Label>
                      <p className="text-muted-foreground mt-1">Anyone with the link can view this content.</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="radio"
                        id="visibility-password"
                        name="visibility"
                        className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <Label htmlFor="visibility-password" className="font-medium flex items-center">
                        <Lock className="h-4 w-4 mr-2 text-primary" />
                        Password Protected
                      </Label>
                      <p className="text-muted-foreground mt-1">Viewers need a password to access this content.</p>
                      <div className="mt-2">
                        <Input type="password" placeholder="Set password" className="max-w-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-medium">Additional Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="search-indexing" className="flex items-center space-x-2">
                      <span>Allow search engines to index this content</span>
                    </Label>
                    <Switch id="search-indexing" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-author" className="flex items-center space-x-2">
                      <span>Show author information</span>
                    </Label>
                    <Switch id="show-author" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="allow-comments" className="flex items-center space-x-2">
                      <span>Allow comments and tributes</span>
                    </Label>
                    <Switch id="allow-comments" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sharing" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Share with Specific People</Label>
                <div className="flex space-x-2">
                  <Input placeholder="Enter email addresses" className="flex-1" />
                  <Select defaultValue="view">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Permission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">Can view</SelectItem>
                      <SelectItem value="comment">Can comment</SelectItem>
                      <SelectItem value="edit">Can edit</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>Invite</Button>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">People with Access</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        JS
                      </div>
                      <div>
                        <p className="text-sm font-medium">John Smith (You)</p>
                        <p className="text-xs text-muted-foreground">john.smith@example.com</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Owner</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                        SD
                      </div>
                      <div>
                        <p className="text-sm font-medium">Sarah Davis</p>
                        <p className="text-xs text-muted-foreground">sarah.davis@example.com</p>
                      </div>
                    </div>
                    <Select defaultValue="view">
                      <SelectTrigger className="h-8 w-[100px]">
                        <SelectValue placeholder="Permission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">Can view</SelectItem>
                        <SelectItem value="comment">Can comment</SelectItem>
                        <SelectItem value="edit">Can edit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Label>Get Shareable Link</Label>
                <div className="flex space-x-2">
                  <Input value="https://legacy-platform.com/memorial/john-doe" readOnly className="flex-1" />
                  <Button variant="outline">Copy Link</Button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-medium">Social Sharing</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="h-9">
                    <svg className="h-4 w-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="h-9">
                    <svg className="h-4 w-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="h-9">
                    <svg className="h-4 w-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="h-9">
                    <svg className="h-4 w-4 mr-2 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.5 6.75c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zm-9 0c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zM12 20a8 8 0 0 1-8-8 1 1 0 0 1 2 0 6 6 0 1 0 12 0 1 1 0 0 1 2 0 8 8 0 0 1-8 8zm0-6.5c-1.5 0-2.8-.9-3.3-2.3-.3-.7.3-1.4 1-1.4h4.6c.7 0 1.3.7 1 1.4-.5 1.4-1.8 2.3-3.3 2.3z" />
                    </svg>
                    Pinterest
                  </Button>
                  <Button variant="outline" size="sm" className="h-9">
                    <svg className="h-4 w-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    Instagram
                  </Button>
                  <Button variant="outline" size="sm" className="h-9">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                    YouTube
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monetization" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="paid-content" className="text-base">
                    Paid Content
                  </Label>
                  <p className="text-sm text-muted-foreground">Charge viewers to access this content</p>
                </div>
                <Switch id="paid-content" checked={isPaid} onCheckedChange={setIsPaid} />
              </div>

              {isPaid && (
                <div className="border rounded-md p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        id="price"
                        type="number"
                        min="0.99"
                        step="0.01"
                        className="pl-8"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Minimum price is $0.99. Platform fee is 10%.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-type">Payment Type</Label>
                    <Select defaultValue="one-time">
                      <SelectTrigger id="payment-type">
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One-time Purchase</SelectItem>
                        <SelectItem value="subscription">Subscription</SelectItem>
                        <SelectItem value="donation">Pay What You Want</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Preview Options</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="preview-sample" defaultChecked />
                        <Label htmlFor="preview-sample">Allow preview of sample content</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="preview-toc" defaultChecked />
                        <Label htmlFor="preview-toc">Show table of contents</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Promotional Options</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="promo-discount" />
                        <Label htmlFor="promo-discount">Enable discount codes</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="promo-trial" />
                        <Label htmlFor="promo-trial">Offer free trial period</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="promo-bundle" />
                        <Label htmlFor="promo-bundle">Include in content bundles</Label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="bg-muted/50 rounded-md p-3">
                      <h4 className="text-sm font-medium flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-primary" />
                        Earnings Estimate
                      </h4>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Price</span>
                          <span>${price}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Platform fee (10%)</span>
                          <span>-${(Number.parseFloat(price) * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Payment processing (2.9% + $0.30)</span>
                          <span>-${(Number.parseFloat(price) * 0.029 + 0.3).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-medium pt-1 border-t mt-1">
                          <span>Your earnings per sale</span>
                          <span>
                            $
                            {(
                              Number.parseFloat(price) -
                              Number.parseFloat(price) * 0.1 -
                              (Number.parseFloat(price) * 0.029 + 0.3)
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-medium">Access Expiration</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="expiration-never"
                      name="expiration"
                      className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <Label htmlFor="expiration-never" className="flex items-center">
                      <span>Never expires</span>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="expiration-date"
                      name="expiration"
                      className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="expiration-date" className="flex items-center">
                      <span>Expires on specific date</span>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="expiration-period"
                      name="expiration"
                      className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="expiration-period" className="flex items-center">
                      <span>Expires after period</span>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm">
          <Clock className="h-4 w-4 mr-2" />
          View History
        </Button>
        <Button size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  )
}

