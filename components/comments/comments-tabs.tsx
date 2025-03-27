"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommentModeration } from "@/components/comments/comment-moderation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, MessageSquare, Save, Settings } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function CommentsTabs() {
  const [activeTab, setActiveTab] = useState("moderation")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="moderation" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="moderation">Comment Moderation</TabsTrigger>
          <TabsTrigger value="settings">Comment Settings</TabsTrigger>
          <TabsTrigger value="reports">Comment Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="moderation" className="mt-6">
          <CommentModeration />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Comment Settings</CardTitle>
                <CardDescription>Configure comment settings for your digital legacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comments-enabled">Enable Comments</Label>
                    <div className="text-sm text-muted-foreground">Allow visitors to comment on your content</div>
                  </div>
                  <Switch id="comments-enabled" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="moderation-queue">Moderation Queue</Label>
                    <div className="text-sm text-muted-foreground">
                      Hold all comments for moderation before publishing
                    </div>
                  </div>
                  <Switch id="moderation-queue" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="guest-comments">Allow Guest Comments</Label>
                    <div className="text-sm text-muted-foreground">Allow comments from non-registered users</div>
                  </div>
                  <Switch id="guest-comments" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comment-notifications">Comment Notifications</Label>
                    <div className="text-sm text-muted-foreground">Receive email notifications for new comments</div>
                  </div>
                  <Switch id="comment-notifications" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Default Comment Display</Label>
                  <Select defaultValue="newest">
                    <SelectTrigger>
                      <SelectValue placeholder="Select display order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="likes">Most Likes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Comments Per Page</Label>
                  <Select defaultValue="10">
                    <SelectTrigger>
                      <SelectValue placeholder="Select comments per page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 comments</SelectItem>
                      <SelectItem value="10">10 comments</SelectItem>
                      <SelectItem value="20">20 comments</SelectItem>
                      <SelectItem value="50">50 comments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Comment Settings
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Filtering</CardTitle>
                <CardDescription>Configure content filtering for comments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="spam-filter">Spam Filter</Label>
                    <div className="text-sm text-muted-foreground">Automatically filter spam comments</div>
                  </div>
                  <Switch id="spam-filter" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="profanity-filter">Profanity Filter</Label>
                    <div className="text-sm text-muted-foreground">Automatically filter profanity in comments</div>
                  </div>
                  <Switch id="profanity-filter" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Blocked Words</Label>
                  <Textarea
                    placeholder="Enter words to block, separated by commas..."
                    defaultValue="inappropriate, offensive, spam"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comments containing these words will be automatically flagged for moderation.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Comment Flagging Threshold</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 flag</SelectItem>
                      <SelectItem value="2">2 flags</SelectItem>
                      <SelectItem value="3">3 flags</SelectItem>
                      <SelectItem value="5">5 flags</SelectItem>
                      <SelectItem value="10">10 flags</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Number of flags required before a comment is automatically hidden and sent for review.
                  </p>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Content Filtering</AlertTitle>
                  <AlertDescription>
                    Content filtering helps maintain a respectful environment but may occasionally filter legitimate
                    comments. Regularly review your moderation queue.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Filtering Settings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Comment Reports</CardTitle>
              <CardDescription>View and manage reported comments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Reported Comments</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  There are currently no reported comments that require your attention.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Configure Report Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

