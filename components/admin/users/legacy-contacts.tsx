"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, Mail, MoreHorizontal, Phone, Plus, Trash2, UserPlus } from "lucide-react"

// Sample data for legacy contacts
const sampleContacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    relationship: "Daughter",
    status: "active",
    dateAdded: "2024-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Michael Smith",
    email: "michael.smith@example.com",
    phone: "+1 (555) 987-6543",
    relationship: "Son",
    status: "active",
    dateAdded: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

interface LegacyContactsProps {
  userId: number
}

export function LegacyContacts({ userId }: LegacyContactsProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter contacts based on search query
  const filteredContacts = sampleContacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.relationship.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <Button variant="default" size="sm" className="gap-1">
          <UserPlus className="h-4 w-4 mr-1" />
          Add Contact
        </Button>
        <Input
          type="search"
          placeholder="Search contacts..."
          className="w-full sm:w-[250px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <Card key={contact.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center p-3">
                  <Avatar className="h-10 w-10 mr-3 border-2 border-background shadow-sm">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {contact.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow min-w-0">
                    <div className="font-medium">{contact.name}</div>
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                      <span className="hidden sm:inline mx-2">•</span>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        <span>{contact.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end ml-2 gap-2">
                    <Badge variant="outline" className="capitalize">
                      {contact.relationship}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Send Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Remove</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <UserPlus className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="text-lg font-medium">No Contacts Found</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              {searchQuery
                ? "Try adjusting your search"
                : "Add legacy contacts who will receive access to digital assets"}
            </p>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4 mr-1" />
              Add Contact
            </Button>
          </div>
        )}
      </div>

      <div className="pt-2">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {filteredContacts.length} of {sampleContacts.length} contacts
          </div>
          <div className="text-sm">
            <Label className="text-xs text-muted-foreground">Contact Limit</Label>
            <div className="text-right font-medium">{sampleContacts.length} of 3 contacts used</div>
          </div>
        </div>
      </div>
    </div>
  )
}

