"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle, Trash2, X } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

export function CommentsBulkActions({ selectedCount, onAction, onClearSelection }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <div className="p-3 bg-muted/30 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium">{selectedCount} comments selected</span>
        <Button variant="ghost" size="sm" onClick={onClearSelection} className="h-7 px-2">
          <X className="h-3 w-3 mr-1" />
          Clear
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction("approve")}
          className="bg-green-500/10 border-green-500/20 text-green-700 hover:bg-green-500/20 hover:text-green-800"
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Approve
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction("reject")}
          className="bg-yellow-500/10 border-yellow-500/20 text-yellow-700 hover:bg-yellow-500/20 hover:text-yellow-800"
        >
          <XCircle className="h-4 w-4 mr-1" />
          Reject
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction("spam")}
          className="bg-gray-500/10 border-gray-500/20 text-gray-700 hover:bg-gray-500/20 hover:text-gray-800"
        >
          <AlertTriangle className="h-4 w-4 mr-1" />
          Mark as Spam
        </Button>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-red-500/10 border-red-500/20 text-red-700 hover:bg-red-500/20 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {selectedCount} comments?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. These comments will be permanently deleted from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onAction("delete")
                  setShowDeleteDialog(false)
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

