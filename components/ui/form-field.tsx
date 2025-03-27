"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { HelpTooltip } from "@/components/ui/help-tooltip"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  description?: string
  helpText?: string
  error?: string
  className?: string
  labelClassName?: string
  inputClassName?: string
  descriptionClassName?: string
  errorClassName?: string
  required?: boolean
}

export function FormField({
  label,
  description,
  helpText,
  error,
  className,
  labelClassName,
  inputClassName,
  descriptionClassName,
  errorClassName,
  required,
  id,
  ...props
}: FormFieldProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Label htmlFor={inputId} className={cn("text-sm font-medium", labelClassName)}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>

        {helpText && <HelpTooltip content={helpText} />}
      </div>

      {description && <p className={cn("text-sm text-muted-foreground", descriptionClassName)}>{description}</p>}

      <Input
        id={inputId}
        className={cn(error && "border-destructive focus-visible:ring-destructive", inputClassName)}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        required={required}
        {...props}
      />

      {error && (
        <p id={`${inputId}-error`} className={cn("text-sm font-medium text-destructive", errorClassName)}>
          {error}
        </p>
      )}
    </div>
  )
}

