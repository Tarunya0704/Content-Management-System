"use client"

import { useState } from "react"
import { MoreVertical, EyeIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Story } from "@/lib/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { updateStoryStatus } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function StoryGrid({ stories }: { stories: Story[] }) {
  const router = useRouter()

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateStoryStatus(id, status)
      toast({
        title: "Status updated",
        description: `Story status changed to ${status}`,
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update story status",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {stories.length > 0 ? (
        stories.map((story) => <StoryCard key={story.id} story={story} onStatusUpdate={handleStatusUpdate} />)
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">No stories found</p>
        </div>
      )}
    </div>
  )
}

function StoryCard({
  story,
  onStatusUpdate,
}: {
  story: Story
  onStatusUpdate: (id: string, status: string) => Promise<void>
}) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (status: string) => {
    setIsUpdating(true)
    try {
      await onStatusUpdate(story.id, status)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleView = () => {
    router.push(`/stories/${story.id}`)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="relative">
        <Image
          src={story.image || "/placeholder.svg?height=250&width=400"}
          alt={story.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge variant="secondary" className="bg-white/80 text-gray-800 flex items-center gap-1">
            <EyeIcon className="h-3 w-3" />
            {story.views}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 bg-white/80 text-gray-800">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/stories/edit/${story.id}`)}>Edit</DropdownMenuItem>
              {story.status !== "Published" && (
                <DropdownMenuItem onClick={() => handleStatusChange("Published")} disabled={isUpdating}>
                  Publish
                </DropdownMenuItem>
              )}
              {story.status !== "Draft" && (
                <DropdownMenuItem onClick={() => handleStatusChange("Draft")} disabled={isUpdating}>
                  Move to Draft
                </DropdownMenuItem>
              )}
              {story.status !== "Archived" && (
                <DropdownMenuItem onClick={() => handleStatusChange("Archived")} disabled={isUpdating}>
                  Archive
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {story.featured && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-pink-500 text-white">{story.featured}</Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm mb-2">{story.title}</h3>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span className="uppercase font-semibold">{story.category}</span>
          <span>{story.date}</span>
        </div>
        <div className="flex items-center justify-between">
          <Badge
            variant={story.status === "Published" ? "default" : story.status === "Draft" ? "secondary" : "outline"}
            className={
              story.status === "Published"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : story.status === "Draft"
                  ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                  : story.status === "Pending"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100"
            }
          >
            {story.status}
          </Badge>
          <Button variant="ghost" size="sm" className="text-xs" onClick={handleView}>
            View
          </Button>
        </div>
      </div>
    </div>
  )
}
