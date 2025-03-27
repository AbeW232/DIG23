"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Bell,
  Camera,
  Eye,
  Globe,
  Key,
  Lock,
  Mail,
  Save,
  Shield,
  Smartphone,
  Trash2,
  Upload,
  Users,
  MessageSquare,
  ThumbsUp,
  AtSign,
  Lightbulb,
  Tag,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("account")

  // Enhance the profile settings UI with better visual design
  // Update the account settings tab with improved visuals
  return (
    <div className="space-y-6">
      <Tabs defaultValue="account" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="account">Account Settings</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Controls</TabsTrigger>
          <TabsTrigger value="notifications">Notification Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 border-muted shadow-sm overflow-hidden">
              <CardHeader className="bg-muted/30 pb-3">
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile picture</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 pt-6">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-md">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="User" />
                    <AvatarFallback className="text-4xl bg-primary/10 text-primary font-medium">JD</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="shadow-sm hover:shadow transition-all">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <Button variant="outline" size="sm" className="shadow-sm hover:shadow transition-all">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border-muted shadow-sm">
              <CardHeader className="bg-muted/30 pb-3">
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="John" className="transition-all focus-visible:ring-offset-2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Doe" className="transition-all focus-visible:ring-offset-2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="transition-all focus-visible:ring-offset-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="transition-all focus-visible:ring-offset-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Digital storyteller passionate about preserving family memories and traditions."
                    className="min-h-[100px] resize-none transition-all focus-visible:ring-offset-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    defaultValue="New York, USA"
                    className="transition-all focus-visible:ring-offset-2"
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button className="w-full shadow-sm hover:shadow transition-all">
                  <Save className="h-4 w-4 mr-2" />
                  Save Personal Information
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="border-muted shadow-sm">
            <CardHeader className="bg-muted/30 pb-3">
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4 bg-muted/20 p-4 rounded-lg">
                  <h3 className="font-medium text-base">Password Management</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="transition-all focus-visible:ring-offset-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="transition-all focus-visible:ring-offset-2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="transition-all focus-visible:ring-offset-2"
                    />
                  </div>
                  <Button className="w-full">
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-base">Security Options</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor" className="cursor-pointer">
                        Two-Factor Authentication
                      </Label>
                      <div className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <Switch id="two-factor" className="data-[state=checked]:bg-green-500" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="login-alerts" className="cursor-pointer">
                        Login Alerts
                      </Label>
                      <div className="text-sm text-muted-foreground">Receive alerts for new login attempts</div>
                    </div>
                    <Switch id="login-alerts" defaultChecked className="data-[state=checked]:bg-green-500" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="recovery-email" className="cursor-pointer">
                        Recovery Email
                      </Label>
                      <div className="text-sm text-muted-foreground">Set up a recovery email address</div>
                    </div>
                    <Switch id="recovery-email" defaultChecked className="data-[state=checked]:bg-green-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-base">Recent Login Activity</h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-3 border rounded-md bg-muted/20 hover:bg-muted/30 transition-colors"
                      >
                        <div>
                          <div className="font-medium">New York, USA</div>
                          <div className="text-xs text-muted-foreground">Chrome on Windows • March 20, 2024</div>
                        </div>
                        <div className="text-xs text-green-500 font-medium flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          Current
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View All Activity
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-muted shadow-sm">
            <CardHeader className="bg-muted/30 pb-3">
              <CardTitle>Account Preferences</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="transition-all focus-visible:ring-offset-2">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Time Zone</Label>
                    <Select defaultValue="est">
                      <SelectTrigger className="transition-all focus-visible:ring-offset-2">
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger className="transition-all focus-visible:ring-offset-2">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme Preference</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="border rounded-md p-3 flex flex-col items-center gap-2 cursor-pointer hover:border-primary transition-colors">
                        <div className="w-full h-12 bg-white border rounded-md"></div>
                        <div className="text-sm font-medium">Light</div>
                      </div>
                      <div className="border rounded-md p-3 flex flex-col items-center gap-2 cursor-pointer hover:border-primary transition-colors">
                        <div className="w-full h-12 bg-slate-900 border rounded-md"></div>
                        <div className="text-sm font-medium">Dark</div>
                      </div>
                      <div className="border rounded-md p-3 flex flex-col items-center gap-2 cursor-pointer hover:border-primary transition-colors border-primary">
                        <div className="w-full h-12 bg-gradient-to-r from-white to-slate-900 border rounded-md"></div>
                        <div className="text-sm font-medium">System</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-save" className="cursor-pointer">
                        Auto-save Content
                      </Label>
                      <div className="text-sm text-muted-foreground">Automatically save content while editing</div>
                    </div>
                    <Switch id="auto-save" defaultChecked className="data-[state=checked]:bg-green-500" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-tips" className="cursor-pointer">
                        Show Tips & Hints
                      </Label>
                      <div className="text-sm text-muted-foreground">Display helpful tips throughout the interface</div>
                    </div>
                    <Switch id="show-tips" defaultChecked className="data-[state=checked]:bg-green-500" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t px-6 py-4">
              <Button variant="outline">Reset to Defaults</Button>
              <Button className="shadow-sm hover:shadow transition-all">Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card className="border-destructive/50 shadow-sm">
            <CardHeader className="bg-destructive/5 pb-3">
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible account actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 p-4 border border-muted rounded-lg">
                  <div className="font-medium">Deactivate Account</div>
                  <p className="text-sm text-muted-foreground">
                    Temporarily deactivate your account. You can reactivate it later.
                  </p>
                  <Button variant="outline" className="mt-2">
                    Deactivate Account
                  </Button>
                </div>

                <div className="space-y-2 p-4 border border-destructive/30 rounded-lg">
                  <div className="font-medium text-destructive">Delete Account</div>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" className="mt-2">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Visibility</CardTitle>
                <CardDescription>Control who can see your profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select defaultValue="friends">
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (Anyone can view)</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private (Only you)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Information Visibility</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-email" className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Address
                      </Label>
                      <Select defaultValue="private">
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-phone" className="flex items-center text-sm">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Phone Number
                      </Label>
                      <Select defaultValue="private">
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-location" className="flex items-center text-sm">
                        <Globe className="h-4 w-4 mr-2" />
                        Location
                      </Label>
                      <Select defaultValue="friends">
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Visibility Settings
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Story Privacy</CardTitle>
                <CardDescription>Control who can see your stories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Story Privacy</Label>
                  <Select defaultValue="friends">
                    <SelectTrigger>
                      <SelectValue placeholder="Select default privacy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (Anyone can view)</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private (Only you)</SelectItem>
                      <SelectItem value="password">Password Protected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Story Comments</Label>
                  <Select defaultValue="friends">
                    <SelectTrigger>
                      <SelectValue placeholder="Select who can comment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Anyone</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="none">No One (Disable Comments)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-views">Show View Count</Label>
                    <div className="text-sm text-muted-foreground">Display the number of views on your stories</div>
                  </div>
                  <Switch id="show-views" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allow-sharing">Allow Sharing</Label>
                    <div className="text-sm text-muted-foreground">Allow others to share your stories</div>
                  </div>
                  <Switch id="allow-sharing" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Story Privacy Settings
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Settings</CardTitle>
              <CardDescription>Control who can contact you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Who Can Send You Messages</Label>
                    <Select defaultValue="friends">
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="everyone">Everyone</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="none">No One</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Who Can Send You Friend Requests</Label>
                    <Select defaultValue="everyone">
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="everyone">Everyone</SelectItem>
                        <SelectItem value="friends-of-friends">Friends of Friends</SelectItem>
                        <SelectItem value="none">No One</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Who Can See Your Friends List</Label>
                    <Select defaultValue="friends">
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Everyone</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Only You</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Who Can Tag You</Label>
                    <Select defaultValue="friends">
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="everyone">Everyone</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="none">No One</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Blocked Users</Label>
                    <ScrollArea className="h-[100px] border rounded-md p-2">
                      <div className="space-y-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>U{i}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">Blocked User {i}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="read-receipts">Read Receipts</Label>
                      <div className="text-sm text-muted-foreground">
                        Let others know when you've read their messages
                      </div>
                    </div>
                    <Switch id="read-receipts" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Contact Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security & Privacy</CardTitle>
              <CardDescription>Advanced security and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="activity-log">Activity Log</Label>
                      <div className="text-sm text-muted-foreground">Track your activity on the platform</div>
                    </div>
                    <Switch id="activity-log" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-collection">Data Collection</Label>
                      <div className="text-sm text-muted-foreground">
                        Allow us to collect usage data to improve the platform
                      </div>
                    </div>
                    <Switch id="data-collection" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="search-engines">Search Engine Indexing</Label>
                      <div className="text-sm text-muted-foreground">
                        Allow search engines to index your public profile
                      </div>
                    </div>
                    <Switch id="search-engines" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Download Your Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Download a copy of your data, including stories, media, and account information.
                    </p>
                    <Button variant="outline" className="mt-2">
                      Request Data Download
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Privacy Policy & Terms</Label>
                    <p className="text-sm text-muted-foreground">Review our privacy policy and terms of service.</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4 mr-2" />
                        Privacy Policy
                      </Button>
                      <Button variant="outline" size="sm">
                        <Lock className="h-4 w-4 mr-2" />
                        Terms of Service
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Manage your email notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Notification Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Email Notifications</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-comments" className="flex items-center text-sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comments on your stories
                      </Label>
                      <Switch id="email-comments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-likes" className="flex items-center text-sm">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Likes on your stories
                      </Label>
                      <Switch id="email-likes" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-mentions" className="flex items-center text-sm">
                        <AtSign className="h-4 w-4 mr-2" />
                        Mentions of you
                      </Label>
                      <Switch id="email-mentions" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-friend-requests" className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2" />
                        Friend requests
                      </Label>
                      <Switch id="email-friend-requests" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-system" className="flex items-center text-sm">
                        <Bell className="h-4 w-4 mr-2" />
                        System announcements
                      </Label>
                      <Switch id="email-system" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Marketing Emails</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-newsletter" className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Newsletter
                      </Label>
                      <Switch id="email-newsletter" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-tips" className="flex items-center text-sm">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Tips and tutorials
                      </Label>
                      <Switch id="email-tips" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-promotions" className="flex items-center text-sm">
                        <Tag className="h-4 w-4 mr-2" />
                        Promotions and offers
                      </Label>
                      <Switch id="email-promotions" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Email Preferences
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>Manage your push notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-push">Enable Push Notifications</Label>
                    <div className="text-sm text-muted-foreground">Receive notifications on your device</div>
                  </div>
                  <Switch id="enable-push" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Push Notifications</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-comments" className="flex items-center text-sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comments on your stories
                      </Label>
                      <Switch id="push-comments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-likes" className="flex items-center text-sm">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Likes on your stories
                      </Label>
                      <Switch id="push-likes" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-mentions" className="flex items-center text-sm">
                        <AtSign className="h-4 w-4 mr-2" />
                        Mentions of you
                      </Label>
                      <Switch id="push-mentions" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-friend-requests" className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2" />
                        Friend requests
                      </Label>
                      <Switch id="push-friend-requests" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-system" className="flex items-center text-sm">
                        <Bell className="h-4 w-4 mr-2" />
                        System announcements
                      </Label>
                      <Switch id="push-system" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Quiet Hours</Label>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
                      <div className="text-sm text-muted-foreground">Mute notifications during specific hours</div>
                    </div>
                    <Switch id="quiet-hours" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="quiet-start" className="text-xs">
                        Start Time
                      </Label>
                      <Select defaultValue="22">
                        <SelectTrigger id="quiet-start">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i.toString().padStart(2, "0")}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiet-end" className="text-xs">
                        End Time
                      </Label>
                      <Select defaultValue="7">
                        <SelectTrigger id="quiet-end">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i.toString().padStart(2, "0")}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Push Notification Preferences
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Activity Alerts</CardTitle>
              <CardDescription>Configure alerts for important activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Story Alerts</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="alert-story-published" defaultChecked />
                        <Label htmlFor="alert-story-published">Story published</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="alert-story-featured" defaultChecked />
                        <Label htmlFor="alert-story-featured">Story featured</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="alert-story-milestone" defaultChecked />
                        <Label htmlFor="alert-story-milestone">Story milestones (100 views, etc.)</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Account Alerts</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="alert-login" defaultChecked />
                        <Label htmlFor="alert-login">New login to your account</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="alert-password" defaultChecked />
                        <Label htmlFor="alert-password">Password changes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="alert-email" defaultChecked />
                        <Label htmlFor="alert-email">Email changes</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Platform Alerts</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="alert-maintenance" defaultChecked />
                        <Label htmlFor="alert-maintenance">Scheduled maintenance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="alert-updates" defaultChecked />
                        <Label htmlFor="alert-updates">Platform updates</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="alert-security" defaultChecked />
                        <Label htmlFor="alert-security">Security alerts</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Alert Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

