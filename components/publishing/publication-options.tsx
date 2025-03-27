"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Globe, Lock, DollarSign, Info, Eye, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

interface PublicationOptionsProps {
  onSave?: (options: PublicationSettings) => void
  className?: string
}

interface PublicationSettings {
  accessType: "public" | "private" | "paid" | "scheduled"
  price?: number
  currency?: string
  scheduledDate?: Date
  allowComments: boolean
  allowSharing: boolean
  password?: string
  distributionChannels: string[]
}

export function PublicationOptions({ onSave, className }: PublicationOptionsProps) {
  const [settings, setSettings] = useState<PublicationSettings>({
    accessType: "public",
    allowComments: true,
    allowSharing: true,
    distributionChannels: ["website"],
  })

  const [date, setDate] = useState<Date>()
  const { toast } = useToast()

  const handleAccessTypeChange = (value: "public" | "private" | "paid" | "scheduled") => {
    setSettings({ ...settings, accessType: value })
  }

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...settings,
        scheduledDate: date,
      })
    }

    toast({
      title: "Settings Saved",
      description: "Your publication settings have been saved successfully.",
      variant: "success",
    })
  }

  return (
    <Card className={cn("w-full shadow-sm border-none", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Globe className="h-5 w-5 text-primary" />
          Publication Options
        </CardTitle>
        <CardDescription>Configure how your content will be published and accessed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Access Control</h3>
          <RadioGroup
            value={settings.accessType}
            onValueChange={(value: "public" | "private" | "paid" | "scheduled") => handleAccessTypeChange(value)}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <div>
              <RadioGroupItem value="public" id="public" className="peer sr-only" />
              <Label
                htmlFor="public"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Globe className="mb-3 h-6 w-6" />
                <span className="text-sm font-medium">Public</span>
                <span className="text-xs text-muted-foreground">Anyone can view</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="private" id="private" className="peer sr-only" />
              <Label
                htmlFor="private"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Lock className="mb-3 h-6 w-6" />
                <span className="text-sm font-medium">Private</span>
                <span className="text-xs text-muted-foreground">Password protected</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="paid" id="paid" className="peer sr-only" />
              <Label
                htmlFor="paid"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <DollarSign className="mb-3 h-6 w-6" />
                <span className="text-sm font-medium">Paid</span>
                <span className="text-xs text-muted-foreground">Requires purchase</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="scheduled" id="scheduled" className="peer sr-only" />
              <Label
                htmlFor="scheduled"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <CalendarIcon className="mb-3 h-6 w-6" />
                <span className="text-sm font-medium">Scheduled</span>
                <span className="text-xs text-muted-foreground">Publish later</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {settings.accessType === "private" && (
          <div className="space-y-2 bg-muted/20 p-4 rounded-lg border border-muted">
            <Label htmlFor="password">Password Protection</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password for access"
              value={settings.password || ""}
              onChange={(e) => setSettings({ ...settings, password: e.target.value })}
            />
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <Info className="h-3 w-3 mr-1" />
              Only people with the password will be able to view this content
            </p>
          </div>
        )}

        {settings.accessType === "paid" && (
          <div className="space-y-4 bg-muted/20 p-4 rounded-lg border border-muted">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={settings.price || ""}
                  onChange={(e) => setSettings({ ...settings, price: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={settings.currency || "USD"}
                  onValueChange={(value) => setSettings({ ...settings, currency: value })}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="CAD">CAD ($)</SelectItem>
                    <SelectItem value="AUD">AUD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-md border border-blue-100">
              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm text-blue-700">Payment Processing</p>
                <p className="text-xs text-blue-600 mt-0.5">
                  You'll receive 85% of the sale price after payment processing fees
                </p>
              </div>
            </div>
          </div>
        )}

        {settings.accessType === "scheduled" && (
          <div className="space-y-2 bg-muted/20 p-4 rounded-lg border border-muted">
            <Label>Publication Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <Info className="h-3 w-3 mr-1" />
              Your content will be automatically published on this date
            </p>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Distribution Channels</h3>
          <Tabs defaultValue="channels" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="channels" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-3 p-3 rounded-md border hover:bg-muted/20 transition-colors">
                  <Switch
                    id="website"
                    checked={settings.distributionChannels.includes("website")}
                    onCheckedChange={(checked) => {
                      const channels = checked
                        ? [...settings.distributionChannels, "website"]
                        : settings.distributionChannels.filter((c) => c !== "website")
                      setSettings({ ...settings, distributionChannels: channels })
                    }}
                  />
                  <div className="space-y-0.5">
                    <Label htmlFor="website" className="text-sm">
                      Website
                    </Label>
                    <p className="text-xs text-muted-foreground">Publish to your personal website</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-md border hover:bg-muted/20 transition-colors">
                  <Switch
                    id="ebook"
                    checked={settings.distributionChannels.includes("ebook")}
                    onCheckedChange={(checked) => {
                      const channels = checked
                        ? [...settings.distributionChannels, "ebook"]
                        : settings.distributionChannels.filter((c) => c !== "ebook")
                      setSettings({ ...settings, distributionChannels: channels })
                    }}
                  />
                  <div className="space-y-0.5">
                    <Label htmlFor="ebook" className="text-sm">
                      E-book Stores
                    </Label>
                    <p className="text-xs text-muted-foreground">Distribute as an e-book</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-md border hover:bg-muted/20 transition-colors">
                  <Switch
                    id="print"
                    checked={settings.distributionChannels.includes("print")}
                    onCheckedChange={(checked) => {
                      const channels = checked
                        ? [...settings.distributionChannels, "print"]
                        : settings.distributionChannels.filter((c) => c !== "print")
                      setSettings({ ...settings, distributionChannels: channels })
                    }}
                  />
                  <div className="space-y-0.5">
                    <Label htmlFor="print" className="text-sm">
                      Print-on-Demand
                    </Label>
                    <p className="text-xs text-muted-foreground">Create physical copies</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-md border hover:bg-muted/20 transition-colors">
                  <Switch
                    id="social"
                    checked={settings.distributionChannels.includes("social")}
                    onCheckedChange={(checked) => {
                      const channels = checked
                        ? [...settings.distributionChannels, "social"]
                        : settings.distributionChannels.filter((c) => c !== "social")
                      setSettings({ ...settings, distributionChannels: channels })
                    }}
                  />
                  <div className="space-y-0.5">
                    <Label htmlFor="social" className="text-sm">
                      Social Media
                    </Label>
                    <p className="text-xs text-muted-foreground">Share on social platforms</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="preview" className="py-4">
              <div className="rounded-md border p-6 flex items-center justify-center">
                <div className="text-center">
                  <Eye className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium">Preview your publication</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                    See how your content will appear on different platforms before publishing
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Open Preview
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Interaction Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2 p-3 rounded-md border hover:bg-muted/20 transition-colors">
              <div className="flex items-center justify-between">
                <Label htmlFor="comments" className="flex-1">
                  Allow Comments
                </Label>
                <Switch
                  id="comments"
                  checked={settings.allowComments}
                  onCheckedChange={(checked) => setSettings({ ...settings, allowComments: checked })}
                />
              </div>
              <p className="text-xs text-muted-foreground">Let readers leave comments on your published content</p>
            </div>

            <div className="space-y-2 p-3 rounded-md border hover:bg-muted/20 transition-colors">
              <div className="flex items-center justify-between">
                <Label htmlFor="sharing" className="flex-1">
                  Allow Sharing
                </Label>
                <Switch
                  id="sharing"
                  checked={settings.allowSharing}
                  onCheckedChange={(checked) => setSettings({ ...settings, allowSharing: checked })}
                />
              </div>
              <p className="text-xs text-muted-foreground">Enable social sharing options for your content</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="text-sm font-medium text-green-800 flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
            Publication Checklist
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm text-green-800">Title and description are complete</p>
                <p className="text-xs text-green-600">Your content has a clear title and description</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm text-green-800">Featured image is set</p>
                <p className="text-xs text-green-600">Your publication has an attractive cover image</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800">Categories and tags</p>
                <p className="text-xs text-amber-600">Add at least 3 relevant tags to improve discoverability</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button onClick={handleSave} className="ml-auto">
          Save Publication Settings
        </Button>
      </CardFooter>
    </Card>
  )
}

