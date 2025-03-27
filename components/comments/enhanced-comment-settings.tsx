"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, Save, Settings } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export function EnhancedCommentSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const [commentsEnabled, setCommentsEnabled] = useState(true)
  const [moderationEnabled, setModerationEnabled] = useState(true)
  const [profanityFilter, setProfanityFilter] = useState(true)
  const [spamFilter, setSpamFilter] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [guestComments, setGuestComments] = useState(false)
  const [linkLimit, setLinkLimit] = useState(2)
  const [commentLength, setCommentLength] = useState([50, 1000])
  const [isSaving, setIsSaving] = useState(false)

  const { toast } = useToast()

  // Dummy variables for the notification template
  const username = "User123"
  const story_title = "Example Story"
  const comment_link = "https://example.com/comment/123"
  const comment_text = "This is an example comment."

  const handleSaveSettings = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your comment settings have been updated successfully",
      })
    }, 1000)
  }

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      },
    },
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
        </TabsList>

        <motion.div key={activeTab} initial="hidden" animate="visible" variants={tabVariants} className="mt-6">
          <TabsContent value="general" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure basic comment functionality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable Comments</h3>
                    <p className="text-sm text-muted-foreground">Allow users to leave comments on stories</p>
                  </div>
                  <Switch
                    checked={commentsEnabled}
                    onCheckedChange={setCommentsEnabled}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-sort">Default Comment Sort</Label>
                  <Select defaultValue="newest">
                    <SelectTrigger id="default-sort">
                      <SelectValue placeholder="Select sort order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="likes">Most Likes</SelectItem>
                      <SelectItem value="replies">Most Replies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments-per-page">Comments Per Page</Label>
                  <Select defaultValue="10">
                    <SelectTrigger id="comments-per-page">
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 comments</SelectItem>
                      <SelectItem value="10">10 comments</SelectItem>
                      <SelectItem value="20">20 comments</SelectItem>
                      <SelectItem value="50">50 comments</SelectItem>
                      <SelectItem value="all">Show all</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="threading-depth">Threading Depth</Label>
                  <Select defaultValue="3">
                    <SelectTrigger id="threading-depth">
                      <SelectValue placeholder="Select depth" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 level</SelectItem>
                      <SelectItem value="2">2 levels</SelectItem>
                      <SelectItem value="3">3 levels</SelectItem>
                      <SelectItem value="5">5 levels</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Maximum depth for nested comment replies</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Comment Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="allow-likes" defaultChecked />
                      <Label htmlFor="allow-likes">Allow likes on comments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="allow-replies" defaultChecked />
                      <Label htmlFor="allow-replies">Allow replies to comments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="allow-formatting" defaultChecked />
                      <Label htmlFor="allow-formatting">Allow text formatting (bold, italic, etc.)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="allow-links" defaultChecked />
                      <Label htmlFor="allow-links">Allow links in comments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="allow-images" />
                      <Label htmlFor="allow-images">Allow images in comments</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Comment Length Limits</Label>
                  <div className="pt-6 px-2">
                    <Slider
                      defaultValue={commentLength}
                      min={10}
                      max={2000}
                      step={10}
                      onValueChange={setCommentLength}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>Min: {commentLength[0]} characters</span>
                      <span>Max: {commentLength[1]} characters</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Allow Guest Comments</h3>
                    <p className="text-sm text-muted-foreground">Allow non-registered users to comment</p>
                  </div>
                  <Switch checked={guestComments} onCheckedChange={setGuestComments} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2"
                      >
                        <Settings className="h-4 w-4" />
                      </motion.div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Settings
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Moderation Settings</CardTitle>
                <CardDescription>Configure how comments are moderated</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Pre-moderation</h3>
                    <p className="text-sm text-muted-foreground">Review all comments before they are published</p>
                  </div>
                  <Switch checked={moderationEnabled} onCheckedChange={setModerationEnabled} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="moderation-level">Moderation Level</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="moderation-level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Filter obvious spam only</SelectItem>
                      <SelectItem value="medium">Medium - Filter spam and offensive content</SelectItem>
                      <SelectItem value="high">High - Strict moderation of all content</SelectItem>
                      <SelectItem value="manual">Manual - All comments require approval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Automated Filters</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-profanity" checked={profanityFilter} onCheckedChange={setProfanityFilter} />
                      <Label htmlFor="filter-profanity">Filter profanity</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-spam" checked={spamFilter} onCheckedChange={setSpamFilter} />
                      <Label htmlFor="filter-spam">Filter spam</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-links" defaultChecked />
                      <Label htmlFor="filter-links">Filter excessive links</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-personal" defaultChecked />
                      <Label htmlFor="filter-personal">Filter personal information</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link-limit">Maximum Links Per Comment</Label>
                  <div className="pt-6 px-2">
                    <Slider
                      defaultValue={[linkLimit]}
                      min={0}
                      max={10}
                      step={1}
                      onValueChange={(value) => setLinkLimit(value[0])}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>
                        {linkLimit === 0
                          ? "No links allowed"
                          : `${linkLimit} link${linkLimit === 1 ? "" : "s"} maximum`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-blacklist">Custom Word Blacklist</Label>
                  <Textarea
                    id="custom-blacklist"
                    placeholder="Enter words or phrases to block, one per line"
                    className="h-20"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comments containing these words will be automatically flagged
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="moderation-action">Action for Flagged Comments</Label>
                  <Select defaultValue="hold">
                    <SelectTrigger id="moderation-action">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hold">Hold for review</SelectItem>
                      <SelectItem value="reject">Automatically reject</SelectItem>
                      <SelectItem value="notify">Publish but notify moderators</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Moderation Best Practices</AlertTitle>
                  <AlertDescription>
                    Consistent moderation helps maintain a respectful community. Consider creating clear community
                    guidelines for commenters.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2"
                      >
                        <Settings className="h-4 w-4" />
                      </motion.div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Settings
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure comment notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Admin Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-new-comment" defaultChecked />
                      <Label htmlFor="notify-new-comment">New comments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-flagged" defaultChecked />
                      <Label htmlFor="notify-flagged">Flagged comments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-reported" defaultChecked />
                      <Label htmlFor="notify-reported">Reported comments</Label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive email notifications for comments</p>
                  </div>
                  <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input id="notification-email" type="email" placeholder="admin@example.com" />
                  <p className="text-xs text-muted-foreground">Email address to receive comment notifications</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">Notification Frequency</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger id="notification-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly digest</SelectItem>
                      <SelectItem value="daily">Daily digest</SelectItem>
                      <SelectItem value="weekly">Weekly digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">User Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="user-notify-replies" defaultChecked />
                      <Label htmlFor="user-notify-replies">Notify users of replies to their comments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="user-notify-likes" defaultChecked />
                      <Label htmlFor="user-notify-likes">Notify users when their comments receive likes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="user-notify-mentions" defaultChecked />
                      <Label htmlFor="user-notify-mentions">Notify users when they are mentioned in comments</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-notification-template">User Notification Email Template</Label>
                  <Textarea
                    id="user-notification-template"
                    placeholder="Enter email template"
                    className="h-20"
                    defaultValue={`Hello ${username}, you have a new reply to your comment on ${story_title}. Click here to view: ${comment_link}`}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use {"{username}"}, {"{story_title}"}, {"{comment_link}"}, and {"{comment_text}"} as placeholders
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2"
                      >
                        <Settings className="h-4 w-4" />
                      </motion.div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Settings
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="display" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Configure how comments appear on your stories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="comment-position">Comment Position</Label>
                  <Select defaultValue="bottom">
                    <SelectTrigger id="comment-position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom">Bottom of story</SelectItem>
                      <SelectItem value="tab">In a separate tab</SelectItem>
                      <SelectItem value="sidebar">In a sidebar</SelectItem>
                      <SelectItem value="floating">Floating panel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment-style">Comment Style</Label>
                  <Select defaultValue="cards">
                    <SelectTrigger id="comment-style">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cards">Card style</SelectItem>
                      <SelectItem value="minimal">Minimal style</SelectItem>
                      <SelectItem value="classic">Classic style</SelectItem>
                      <SelectItem value="compact">Compact style</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Display Elements</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-avatars" defaultChecked />
                      <Label htmlFor="show-avatars">Show user avatars</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-timestamps" defaultChecked />
                      <Label htmlFor="show-timestamps">Show timestamps</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-like-count" defaultChecked />
                      <Label htmlFor="show-like-count">Show like counts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-reply-button" defaultChecked />
                      <Label htmlFor="show-reply-button">Show reply buttons</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-share-button" />
                      <Label htmlFor="show-share-button">Show share buttons</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment-placeholder">Comment Input Placeholder</Label>
                  <Input id="comment-placeholder" defaultValue="Share your thoughts on this story..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment-label">Comment Section Label</Label>
                  <Input id="comment-label" defaultValue="Comments" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empty-state">Empty State Message</Label>
                  <Input id="empty-state" defaultValue="Be the first to comment on this story!" />
                  <p className="text-xs text-muted-foreground">Message shown when there are no comments</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Custom CSS</h3>
                  <Textarea placeholder="Enter custom CSS for comment styling" className="font-mono text-xs h-20" />
                  <p className="text-xs text-muted-foreground">Advanced: Add custom CSS to style the comment section</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2"
                      >
                        <Settings className="h-4 w-4" />
                      </motion.div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Settings
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}

