"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Check, FileText, ImageIcon, Music, Paperclip, Trash2, Upload, Video, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function UploadInterface() {
  const [activeTab, setActiveTab] = useState("upload")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadQueue, setUploadQueue] = useState<any[]>([])
  const [completedUploads, setCompletedUploads] = useState<any[]>([])
  const [failedUploads, setFailedUploads] = useState<any[]>([])

  // Simulate file upload process
  const simulateUpload = () => {
    if (uploadQueue.length === 0 || isUploading) return

    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          // Move current file from queue to completed
          const currentFile = uploadQueue[0]
          setCompletedUploads([...completedUploads, currentFile])
          setUploadQueue(uploadQueue.slice(1))

          // Start next upload if queue is not empty
          if (uploadQueue.length > 1) {
            setTimeout(simulateUpload, 500)
          }

          return 0
        }
        return prev + 5
      })
    }, 200)
  }

  // Add files to upload queue
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const newFiles = Array.from(e.target.files).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      type: file.type.split("/")[0],
      file,
    }))

    setUploadQueue([...uploadQueue, ...newFiles])

    // Auto start upload if not already uploading
    if (!isUploading) {
      setTimeout(simulateUpload, 500)
    }

    // Reset input
    e.target.value = ""
  }

  // Remove file from upload queue
  const removeFromQueue = (id: string) => {
    setUploadQueue(uploadQueue.filter((file) => file.id !== id))
  }

  // Get icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-6 w-6 text-blue-500" />
      case "video":
        return <Video className="h-6 w-6 text-red-500" />
      case "audio":
        return <Music className="h-6 w-6 text-green-500" />
      default:
        return <FileText className="h-6 w-6 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upload" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="upload">Drag & Drop</TabsTrigger>
          <TabsTrigger value="batch">Batch Upload</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>

        {/* Drag & Drop Tab */}
        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Media</CardTitle>
              <CardDescription>Drag and drop files to upload or use the file browser</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => document.getElementById("file-upload")?.click()}
                onDragOver={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  e.stopPropagation()

                  if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return

                  const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
                    id: Math.random().toString(36).substring(2, 9),
                    name: file.name,
                    size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
                    type: file.type.split("/")[0],
                    file,
                  }))

                  setUploadQueue([...uploadQueue, ...newFiles])

                  // Auto start upload if not already uploading
                  if (!isUploading) {
                    setTimeout(simulateUpload, 500)
                  }
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">Drag & Drop Files Here</h3>
                  <p className="text-sm text-muted-foreground">or click to browse your files</p>
                  <Input id="file-upload" type="file" multiple className="hidden" onChange={handleFileSelect} />
                  <Button variant="outline" size="sm" className="mt-2">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Upload Queue</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={simulateUpload}
                    disabled={uploadQueue.length === 0 || isUploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Start Upload
                  </Button>
                </div>

                {uploadQueue.length > 0 ? (
                  <div className="space-y-2">
                    {uploadQueue.map((file, index) => (
                      <div
                        key={file.id}
                        className={`flex items-center justify-between p-3 border rounded-md ${index === 0 && isUploading ? "bg-muted/50" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.type)}
                          <div>
                            <div className="font-medium text-sm">{file.name}</div>
                            <div className="text-xs text-muted-foreground">{file.size}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {index === 0 && isUploading ? (
                            <div className="text-xs text-muted-foreground">{uploadProgress}%</div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => removeFromQueue(file.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}

                    {isUploading && (
                      <div className="mt-2">
                        <Progress value={uploadProgress} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No files in queue. Drag and drop files or browse to add.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">{uploadQueue.length} files in queue</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("progress")}
                disabled={completedUploads.length === 0}
              >
                View Completed Uploads
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Batch Upload Tab */}
        <TabsContent value="batch" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Batch Upload</CardTitle>
              <CardDescription>Upload multiple files with common metadata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Files</Label>
                  <div className="flex gap-2">
                    <Input type="file" multiple onChange={handleFileSelect} />
                    <Button variant="outline">Browse</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Destination Folder</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue placeholder="Select folder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Media Library</SelectItem>
                      <SelectItem value="family">Family Photos</SelectItem>
                      <SelectItem value="documents">Documents</SelectItem>
                      <SelectItem value="videos">Videos</SelectItem>
                      <SelectItem value="audio">Audio Recordings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Common Tags (applied to all files)</Label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>

                <div className="space-y-2">
                  <Label>Batch Description</Label>
                  <Input placeholder="Enter a description for this batch" />
                </div>

                <div className="space-y-2">
                  <Label>Processing Options</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Image Processing</Label>
                      <Select defaultValue="optimize">
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Processing</SelectItem>
                          <SelectItem value="optimize">Optimize for Web</SelectItem>
                          <SelectItem value="resize">Resize Images</SelectItem>
                          <SelectItem value="full">Full Processing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Video Processing</Label>
                      <Select defaultValue="compress">
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Processing</SelectItem>
                          <SelectItem value="compress">Compress Videos</SelectItem>
                          <SelectItem value="transcode">Transcode to MP4</SelectItem>
                          <SelectItem value="full">Full Processing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Batch Upload Information</AlertTitle>
                  <AlertDescription>
                    Batch uploads will process all files with the same metadata and settings. This is useful for
                    uploading multiple related files at once.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={simulateUpload} disabled={uploadQueue.length === 0 || isUploading}>
                Start Batch Upload
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Progress Tracking Tab */}
        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Progress</CardTitle>
              <CardDescription>Track the status of your uploads</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="current">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="current">Current ({isUploading ? "1" : "0"})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedUploads.length})</TabsTrigger>
                  <TabsTrigger value="failed">Failed ({failedUploads.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="current" className="mt-4">
                  {isUploading && uploadQueue.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                        <div className="flex items-center gap-3">
                          {getFileIcon(uploadQueue[0].type)}
                          <div>
                            <div className="font-medium text-sm">{uploadQueue[0].name}</div>
                            <div className="text-xs text-muted-foreground">{uploadQueue[0].size}</div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">{uploadProgress}%</div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} />
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {uploadQueue.length > 1 ? (
                          <p>{uploadQueue.length - 1} more files in queue</p>
                        ) : (
                          <p>This is the last file in the queue</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Check className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No Active Uploads</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        All uploads have been completed or there are no uploads in progress.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed" className="mt-4">
                  {completedUploads.length > 0 ? (
                    <div className="space-y-2">
                      {completedUploads.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            {getFileIcon(file.type)}
                            <div>
                              <div className="font-medium text-sm">{file.name}</div>
                              <div className="text-xs text-muted-foreground">{file.size}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <Check className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No Completed Uploads</h3>
                      <p className="text-sm text-muted-foreground mt-2">You haven't completed any uploads yet.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="failed" className="mt-4">
                  {failedUploads.length > 0 ? (
                    <div className="space-y-2">
                      {failedUploads.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            {getFileIcon(file.type)}
                            <div>
                              <div className="font-medium text-sm">{file.name}</div>
                              <div className="text-xs text-muted-foreground">{file.size}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              <X className="h-3 w-3 mr-1" />
                              Failed
                            </Badge>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Check className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No Failed Uploads</h3>
                      <p className="text-sm text-muted-foreground mt-2">All your uploads have been successful.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => setCompletedUploads([])}>
                Clear History
              </Button>
              <Button size="sm" onClick={() => setActiveTab("upload")}>
                Upload More Files
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

