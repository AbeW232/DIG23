"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function AccountSettings() {
  const [username, setUsername] = useState("janesmith")
  const [language, setLanguage] = useState("english")
  const [timezone, setTimezone] = useState("utc-8")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <p className="text-sm text-muted-foreground">
            This is your public username. It can only contain letters, numbers, and underscores.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc-12">UTC-12:00</SelectItem>
                <SelectItem value="utc-11">UTC-11:00</SelectItem>
                <SelectItem value="utc-10">UTC-10:00</SelectItem>
                <SelectItem value="utc-9">UTC-09:00</SelectItem>
                <SelectItem value="utc-8">UTC-08:00 (PST)</SelectItem>
                <SelectItem value="utc-7">UTC-07:00 (MST)</SelectItem>
                <SelectItem value="utc-6">UTC-06:00 (CST)</SelectItem>
                <SelectItem value="utc-5">UTC-05:00 (EST)</SelectItem>
                <SelectItem value="utc-4">UTC-04:00</SelectItem>
                <SelectItem value="utc-3">UTC-03:00</SelectItem>
                <SelectItem value="utc-2">UTC-02:00</SelectItem>
                <SelectItem value="utc-1">UTC-01:00</SelectItem>
                <SelectItem value="utc">UTC+00:00</SelectItem>
                <SelectItem value="utc+1">UTC+01:00</SelectItem>
                <SelectItem value="utc+2">UTC+02:00</SelectItem>
                <SelectItem value="utc+3">UTC+03:00</SelectItem>
                <SelectItem value="utc+4">UTC+04:00</SelectItem>
                <SelectItem value="utc+5">UTC+05:00</SelectItem>
                <SelectItem value="utc+5.5">UTC+05:30</SelectItem>
                <SelectItem value="utc+6">UTC+06:00</SelectItem>
                <SelectItem value="utc+7">UTC+07:00</SelectItem>
                <SelectItem value="utc+8">UTC+08:00</SelectItem>
                <SelectItem value="utc+9">UTC+09:00</SelectItem>
                <SelectItem value="utc+10">UTC+10:00</SelectItem>
                <SelectItem value="utc+11">UTC+11:00</SelectItem>
                <SelectItem value="utc+12">UTC+12:00</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Account Preferences</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="two-factor">Two-factor Authentication</Label>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
          <Switch id="two-factor" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive email notifications for important account updates</p>
          </div>
          <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
        </div>
      </div>

      <Button type="submit">Save Changes</Button>
    </div>
  )
}

