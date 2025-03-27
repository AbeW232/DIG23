"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface MarketplaceFiltersProps {
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
}

export function MarketplaceFilters({ priceRange, onPriceRangeChange }: MarketplaceFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange)
  const [showSubscriptions, setShowSubscriptions] = useState(true)
  const [showOneTime, setShowOneTime] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      onPriceRangeChange(localPriceRange)
    }, 300)

    return () => clearTimeout(timer)
  }, [localPriceRange, onPriceRangeChange])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[localPriceRange[0], localPriceRange[1]]}
            max={200}
            step={1}
            onValueChange={(value) => setLocalPriceRange([value[0], value[1]])}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <span>${localPriceRange[0]}</span>
            <span>${localPriceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Payment Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="subscription"
              checked={showSubscriptions}
              onCheckedChange={(checked) => setShowSubscriptions(checked as boolean)}
            />
            <Label htmlFor="subscription">Subscription</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="one-time"
              checked={showOneTime}
              onCheckedChange={(checked) => setShowOneTime(checked as boolean)}
            />
            <Label htmlFor="one-time">One-time Purchase</Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Rating</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="rating-4" />
            <Label htmlFor="rating-4">4★ & above</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="rating-3" />
            <Label htmlFor="rating-3">3★ & above</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="rating-2" />
            <Label htmlFor="rating-2">2★ & above</Label>
          </div>
        </div>
      </div>
    </div>
  )
}

