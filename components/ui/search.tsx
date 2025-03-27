"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SearchIcon, X, Loader2 } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onSearch?: (value: string) => void
  onChange?: (value: string) => void
  debounceMs?: number
  isLoading?: boolean
  clearable?: boolean
  className?: string
  inputClassName?: string
}

export function Search({
  placeholder = "Search...",
  className,
  inputClassName,
  onSearch,
  onChange,
  debounceMs = 300,
  isLoading = false,
  clearable = true,
  value: controlledValue,
  ...props
}: SearchProps) {
  const [value, setValue] = React.useState<string>((controlledValue as string) || "")
  const [isFocused, setIsFocused] = React.useState(false)

  const debouncedValue = useDebounce(value, debounceMs)

  // Handle controlled component
  React.useEffect(() => {
    if (controlledValue !== undefined && controlledValue !== value) {
      setValue(controlledValue as string)
    }
  }, [controlledValue])

  // Debounce search
  React.useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue)
    }
  }, [debouncedValue, onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleClear = () => {
    setValue("")
    if (onChange) {
      onChange("")
    }
    if (onSearch) {
      onSearch("")
    }
  }

  return (
    <div className={cn("relative", className)}>
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        {...props}
        type="search"
        placeholder={placeholder}
        className={cn("pl-10", clearable && value && "pr-10", inputClassName)}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isLoading && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
      )}
      {!isLoading && clearable && value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={handleClear}
          type="button"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
      {isFocused && !value && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hidden md:block">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      )}
    </div>
  )
}

