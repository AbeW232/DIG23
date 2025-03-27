"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, Calendar, Clock, FileText, Heart, Info, Mail, MessageSquare, Shield } from "lucide-react"

export function InheritanceSettings() {
  const [inheritanceTab, setInheritanceTab] = useState("triggers")

  return (
    <div className="space-y-4">
      <Tabs defaultValue={inheritanceTab} onValueChange={setInheritanceTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="triggers">Triggers</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="triggers" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Inactivity Period</Label>
            <div className="flex items-center gap-2">
              <Select defaultValue="180">
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">365 days</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Default inactivity period before legacy activation</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Verification Attempts</Label>
            <div className="flex items-center gap-2">
              <Select defaultValue="3">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Select attempts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span>Number of verification attempts before legacy activation</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="manual-trigger" className="cursor-pointer">
                Manual Trigger
              </Label>
              <div className="text-sm text-muted-foreground flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                <span>Allow manual activation by authorized administrators</span>
              </div>
            </div>
            <Switch id="manual-trigger" defaultChecked className="data-[state=checked]:bg-green-500" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="scheduled-trigger" className="cursor-pointer">
                Scheduled Activation
              </Label>
              <div className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Allow activation on a specific future date</span>
              </div>
            </div>
            <Switch id="scheduled-trigger" className="data-[state=checked]:bg-green-500" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="verification-emails" className="cursor-pointer">
                Verification Emails
              </Label>
              <div className="text-sm text-muted-foreground flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>Send verification emails before activation</span>
              </div>
            </div>
            <Switch id="verification-emails" defaultChecked className="data-[state=checked]:bg-green-500" />
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Access Level</Label>
            <Select defaultValue="full">
              <SelectTrigger>
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Access</SelectItem>
                <SelectItem value="limited">Limited Access</SelectItem>
                <SelectItem value="read-only">Read-Only Access</SelectItem>
                <SelectItem value="custom">Custom Access</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Access Duration</Label>
            <Select defaultValue="unlimited">
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
                <SelectItem value="unlimited">Unlimited</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Access Permissions</Label>
            <div className="space-y-2 border rounded-md p-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="permission-view" defaultChecked />
                <Label htmlFor="permission-view">View Content</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="permission-download" defaultChecked />
                <Label htmlFor="permission-download">Download Files</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="permission-share" />
                <Label htmlFor="permission-share">Share Content</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="permission-edit" />
                <Label htmlFor="permission-edit">Edit Content</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="permission-delete" />
                <Label htmlFor="permission-delete">Delete Content</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="multi-factor" className="cursor-pointer">
                Multi-Factor Authentication
              </Label>
              <div className="text-sm text-muted-foreground flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                <span>Require additional verification for legacy access</span>
              </div>
            </div>
            <Switch id="multi-factor" defaultChecked className="data-[state=checked]:bg-green-500" />
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Notification Email</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="notification-subject">Subject</Label>
                <div className="text-xs text-muted-foreground">
                  <Info className="h-3 w-3 inline mr-1" />
                  Variables: {"{recipient_name}"}, {"{user_name}"}
                </div>
              </div>
              <Input id="notification-subject" defaultValue="Important: Digital Legacy Access for {user_name}" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="notification-message">Message</Label>
              <div className="text-xs text-muted-foreground">
                <MessageSquare className="h-3 w-3 inline mr-1" />
                Personalize the message for legacy contacts
              </div>
            </div>
            <Textarea
              id="notification-message"
              rows={5}
              defaultValue="Dear {recipient_name},

This message is to inform you that you have been granted access to the digital legacy of {user_name}. You can now access their digital assets and memories that they have chosen to share with you.

To access these materials, please click the link below and follow the verification process.

Thank you for being an important part of {user_name}'s life."
            />
          </div>

          <div className="space-y-2">
            <Label>Personal Message</Label>
            <div className="flex items-center justify-between">
              <Label htmlFor="personal-message" className="text-sm text-muted-foreground flex items-center">
                <Heart className="h-4 w-4 mr-1" />
                <span>Optional personal message from the user</span>
              </Label>
              <div className="text-xs text-muted-foreground">
                <FileText className="h-3 w-3 inline mr-1" />
                Allow users to add their own message
              </div>
            </div>
            <Textarea id="personal-message" rows={3} placeholder="Users can add their own personal message here..." />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reminder-emails" className="cursor-pointer">
                Reminder Emails
              </Label>
              <div className="text-sm text-muted-foreground flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>Send periodic reminders to access legacy</span>
              </div>
            </div>
            <Switch id="reminder-emails" defaultChecked className="data-[state=checked]:bg-green-500" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

