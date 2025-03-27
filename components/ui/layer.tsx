"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface LayerProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
}

export function Layer({ children, className, open = false, onClose, ...props }: LayerProps) {
  const [isOpen, setIsOpen] = React.useState(open)

  React.useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleClose = React.useCallback(() => {
    setIsOpen(false)
    onClose?.()
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      className={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", className)}
      onClick={handleClose}
      {...props}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}

export function useLayer({ onClose }: { onClose?: () => void } = {}) {
  const [isOpen, setIsOpen] = React.useState(false)

  const onOpen = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = React.useCallback(() => {
    setIsOpen(false)
    onClose?.()
  }, [onClose])

  return {
    Layer,
    isOpen,
    onOpen,
    onClose: handleClose,
  }
}

export function useModal({ onClose }: { onClose?: () => void } = {}) {
  return useLayer({ onClose })
}

