"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpDown,
  Calendar,
  Clock,
  Edit,
  Eye,
  History,
  Laptop,
  MoreHorizontal,
  Smartphone,
  Tablet,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

// Sample data for drafts
const drafts = [
  {
    id: 1,
    title: "Family Traditions",
    lastSaved: "2024-03-20 14:32",
    status: "auto-saved",
    versions: 5,
    progress: 65,
  },
  {
    id: 2,
    title: "Career Highlights",
    lastSaved: "2024-03-19 10:15",
    status: "manual-saved",
    versions: 3,
    progress: 40,
  },
  {
    id: 3,
    title: "Childhood Memories",
    lastSaved: "2024-03-18 16:45",
    status: "auto-saved",
    versions: 8,
    progress: 90,
  },
  {
    id: 4,
    title: "Travel Adventures",
    lastSaved: "2024-03-15 09:20",
    status: "manual-saved",
    versions: 2,
    progress: 25,
  },
]

// Sample data for versions
const versions = [
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

export function DraftManagement() {
  const [selectedDraft, setSelectedDraft] = useState<number | null>(null)
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Draft Management</CardTitle>
            <CardDescription>Manage your story drafts and version history.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Last Saved</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Versions</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.map((draft) => (
                  <TableRow key={draft.id} className={selectedDraft === draft.id ? "bg-muted/50" : ""}>
                    <TableCell className="font-medium">{draft.title}</TableCell>
                    <TableCell>{draft.lastSaved}</TableCell>
                    <TableCell>
                      <Badge variant={draft.status === "auto-saved" ? "secondary" : "outline"}>
                        {draft.status === "auto-saved" ? "Auto-saved" : "Manual save"}
                      </Badge>
                    </TableCell>
                    <TableCell>{draft.versions}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={draft.progress} className="h-2 w-[60px]" />
                        <span className="text-xs text-muted-foreground">{draft.progress}%</span>
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
                          <DropdownMenuItem onClick={() => setSelectedDraft(draft.id)}>
                            <History className="mr-2 h-4 w-4" />
                            <span>View Versions</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Draft</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Preview</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
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
            <div className="text-sm text-muted-foreground">Showing {drafts.length} drafts</div>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Auto-save System</CardTitle>
            <CardDescription>Your work is automatically saved as you write.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Auto-save Status</div>
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Active
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Saves every 30 seconds</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Last Auto-save</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>2 minutes ago</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Recovery Options</div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <History className="h-4 w-4 mr-2" />
                  Restore from auto-save
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  View save history
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedDraft !== null && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Version History</CardTitle>
                <CardDescription>
                  {drafts.find((d) => d.id === selectedDraft)?.title} -{" "}
                  {drafts.find((d) => d.id === selectedDraft)?.versions} versions
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedDraft(null)}>
                ✕
              </Button>
            </div>
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
                {versions.map((version) => (
                  <TableRow key={version.id}>
                    <TableCell className="font-medium">{version.version}</TableCell>
                    <TableCell>{version.date}</TableCell>
                    <TableCell>{version.author}</TableCell>
                    <TableCell>{version.changes}</TableCell>
                    <TableCell>
                      <Badge variant={version.type === "auto-save" ? "secondary" : "outline"}>{version.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <History className="h-4 w-4" />
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
      )}

      <Card>
        <CardHeader>
          <CardTitle>Draft Preview</CardTitle>
          <CardDescription>Preview your draft on different devices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center gap-2 mb-4">
            <Button
              variant={previewDevice === "desktop" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewDevice("desktop")}
            >
              <Laptop className="h-4 w-4 mr-2" />
              Desktop
            </Button>
            <Button
              variant={previewDevice === "tablet" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewDevice("tablet")}
            >
              <Tablet className="h-4 w-4 mr-2" />
              Tablet
            </Button>
            <Button
              variant={previewDevice === "mobile" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewDevice("mobile")}
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile
            </Button>
          </div>

          <div
            className={`border rounded-md mx-auto overflow-hidden ${
              previewDevice === "desktop"
                ? "w-full"
                : previewDevice === "tablet"
                  ? "w-[768px] max-w-full"
                  : "w-[320px] max-w-full"
            }`}
          >
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center p-4">
                <h3 className="text-lg font-medium">Preview Content</h3>
                <p className="text-sm text-muted-foreground">Select a draft to preview</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

