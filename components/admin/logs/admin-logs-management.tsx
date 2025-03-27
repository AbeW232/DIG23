"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  ArrowDownToLine,
  Calendar,
  Check,
  Clock,
  Download,
  Eye,
  Filter,
  Info,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Trash2,
  User,
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function AdminLogsManagement() {
  const [activeTab, setActiveTab] = useState("activity")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState("7")
  const [logType, setLogType] = useState("all")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  
  // Sample activity logs data
  const activityLogs = [
    {
      id: 1,
      timestamp: "2024-03-26 14:32:45",
      user: "John Doe",
      userId: 1,
      action: "legacy_setup",
      description: "Digital legacy setup completed",
      status: "success",
      details: "Added 3 legacy contacts and configured asset access",
    },
    {
      id: 2,
      timestamp: "2024-03-26 12:15:22",
      user: "Jane Smith",
      userId: 2,
      action: "asset_upload",
      description: "Uploaded legacy assets",
      status: "success",
      details: "Uploaded 15 photos and 2 documents (120 MB total)",
    },
    {
      id: 3,
      timestamp: "2024-03-25 16:45:10",
      user: "Admin User",
      userId: 0,
      action: "settings_change",
      description: "Changed global legacy settings",
      status: "success",
      details: "Updated retention policy from 5 years to 10 years",
    },
    {
      id: 4,
      timestamp: "2024-03-25 10:22:33",
      user: "Robert Johnson",
      userId: 3,
      action: "contact_add",
      description: "Added legacy contact",
      status: "success",
      details: "Added Sarah Johnson (sarah.johnson@example.com) as legacy contact",
    },
    {
      id: 5,
      timestamp: "2024-03-24 09:15:18",
      user: "Emily Davis",
      userId: 4,
      action: "legacy_access",
      description: "Attempted legacy access",
      status: "failed",
      details: "Failed verification (incorrect email verification code)",
    },
    {
      id: 6,
      timestamp: "2024-03-24 08:30:45",
      user: "System",
      userId: 0,
      action: "backup_complete",
      description: "Legacy data backup completed",
      status: "success",
      details: "Daily backup of all legacy data completed successfully",
    },
    {
      id: 7,
      timestamp: "2024-03-23 17:12:30",
      user: "Michael Wilson",
      userId: 5,
      action: "asset_delete",
      description: "Deleted legacy asset",
      status: "success",
      details: "Deleted document 'Personal Journal.docx' (1.8 MB)",
    },
    {
      id: 8,
      timestamp: "2024-03-23 14:05:22",
      user: "Admin User",
      userId: 0,
      action: "user_legacy_reset",
      description: "Reset user legacy settings",
      status: "success",
      details: "Reset legacy settings for user ID 8 (David Brown)",
    },
    {
      id: 9,
      timestamp: "2024-03-22 11:30:15",
      user: "System",
      userId: 0,
      action: "retention_check",
      description: "Retention policy check",
      status: "warning",
      details: "5 assets flagged for retention policy action",
    },
    {
      id: 10,
      timestamp: "2024-03-22 09:45:33",
      user: "Jane Smith",
      userId: 2,
      action: "legacy_update",
      description: "Updated legacy settings",
      status: "success",
      details: "Changed access permissions for photos and videos",
    },
  ]
  
  // Filter logs based on search query, date range, and log type
  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())
    
    const logDate = new Date(log.timestamp)
    const now = new Date()
    const daysAgo = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24))
    const matchesDateRange = dateRange === "all" || daysAgo <= Number.parseInt(dateRange)
    
    const matchesLogType = logType === "all" || log.action === logType
    
    return matchesSearch && matchesDateRange && matchesLogType
  })
  
  // Sort logs by timestamp
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime()
    const dateB = new Date(b.timestamp).getTime()
    return sortDirection === "asc" ? dateA - dateB : dateB - dateA
  })
  
  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }
  
  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="bg-green-500/20 text-green-700 hover:bg-green-500/30 border-green-500/50">
            <Check className="h-3 w-3 mr-1" />
            Success
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-500/20 text-red-700 hover:bg-red-500/30 border-red-500/50">
            <X className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 border-amber-500/50">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Warning
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-slate-500/20 text-slate-700 hover:bg-slate-500/30 border-slate-500/50">
            <Info className="h-3 w-3 mr-1" />
            Info
          </Badge>
        )
    }
  }
  
  // Get action icon
  const getActionIcon = (action: string) => {
    switch (action) {
      case "legacy_setup":
        return <Settings className="h-4 w-4 text-blue-500" />
      case "asset_upload":
        return <ArrowDownToLine className="h-4 w-4 text-green-500" />
      case "settings_change":
        return <Settings className="h-4 w-4 text-purple-500" />
      case "contact_add":
        return <User className="h-4 w-4 text-indigo-500" />
      case "legacy_access":
        return <Eye className="h-4 w-4 text-amber-500" />
      case "backup_complete":
        return <Shield className="h-4 w-4 text-green-500" />
      case "asset_delete":
        return <Trash2 className="h-4 w-4 text-red-500" />
      case "user_legacy_reset":
        return <RefreshCw className="h-4 w-4 text-orange-500" />
      case "retention_check":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "legacy_update":
        return <RefreshCw className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4 text-slate-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="activity" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          <TabsTrigger value="system">System Logs</TabsTrigger>
          <TabsTrigger value="transfers">Asset Transfers</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6 mt-6">
          <Card className="border-muted shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Digital Legacy Activity Logs</CardTitle>
                  <CardDescription>Track all digital legacy related activities</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-y bg-muted/30">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search logs..."
                    className="pl-8 w-full sm:w-[300px] transition-all focus-visible:ring-offset-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Date Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Last 24 hours</SelectItem>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                        <SelectItem value="all">All time</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={logType} onValueChange={setLogType}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Log Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="legacy_setup">Legacy Setup</SelectItem>
                        <SelectItem value="asset_upload">Asset Upload</SelectItem>
                        <SelectItem value="settings_change">Settings Change</SelectItem>
                        <SelectItem value="contact_add">Contact Add</SelectItem>
                        <SelectItem value="legacy_access">Legacy Access</SelectItem>
                        <SelectItem value="asset_delete">Asset Delete</SelectItem>
                        <SelectItem value="legacy_update">Legacy Update</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-auto">
\

\

