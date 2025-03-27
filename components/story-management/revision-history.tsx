"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  GitMerge,
  History,
  MoreHorizontal,
  RotateCcw,
  User,
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for revision history
const revisions = [
  {
    id: 1,
    version: "v1.5",
    date: "2024-03-20 14:32",
    author: "John Doe",
    changes: "Added new section about summer traditions",
    type: "auto-save",
  },
  {
    id: 2,
    version: "v1.4",
    date: "2024-03-20 13:15",
    author: "John Doe",
    changes: "Updated introduction paragraph",
    type: "auto-save",
  },
  {
    id: 3,
    version: "v1.3",
    date: "2024-03-19 16:45",
    author: "John Doe",
    changes: "Added 3 new photos to the gallery",
    type: "manual-save",
  },
  {
    id: 4,
    version: "v1.2",
    date: "2024-03-18 11:30",
    author: "John Doe",
    changes: "Edited section about winter holidays",
    type: "auto-save",
  },
  {
    id: 5,
    version: "v1.1",
    date: "2024-03-17 09:45",
    author: "John Doe",
    changes: "Initial draft creation",
    type: "manual-save",
  },
]

// Sample data for change logs
const changeLogs = [
  {
    id: 1,
    date: "2024-03-20 14:32",
    author: "John Doe",
    action: "Added",
    element: "Text Section",
    details: "Added new section about summer traditions",
  },
  {
    id: 2,
    date: "2024-03-20 13:15",
    author: "John Doe",
    action: "Modified",
    element: "Text",
    details: "Updated introduction paragraph",
  },
  {
    id: 3,
    date: "2024-03-19 16:45",
    author: "John Doe",
    action: "Added",
    element: "Images",
    details: "Added 3 new photos to the gallery",
  },
  {
    id: 4,
    date: "2024-03-18 11:30",
    author: "John Doe",
    action: "Modified",
    element: "Text Section",
    details: "Edited section about winter holidays",
  },
  {
    id: 5,
    date: "2024-03-17 09:45",
    author: "John Doe",
    action: "Created",
    element: "Document",
    details: "Initial draft creation",
  },
]

export function RevisionHistory() {
  const [selectedTab, setSelectedTab] = useState("timeline")
  const [compareVersions, setCompareVersions] = useState(false)
  const [selectedVersion1, setSelectedVersion1] = useState("v1.5")
  const [selectedVersion2, setSelectedVersion2] = useState("v1.3")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="timeline" onValueChange={setSelectedTab} value={selectedTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="changelog">Change Logs</TabsTrigger>
          <TabsTrigger value="rollback">Rollback Options</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Visual Timeline</CardTitle>
                  <CardDescription>Chronological view of story revisions.</CardDescription>
                </div>
                <Button
                  variant={compareVersions ? "default" : "outline"}
                  onClick={() => setCompareVersions(!compareVersions)}
                >
                  {compareVersions ? "Exit Compare Mode" : "Compare Versions"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {compareVersions ? (
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-sm font-medium">Version 1</label>
                      <Select value={selectedVersion1} onValueChange={setSelectedVersion1}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select version" />
                        </SelectTrigger>
                        <SelectContent>
                          {revisions.map((rev) => (
                            <SelectItem key={rev.id} value={rev.version}>
                              {rev.version} ({rev.date})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="text-sm font-medium">Version 2</label>
                      <Select value={selectedVersion2} onValueChange={setSelectedVersion2}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select version" />
                        </SelectTrigger>
                        <SelectContent>
                          {revisions.map((rev) => (
                            <SelectItem key={rev.id} value={rev.version}>
                              {rev.version} ({rev.date})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <div className="grid grid-cols-2 divide-x">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm font-medium">{selectedVersion1}</div>
                          <Badge variant="outline">{revisions.find((r) => r.version === selectedVersion1)?.date}</Badge>
                        </div>
                        <div className="bg-muted p-4 rounded-md h-[300px] overflow-auto">
                          <div className="prose prose-sm max-w-none">
                            <h3>Introduction</h3>
                            <p>This is the content from version {selectedVersion1}. It shows how the document looked at this point in time.</p>
                            <p>Some text might be <span className="bg-green-100 dark:bg-green-900">highlighted in green</span> to show additions compared to the other version.</p>
                            <p>And some text might be <span className="bg-red-100 dark:bg-red-900 line-through">highlighted in red with strikethrough</span> to show deletions.</p>
                            <h3>Main Content</h3>
                            <p>The main content section contains the bulk of the story information.</p>
                            <ul>
                              <li>List item one</li>
                              <li>List item two</li>
                              <li>List item three</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm font-medium">{selectedVersion2}</div>
                          <Badge variant="outline">{revisions.find((r) => r.version === selectedVersion2)?.date}</Badge>
                        </div>
                        <div className="bg-muted p-4 rounded-md h-[300px] overflow-auto">
                          <div className="prose prose-sm max-w-none">
                            <h3>Introduction</h3>
                            <p>This is the content from version {selectedVersion2}. It shows how the document looked at this point in time.</p>
                            <p>Some text might be <span className="bg-green-100 dark:bg-green-900">highlighted in green</span> to show additions compared to the other version.</p>
                            <p>And some text might be <span className="bg-red-100 dark:bg-red-900 line-through">highlighted in red with strikethrough</span> to show deletions.</p>
                            <h3>Main Content</h3>
                            <p>The main content section contains the bulk of the story information with some additional details.</p>
                            <ul>
                              <li>List item one</li>
                              <li>List item two with additional information</li>
                              <li>List item three</li>
                              <li>List item four (new)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t bg-muted/30">
                      <div className="flex justify-between">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Difference Summary</div>
                          <div className="text-xs text-muted-foreground">
                            <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900 rounded mr-2">+12 additions</span>
                            <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900 rounded">-5 deletions</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <GitMerge className="h-4 w-4 mr-2" />
                            Merge Changes
                          </Button>
                          <Button variant="default" size="sm">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Restore Version
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted-foreground/20"></div>
                  <div className="space-y-6 ml-10 relative">
                    {revisions.map((revision, index) => (
                      <div key={revision.id} className="relative">
                        <div className="absolute -left-10 mt-1 w-4 h-4 rounded-full bg-primary"></div>
                        <Card>
                          <CardHeader className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-base">{revision.version}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {revision.date}
                                </CardDescription>
                              </div>
                              <Badge variant={revision.type === "auto-save" ? "secondary" : "outline"}>
                                {revision.type}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-start gap-2">
                              <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div className="text-sm">{revision.author}</div>
                            </div>
                            <div className="mt-2 text-sm">{revision.changes}</div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Restore
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="changelog" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Logs</CardTitle>
              <CardDescription>Detailed history of all changes made to the story.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Element</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {changeLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.author}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.action === "Added"
                              ? "default"
                              : log.action === "Modified"
                                ? "secondary"
                                : log.action === "Created"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.element}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{log.details}</TableCell>
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
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RotateCcw className="mr-2 h-4 w-4" />
                              <span>Revert This Change</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing {changeLogs.length} changes</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Edit History</CardTitle>
                <CardDescription>Track changes by author and time.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Filter by Author</div>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Authors</SelectItem>
                      <SelectItem value="john">John Doe</SelectItem>
                      <SelectItem value="jane">Jane Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Filter by Action</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer">
                      Added
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Modified
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Deleted
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Created
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Edit Statistics</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border rounded-md p-2">
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-xs text-muted-foreground">Total Edits</div>
                    </div>
                    <div className="border rounded-md p-2">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-xs text-muted-foreground">Contributors</div>
                    </div>
                    <div className="border rounded-md p-2">
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-xs text-muted-foreground">Major Revisions</div>
                    </div>
                    <div className="border rounded-md p-2">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-xs text-muted-foreground">Days Active</div>
                    </div>
                  </div>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Author Tracking</CardTitle>
                <CardDescription>Monitor contributions by author.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                            JD
                          </div>
                          <div>
                            <div className="font-medium">John Doe</div>
                            <div className="text-xs text-muted-foreground">Primary Author</div>
                          </div>
                        </div>
                        <Badge>18 edits</Badge>
                      </div>
                      <div className="pl-10 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Last edit: 2 hours ago</span>
                        </div>
                        <div className="mt-1">Created the story and made most content edits</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                            JS
                          </div>
                          <div>
                            <div className="font-medium">Jane Smith</div>
                            <div className="text-xs text-muted-foreground">Editor</div>
                          </div>
                        </div>
                        <Badge>5 edits</Badge>
                      </div>
                      <div className="pl-10 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Last edit: 1 day ago</span>
                        </div>
                        <div className="mt-1">Primarily edited grammar and formatting</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                            RJ
                          </div>
                          <div>
                            <div className="font-medium">Robert Johnson</div>
                            <div className="text-xs text-muted-foreground">Contributor</div>
                          </div>
                        </div>
                        <Badge>1 edit</Badge>
                      </div>
                      <div className="pl-10 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Last edit: 3 days ago</span>
                        </div>
                        <div className="mt-1">Added photos to the gallery section</div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rollback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rollback Options</CardTitle>
              <CardDescription>Restore previous versions of your story.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Version</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Changes</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revisions.map((revision) => (
                    <TableRow key={revision.id}>
                      <TableCell className="font-medium">{revision.version}</TableCell>
                      <TableCell>{revision.date}</TableCell>
                      <TableCell>{revision.author}</TableCell>
                      <TableCell>{revision.changes}</TableCell>
                      <TableCell>
                        <Badge variant={revision.type === "auto-save" ? "secondary" : "outline"}>{revision.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4" />
                            <span className="sr-only">Restore</span>
                          </Button>
                        </div>
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
                <CardTitle>Restore Version</CardTitle>
                <CardDescription>Revert to a previous version of your story.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Select Version to Restore</div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      {revisions.map((rev) => (
                        <SelectItem key={rev.id} value={rev.version}>
                          {rev.version} ({rev.date})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Restore Options</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="complete" name="restore-type" className="h-4 w-4" defaultChecked />
                      <label htmlFor="complete" className="text-sm">
                        Complete restore (replace current version)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="partial" name="restore-type" className="h-4 w-4" />
                      <label htmlFor="partial" className="text-sm">
                        Partial restore (select elements to restore)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="duplicate" name="restore-type" className="h-4 w-4" />
                      <label htmlFor="duplicate" className="text-sm">
                        Create duplicate (keep both versions)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-md bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <div className="flex items-start gap-2">
                    <History className="h-5 w-5 mt-0.5" />
                    <div>
                      <div className="font-medium">Warning</div>
                      <div className="text-sm">
                        Restoring a previous version will overwrite your current version. This action cannot be undone.
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="default" className="w-full">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restore Selected Version
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Merge Changes</CardTitle>
                <CardDescription>Selectively merge changes from different versions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Source Version</div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source version" />
                    </SelectTrigger>
                    <SelectContent>
                      {revisions.map((rev) => (
                        <SelectItem key={rev.id} value={rev.version}>
                          {rev.version} ({rev.date})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Target Version</div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Version</SelectItem>
                      {revisions.map((rev) => (
                        <SelectItem key={rev.id} value={rev.version}>
                          {rev.version} ({rev.date})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Elements to Merge</div>
                  <div className="border rounded-md p-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="text" className="h-4 w-4" defaultChecked />
                      <label htmlFor="text" className="text-sm">
                        Text Content
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="images" className="h-4 w-4" defaultChecked />
                      <label htmlFor="images" className="text-sm">
                        Images
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="formatting" className="h-4 w-4" defaultChecked />
                      <label htmlFor="formatting" className="text-sm">
                        Formatting
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metadata" className="h-4 w-4" />
                      <label htmlFor="metadata" className="text-sm">
                        Metadata
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Conflict Resolution</div>
                  <div className="border rounded-md p-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="auto-resolve" name="conflict-resolution" className="h-4 w-4" defaultChecked />
                        <label htmlFor="auto-resolve" className="text-sm">
                          Auto-resolve conflicts (prefer source)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="manual-resolve" name="conflict-resolution" className="h-4 w-4" />
                        <label htmlFor="manual-resolve" className="text-sm">
                          Manual conflict resolution
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="create-new" name="conflict-resolution" className="h-4 w-4" />
                        <label htmlFor="create-new" className="text-sm">
                          Create new version from merge
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Merge Preview</div>
                  <div className="border rounded-md p-3 h-[100px] flex items-center justify-center bg-muted/50">
                    <div className="text-center text-muted-foreground">
                      <p>Select versions to see merge preview</p>
                    </div>
                  </div>
                </div>

                <Button variant="default" className="w-full">
                  <GitMerge className="h-4 w-4 mr-2" />
                  Merge Selected Changes
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

