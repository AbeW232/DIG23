"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { FormField } from "@/components/ui/form-field"
import { Switch } from "@/components/ui/switch"
import { HelpTooltip } from "@/components/ui/help-tooltip"
import { PageHeader } from "@/components/ui/page-header"
import { Bell, Lock, User, Shield, CreditCard, Trash2, Download, Save, AlertTriangle, Check } from "lucide-react"

export function EnhancedSettingsDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle")
  
  const handleSave = () => {
    setSaveStatus("saving")
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus("success")
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSaveStatus("idle")
      }, 3000)
    }, 1500)
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
        actions={
          <Button 
            onClick={handleSave} 
            disabled={saveStatus === "saving"}
            className="min-w-[100px]"
          >
            {saveStatus === "idle" && (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
            {saveStatus === "saving" && "Saving..."}
            {saveStatus === "success" && (
              <>
                <Check className="mr-2 h-4 w-4" />
                Saved
              </>
            )}
            {saveStatus === "error" && (
              <>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Error
              </>
            )}
          </Button>
        }
      />
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                <SettingsNavItem 
                  icon={<User className="h-4 w-4" />} 
                  label="Account" 
                  active={activeTab === "account"} 
                  onClick={() => setActiveTab("account")} 
                />
                <SettingsNavItem 
                  icon={<Bell className="h-4 w-4" />} 
                  label="Notifications" 
                  active={activeTab === "notifications"} 
                  onClick={() => setActiveTab("notifications")} 
                />
                <SettingsNavItem 
                  icon={<Lock className="h-4 w-4" />} 
                  label="Privacy" 
                  active={activeTab === "privacy"} 
                  onClick={() => setActiveTab("privacy")} 
                />
                <SettingsNavItem 
                  icon={<Shield className="h-4 w-4" />} 
                  label="Security" 
                  active={activeTab === "security"} 
                  onClick={() => setActiveTab("security")} 
                />
                <SettingsNavItem 
                  icon={<CreditCard className="h-4 w-4" />} 
                  label="Billing" 
                  active={activeTab === "billing"} 
                  onClick={() => setActiveTab("billing")} 
                />
                <SettingsNavItem 
                  icon={<Download className="h-4 w-4" />} 
                  label="Data Export" 
                  active={activeTab === "export"} 
                  onClick={() => setActiveTab("export")} 
                />
                <SettingsNavItem 
                  icon={<Trash2 className="h-4 w-4 text-destructive" />} 
                  label="Delete Account" 
                  active={activeTab === "delete"} 
                  onClick={() => setActiveTab("delete")} 
                  className="text-destructive"
                />
              </nav>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-12 md:col-span-9">
          <Tabs value={activeTab}>
            <TabsContent value="account" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Full Name"
                        name="fullName"
                        placeholder="Your full name"
                        value="John Smith"
                      />
                      <FormField
                        label="Display Name"
                        name="displayName"
                        placeholder="How you want to be known"
                        value="John"
                        helperText="This is how your name will appear to others"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        value="john.smith@example.com"
                      />
                      <FormField
                        label="Phone Number"
                        name="phone"
                        placeholder="Your phone number"
                        value="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile</h3>
                    <FormField
                      label="Bio"
                      name="bio"
                      type="textarea"
                      placeholder="Tell us about yourself"
                      value="I'm a family historian passionate about preserving our legacy for future generations."
                      helperText="A brief description about yourself"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Location"
                        name="location"
                        placeholder="Your location"
                        value="New York, USA"
                      />
                      <FormField
                        label="Website"
                        name="website"
                        placeholder="Your website"
                        value="https://example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center">
                            <label htmlFor="language" className="text-sm font-medium">Language</label>
                            <HelpTooltip 
                              content="Choose your preferred language for the platform interface" 
                              className="ml-1"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Select your preferred language
                          </p>
                        </div>
                        <select 
                          id="language" 
                          className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                          defaultValue="en"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center">
                            <label htmlFor="timezone" className="text-sm font-medium">Time Zone</label>
                            <HelpTooltip 
                              content="Choose your time zone for accurate date and time display" 
                              className="ml-1"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Select your time zone
                          </p>
                        </div>
                        <select 
                          id="timezone" 
                          className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                          defaultValue="America/New_York"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="theme" className="text-sm font-medium">Theme</label>
                          <p className="text-sm text-muted-foreground">
                            Choose light or dark theme
                          </p>
                        </div>
                        <select 
                          id="theme" 
                          className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                          defaultValue="system"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="system">System</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Control how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center">
                            <label htmlFor="email-comments" className="text-sm font-medium">Comments</label>
                            <HelpTooltip 
                              content="Receive email notifications when someone comments on your stories" 
                              className="ml-1"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Get notified about new comments
                          </p>
                        </div>
                        <Switch id="email-comments" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="email-stories" className="text-sm font-medium">Story Updates</label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about story updates
                          </p>
                        </div>
                        <Switch id="email-stories" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="email-family" className="text-sm font-medium">Family Updates</label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about family tree updates
                          </p>
                        </div>
                        <Switch id="email-family" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="email-system" className="text-sm font-medium">System Updates</label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about platform updates
                          </p>
                        </div>
                        <Switch id="email-system" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">In-App Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="app-comments" className="text-sm font-medium">Comments</label>
                          <p className="text-sm text-muted-foreground">
                            Show notifications for new comments
                          </p>
                        </div>
                        <Switch id="app-comments" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="app-stories" className="text-sm font-medium">Story Updates</label>
                          <p className="text-sm text-muted-foreground">
                            Show notifications for story updates
                          </p>
                        </div>
                        <Switch id="app-stories" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="app-family" className="text-sm font-medium">Family Updates</label>
                          <p className="text-sm text-muted-foreground">
                            Show notifications for family tree updates
                          </p>
                        </div>
                        <Switch id="app-family" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="app-system" className="text-sm font-medium">System Updates</label>
                          <p className="text-sm text-muted-foreground">
                            Show notifications for platform updates
                          </p>
                        </div>
                        <Switch id="app-system" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Frequency</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="frequency" className="text-sm font-medium">Email Digest</label>
                          <p className="text-sm text-muted-foreground">
                            How often to receive email digests
                          </p>
                        </div>
                        <select 
                          id="frequency" 
                          className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                          defaultValue="daily"
                        >
                          <option value="realtime">Real-time</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="never">Never</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control who can see your content and information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile Privacy</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center">
                            <label htmlFor="profile-visibility" className="text-sm font-medium">Profile Visibility</label>
                            <HelpTooltip 
                              content="Control who can see your profile information" 
                              className="ml-1"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Who can see your profile
                          </p>
                        </div>
                        <select 
                          id="profile-visibility" 
                          className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                          defaultValue="family"
                        >
                          <option value="public">Public</option>
                          <option value="family">Family Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="show-email" className="text-sm font-medium">Show Email Address</label>
                          <p className="text-sm text-muted-foreground">
                            Show your email to other users
                          </p>
                        </div>
                        <Switch id="show-email" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="show-location" className="text-sm font-medium">Show Location</label>
                          <p className="text-sm text-muted-foreground">
                            Show your location to other users
                          </p>
                        </div>
                        <Switch id="show-location" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Content Privacy</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="default-story-privacy" className="text-sm font-medium">Default Story Privacy</label>
                          <p className="text-sm text-muted-foreground">
                            Default privacy setting for new stories
                          </p>
                        </div>
                        <select 
                          id="default-story-privacy" 
                          className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                          defaultValue="family"
                        >
                          <option value="public">Public</option>
                          <option value="family">Family Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="default-media-privacy" className="text-sm font-medium">Default Media Privacy</label>
                          <p className="text-sm text-muted-foreground">
                            Default privacy setting for new media
                          </p>
                        </div>
                        <select 
                          id="default-media-privacy" 
                          className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                          defaultValue="family"
                        >
                          <option value="public">Public</option>
                          <option value="family">Family Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="allow-comments" className="text-sm font-medium">Allow Comments</label>
                          <p className="text-sm text-muted-foreground">
                            Allow others to comment on your content
                          </p>
                        </div>
                        <Switch id="allow-comments" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Family Tree Privacy</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="tree-visibility" className="text-sm font-medium">Family Tree Visibility</label>
                          <p className="text-sm text-muted-foreground">
                            Who can see your family tree
                          </p>
                        </div>
                        <select 
                          id="tree-visibility" 
                          className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                          defaultValue="family"
                        >
                          <option value="public">Public</option>
                          <option value="family">Family Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="show-living" className="text-sm font-medium">Show Living Relatives</label>
                          <p className="text-sm text-muted-foreground">
                            Show details of living relatives
                          </p>
                        </div>
                        <Switch id="show-living" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and login options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    <div className="space-y-4">
                      <FormField
                        label="Current Password"
                        name="currentPassword"
                        type="password"
                        placeholder="Enter your current password"
                      />
                      <FormField
                        label="New Password"
                        name="newPassword"
                        type="password"
                        placeholder="Enter a new password"
                        helperText="Password must be at least 8 characters long and include a number and special character"
                      />
                      <FormField
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your new password"
                      />
                      <Button>Update Password</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center">
                            <label htmlFor="enable-2fa" className="text-sm font-medium">Enable Two-Factor Authentication</label>
                            <HelpTooltip 
                              content="Add an extra layer of security to your account" 
                              className="ml-1"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Require a verification code when logging in
                          </p>
                        </div>
                        <Switch id="enable-2fa" />
                      </div>
                      
                      <Button variant="outline" disabled>Set Up Two-Factor Authentication</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Login Sessions</h3>
                    <div className="space-y-3">
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-muted-foreground">
                              Chrome on Windows • New York, USA
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Started 2 hours ago
                            </p>
                          </div>
                          <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Active
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Safari on iPhone</p>
                            <p className="text-sm text-muted-foreground">
                              New York, USA
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Last active 2 days ago
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Sign Out
                          </Button>
                        </div>
                      </div>
                      
                      <Button variant="outline">Sign Out All Other Devices</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Activity</h3>
                    <div className="space-y-3">
                      <div className="border rounded-md p-4">
                        <p className="font-medium">Login History</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Recent login activity on your account
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <p>Chrome on Windows • New York, USA</p>
                              <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                            </div>
                            <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Successful
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <p>Safari on iPhone • New York, USA</p>
                              <p className="text-xs text-muted-foreground">Yesterday, 8:15 PM</p>
                            </div>
                            <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Successful
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <p>Unknown Device • Los Angeles, USA</p>
                              <p className="text-xs text-muted-foreground">July 15, 2023, 3:45 PM</p>
                            </div>
                            <div className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              Failed
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline">View Full Activity Log</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Settings</CardTitle>
                  <CardDescription>Manage your subscription and payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Current Plan</h3>
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Premium Plan</p>
                          <p className="text-sm text-muted-foreground">
                            $9.99/month • Renews on August 15, 2023
                          </p>
                        </div>
                        <Button variant="outline">Change Plan</Button>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <p className="font-medium mb-2">Plan Features</p>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Unlimited stories and media
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Advanced family tree features
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            AI writing assistant
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Priority support
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center mr-3">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">
                              Expires 12/2025
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Remove</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline">Add Payment Method</Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Billing History</h3>
                    <div className="border rounded-md p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Premium Plan - Monthly</p>
                            <p className="text-sm text-muted-foreground">
                              July 15, 2023
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">$9.99</p>
                            <Button variant="ghost" size="sm">Receipt</Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Premium Plan - Monthly</p>
                            <p className="text-sm text-muted-foreground">
                              June 15, 2023
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">$9.99</p>
                            <Button variant="ghost" size="sm">Receipt</Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Premium Plan - Monthly</p>
                            <p className="text-sm text-muted-foreground">
                              May 15, 2023
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">$9.99</p>
                            <Button variant="ghost" size="sm">Receipt</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline">View All Transactions</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="export" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Data Export</CardTitle>
                  <CardDescription>Export your data for backup or transfer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Export Options</h3>
                    <div className="space-y-3">
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Full Data Export</p>
                            <p className="text-sm text-muted-foreground">
                              Export all your stories, media, and family tree data
                            </p>
                          </div>
                          <Button>Export</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Stories Only</p>
                            <p className="text-sm text-muted-foreground">
                              Export only your stories as PDF or text files
                            </p>
                          </div>
                          <Button variant="outline">Export</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Media Library</p>
                            <p className="text-sm text-muted-foreground">
                              Export your photos, videos, and other media files
                            </p>
                          </div>
                          <Button variant="outline">Export</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Family Tree</p>
                            <p className="text-sm text-muted-foreground">
                              Export your family tree as a GEDCOM file
                            </p>
                          </div>
                          <Button variant="outline">Export</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Previous Exports</h3>
                    <div className="border rounded-md p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Full Data Export</p>
                            <p className="text-sm text-muted-foreground">
                              July 10, 2023 • 256 MB
                            </p>
                          </div>
                          <Button variant="outline" size="sm">Download</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Stories Only</p>
                          <p className="text-sm text-muted-foreground">
                            June 5, 2023 • 24 MB
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="delete" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Delete Account</CardTitle>
                  <CardDescription>Permanently delete your account and all data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-destructive/10 border border-destructive/30 rounded-md p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium text-destructive">Warning: This action cannot be undone</p>
                        <p className="text-sm mt-1">
                          Deleting your account will permanently remove all your stories, media, family tree data, and personal information. This action cannot be reversed.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Before you delete</h3>
                    <p className="text-sm">
                      Consider the following alternatives:
                    </p>
                    <ul className="space-y-2 text-sm list-disc pl-5">
                      <li>Export your data for backup before deleting</li>
                      <li>Temporarily deactivate your account instead</li>
                      <li>Contact support if you're having issues with the platform</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Confirm deletion</h3>
                    <FormField
                      label="Type 'DELETE' to confirm"
                      name="deleteConfirmation"
                      placeholder="DELETE"
                      required
                    />
                    <FormField
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                    <FormField
                      label="Tell us why you're leaving"
                      name="deletionReason"
                      type="textarea"
                      placeholder="Please share your feedback"
                    />
                    
                    <Button variant="destructive">Permanently Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function SettingsNavItem({ 
  icon, 
  label, 
  active, 
  onClick,
  className
}: { 
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-2 w-full p-2 rounded-md text-sm transition-colors",
        active 
          ? "bg-primary text-primary-foreground font-medium" 
          : "hover:bg-muted",
        className
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

