"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Bell, Calendar, Mail, MessageSquare, Save, Settings, Smartphone, ThumbsUp, Users } from "lucide-react"

export function NotificationPreferences() {
  const [activeTab, setActiveTab] = useState("email")
  const [emailDigest, setEmailDigest] = useState("daily")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="email" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="email">Email Notifications</TabsTrigger>
          <TabsTrigger value="push">Push Notifications</TabsTrigger>
          <TabsTrigger value="schedule">Notification Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notification Preferences</CardTitle>
              <CardDescription>Configure what emails you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Email Digest</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-digest">Notification Digest</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive a summary of notifications instead of individual emails
                    </p>
                  </div>
                  <Switch id="email-digest" defaultChecked />
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="digest-frequency">Digest Frequency</Label>
                  <Select value={emailDigest} onValueChange={setEmailDigest}>
                    <SelectTrigger id="digest-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="never">Never (individual emails)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Content Notifications</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="comment-notifications">Comments</Label>
                  </div>
                  <Switch id="comment-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="like-notifications">Likes and Reactions</Label>
                  </div>
                  <Switch id="like-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="mention-notifications">Mentions</Label>
                  </div>
                  <Switch id="mention-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="publish-notifications">Story Publications</Label>
                  </div>
                  <Switch id="publish-notifications" defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">System Notifications</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="system-notifications">System Updates</Label>
                  </div>
                  <Switch id="system-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="security-notifications">Security Alerts</Label>
                  </div>
                  <Switch id="security-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="newsletter-notifications">Newsletter</Label>
                  </div>
                  <Switch id="newsletter-notifications" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Email Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="push" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Push Notification Preferences</CardTitle>
              <CardDescription>Configure notifications on your devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Device Settings</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-push">Enable Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive notifications on your devices</p>
                  </div>
                  <Switch id="enable-push" defaultChecked />
                </div>

                <div className="space-y-4 mt-4">
                  <h4 className="text-xs font-medium text-muted-foreground">Registered Devices</h4>

                  <div className="space-y-2">
                    {[
                      { name: "iPhone 13", type: "mobile", lastActive: "2 hours ago" },
                      { name: "MacBook Pro", type: "desktop", lastActive: "Just now" },
                      { name: "iPad Air", type: "tablet", lastActive: "3 days ago" },
                    ].map((device, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">{device.name}</div>
                            <div className="text-xs text-muted-foreground">Last active: {device.lastActive}</div>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Types</h3>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="push-comments" defaultChecked />
                    <Label htmlFor="push-comments">Comments on your stories</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="push-likes" defaultChecked />
                    <Label htmlFor="push-likes">Likes and reactions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="push-mentions" defaultChecked />
                    <Label htmlFor="push-mentions">Mentions and tags</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="push-publications" defaultChecked />
                    <Label htmlFor="push-publications">New story publications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="push-system" defaultChecked />
                    <Label htmlFor="push-system">System updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="push-security" defaultChecked />
                    <Label htmlFor="push-security">Security alerts</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Notification Style</h3>
                <Select defaultValue="detailed">
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="detailed">Detailed (with preview)</SelectItem>
                    <SelectItem value="standard">Standard (title only)</SelectItem>
                    <SelectItem value="minimal">Minimal (app badge only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Push Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

