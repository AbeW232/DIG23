"use client"

import { Badge } from "@/components/ui/badge"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import type { ReportSeverity, ReportType } from "@/types/comments"
import { CalendarIcon, Filter, Search, X } from "lucide-react"
import { format } from "date-fns"

interface FiltersType {
  severity: ReportSeverity[]
  type: ReportType[]
  dateRange: { from: Date | null; to: Date | null }
  searchTerm: string
}

interface ReportFiltersProps {
  filters: FiltersType
  onFilterChange: (filters: FiltersType) => void
}

export const ReportFilters = memo(function ReportFilters({ filters, onFilterChange }: ReportFiltersProps) {
  const handleSeverityChange = (value: ReportSeverity) => {
    const newSeverities = filters.severity.includes(value)
      ? filters.severity.filter((s) => s !== value)
      : [...filters.severity, value]

    onFilterChange({
      ...filters,
      severity: newSeverities,
    })
  }

  const handleTypeChange = (value: ReportType) => {
    const newTypes = filters.type.includes(value) ? filters.type.filter((t) => t !== value) : [...filters.type, value]

    onFilterChange({
      ...filters,
      type: newTypes,
    })
  }

  const handleDateChange = (range: { from: Date | null; to: Date | null }) => {
    onFilterChange({
      ...filters,
      dateRange: range,
    })
  }

  const handleSearchChange = (value: string) => {
    onFilterChange({
      ...filters,
      searchTerm: value,
    })
  }

  const handleClearFilters = () => {
    onFilterChange({
      severity: [],
      type: [],
      dateRange: { from: null, to: null },
      searchTerm: "",
    })
  }

  const hasActiveFilters =
    filters.severity.length > 0 ||
    filters.type.length > 0 ||
    filters.dateRange.from !== null ||
    filters.searchTerm !== ""

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search comments or users..."
            className="pl-8"
            value={filters.searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {filters.searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1.5 h-7 w-7 p-0"
              onClick={() => handleSearchChange("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              {hasActiveFilters && <span className="ml-1 rounded-full bg-primary w-2 h-2" />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Severity</h4>
                <div className="grid grid-cols-1 gap-2">
                  {["low", "medium", "high"].map((severity) => (
                    <div key={severity} className="flex items-center space-x-2">
                      <Checkbox
                        id={`severity-${severity}`}
                        checked={filters.severity.includes(severity as ReportSeverity)}
                        onCheckedChange={() => handleSeverityChange(severity as ReportSeverity)}
                      />
                      <Label htmlFor={`severity-${severity}`} className="capitalize">
                        {severity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Report Type</h4>
                <div className="grid grid-cols-1 gap-2">
                  {["harassment", "spam", "inappropriate", "misinformation", "other"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.type.includes(type as ReportType)}
                        onCheckedChange={() => handleTypeChange(type as ReportType)}
                      />
                      <Label htmlFor={`type-${type}`} className="capitalize">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Date Range</h4>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateRange.from ? (
                          filters.dateRange.to ? (
                            <>
                              {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                              {format(filters.dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(filters.dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={{
                          from: filters.dateRange.from || undefined,
                          to: filters.dateRange.to || undefined,
                        }}
                        onSelect={(range) =>
                          handleDateChange({
                            from: range?.from || null,
                            to: range?.to || null,
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={handleClearFilters}
                disabled={!hasActiveFilters}
              >
                Clear all filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.severity.map((severity) => (
            <Badge key={severity} variant="secondary" className="flex items-center gap-1">
              {severity}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => handleSeverityChange(severity)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {severity} filter</span>
              </Button>
            </Badge>
          ))}

          {filters.type.map((type) => (
            <Badge key={type} variant="secondary" className="flex items-center gap-1">
              {type}
              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => handleTypeChange(type)}>
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {type} filter</span>
              </Button>
            </Badge>
          ))}

          {filters.dateRange.from && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {format(filters.dateRange.from, "MMM d")}
              {filters.dateRange.to && ` - ${format(filters.dateRange.to, "MMM d")}`}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => handleDateChange({ from: null, to: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove date filter</span>
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
})

