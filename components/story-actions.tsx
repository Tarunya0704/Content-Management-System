"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import { updateStoryStatus, deleteStory } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Story } from "@/lib/types"

export default function StoryActions({ story }: { story: Story }) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleStatusChange = async (status: string) => {
    setIsUpdating(true)
    try {
      await updateStoryStatus(story.id, status)
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
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteStory(story.id)
      toast({
        title: "Story deleted",
        description: "The story has been deleted successfully",
      })
      router.push("/stories")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete story",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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
          {story.status !== "Pending" && (
            <DropdownMenuItem onClick={() => handleStatusChange("Pending")} disabled={isUpdating}>
              Mark as Pending
            </DropdownMenuItem>
          )}
          {story.status !== "Archived" && (
            <DropdownMenuItem onClick={() => handleStatusChange("Archived")} disabled={isUpdating}>
              Archive
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-600 focus:text-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the story.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
