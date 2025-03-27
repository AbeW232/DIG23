"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Eye, EyeOff, Key, Lock, Save, Shield, Smartphone, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function PrivacySecuritySettings() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="profile">Profile Visibility</TabsTrigger>
          <TabsTrigger value="story">Story Privacy</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
        </TabsList>

        {/* Profile Visibility Tab */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Profile Visibility Settings</CardTitle>
              <CardDescription>Control who can see your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <Select defaultValue="family">
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (Anyone)</SelectItem>
                    <SelectItem value="family">Family Members Only</SelectItem>
                    <SelectItem value="connections">Connections Only</SelectItem>
                    <SelectItem value="private">Private (Only Me)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Profile Information Visibility</Label>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Information</TableHead>
                        <TableHead>Visibility</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>
                          <Select defaultValue="family">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="family">Family Only</SelectItem>
                              <SelectItem value="connections">Connections</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Profile Photo</TableCell>
                        <TableCell>
                          <Select defaultValue="family">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="family">Family Only</SelectItem>
                              <SelectItem value="connections">Connections</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Email Address</TableCell>
                        <TableCell>
                          <Select defaultValue="private">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="family">Family Only</SelectItem>
                              <SelectItem value="connections">Connections</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Birth Date</TableCell>
                        <TableCell>
                          <Select defaultValue="family">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="family">Family Only</SelectItem>
                              <SelectItem value="connections">Connections</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Location</TableCell>
                        <TableCell>
                          <Select defaultValue="connections">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="family">Family Only</SelectItem>
                              <SelectItem value="connections">Connections</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Profile Search Settings</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="search-engines">Search Engine Visibility</Label>
                      <div className="text-sm text-muted-foreground">Allow search engines to index your profile</div>
                    </div>
                    <Switch id="search-engines" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="platform-search">Platform Search Visibility</Label>
                      <div className="text-sm text-muted-foreground">Allow others to find you in platform search</div>
                    </div>
                    <Switch id="platform-search" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-search">Email Search</Label>
                      <div className="text-sm text-muted-foreground">Allow others to find you using your email</div>
                    </div>
                    <Switch id="email-search" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Connection Requests</Label>
                <Select defaultValue="family">
                  <SelectTrigger>
                    <SelectValue placeholder="Select who can send requests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anyone">Anyone</SelectItem>
                    <SelectItem value="family">Family Members Only</SelectItem>
                    <SelectItem value="connections">Connections of Connections</SelectItem>
                    <SelectItem value="none">No One (Disable Requests)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Save Profile Visibility Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Story Privacy Tab */}
        <TabsContent value="story" className="space-y-6 mt-6">
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Story Privacy Settings</CardTitle>
              <CardDescription>Control who can see and interact with your stories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Story Privacy</Label>
                <Select defaultValue="family">
                  <SelectTrigger>
                    <SelectValue placeholder="Select default privacy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (Anyone)</SelectItem>
                    <SelectItem value="family">Family Members Only</SelectItem>
                    <SelectItem value="connections">Connections Only</SelectItem>
                    <SelectItem value="private">Private (Only Me)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  This setting applies to new stories. You can always change privacy for individual stories.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Story Interaction Settings</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-comments">Allow Comments</Label>
                      <div className="text-sm text-muted-foreground">Allow others to comment on your stories</div>
                    </div>
                    <Switch id="allow-comments" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-sharing">Allow Sharing</Label>
                      <div className="text-sm text-muted-foreground">Allow others to share your stories</div>
                    </div>
                    <Switch id="allow-sharing" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-views">Show View Count</Label>
                      <div className="text-sm text-muted-foreground">Display the number of views on your stories</div>
                    </div>
                    <Switch id="show-views" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Comment Moderation</Label>
                <Select defaultValue="approve">
                  <SelectTrigger>
                    <SelectValue placeholder="Select moderation setting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Moderation (All Comments Visible)</SelectItem>
                    <SelectItem value="approve">Approve Comments Before Publishing</SelectItem>
                    <SelectItem value="family">Auto-Approve Family Members Only</SelectItem>
                    <SelectItem value="disable">Disable Comments Completely</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Story Access Control</Label>
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="password-protection">Password Protection</Label>
                      <div className="text-sm text-muted-foreground">Require a password to access certain stories</div>
                    </div>
                    <Switch id="password-protection" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="expiry-dates">Story Expiry Dates</Label>
                      <div className="text-sm text-muted-foreground">Set expiration dates for story visibility</div>
                    </div>
                    <Switch id="expiry-dates" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="specific-users">Specific User Access</Label>
                      <div className="text-sm text-muted-foreground">
                        Grant access to specific users regardless of privacy setting
                      </div>
                    </div>
                    <Switch id="specific-users" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Story Privacy Defaults</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="privacy-metadata" defaultChecked />
                    <Label htmlFor="privacy-metadata">Remove metadata from uploaded images</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="privacy-location" defaultChecked />
                    <Label htmlFor="privacy-location">Don't include location data by default</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="privacy-tags" defaultChecked />
                    <Label htmlFor="privacy-tags">Require approval for tags in stories</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <EyeOff className="h-4 w-4 mr-2" />
                Save Story Privacy Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and protection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Password Security</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <div className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <Switch id="two-factor" />
                  </div>

                  <Button variant="outline" className="w-full">
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Login Security</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="login-alerts">Login Alerts</Label>
                      <div className="text-sm text-muted-foreground">Get notified of new logins to your account</div>
                    </div>
                    <Switch id="login-alerts" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="trusted-devices">Trusted Devices</Label>
                      <div className="text-sm text-muted-foreground">
                        Manage devices that can access your account without verification
                      </div>
                    </div>
                    <Switch id="trusted-devices" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Active Sessions</Label>
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-primary" />
                      <div>
                        <div className="font-medium">Current Session</div>
                        <div className="text-xs text-muted-foreground">
                          Chrome on Windows • IP: 192.168.1.1 • Active now
                        </div>
                      </div>
                    </div>
                    <Badge>Current</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-primary" />
                      <div>
                        <div className="font-medium">iPhone 13</div>
                        <div className="text-xs text-muted-foreground">
                          Safari on iOS • IP: 192.168.1.2 • 2 hours ago
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Sign Out
                    </Button>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-primary" />
                      <div>
                        <div className="font-medium">iPad Pro</div>
                        <div className="text-xs text-muted-foreground">
                          Safari on iPadOS • IP: 192.168.1.3 • Yesterday
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Sign Out
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Sign Out All Other Sessions
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Account Recovery</Label>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-xs">Recovery Email</Label>
                    <div className="flex gap-2">
                      <Input value="r***@example.com" readOnly className="flex-1" />
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Recovery Phone</Label>
                    <div className="flex gap-2">
                      <Input value="+1 (***) ***-**89" readOnly className="flex-1" />
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Generate Recovery Codes
                  </Button>
                </div>
              </div>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Danger Zone</AlertTitle>
                <AlertDescription>These actions are irreversible and should be used with caution.</AlertDescription>
              </Alert>

              <div className="space-y-2 border border-destructive rounded-md p-4">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full text-destructive border-destructive">
                    <Lock className="h-4 w-4 mr-2" />
                    Deactivate Account
                  </Button>
                  <Button variant="outline" className="w-full text-destructive border-destructive">
                    <User className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

