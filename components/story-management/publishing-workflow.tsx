"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Check,
  Edit,
  Eye,
  Facebook,
  Instagram,
  Mail,
  MoreHorizontal,
  Search,
  Share2,
  Twitter,
  X,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample data for stories in review
const reviewStories = [
  {
    id: 1,
    title: "Childhood Memories",
    status: "in-review",
    author: "John Doe",
    submitted: "2024-03-18",
    reviewProgress: 75,
    contentCheck: true,
    seoCheck: false,
  },
  {
    id: 2,
    title: "Family Traditions",
    status: "approved",
    author: "John Doe",
    submitted: "2024-03-15",
    reviewProgress: 100,
    contentCheck: true,
    seoCheck: true,
  },
  {
    id: 3,
    title: "Career Highlights",
    status: "needs-revision",
    author: "John Doe",
    submitted: "2024-03-10",
    reviewProgress: 50,
    contentCheck: false,
    seoCheck: false,
  },
]

// Sample data for scheduled stories
const scheduledStories = [
  {
    id: 1,
    title: "Family Traditions",
    status: "scheduled",
    scheduledDate: "2024-04-01 09:00",
    author: "John Doe",
    channels: ["website", "email", "social"],
  },
  {
    id: 2,
    title: "Childhood Memories",
    status: "published",
    scheduledDate: "2024-03-15 12:00",
    publishedDate: "2024-03-15 12:00",
    author: "John Doe",
    channels: ["website", "email"],
  },
  {
    id: 3,
    title: "Travel Adventures",
    status: "scheduled",
    scheduledDate: "2024-04-10 15:30",
    author: "John Doe",
    channels: ["website", "social"],
  },
]

export function PublishingWorkflow() {
  const [selectedTab, setSelectedTab] = useState("review")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6">
      <Tabs defaultValue="review" onValueChange={setSelectedTab} value={selectedTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="review">Review Process</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Options</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Process</CardTitle>
              <CardDescription>Review and approve stories before publishing.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Review Progress</TableHead>
                    <TableHead>Content Check</TableHead>
                    <TableHead>SEO Check</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviewStories.map((story) => (
                    <TableRow key={story.id}>
                      <TableCell className="font-medium">{story.title}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            story.status === "approved"
                              ? "default"
                              : story.status === "in-review"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {story.status === "in-review"
                            ? "In Review"
                            : story.status === "approved"
                              ? "Approved"
                              : "Needs Revision"}
                        </Badge>
                      </TableCell>
                      <TableCell>{story.submitted}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={story.reviewProgress} className="h-2 w-[60px]" />
                          <span className="text-xs text-muted-foreground">{story.reviewProgress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {story.contentCheck ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        {story.seoCheck ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Review</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" />
                              <span>Approve</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Request Revisions</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Check</CardTitle>
                <CardDescription>Verify content quality and accuracy.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="grammar" />
                    <Label htmlFor="grammar">Grammar and spelling</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="factual" />
                    <Label htmlFor="factual">Factual accuracy</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="formatting" />
                    <Label htmlFor="formatting">Proper formatting</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="media" />
                    <Label htmlFor="media">Media quality</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="sensitive" />
                    <Label htmlFor="sensitive">Sensitive content check</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-notes">Review Notes</Label>
                  <Textarea id="review-notes" placeholder="Add notes about content quality..." />
                </div>

                <Button variant="default" size="sm">
                  <Check className="h-4 w-4 mr-2" />
                  Mark Content as Reviewed
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Check</CardTitle>
                <CardDescription>Verify content quality and accuracy.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="grammar" />
                    <Label htmlFor="grammar">Grammar and spelling</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="factual" />
                    <Label htmlFor="factual">Factual accuracy</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="formatting" />
                    <Label htmlFor="formatting">Proper formatting</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="media" />
                    <Label htmlFor="media">Media quality</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="sensitive" />
                    <Label htmlFor="sensitive">Sensitive content check</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="accessibility" />
                    <Label htmlFor="accessibility">Accessibility compliance</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="citations" />
                    <Label htmlFor="citations">Citations and references</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-notes">Review Notes</Label>
                  <Textarea id="review-notes" placeholder="Add notes about content quality..." />
                </div>

                <div className="space-y-2">
                  <Label>Content Quality Score</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={75} className="h-2 flex-1" />
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Based on automated checks and manual review</p>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Check className="h-4 w-4 mr-2" />
                    Mark Content as Reviewed
                  </Button>
                  <Button variant="default" size="sm">
                    Run AI Content Check
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Review</CardTitle>
                <CardDescription>Optimize content for search engines.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="keywords">Focus Keywords</Label>
                  <Input id="keywords" placeholder="Enter keywords separated by commas" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea id="meta-description" placeholder="Enter meta description..." />
                  <div className="text-xs text-muted-foreground">150 characters recommended. 0/150 used.</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="title-tag" />
                    <Label htmlFor="title-tag">Optimized title tag</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="alt-tags" />
                    <Label htmlFor="alt-tags">Image alt tags</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="headings" />
                    <Label htmlFor="headings">Proper heading structure</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="internal-links" />
                    <Label htmlFor="internal-links">Internal links</Label>
                  </div>
                </div>

                <Button variant="default" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Run SEO Check
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Options</CardTitle>
              <CardDescription>Schedule stories for future publication.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Distribution Channels</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledStories.map((story) => (
                    <TableRow key={story.id}>
                      <TableCell className="font-medium">{story.title}</TableCell>
                      <TableCell>
                        <Badge variant={story.status === "published" ? "default" : "secondary"}>
                          {story.status === "published" ? "Published" : "Scheduled"}
                        </Badge>
                      </TableCell>
                      <TableCell>{story.scheduledDate}</TableCell>
                      <TableCell>{story.author}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {story.channels.includes("website") && (
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            >
                              Website
                            </Badge>
                          )}
                          {story.channels.includes("email") && (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                            >
                              Email
                            </Badge>
                          )}
                          {story.channels.includes("social") && (
                            <Badge
                              variant="outline"
                              className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                            >
                              Social
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Preview</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              <span>Reschedule</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish Now</CardTitle>
                <CardDescription>Immediately publish your story.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Story</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a story" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="childhood">Childhood Memories</SelectItem>
                      <SelectItem value="family">Family Traditions</SelectItem>
                      <SelectItem value="career">Career Highlights</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Distribution Channels</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="website-now" defaultChecked />
                      <Label htmlFor="website-now">Website</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="email-now" />
                      <Label htmlFor="email-now">Email Newsletter</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="social-now" />
                      <Label htmlFor="social-now">Social Media</Label>
                    </div>
                  </div>
                </div>

                <Button variant="default">Publish Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schedule Later</CardTitle>
                <CardDescription>Schedule your story for future publication.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Story</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a story" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="childhood">Childhood Memories</SelectItem>
                      <SelectItem value="family">Family Traditions</SelectItem>
                      <SelectItem value="career">Career Highlights</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Publication Date & Time</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        {/* Calendar would go here */}
                        <div className="p-3">
                          <Button size="sm" variant="outline" className="w-full">
                            Select Date
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9am">9:00 AM</SelectItem>
                        <SelectItem value="12pm">12:00 PM</SelectItem>
                        <SelectItem value="3pm">3:00 PM</SelectItem>
                        <SelectItem value="6pm">6:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Distribution Channels</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="website-later" defaultChecked />
                      <Label htmlFor="website-later">Website</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="email-later" />
                      <Label htmlFor="email-later">Email Newsletter</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="social-later" />
                      <Label htmlFor="social-later">Social Media</Label>
                    </div>
                  </div>
                </div>

                <Button variant="default">Schedule Publication</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribution</CardTitle>
              <CardDescription>Share your stories across different platforms.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Share2 className="h-5 w-5 mr-2 text-primary" />
                      Social Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Story</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a story" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="childhood">Childhood Memories</SelectItem>
                          <SelectItem value="family">Family Traditions</SelectItem>
                          <SelectItem value="career">Career Highlights</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Platforms</Label>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="facebook" />
                          <Label htmlFor="facebook" className="flex items-center">
                            <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                            Facebook
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="twitter" />
                          <Label htmlFor="twitter" className="flex items-center">
                            <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                            Twitter
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="instagram" />
                          <Label htmlFor="instagram" className="flex items-center">
                            <Instagram className="h-4 w-4 mr-2 text-pink-600" />
                            Instagram
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="social-message">Message</Label>
                      <Textarea id="social-message" placeholder="Enter your social media message..." />
                      <div className="text-xs text-muted-foreground">280 characters max. 0/280 used.</div>
                    </div>

                    <Button variant="default" className="w-full">
                      Share Now
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-primary" />
                      Email Notification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Story</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a story" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="childhood">Childhood Memories</SelectItem>
                          <SelectItem value="family">Family Traditions</SelectItem>
                          <SelectItem value="career">Career Highlights</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Recipient List</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipients" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subscribers</SelectItem>
                          <SelectItem value="family">Family Members</SelectItem>
                          <SelectItem value="friends">Close Friends</SelectItem>
                          <SelectItem value="custom">Custom List</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-subject">Email Subject</Label>
                      <Input id="email-subject" placeholder="Enter email subject..." />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-message">Message</Label>
                      <Textarea id="email-message" placeholder="Enter a personal message..." />
                    </div>

                    <Button variant="default" className="w-full">
                      Send Email
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Eye className="h-5 w-5 mr-2 text-primary" />
                      Distribution Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Story</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a story" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="childhood">Childhood Memories</SelectItem>
                          <SelectItem value="family">Family Traditions</SelectItem>
                          <SelectItem value="career">Career Highlights</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Distribution Reach</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="border rounded-md p-2">
                          <div className="text-2xl font-bold">1,245</div>
                          <div className="text-xs text-muted-foreground">Website Views</div>
                        </div>
                        <div className="border rounded-md p-2">
                          <div className="text-2xl font-bold">68%</div>
                          <div className="text-xs text-muted-foreground">Email Open Rate</div>
                        </div>
                        <div className="border rounded-md p-2">
                          <div className="text-2xl font-bold">87</div>
                          <div className="text-xs text-muted-foreground">Social Shares</div>
                        </div>
                        <div className="border rounded-md p-2">
                          <div className="text-2xl font-bold">42</div>
                          <div className="text-xs text-muted-foreground">Comments</div>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      View Detailed Analytics
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

