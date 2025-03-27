"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Clock, Award, ChevronRight, Download, Share2, Edit } from "lucide-react"
import type { FamilyTreeData, FamilyMember } from "./family-tree"

interface FamilyTreeOverviewProps {
  familyTreeData: FamilyTreeData
}

export function FamilyTreeOverview({ familyTreeData }: FamilyTreeOverviewProps) {
  // Find the root member
  const rootMember = familyTreeData.rootMemberId
    ? familyTreeData.members.find((m) => m.id === familyTreeData.rootMemberId)
    : familyTreeData.members[0]

  // Calculate statistics
  const maleCount = familyTreeData.members.filter((m) => m.gender === "male").length
  const femaleCount = familyTreeData.members.filter((m) => m.gender === "female").length
  const otherCount = familyTreeData.members.filter((m) => m.gender === "other").length

  // Get recent members (last 3 added)
  const recentMembers = [...familyTreeData.members]
    .sort((a, b) => a.id.localeCompare(b.id))
    .slice(-3)
    .reverse()

  // Calculate relationships
  const totalRelationships = familyTreeData.members.reduce((acc, member) => {
    return acc + member.children.length + member.partners.length + member.siblings.length
  }, 0)

  // Get member by ID
  const getMemberById = (id: string): FamilyMember | undefined => {
    return familyTreeData.members.find((m) => m.id === id)
  }

  return (
    <div className="space-y-6">
      {/* Tree Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{familyTreeData.name}</CardTitle>
                <CardDescription>{familyTreeData.description || "No description provided"}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="font-medium">{familyTreeData.createdAt}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Last Modified</span>
                <span className="font-medium">{familyTreeData.lastModified}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Root Member</span>
                <span className="font-medium">{rootMember?.name || "Not set"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Total Relationships</span>
                <span className="font-medium">{totalRelationships}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Member Distribution</h3>
              <div className="flex gap-2">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${(maleCount / familyTreeData.members.length) * 100}%` }}
                ></div>
                <div
                  className="h-2 bg-pink-500 rounded-full"
                  style={{ width: `${(femaleCount / familyTreeData.members.length) * 100}%` }}
                ></div>
                <div
                  className="h-2 bg-purple-500 rounded-full"
                  style={{ width: `${(otherCount / familyTreeData.members.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  Male ({maleCount})
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-pink-500 rounded-full mr-1"></div>
                  Female ({femaleCount})
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                  Other ({otherCount})
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common tasks for your family tree</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Add New Member
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Add Important Date
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export Tree
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Clock className="h-4 w-4 mr-2" />
              View History
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Featured Members */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Recent Members</CardTitle>
            <CardDescription>Recently added family members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        member.gender === "male"
                          ? "bg-blue-100 text-blue-600"
                          : member.gender === "female"
                            ? "bg-pink-100 text-pink-600"
                            : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {member.birthDate && `Born: ${member.birthDate}`}
                        {member.parents.length > 0 &&
                          ` • Child of: ${member.parents.map((id) => getMemberById(id)?.name || "Unknown").join(", ")}`}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-2">
                View All Members
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Tree Highlights</CardTitle>
            <CardDescription>Notable information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg border bg-amber-50 border-amber-200">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-600" />
                <span className="font-medium text-amber-800">Oldest Member</span>
              </div>
              <p className="mt-1 text-sm text-amber-700">
                {rootMember?.name || "Unknown"} - Born {rootMember?.birthDate || "Unknown"}
              </p>
            </div>

            <div className="p-3 rounded-lg border bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Largest Family</span>
              </div>
              <p className="mt-1 text-sm text-blue-700">
                {rootMember?.name || "Unknown"} - {rootMember?.children.length || 0} children
              </p>
            </div>

            <div className="p-3 rounded-lg border bg-green-50 border-green-200">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Most Recent Addition</span>
              </div>
              <p className="mt-1 text-sm text-green-700">{recentMembers[0]?.name || "Unknown"} - Added recently</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips & Suggestions */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Tips for a Complete Family Tree</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Enhance your family tree by adding birth certificates, marriage records, and family photos to each
                member.
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Badge variant="outline" className="justify-start bg-background">
                  Add birth dates
                </Badge>
                <Badge variant="outline" className="justify-start bg-background">
                  Link siblings
                </Badge>
                <Badge variant="outline" className="justify-start bg-background">
                  Add family photos
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

