"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, X, File, Image, FileText, Film, Music, AlertCircle } from "lucide-react"

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
  onFilesRejected?: (files: File[]) => void

  accept?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  disabled?: boolean
  className?: string
  dropzoneClassName?: string
  showPreview?: boolean
  showProgress?: boolean
  progress?: number
  uploading?: boolean
  error?: string
  children?: React.ReactNode
}

export function FileUpload({
  onFilesSelected,
  onFilesRejected,
  accept,
  multiple = false,
  maxSize,
  maxFiles = 1,
  disabled = false,
  className,
  dropzoneClassName,
  showPreview = true,
  showProgress = false,
  progress = 0,
  uploading = false,
  error,
  children,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    processFiles(selectedFiles)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (disabled) return

    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }

  const processFiles = (selectedFiles: File[]) => {
    const validFiles: File[] = []
    const invalidFiles: File[] = []

    // Apply file type filter
    selectedFiles.forEach((file) => {
      if (accept) {
        const acceptedTypes = accept.split(",").map((type) => type.trim())
        const fileType = file.type || `application/${file.name.split(".").pop()}`

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return file.name.endsWith(type)
          } else if (type.endsWith("/*")) {
            const category = type.split("/")[0]
            return fileType.startsWith(`${category}/`)
          }
          return type === fileType
        })

        if (!isAccepted) {
          invalidFiles.push(file)
          return
        }
      }

      // Apply size filter
      if (maxSize && file.size > maxSize) {
        invalidFiles.push(file)
        return
      }

      validFiles.push(file)
    })

    // Apply max files limit
    const newFiles = multiple ? [...files, ...validFiles].slice(0, maxFiles) : validFiles.slice(0, 1)

    setFiles(newFiles)

    if (validFiles.length > 0) {
      onFilesSelected(newFiles)
    }

    if (invalidFiles.length > 0 && onFilesRejected) {
      onFilesRejected(invalidFiles)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    onFilesSelected(newFiles)
  }

  const getFileIcon = (file: File) => {
    const type = file.type

    if (type.startsWith("image/")) return <Image className="h-6 w-6" />
    if (type.startsWith("video/")) return <Film className="h-6 w-6" />
    if (type.startsWith("audio/")) return <Music className="h-6 w-6" />
    if (type.startsWith("text/")) return <FileText className="h-6 w-6" />

    return <File className="h-6 w-6" />
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-md p-6 transition-colors",
          isDragging && "border-primary bg-primary/5",
          disabled && "opacity-50 cursor-not-allowed",
          error && "border-destructive",
          dropzoneClassName,
        )}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center text-center">
          {children || (
            <>
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium text-lg">Drag & drop files here</h3>
              <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
              {accept && <p className="text-xs text-muted-foreground mt-2">Accepted file types: {accept}</p>}
              {maxSize && (
                <p className="text-xs text-muted-foreground mt-1">
                  Max file size: {(maxSize / (1024 * 1024)).toFixed(1)} MB
                </p>
              )}
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="sr-only"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
        />
      </div>

      {error && (
        <div className="flex items-center text-destructive text-sm">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}

      {showProgress && uploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      )}

      {showPreview && files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center">
                {getFileIcon(file)}
                <div className="ml-2 text-sm">
                  <div className="font-medium truncate max-w-[200px]">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
                disabled={disabled || uploading}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

