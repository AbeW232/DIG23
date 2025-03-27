"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Eye, FileText, Info, Mail, Save } from "lucide-react"

export function NotificationTemplates() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email notifications for digital legacy</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications-enabled" className="cursor-pointer">
                Enable Notifications
              </Label>
              <div className="text-sm text-muted-foreground">Send email notifications for digital legacy events</div>
            </div>
            <Switch id="notifications-enabled" defaultChecked className="data-[state=checked]:bg-green-500" />
          </div>

          <div className="space-y-2">
            <Label>Email Sender</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sender-name" className="text-sm text-muted-foreground">
                  Name
                </Label>
                <Input id="sender-name" defaultValue="Digital Legacy Platform" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sender-email" className="text-sm text-muted-foreground">
                  Email
                </Label>
                <Input id="sender-email" defaultValue="legacy@example.com" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notification Events</Label>
            <div className="space-y-2 border rounded-md p-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-setup" className="cursor-pointer">
                  Legacy Setup
                </Label>
                <Switch id="notify-setup" defaultChecked className="data-[state=checked]:bg-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-update" className="cursor-pointer">
                  Legacy Update
                </Label>
                <Switch id="notify-update" defaultChecked className="data-[state=checked]:bg-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-contact" className="cursor-pointer">
                  Contact Added
                </Label>
                <Switch id="notify-contact" defaultChecked className="data-[state=checked]:bg-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-access" className="cursor-pointer">
                  Legacy Access
                </Label>
                <Switch id="notify-access" defaultChecked className="data-[state=checked]:bg-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-expiry" className="cursor-pointer">
                  Access Expiry
                </Label>
                <Switch id="notify-expiry" defaultChecked className="data-[state=checked]:bg-green-500" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Notification Settings
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Configure email templates for digital legacy notifications</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="legacy-access">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="legacy-access">Legacy Access</TabsTrigger>
              <TabsTrigger value="setup-confirmation">Setup Confirmation</TabsTrigger>
              <TabsTrigger value="reminder">Reminder</TabsTrigger>
            </TabsList>
            <TabsContent value="legacy-access" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="access-subject">Subject</Label>
                  <div className="text-xs text-muted-foreground">
                    <Info className="h-3 w-3 inline mr-1" />
                    Variables: {"{recipient_name}"}, {"{user_name}"}
                  </div>
                </div>
                <Input id="access-subject" defaultValue="Important: Digital Legacy Access for {user_name}" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="access-message">Message</Label>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <Textarea
                  id="access-message"
                  rows={10}
                  defaultValue={`Dear {recipient_name},

This message is to inform you that you have been granted access to the digital legacy of {user_name}. You can now access their digital assets and memories that they have chosen to share with you.

To access these materials, please click the link below and follow the verification process:

[ACCESS_LINK]

This link will expire in 7 days for security purposes. If you have any questions or need assistance, please contact our support team.

Thank you for being an important part of {user_name}'s life.

Sincerely,
Digital Legacy Platform Team`}
                />
              </div>
            </TabsContent>
            <TabsContent value="setup-confirmation" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="setup-subject">Subject</Label>
                  <div className="text-xs text-muted-foreground">
                    <Info className="h-3 w-3 inline mr-1" />
                    Variables: {"{user_name}"}
                  </div>
                </div>
                <Input id="setup-subject" defaultValue="Digital Legacy Setup Confirmation" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="setup-message">Message</Label>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <Textarea
                  id="setup-message"
                  rows={10}
                  defaultValue={`Dear {user_name},

Thank you for setting up your digital legacy. Your preferences and settings have been saved successfully.

Here's a summary of your digital legacy setup:
- Number of legacy contacts: [CONTACT_COUNT]
- Digital assets included: [ASSET_COUNT]
- Total storage used: [STORAGE_USED]

You can review and update your digital legacy settings at any time by visiting your account settings.

If you have any questions or need assistance, please contact our support team.

Sincerely,
Digital Legacy Platform Team`}
                />
              </div>
            </TabsContent>
            <TabsContent value="reminder" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="reminder-subject">Subject</Label>
                  <div className="text-xs text-muted-foreground">
                    <Info className="h-3 w-3 inline mr-1" />
                    Variables: {"{user_name}"}
                  </div>
                </div>
                <Input id="reminder-subject" defaultValue="Reminder: Review Your Digital Legacy Settings" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="reminder-message">Message</Label>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <Textarea
                  id="reminder-message"
                  rows={10}
                  defaultValue={`Dear {user_name},

This is a friendly reminder to review your digital legacy settings. It's been [TIME_SINCE_LAST_UPDATE] since you last updated your settings.

Regular reviews ensure that your digital legacy reflects your current wishes and that your designated contacts have access to the assets you want to share.

To review your settings, please click the link below:

[SETTINGS_LINK]

If you have any questions or need assistance, please contact our support team.

Sincerely,
Digital Legacy Platform Team`}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Reset to Default</Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Templates
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

