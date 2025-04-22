"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateStory } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { getStory } from "@/lib/data"

export default function EditStoryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [story, setStory] = useState<any>(null)

  useEffect(() => {
    async function loadStory() {
      try {
        const storyData = await getStory(params.id)
        if (!storyData) {
          toast({
            title: "Error",
            description: "Story not found",
            variant: "destructive",
          })
          router.push("/stories")
          return
        }
        setStory(storyData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load story",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadStory()
  }, [params.id, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await updateStory(params.id, formData)

      if (result.success) {
        toast({
          title: "Story updated",
          description: "Your story has been updated successfully",
        })
        router.push(`/stories/${params.id}`)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update story",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-900"></div>
      </div>
    )
  }

  if (!story) return null

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href={`/stories/${params.id}`} className="mr-4">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Edit Story</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input id="title" name="title" placeholder="Enter story title" required defaultValue={story.title} />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select name="category" defaultValue={story.category} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BUSINESS">Business</SelectItem>
                <SelectItem value="Politics">Politics</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <Select name="status" defaultValue={story.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your story content here..."
              rows={10}
              required
              defaultValue={story.content || ""}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="featured" className="text-sm font-medium">
              Featured Tag (optional)
            </label>
            <Input
              id="featured"
              name="featured"
              placeholder="e.g., Top Story, Breaking News"
              defaultValue={story.featured || ""}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push(`/stories/${params.id}`)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-indigo-900 hover:bg-indigo-800" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
