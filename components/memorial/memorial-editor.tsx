"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, ImagePlus, Save, Trash2 } from "lucide-react"

export function MemorialEditor() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [birthDate, setBirthDate] = useState<Date>()
  const [passedDate, setPassedDate] = useState<Date>()

  const handleSave = () => {
    // Save logic would go here
    router.push("/memorial")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Memorial Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="biography">Biography</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, State/Country" />
              </div>

              <div className="space-y-2">
                <Label>Birth Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !birthDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {birthDate ? format(birthDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={birthDate} onSelect={setBirthDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Date of Passing</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !passedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {passedDate ? format(passedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={passedDate} onSelect={setPassedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote">Memorable Quote</Label>
              <Textarea id="quote" placeholder="Enter a memorable quote" />
            </div>
          </TabsContent>

          <TabsContent value="biography" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="biography">Biography</Label>
              <Textarea
                id="biography"
                placeholder="Write about their life, achievements, and legacy..."
                className="min-h-[200px]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Timeline Events</h3>
                <Button variant="outline" size="sm">
                  Add Event
                </Button>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="event-year-1">Year</Label>
                        <Input id="event-year-1" placeholder="Year" defaultValue="1945" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="event-title-1">Event Title</Label>
                        <Input id="event-title-1" placeholder="Event title" defaultValue="Born in Chicago, Illinois" />
                      </div>
                      <div className="flex items-end">
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="event-year-2">Year</Label>
                        <Input id="event-year-2" placeholder="Year" defaultValue="1967" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="event-title-2">Event Title</Label>
                        <Input
                          id="event-title-2"
                          placeholder="Event title"
                          defaultValue="Graduated from University of Washington"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6 mt-6">
            <div className="space-y-4">
              <Label>Cover Photo</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/50">
                <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
                <p className="text-xs text-muted-foreground">Recommended size: 1200 x 400 pixels</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Select Image
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Profile Photo</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/50">
                <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
                <p className="text-xs text-muted-foreground">Recommended size: 400 x 400 pixels</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Select Image
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Gallery Images</Label>
                <Button variant="outline" size="sm">
                  Add Images
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">No images added yet. Add images to create a gallery.</p>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="visibility">Visibility</Label>
              <select
                id="visibility"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="public">Public - Anyone can view</option>
                <option value="private">Private - Only those with the link can view</option>
                <option value="password">Password Protected</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comments & Tributes</Label>
              <select
                id="comments"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="enabled">Enabled - Anyone can leave tributes</option>
                <option value="moderated">Moderated - Require approval</option>
                <option value="disabled">Disabled - No tributes allowed</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Memorial Template</Label>
              <select
                id="template"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
                <option value="elegant">Elegant</option>
                <option value="nature">Nature</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                <a href="/memorial/templates" className="text-primary hover:underline">
                  Browse all templates
                </a>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Memorial
        </Button>
      </CardFooter>
    </Card>
  )
}

