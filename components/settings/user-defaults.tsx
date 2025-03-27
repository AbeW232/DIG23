"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, Moon, Save, Sun, SunMoon } from "lucide-react"

export function UserDefaults() {
  const [activeTab, setActiveTab] = useState("appearance")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="appearance" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
        </TabsList>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6 mt-6">
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Configure default theme and appearance settings for users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Default Theme Mode</Label>
                <RadioGroup defaultValue="system">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-accent">
                      <RadioGroupItem value="light" id="light" className="sr-only" />
                      <Label htmlFor="light" className="flex flex-col items-center gap-2 cursor-pointer">
                        <Sun className="h-6 w-6 mb-2" />
                        <span>Light</span>
                        <span className="text-xs text-muted-foreground">Light mode interface</span>
                      </Label>
                    </div>
                    <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-accent">
                      <RadioGroupItem value="dark" id="dark" className="sr-only" />
                      <Label htmlFor="dark" className="flex flex-col items-center gap-2 cursor-pointer">
                        <Moon className="h-6 w-6 mb-2" />
                        <span>Dark</span>
                        <span className="text-xs text-muted-foreground">Dark mode interface</span>
                      </Label>
                    </div>
                    <div className="flex flex-col items-center justify-between rounded-md border-2 border-accent p-4 hover:border-accent">
                      <RadioGroupItem value="system" id="system" className="sr-only" />
                      <Label htmlFor="system" className="flex flex-col items-center gap-2 cursor-pointer">
                        <SunMoon className="h-6 w-6 mb-2" />
                        <span>System</span>
                        <span className="text-xs text-muted-foreground">Follow system preference</span>
                        <Check className="h-4 w-4 text-primary" />
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Color Theme</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {[
                    "slate",
                    "zinc",
                    "stone",
                    "gray",
                    "neutral",
                    "red",
                    "rose",
                    "orange",
                    "amber",
                    "yellow",
                    "lime",
                    "green",
                    "emerald",
                    "teal",
                    "cyan",
                    "sky",
                    "blue",
                    "indigo",
                    "violet",
                    "purple",
                    "fuchsia",
                    "pink",
                  ].map((color) => (
                    <div
                      key={color}
                      className={`h-10 rounded-md cursor-pointer ${color === "blue" ? "ring-2 ring-primary ring-offset-2" : ""}`}
                      style={{ backgroundColor: `var(--${color}-9)` }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Default Font</Label>
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                    <SelectItem value="lato">Lato</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Default Font Size</Label>
                  <span className="text-sm font-medium">16px</span>
                </div>
                <Slider defaultValue={[16]} min={12} max={24} step={1} />
              </div>

              <div className="space-y-2">
                <Label>Content Density</Label>
                <Select defaultValue="comfortable">
                  <SelectTrigger>
                    <SelectValue placeholder="Select density" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Interface Animations</Label>
                  <div className="text-sm text-muted-foreground">Enable UI animations and transitions</div>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Appearance Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Accessibility Tab */}
        <TabsContent value="accessibility" className="space-y-6 mt-6">
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Accessibility Settings</CardTitle>
              <CardDescription>Configure default accessibility settings for users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">High Contrast Mode</Label>
                  <div className="text-sm text-muted-foreground">Increase contrast for better visibility</div>
                </div>
                <Switch id="high-contrast" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduce-motion">Reduce Motion</Label>
                  <div className="text-sm text-muted-foreground">Minimize animations and transitions</div>
                </div>
                <Switch id="reduce-motion" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="screen-reader">Screen Reader Optimization</Label>
                  <div className="text-sm text-muted-foreground">Optimize content for screen readers</div>
                </div>
                <Switch id="screen-reader" defaultChecked />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Text Spacing</Label>
                  <span className="text-sm font-medium">Normal</span>
                </div>
                <Slider defaultValue={[1]} min={0.8} max={2} step={0.1} />
              </div>

              <div className="space-y-2">
                <Label>Focus Indicator Style</Label>
                <Select defaultValue="outline">
                  <SelectTrigger>
                    <SelectValue placeholder="Select focus style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="solid">Solid Background</SelectItem>
                    <SelectItem value="glow">Glow Effect</SelectItem>
                    <SelectItem value="underline">Underline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Keyboard Navigation</Label>
                <Select defaultValue="enhanced">
                  <SelectTrigger>
                    <SelectValue placeholder="Select keyboard navigation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="enhanced">Enhanced</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Accessibility Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Behavior Tab */}
        <TabsContent value="behavior" className="space-y-6 mt-6">
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Behavior Settings</CardTitle>
              <CardDescription>Configure default behavior and interaction settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Landing Page</Label>
                <Select defaultValue="dashboard">
                  <SelectTrigger>
                    <SelectValue placeholder="Select landing page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="stories">Stories</SelectItem>
                    <SelectItem value="media">Media Library</SelectItem>
                    <SelectItem value="exhibitions">Exhibitions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Default Story View</Label>
                <Select defaultValue="grid">
                  <SelectTrigger>
                    <SelectValue placeholder="Select story view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid View</SelectItem>
                    <SelectItem value="list">List View</SelectItem>
                    <SelectItem value="timeline">Timeline View</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Items Per Page</Label>
                <Select defaultValue="20">
                  <SelectTrigger>
                    <SelectValue placeholder="Select items per page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 items</SelectItem>
                    <SelectItem value="20">20 items</SelectItem>
                    <SelectItem value="50">50 items</SelectItem>
                    <SelectItem value="100">100 items</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">Auto-Save Drafts</Label>
                  <div className="text-sm text-muted-foreground">Automatically save story drafts</div>
                </div>
                <Switch id="auto-save" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Auto-Save Interval</Label>
                <Select defaultValue="2">
                  <SelectTrigger>
                    <SelectValue placeholder="Select auto-save interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="2">2 minutes</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="confirm-actions">Confirm Important Actions</Label>
                  <div className="text-sm text-muted-foreground">Show confirmation dialogs for important actions</div>
                </div>
                <Switch id="confirm-actions" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="inline-editing">Inline Editing</Label>
                  <div className="text-sm text-muted-foreground">Enable inline editing of content</div>
                </div>
                <Switch id="inline-editing" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="Select session timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="never">Never timeout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Behavior Settings
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Notification Defaults</CardTitle>
              <CardDescription>Configure default notification settings for new users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <div className="text-sm text-muted-foreground">Send notifications via email</div>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="browser-notifications">Browser Notifications</Label>
                  <div className="text-sm text-muted-foreground">Show browser push notifications</div>
                </div>
                <Switch id="browser-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                  <div className="text-sm text-muted-foreground">Show notifications within the application</div>
                </div>
                <Switch id="in-app-notifications" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Notification Frequency</Label>
                <Select defaultValue="immediate">
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

