"use client"

import React, { useState, useRef, useEffect, type FocusEvent } from "react"
import Link from "next/link"
import { ChevronDown } from "react-feather"
import { cn } from "@/lib/utils"

interface DropdownProps {
  label: string
  children: React.ReactNode
  icon?: React.ReactNode
}

interface DropdownItemProps {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
  onClick?: () => void
  tabIndex?: number
  onFocus?: () => void
}

// Hook to handle clicks outside of a ref
function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: (event: Event) => void) {
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}

const Dropdown = ({ label, children, icon }: DropdownProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1)
  const childrenArray = React.Children.toArray(children)

  // Close dropdown when clicking outside
  useOnClickOutside(ref, () => setOpen(false))

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault()
        setOpen(true)
        setFocusedItemIndex(0)
      }
    } else {
      switch (e.key) {
        case "Escape":
          e.preventDefault()
          setOpen(false)
          buttonRef.current?.focus()
          break
        case "ArrowDown":
          e.preventDefault()
          setFocusedItemIndex((prev) => (prev < childrenArray.length - 1 ? prev + 1 : 0))
          break
        case "ArrowUp":
          e.preventDefault()
          setFocusedItemIndex((prev) => (prev > 0 ? prev - 1 : childrenArray.length - 1))
          break
        case "Home":
          e.preventDefault()
          setFocusedItemIndex(0)
          break
        case "End":
          e.preventDefault()
          setFocusedItemIndex(childrenArray.length - 1)
          break
        case "Tab":
          if (!e.shiftKey && focusedItemIndex === childrenArray.length - 1) {
            setOpen(false)
          } else if (e.shiftKey && focusedItemIndex === 0) {
            setOpen(false)
          }
          break
      }
    }
  }

  // Focus the item when focusedItemIndex changes
  useEffect(() => {
    if (open && focusedItemIndex >= 0) {
      const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]')
      if (menuItems && menuItems[focusedItemIndex]) {
        ;(menuItems[focusedItemIndex] as HTMLElement).focus()
      }
    }
  }, [focusedItemIndex, open])

  // Close dropdown when focus moves outside
  useEffect(() => {
    const handleFocusOut = (e: FocusEvent) => {
      if (open && ref.current && !ref.current.contains(e.relatedTarget as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("focusout", handleFocusOut)
    return () => {
      document.removeEventListener("focusout", handleFocusOut)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-haspopup="menu"
        id={`dropdown-${label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {icon}
        {label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={`dropdown-${label.toLowerCase().replace(/\s+/g, "-")}`}
          onKeyDown={handleKeyDown}
        >
          <div className="py-1">
            {React.Children.map(children, (child, index) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  ...child.props,
                  tabIndex: focusedItemIndex === index ? 0 : -1,
                  onFocus: () => setFocusedItemIndex(index),
                })
              }
              return child
            })}
          </div>
        </div>
      )}
    </div>
  )
}

const DropdownItem = ({
  href,
  children,
  icon,
  onClick,
  tabIndex = -1,
  onFocus,
}: DropdownItemProps & { tabIndex?: number; onFocus?: () => void }) => (
  <Link
    href={href}
    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded-sm"
    role="menuitem"
    tabIndex={tabIndex}
    onClick={(e) => {
      if (onClick) onClick()
    }}
    onFocus={onFocus}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        if (onClick) onClick()
        window.location.href = href
      }
    }}
  >
    {icon && (
      <span className="mr-2" aria-hidden="true">
        {icon}
      </span>
    )}
    {children}
  </Link>
)

export { Dropdown, DropdownItem }

