"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Tag, Sparkles, Save, Copy, BookOpen } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MemoryGeneration() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [location, setLocation] = useState("")
  const [people, setPeople] = useState<string[]>([])
  const [occasion, setOccasion] = useState("")
  const [keywords, setKeywords] = useState("")
  const [generatedMemory, setGeneratedMemory] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [newPerson, setNewPerson] = useState("")

  const handleAddPerson = () => {
    if (newPerson.trim() && !people.includes(newPerson.trim())) {
      setPeople([...people, newPerson.trim()])
      setNewPerson("")
    }
  }

  const handleRemovePerson = (person: string) => {
    setPeople(people.filter((p) => p !== person))
  }

  const handleGenerateMemory = () => {
    if (!date || !location || people.length === 0 || !occasion) return

    setIsGenerating(true)

    // Simulate AI processing
    setTimeout(() => {
      const formattedDate = format(date, "MMMM d, yyyy")
      const peopleList = people.join(", ")

      // Generate a sample memory based on inputs
      const memory = `On ${formattedDate}, we gathered at ${location} for ${occasion}. ${peopleList} were all there, creating a warm atmosphere of connection and joy. The weather was perfect, with gentle sunshine filtering through the trees, casting dappled shadows across the gathering.

As we shared stories and laughter, time seemed to slow down, allowing us to savor each moment. ${people[0]} brought their famous homemade dish that everyone raved about, while ${people.length > 1 ? people[1] : "someone"} captured beautiful photos that would later become treasured mementos.

What made this day special wasn't just the occasion itself, but the genuine connections and meaningful conversations that unfolded. Looking back, this gathering represents one of those perfect moments in time where everything aligned to create a memory that continues to bring comfort and joy whenever it's recalled.`

      setGeneratedMemory(memory)
      setIsGenerating(false)
    }, 3000)
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedMemory)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Memory Generation</CardTitle>
          <CardDescription>Generate detailed memories based on key information</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="input" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">
                <Tag className="h-4 w-4 mr-2" />
                Memory Details
              </TabsTrigger>
              <TabsTrigger value="output" disabled={!generatedMemory}>
                <BookOpen className="h-4 w-4 mr-2" />
                Generated Memory
              </TabsTrigger>
            </TabsList>
            <TabsContent value="input" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex gap-2">
                      <Input
                        id="location"
                        placeholder="Where did this memory take place?"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="occasion">Occasion</Label>
                    <Select value={occasion} onValueChange={setOccasion}>
                      <SelectTrigger id="occasion">
                        <SelectValue placeholder="Select occasion type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="holiday">Holiday</SelectItem>
                        <SelectItem value="reunion">Family Reunion</SelectItem>
                        <SelectItem value="vacation">Vacation</SelectItem>
                        <SelectItem value="graduation">Graduation</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="everyday">Everyday Moment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>People Present</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add person's name"
                        value={newPerson}
                        onChange={(e) => setNewPerson(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddPerson()
                          }
                        }}
                      />
                      <Button type="button" variant="secondary" onClick={handleAddPerson}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {people.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No people added yet</p>
                      ) : (
                        people.map((person) => (
                          <Badge key={person} variant="secondary" className="flex items-center gap-1">
                            {person}
                            <button
                              className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-1"
                              onClick={() => handleRemovePerson(person)}
                            >
                              ✕
                            </button>
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="keywords">Keywords (Optional)</Label>
                    <Textarea
                      id="keywords"
                      placeholder="Enter keywords or details about this memory..."
                      rows={3}
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full mt-6"
                    onClick={handleGenerateMemory}
                    disabled={!date || !location || people.length === 0 || !occasion || isGenerating}
                  >
                    {isGenerating ? (
                      <>Generating...</>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Memory
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="output" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {occasion.charAt(0).toUpperCase() + occasion.slice(1)} at {location}
                  </CardTitle>
                  <CardDescription>
                    {date && format(date, "MMMM d, yyyy")} • {people.length} people present
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p>{generatedMemory}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleCopyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </Button>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save to Stories
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

