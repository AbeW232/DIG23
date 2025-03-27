"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, XCircle, AlertCircle, Play, Clock, RefreshCw, FileText, Download } from "lucide-react"

export function IntegrationTesting() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const startTest = () => {
    setIsRunning(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          return 100
        }
        return prev + 5
      })
    }, 300)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          Integration Testing
        </CardTitle>
        <CardDescription>Test and validate your digital legacy integrations.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tests">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="tests" className="space-y-4 pt-4">
            <div className="rounded-lg border">
              <div className="flex items-center justify-between border-b p-3">
                <h3 className="font-medium">Test Suites</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={startTest} disabled={isRunning}>
                    <Play className="mr-2 h-4 w-4" />
                    Run All Tests
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[300px]">
                <div className="divide-y">
                  <TestItem
                    name="User Authentication"
                    description="Tests for user login, registration, and access control"
                    status="passed"
                    duration="1.2s"
                    lastRun="2 hours ago"
                    isRunning={isRunning && progress < 20}
                  />
                  <TestItem
                    name="Data Storage"
                    description="Tests for data persistence and retrieval"
                    status="passed"
                    duration="2.5s"
                    lastRun="2 hours ago"
                    isRunning={isRunning && progress >= 20 && progress < 40}
                  />
                  <TestItem
                    name="Beneficiary Management"
                    description="Tests for adding, updating, and removing beneficiaries"
                    status="failed"
                    duration="1.8s"
                    lastRun="2 hours ago"
                    isRunning={isRunning && progress >= 40 && progress < 60}
                  />
                  <TestItem
                    name="Document Processing"
                    description="Tests for document upload, processing, and validation"
                    status="warning"
                    duration="3.2s"
                    lastRun="2 hours ago"
                    isRunning={isRunning && progress >= 60 && progress < 80}
                  />
                  <TestItem
                    name="Legacy Transfer"
                    description="Tests for secure transfer of digital assets"
                    status="passed"
                    duration="2.1s"
                    lastRun="2 hours ago"
                    isRunning={isRunning && progress >= 80}
                  />
                </div>
              </ScrollArea>
              {isRunning && (
                <div className="p-3 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Running tests...</span>
                    <span className="text-sm text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Test Configuration</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Environment</span>
                  <Badge variant="outline">Production</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Test Mode</span>
                  <Badge variant="outline">Integration</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Retry Failed Tests</span>
                  <Badge variant="outline">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Notification</span>
                  <Badge variant="outline">Email</Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="results" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <h3 className="font-medium">Passed</h3>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <XCircle className="h-8 w-8 text-red-500" />
                    <h3 className="font-medium">Failed</h3>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <AlertCircle className="h-8 w-8 text-yellow-500" />
                    <h3 className="font-medium">Warnings</h3>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Recent Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    <TestResultItem
                      name="Beneficiary Management"
                      status="failed"
                      timestamp="2 hours ago"
                      message="Failed to update beneficiary access level"
                      location="BeneficiaryController.ts:156"
                    />
                    <TestResultItem
                      name="Document Processing"
                      status="warning"
                      timestamp="2 hours ago"
                      message="Document processing took longer than expected (3.2s)"
                      location="DocumentProcessor.ts:78"
                    />
                    <TestResultItem
                      name="Legacy Transfer"
                      status="passed"
                      timestamp="2 hours ago"
                      message="All tests passed successfully"
                      location="TransferService.ts:42-105"
                    />
                    <TestResultItem
                      name="User Authentication"
                      status="passed"
                      timestamp="2 hours ago"
                      message="All tests passed successfully"
                      location="AuthService.ts:28-97"
                    />
                    <TestResultItem
                      name="Data Storage"
                      status="passed"
                      timestamp="2 hours ago"
                      message="All tests passed successfully"
                      location="StorageService.ts:112-189"
                    />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Test Reports</h3>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Generate New Report
              </Button>
            </div>
            <div className="rounded-lg border">
              <div className="divide-y">
                <ReportItem
                  name="Weekly Integration Test Report"
                  date="March 24, 2023"
                  status="Complete"
                  passRate="80%"
                />
                <ReportItem
                  name="Beneficiary System Test Report"
                  date="March 20, 2023"
                  status="Complete"
                  passRate="65%"
                />
                <ReportItem name="Security Audit Test Report" date="March 15, 2023" status="Complete" passRate="92%" />
                <ReportItem
                  name="Performance Benchmark Report"
                  date="March 10, 2023"
                  status="Complete"
                  passRate="88%"
                />
                <ReportItem name="API Integration Test Report" date="March 5, 2023" status="Complete" passRate="75%" />
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Report Settings</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Automatic Reports</span>
                  <Badge variant="outline">Weekly</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Report Format</span>
                  <Badge variant="outline">PDF, HTML</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Distribution</span>
                  <Badge variant="outline">Email, Dashboard</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Retention</span>
                  <Badge variant="outline">6 Months</Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Results
        </Button>
      </CardFooter>
    </Card>
  )
}

interface TestItemProps {
  name: string
  description: string
  status: "passed" | "failed" | "warning"
  duration: string
  lastRun: string
  isRunning: boolean
}

function TestItem({ name, description, status, duration, lastRun, isRunning }: TestItemProps) {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          {isRunning ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin text-primary" />
          ) : status === "passed" ? (
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          ) : status === "failed" ? (
            <XCircle className="mr-2 h-4 w-4 text-red-500" />
          ) : (
            <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
          )}
          <span className="font-medium">{name}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        {isRunning ? (
          <Badge variant="outline" className="animate-pulse">
            Running...
          </Badge>
        ) : (
          <Badge variant={status === "passed" ? "default" : status === "failed" ? "destructive" : "outline"}>
            {status === "passed" ? "Passed" : status === "failed" ? "Failed" : "Warning"}
          </Badge>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {duration}
          </span>
          <span>•</span>
          <span>{lastRun}</span>
        </div>
      </div>
    </div>
  )
}

interface TestResultItemProps {
  name: string
  status: "passed" | "failed" | "warning"
  timestamp: string
  message: string
  location: string
}

function TestResultItem({ name, status, timestamp, message, location }: TestResultItemProps) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {status === "passed" ? (
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          ) : status === "failed" ? (
            <XCircle className="mr-2 h-4 w-4 text-red-500" />
          ) : (
            <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
          )}
          <span className="font-medium">{name}</span>
        </div>
        <span className="text-xs text-muted-foreground">{timestamp}</span>
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-sm">{message}</p>
        <p className="text-xs text-muted-foreground">Location: {location}</p>
      </div>
      <div className="mt-2 flex justify-end">
        <Button variant="ghost" size="sm">
          View Details
        </Button>
      </div>
    </div>
  )
}

interface ReportItemProps {
  name: string
  date: string
  status: string
  passRate: string
}

function ReportItem({ name, date, status, passRate }: ReportItemProps) {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          <FileText className="mr-2 h-4 w-4 text-primary" />
          <span className="font-medium">{name}</span>
        </div>
        <p className="text-sm text-muted-foreground">Generated on {date}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Badge variant="outline">{status}</Badge>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Pass Rate:</span>
          <span className="font-medium">{passRate}</span>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="ml-2">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  )
}

