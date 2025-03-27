"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { UploadCloud, X, Check, AlertCircle } from "lucide-react"
import { formatFileSize } from "@/lib/utils"

interface MediaUploaderProps {
  onCancel: () => void
  onComplete: () => void
}

type UploadStatus = "idle" | "uploading" | "success" | "error"

interface FileUpload {
  id: string
  file: File
  progress: number
  status: UploadStatus
  error?: string
}

export function MediaUploader({ onCancel, onComplete }: MediaUploaderProps) {
  const [files, setFiles] = useState<FileUpload[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles = Array.from(selectedFiles).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      progress: 0,
      status: "idle" as UploadStatus,
    }))

    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    // Simulate upload for each file
    const updatedFiles = [...files]

    for (let i = 0; i < updatedFiles.length; i++) {
      if (updatedFiles[i].status !== "idle") continue

      updatedFiles[i].status = "uploading"
      setFiles([...updatedFiles])

      // Simulate progress updates
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        updatedFiles[i].progress = progress
        setFiles([...updatedFiles])
      }

      // Simulate success or random error
      if (Math.random() > 0.2) {
        updatedFiles[i].status = "success"
      } else {
        updatedFiles[i].status = "error"
        updatedFiles[i].error = "Upload failed. Please try again."
      }

      setFiles([...updatedFiles])
    }

    // Check if all files are processed
    const allDone = updatedFiles.every((f) => f.status === "success" || f.status === "error")

    if (allDone) {
      // Wait a moment to show completion state
      setTimeout(onComplete, 1000)
    }
  }

  const removeFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id))
  }

  const retryFile = (id: string) => {
    setFiles(files.map((f) => (f.id === id ? { ...f, status: "idle", progress: 0, error: undefined } : f)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Media</CardTitle>
      </CardHeader>

      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-10 text-center ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
          />

          <UploadCloud className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium">Drag and drop files here</p>
          <p className="text-sm text-muted-foreground mt-1">or click to browse your device</p>
        </div>

        {files.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Files to upload ({files.length})</h3>

            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-3 border rounded-md">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.file.size)}</p>

                  {file.status === "uploading" && <Progress value={file.progress} className="h-1 mt-2" />}

                  {file.status === "error" && (
                    <p className="text-xs text-destructive mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {file.error}
                    </p>
                  )}
                </div>

                <div>
                  {file.status === "success" ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : file.status === "error" ? (
                    <Button variant="ghost" size="sm" onClick={() => retryFile(file.id)}>
                      Retry
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile(file.id)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button onClick={handleUpload} disabled={files.length === 0 || files.every((f) => f.status === "success")}>
          Upload {files.length > 0 ? `(${files.length})` : ""}
        </Button>
      </CardFooter>
    </Card>
  )
}

