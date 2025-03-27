"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NotificationSettings() {
  // Email notifications
  const [emailStories, setEmailStories] = useState(true)
  const [emailComments, setEmailComments] = useState(true)
  const [emailMentions, setEmailMentions] = useState(true)
  const [emailInvites, setEmailInvites] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(false)

  // Push notifications
  const [pushStories, setPushStories] = useState(true)
  const [pushComments, setPushComments] = useState(true)
  const [pushMentions, setPushMentions] = useState(true)
  const [pushInvites, setPushInvites] = useState(false)

  // Notification frequency
  const [frequency, setFrequency] = useState("immediate")

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Email Notifications</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-stories">New Stories</Label>
              <p className="text-sm text-muted-foreground">When someone in your network publishes a new story</p>
            </div>
            <Switch id="email-stories" checked={emailStories} onCheckedChange={setEmailStories} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-comments">Comments</Label>
              <p className="text-sm text-muted-foreground">When someone comments on your stories</p>
            </div>
            <Switch id="email-comments" checked={emailComments} onCheckedChange={setEmailComments} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-mentions">Mentions</Label>
              <p className="text-sm text-muted-foreground">When someone mentions you in a story or comment</p>
            </div>
            <Switch id="email-mentions" checked={emailMentions} onCheckedChange={setEmailMentions} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-invites">Invitations</Label>
              <p className="text-sm text-muted-foreground">When you receive an invitation to collaborate</p>
            </div>
            <Switch id="email-invites" checked={emailInvites} onCheckedChange={setEmailInvites} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-updates">Platform Updates</Label>
              <p className="text-sm text-muted-foreground">News about new features and improvements</p>
            </div>
            <Switch id="email-updates" checked={emailUpdates} onCheckedChange={setEmailUpdates} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Push Notifications</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-stories">New Stories</Label>
              <p className="text-sm text-muted-foreground">When someone in your network publishes a new story</p>
            </div>
            <Switch id="push-stories" checked={pushStories} onCheckedChange={setPushStories} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-comments">Comments</Label>
              <p className="text-sm text-muted-foreground">When someone comments on your stories</p>
            </div>
            <Switch id="push-comments" checked={pushComments} onCheckedChange={setPushComments} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-mentions">Mentions</Label>
              <p className="text-sm text-muted-foreground">When someone mentions you in a story or comment</p>
            </div>
            <Switch id="push-mentions" checked={pushMentions} onCheckedChange={setPushMentions} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-invites">Invitations</Label>
              <p className="text-sm text-muted-foreground">When you receive an invitation to collaborate</p>
            </div>
            <Switch id="push-invites" checked={pushInvites} onCheckedChange={setPushInvites} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Frequency</h3>

        <div className="space-y-2">
          <Label htmlFor="frequency">Delivery Frequency</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger id="frequency" className="w-full sm:w-[250px]">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="hourly">Hourly Digest</SelectItem>
              <SelectItem value="daily">Daily Digest</SelectItem>
              <SelectItem value="weekly">Weekly Digest</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">How often you want to receive notification digests</p>
        </div>
      </div>

      <Button type="submit">Save Changes</Button>
    </div>
  )
}

