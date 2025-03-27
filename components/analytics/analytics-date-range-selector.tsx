"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import type { DateRange } from "react-day-picker"

interface AnalyticsDateRangeSelectorProps {
  timeRange: string
  onTimeRangeChange: (range: string) => void
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
}

export function AnalyticsDateRangeSelector({
  timeRange,
  onTimeRangeChange,
  dateRange,
  onDateRangeChange,
}: AnalyticsDateRangeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Select value={timeRange} onValueChange={onTimeRangeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="90d">Last 90 days</SelectItem>
          <SelectItem value="1y">Last year</SelectItem>
          <SelectItem value="custom">Custom range</SelectItem>
        </SelectContent>
      </Select>

      {timeRange === "custom" && <DatePickerWithRange date={dateRange} setDate={onDateRangeChange} />}
    </div>
  )
}

