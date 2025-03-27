"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mic, Upload, Play, Pause, Save, Download, Volume2, Music, FileAudio } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function VoiceRecreation() {
  const [voiceSamples, setVoiceSamples] = useState<string[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [playbackProgress, setPlaybackProgress] = useState(0)
  const [scriptText, setScriptText] = useState("")
  const [voiceModel, setVoiceModel] = useState<string | null>(null)
  const [emotionLevel, setEmotionLevel] = useState([50])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newSamples = [...voiceSamples]
      for (let i = 0; i < files.length; i++) {
        newSamples.push(URL.createObjectURL(files[i]))
      }
      setVoiceSamples(newSamples)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)

    // Simulate recording timer
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 60) {
          handleStopRecording()
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
      recordingIntervalRef.current = null
    }

    // Simulate adding a recording
    setVoiceSamples((prev) => [...prev, "recording-" + Date.now()])
  }

  const handlePlayVoice = () => {
    setIsPlaying(true)
    setPlaybackProgress(0)

    // Simulate playback progress
    playbackIntervalRef.current = setInterval(() => {
      setPlaybackProgress((prev) => {
        if (prev >= 100) {
          handleStopPlayback()
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const handleStopPlayback = () => {
    setIsPlaying(false)
    if (playbackIntervalRef.current) {
      clearInterval(playbackIntervalRef.current)
      playbackIntervalRef.current = null
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Voice Training</CardTitle>
          <CardDescription>Upload voice samples to train the AI voice model</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <FileAudio className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Upload audio files of the person's voice</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="audio/*"
              multiple
              className="hidden"
            />
            <Button variant="secondary" size="sm" onClick={triggerFileInput}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Audio Files
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Record Voice Sample</Label>
              <span className="text-sm text-muted-foreground">{formatTime(recordingTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              {isRecording ? (
                <Button variant="destructive" className="w-full" onClick={handleStopRecording}>
                  <Pause className="h-4 w-4 mr-2" />
                  Stop Recording
                </Button>
              ) : (
                <Button variant="outline" className="w-full" onClick={handleStartRecording}>
                  <Mic className="h-4 w-4 mr-2" />
                  Start Recording
                </Button>
              )}
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Voice Samples ({voiceSamples.length})</Label>
            {voiceSamples.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No voice samples uploaded yet</p>
            ) : (
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                {voiceSamples.map((sample, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <Music className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {sample.startsWith("recording") ? `Recording ${index + 1}` : `Sample ${index + 1}`}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            className="w-full"
            disabled={voiceSamples.length === 0}
            onClick={() => setVoiceModel("trained-model")}
          >
            Train Voice Model
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Voice Generation</CardTitle>
          <CardDescription>Generate speech using the trained voice model</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="voice-model">Voice Model</Label>
            <Select
              value={voiceModel || ""}
              onValueChange={setVoiceModel}
              disabled={voiceSamples.length === 0 && !voiceModel}
            >
              <SelectTrigger id="voice-model">
                <SelectValue
                  placeholder={voiceSamples.length === 0 ? "No trained models available" : "Select voice model"}
                />
              </SelectTrigger>
              <SelectContent>
                {voiceModel && <SelectItem value="trained-model">Trained Voice Model</SelectItem>}
                <SelectItem value="john">John Smith (Sample)</SelectItem>
                <SelectItem value="mary">Mary Johnson (Sample)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Emotional Tone</Label>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-sm text-muted-foreground">Neutral</span>
              <Slider
                value={emotionLevel}
                min={0}
                max={100}
                step={10}
                onValueChange={setEmotionLevel}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground">Expressive</span>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="script">Script</Label>
            <Textarea
              id="script"
              placeholder="Enter text you want to convert to speech..."
              rows={6}
              value={scriptText}
              onChange={(e) => setScriptText(e.target.value)}
            />
          </div>

          <Button className="w-full" disabled={!voiceModel || !scriptText.trim()} onClick={handlePlayVoice}>
            Generate Voice
          </Button>

          {(isPlaying || playbackProgress > 0) && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Preview</Label>
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider defaultValue={[80]} max={100} step={1} className="w-24" />
                </div>
              </div>
              <Progress value={playbackProgress} className="h-2" />
              <div className="flex items-center gap-2">
                {isPlaying ? (
                  <Button variant="outline" size="sm" className="w-full" onClick={handleStopPlayback}>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="w-full" onClick={handlePlayVoice}>
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </Button>
                )}
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

