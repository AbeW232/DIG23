"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, CheckCircle, Clock, Edit, Flag, Search, Trash2, XCircle } from "lucide-react"

// Sample data for comments
const comments = [
  {
    id: 1,
    content: "This is such a beautiful story! It reminds me of my own grandmother's stories about her childhood.",
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-15T14:30:00",
    status: "approved",
    story: "Family Vacation Memories",
    flags: 0,
    likes: 12,
  },
  {
    id: 2,
    content:
      "I'm not sure if this is historically accurate. My grandfather told me a different version of these events.",
    author: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-14T09:15:00",
    status: "pending",
    story: "World War II Memories",
    flags: 0,
    likes: 3,
  },
  {
    id: 3,
    content: "This is completely inappropriate content and should be removed immediately.",
    author: "Anonymous User",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-13T22:45:00",
    status: "flagged",
    story: "College Years",
    flags: 3,
    likes: 0,
  },
  {
    id: 4,
    content: "Thank you for sharing this beautiful memory. It brought tears to my eyes.",
    author: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-12T16:20:00",
    status: "approved",
    story: "Grandmother's Recipe",
    flags: 0,
    likes: 8,
  },
  {
    id: 5,
    content: "I disagree with some points in this story, but I appreciate the perspective.",
    author: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-11T11:05:00",
    status: "pending",
    story: "Political Memories",
    flags: 1,
    likes: 2,
  },
  {
    id: 6,
    content: "This content contains offensive language and should be reviewed.",
    author: "Robert Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-10T08:30:00",
    status: "flagged",
    story: "High School Memories",
    flags: 2,
    likes: 1,
  },
]

export function CommentModeration() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedComments, setSelectedComments] = useState<number[]>([])

  // Filter comments based on active tab and search query
  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.story.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending") return comment.status === "pending" && matchesSearch
    if (activeTab === "approved") return comment.status === "approved" && matchesSearch
    if (activeTab === "flagged") return comment.status === "flagged" && matchesSearch

    return matchesSearch
  })

  // Toggle comment selection
  const toggleCommentSelection = (id: number) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(selectedComments.filter((commentId) => commentId !== id))
    } else {
      setSelectedComments([...selectedComments, id])
    }
  }

  // Select all comments
  const selectAllComments = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([])
    } else {
      setSelectedComments(filteredComments.map((comment) => comment.id))
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "flagged":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <Flag className="h-3 w-3 mr-1" />
            Flagged
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="all">All Comments</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search comments..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="flags">Most Flags</SelectItem>
                <SelectItem value="likes">Most Likes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Comment Moderation</CardTitle>
                <CardDescription>Review and moderate user comments</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={selectedComments.length === 0}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Selected
                </Button>
                <Button variant="outline" size="sm" disabled={selectedComments.length === 0}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Selected
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <Checkbox
                        checked={selectedComments.length > 0 && selectedComments.length === filteredComments.length}
                        onCheckedChange={selectAllComments}
                      />
                    </th>
                    <th className="px-4 py-3 text-left">Comment</th>
                    <th className="px-4 py-3 text-left">Author</th>
                    <th className="px-4 py-3 text-left">Story</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredComments.length > 0 ? (
                    filteredComments.map((comment) => (
                      <tr key={comment.id} className={selectedComments.includes(comment.id) ? "bg-muted/50" : ""}>
                        <td className="px-4 py-3">
                          <Checkbox
                            checked={selectedComments.includes(comment.id)}
                            onCheckedChange={() => toggleCommentSelection(comment.id)}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="max-w-[300px]">
                            <div className="text-sm line-clamp-2">{comment.content}</div>
                            {comment.flags > 0 && (
                              <div className="mt-1 flex items-center text-xs text-red-600">
                                <Flag className="h-3 w-3 mr-1" />
                                Flagged {comment.flags} times
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={comment.avatar} alt={comment.author} />
                              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{comment.author}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm">{comment.story}</span>
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(comment.status)}</td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-muted-foreground">
                            {new Date(comment.date).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-1">
                            {comment.status !== "approved" && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Check className="h-4 w-4 text-green-600" />
                              </Button>
                            )}
                            {comment.status !== "flagged" && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Flag className="h-4 w-4 text-yellow-600" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        No comments found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredComments.length} of {comments.length} comments
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Comment Settings</CardTitle>
              <CardDescription>Configure comment moderation settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-approve">Auto-Approve Comments</Label>
                  <div className="text-sm text-muted-foreground">Automatically approve comments from trusted users</div>
                </div>
                <Switch id="auto-approve" defaultChecked />
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
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Comment Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Moderation Stats</CardTitle>
              <CardDescription>Comment moderation statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted/50 p-4 rounded-md text-center">
                    <div className="text-2xl font-bold">{comments.filter((c) => c.status === "approved").length}</div>
                    <div className="text-sm text-muted-foreground">Approved</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md text-center">
                    <div className="text-2xl font-bold">{comments.filter((c) => c.status === "pending").length}</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md text-center">
                    <div className="text-2xl font-bold">{comments.filter((c) => c.status === "flagged").length}</div>
                    <div className="text-sm text-muted-foreground">Flagged</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average response time</span>
                    <span className="font-medium">4.2 hours</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Comments this week</span>
                      <span className="font-medium">42</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Comments this month</span>
                      <span className="font-medium">156</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Top Commenters</h4>
                  <div className="space-y-2">
                    {[
                      { name: "Sarah Johnson", count: 24 },
                      { name: "Michael Chen", count: 18 },
                      { name: "Emily Rodriguez", count: 15 },
                    ].map((user, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{user.name}</span>
                        </div>
                        <span className="text-sm font-medium">{user.count} comments</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Stats
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Tabs>
    </div>
  )
}

