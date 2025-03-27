"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Calendar,
  Clock,
  FileText,
  Filter,
  History,
  ImageIcon,
  Music,
  Save,
  Search,
  SlidersHorizontal,
  Star,
  Video,
  X,
  Share2,
  Trash2,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data for search history
const searchHistory = [
  { id: 1, query: "family photos", timestamp: "2 days ago" },
  { id: 2, query: "grandparents interview", timestamp: "1 week ago" },
  { id: 3, query: "wedding", timestamp: "2 weeks ago" },
  { id: 4, query: "childhood home", timestamp: "1 month ago" },
  { id: 5, query: "recipes", timestamp: "1 month ago" },
]

// Sample data for saved searches
const savedSearches = [
  { id: 1, name: "Family Photos 2023", query: "family photos 2023", filters: "Type: Image, Date: 2023" },
  { id: 2, name: "Grandparent Interviews", query: "grandparents interview", filters: "Type: Video, Tags: interview" },
  { id: 3, name: "Wedding Media", query: "wedding", filters: "Tags: wedding, milestone" },
]

export function SearchFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [sizeRange, setSizeRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState("date-desc")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [savedSearchName, setSavedSearchName] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Toggle media type selection
  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
      setActiveFilters(activeFilters.filter((f) => f !== `Type: ${type}`))
    } else {
      setSelectedTypes([...selectedTypes, type])
      setActiveFilters([...activeFilters, `Type: ${type}`])
    }
  }

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
      setActiveFilters(activeFilters.filter((f) => f !== `Tag: ${tag}`))
    } else {
      setSelectedTags([...selectedTags, tag])
      setActiveFilters([...activeFilters, `Tag: ${tag}`])
    }
  }

  // Set date range
  const handleDateRangeChange = (range: { from?: Date; to?: Date }) => {
    setDateRange(range)

    // Update active filters
    const dateFilters = activeFilters.filter((f) => !f.startsWith("Date:"))
    if (range.from || range.to) {
      const fromStr = range.from ? range.from.toLocaleDateString() : "any"
      const toStr = range.to ? range.to.toLocaleDateString() : "any"
      dateFilters.push(`Date: ${fromStr} to ${toStr}`)
    }
    setActiveFilters(dateFilters)
  }

  // Set size range
  const handleSizeRangeChange = (value: number[]) => {
    setSizeRange(value)

    // Update active filters
    const sizeFilters = activeFilters.filter((f) => !f.startsWith("Size:"))
    sizeFilters.push(`Size: ${value[0]}MB to ${value[1]}MB`)
    setActiveFilters(sizeFilters)
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedTypes([])
    setSelectedTags([])
    setDateRange({})
    setSizeRange([0, 100])
    setSortBy("date-desc")
    setActiveFilters([])
  }

  // Remove specific filter
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))

    // Also update the corresponding state
    if (filter.startsWith("Type:")) {
      const type = filter.replace("Type: ", "")
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else if (filter.startsWith("Tag:")) {
      const tag = filter.replace("Tag: ", "")
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else if (filter.startsWith("Date:")) {
      setDateRange({})
    } else if (filter.startsWith("Size:")) {
      setSizeRange([0, 100])
    }
  }

  // Save current search
  const saveCurrentSearch = () => {
    if (!savedSearchName.trim()) return

    // In a real app, you would save this to your backend
    console.log("Saving search:", {
      name: savedSearchName,
      query: searchQuery,
      filters: activeFilters.join(", "),
    })

    setSavedSearchName("")
    // Show success message or update UI
  }

  // Apply saved search
  const applySavedSearch = (savedSearch: (typeof savedSearches)[0]) => {
    setSearchQuery(savedSearch.query)
    // In a real app, you would parse and apply the filters from savedSearch.filters
    // For this demo, we'll just set it as an active filter
    setActiveFilters([savedSearch.filters])
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="search">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="search">Advanced Search</TabsTrigger>
          <TabsTrigger value="history">Search History</TabsTrigger>
          <TabsTrigger value="saved">Saved Searches</TabsTrigger>
        </TabsList>

        {/* Advanced Search Tab */}
        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Media Search</CardTitle>
              <CardDescription>Find media items with advanced filters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search media..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  {showAdvancedFilters ? "Hide Filters" : "Show Filters"}
                </Button>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeFilters.map((filter, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {filter}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => removeFilter(filter)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                </div>
              )}

              {showAdvancedFilters && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Media Type</Label>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant={selectedTypes.includes("image") ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleType("image")}
                            className="flex items-center gap-1"
                          >
                            <ImageIcon className="h-4 w-4" />
                            Images
                          </Button>
                          <Button
                            variant={selectedTypes.includes("video") ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleType("video")}
                            className="flex items-center gap-1"
                          >
                            <Video className="h-4 w-4" />
                            Videos
                          </Button>
                          <Button
                            variant={selectedTypes.includes("audio") ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleType("audio")}
                            className="flex items-center gap-1"
                          >
                            <Music className="h-4 w-4" />
                            Audio
                          </Button>
                          <Button
                            variant={selectedTypes.includes("document") ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleType("document")}
                            className="flex items-center gap-1"
                          >
                            <FileText className="h-4 w-4" />
                            Documents
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "family",
                            "vacation",
                            "wedding",
                            "childhood",
                            "grandparents",
                            "recipes",
                            "milestone",
                            "interview",
                            "home",
                            "tradition",
                          ].map((tag) => (
                            <Badge
                              key={tag}
                              variant={selectedTags.includes(tag) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => toggleTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Date Range</Label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <Calendar className="h-4 w-4 mr-2" />
                                {dateRange.from ? (
                                  dateRange.to ? (
                                    <>
                                      {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                                    </>
                                  ) : (
                                    dateRange.from.toLocaleDateString()
                                  )
                                ) : (
                                  "Select date range"
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="range"
                                selected={dateRange}
                                onSelect={handleDateRangeChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDateRangeChange({})}
                            disabled={!dateRange.from && !dateRange.to}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>File Size (MB)</Label>
                          <span className="text-sm text-muted-foreground">
                            {sizeRange[0]}MB - {sizeRange[1]}MB
                          </span>
                        </div>
                        <Slider
                          defaultValue={[0, 100]}
                          max={100}
                          step={1}
                          value={sizeRange}
                          onValueChange={handleSizeRangeChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Sort By</Label>
                        <RadioGroup defaultValue="date-desc" value={sortBy} onValueChange={setSortBy}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="date-desc" id="date-desc" />
                            <Label htmlFor="date-desc" className="flex items-center cursor-pointer">
                              <Clock className="h-4 w-4 mr-2" />
                              Newest First
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="date-asc" id="date-asc" />
                            <Label htmlFor="date-asc" className="flex items-center cursor-pointer">
                              <Clock className="h-4 w-4 mr-2" />
                              Oldest First
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="name-asc" id="name-asc" />
                            <Label htmlFor="name-asc" className="flex items-center cursor-pointer">
                              <ArrowDownAZ className="h-4 w-4 mr-2" />
                              Name (A-Z)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="name-desc" id="name-desc" />
                            <Label htmlFor="name-desc" className="flex items-center cursor-pointer">
                              <ArrowUpAZ className="h-4 w-4 mr-2" />
                              Name (Z-A)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>Additional Filters</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="starred" />
                            <Label htmlFor="starred" className="flex items-center cursor-pointer">
                              <Star className="h-4 w-4 mr-2" />
                              Starred Items Only
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="shared" />
                            <Label htmlFor="shared" className="flex items-center cursor-pointer">
                              <Share2 className="h-4 w-4 mr-2" />
                              Shared Items Only
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <Label>Save This Search</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter a name for this search"
                        value={savedSearchName}
                        onChange={(e) => setSavedSearchName(e.target.value)}
                      />
                      <Button variant="outline" onClick={saveCurrentSearch} disabled={!savedSearchName.trim()}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={clearAllFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear All Filters
              </Button>
              <Button>
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Search History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search History</CardTitle>
              <CardDescription>View and reuse your recent searches</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {searchHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-3 border-b hover:bg-muted/50 rounded-md cursor-pointer"
                    onClick={() => setSearchQuery(item.query)}
                  >
                    <div className="flex items-center gap-3">
                      <History className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{item.query}</div>
                        <div className="text-xs text-muted-foreground">{item.timestamp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <X className="h-4 w-4 mr-2" />
                Clear Search History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Saved Searches Tab */}
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Searches</CardTitle>
              <CardDescription>Access your saved search queries and filters</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {savedSearches.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 border rounded-md mb-3 hover:bg-muted/50 cursor-pointer"
                    onClick={() => applySavedSearch(item)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{item.name}</div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Search className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm">Query: {item.query}</div>
                    <div className="text-xs text-muted-foreground mt-1">Filters: {item.filters}</div>
                  </div>
                ))}

                {savedSearches.length === 0 && (
                  <div className="text-center py-12">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Save className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No Saved Searches</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Save your searches to quickly access them later.
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

