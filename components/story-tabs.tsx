"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface StoryTabsProps {
  activeTab?: string
}

export default function StoryTabs({ activeTab = "All" }: StoryTabsProps) {
  const router = useRouter()

  const tabs = [
    { name: "All", count: 4500 },
    { name: "Draft", count: 1203 },
    { name: "Pending", count: 890 },
    { name: "Published", count: 2432 },
    { name: "Archived", count: 320 },
  ]

  const handleTabChange = (tabName: string) => {
    // Simple navigation without search params
    if (tabName === "All") {
      router.push("/stories")
    } else {
      // This is simplified - you may want to handle this differently
      // since we're removing search params functionality
      router.push(`/stories?tab=${tabName}`)
    }
  }

  return (
    <div className="flex overflow-x-auto space-x-2 border-b border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => (
        <Button
          key={tab.name}
          variant="ghost"
          className={`rounded-none border-b-2 px-4 py-2 whitespace-nowrap ${
            activeTab === tab.name
              ? "border-indigo-900 text-indigo-900 dark:border-indigo-400 dark:text-indigo-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => handleTabChange(tab.name)}
        >
          {tab.name} ({tab.count})
        </Button>
      ))}
    </div>
  )
}