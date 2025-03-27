"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Save } from "lucide-react"

export function EmailSettings() {
  const [activeTab, setActiveTab] = useState("preferences")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Preferences</CardTitle>
          <CardDescription>Manage your email notification settings</CardDescription>
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
            <Label>Email Format</Label>
            <Select defaultValue="html">
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="html">HTML (Rich Text)</SelectItem>
                <SelectItem value="plain">Plain Text</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Newsletter Subscriptions</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter-monthly" defaultChecked />
                <Label htmlFor="newsletter-monthly">Monthly Newsletter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter-features" defaultChecked />
                <Label htmlFor="newsletter-features">New Features Updates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter-tips" />
                <Label htmlFor="newsletter-tips">Tips & Tutorials</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Digest Settings</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="digest-comments" className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Include comments in digest
                </Label>
                <Switch id="digest-comments" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="digest-likes" className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Include likes in digest
                </Label>
                <Switch id="digest-likes" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="digest-system" className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Include system updates in digest
                </Label>
                <Switch id="digest-system" defaultChecked />
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
    </div>
  )
}

