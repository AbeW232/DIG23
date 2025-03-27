"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, CheckCircle2, Download, UploadCloud } from "lucide-react"
import { format } from "date-fns"

export function BackupSettings() {
  // Backup schedule settings
  const [backupFrequency, setBackupFrequency] = useState("weekly")
  const [autoBackup, setAutoBackup] = useState(true)
  const [includeMedia, setIncludeMedia] = useState(true)
  const [encryptBackups, setEncryptBackups] = useState(true)
  const [retentionPeriod, setRetentionPeriod] = useState("90days")

  // Backup location
  const [backupLocation, setBackupLocation] = useState("cloud")

  // Last backup date
  const [lastBackupDate, setLastBackupDate] = useState<Date | undefined>(new Date(2023, 2, 15))
  const [nextBackupDate, setNextBackupDate] = useState<Date | undefined>(new Date(2023, 2, 22))

  // Backup history
  const backupHistory = [
    { date: "Mar 15, 2023", time: "09:45 AM", size: "2.3 GB", status: "Completed" },
    { date: "Mar 8, 2023", time: "10:12 AM", size: "2.1 GB", status: "Completed" },
    { date: "Mar 1, 2023", time: "09:30 AM", size: "2.0 GB", status: "Completed" },
    { date: "Feb 22, 2023", time: "11:05 AM", size: "1.9 GB", status: "Completed" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Backup Status</CardTitle>
          <CardDescription>View and manage your backup schedule</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Last Backup</Label>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{lastBackupDate ? format(lastBackupDate, "PPP") : "Never"}</span>
              </div>
              <p className="text-sm text-muted-foreground">Size: 2.3 GB • Status: Completed</p>
            </div>

            <div className="space-y-2">
              <Label>Next Scheduled Backup</Label>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{nextBackupDate ? format(nextBackupDate, "PPP") : "Not scheduled"}</span>
              </div>
              <p className="text-sm text-muted-foreground">Estimated size: 2.4 GB</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button className="flex items-center gap-2">
              <UploadCloud className="h-4 w-4" />
              <span>Backup Now</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Restore from Backup</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Backup Configuration</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backup-frequency">Backup Frequency</Label>
            <Select value={backupFrequency} onValueChange={setBackupFrequency}>
              <SelectTrigger id="backup-frequency">
                <SelectValue placeholder="Select backup frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">How often your content will be backed up</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backup-location">Backup Location</Label>
            <Select value={backupLocation} onValueChange={setBackupLocation}>
              <SelectTrigger id="backup-location">
                <SelectValue placeholder="Select backup location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cloud">Cloud Storage</SelectItem>
                <SelectItem value="local">Local Storage</SelectItem>
                <SelectItem value="external">External Drive</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Where your backups will be stored</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="retention-period">Retention Period</Label>
            <Select value={retentionPeriod} onValueChange={setRetentionPeriod}>
              <SelectTrigger id="retention-period">
                <SelectValue placeholder="Select retention period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">30 Days</SelectItem>
                <SelectItem value="60days">60 Days</SelectItem>
                <SelectItem value="90days">90 Days</SelectItem>
                <SelectItem value="180days">180 Days</SelectItem>
                <SelectItem value="365days">1 Year</SelectItem>
                <SelectItem value="forever">Forever</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">How long backups will be kept before being deleted</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-backup">Automatic Backup</Label>
              <p className="text-sm text-muted-foreground">Automatically backup according to schedule</p>
            </div>
            <Switch id="auto-backup" checked={autoBackup} onCheckedChange={setAutoBackup} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="include-media">Include Media Files</Label>
              <p className="text-sm text-muted-foreground">Include images, videos, and audio in backups</p>
            </div>
            <Switch id="include-media" checked={includeMedia} onCheckedChange={setIncludeMedia} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="encrypt-backups">Encrypt Backups</Label>
              <p className="text-sm text-muted-foreground">Secure your backups with encryption</p>
            </div>
            <Switch id="encrypt-backups" checked={encryptBackups} onCheckedChange={setEncryptBackups} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Backup History</h3>

        <div className="rounded-md border">
          <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
            <div>Date</div>
            <div>Time</div>
            <div>Size</div>
            <div>Status</div>
          </div>
          {backupHistory.map((backup, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0">
              <div>{backup.date}</div>
              <div>{backup.time}</div>
              <div>{backup.size}</div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{backup.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit">Save Changes</Button>
    </div>
  )
}

