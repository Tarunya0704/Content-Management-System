"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Search, Calendar, SlidersHorizontal, Plus, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MobileSidebar from "./mobile-sidebar"

export default function StoryHeader() {
  const router = useRouter()

  const [search, setSearch] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [category, setCategory] = useState("")

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }

  const clearFilters = () => {
    setSearch("")
    setDate(undefined)
    setCategory("")
  }

  const hasFilters = search || date || category

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <MobileSidebar />
          </div>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <ChevronLeft className="h-5 w-5 text-black" />
          </Button>
          <h1 className="text-xl text-black font-semibold">Stories</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg">
            <div className="flex flex-col items-start">
            <span className="text-xs text-gray-500">Welcome back!</span>
            <span className="text-sm font-medium text-black">Akshito Patel</span>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-white dark:bg-gray-800 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-black ">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn("bg-white dark:bg-gray-800", date && "border-indigo-500 text-indigo-500")}
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 " align="end">
              <CalendarComponent mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn("bg-white dark:bg-gray-800", category && "border-indigo-500 text-indigo-500")}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Filter by Category</h4>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Categories</SelectItem>
                    <SelectItem value="BUSINESS">Business</SelectItem>
                    <SelectItem value="Politics">Politics</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </PopoverContent>
          </Popover>

          {hasFilters && (
            <Button variant="outline" size="icon" onClick={clearFilters} className="bg-white dark:bg-gray-800">
              <X className="h-4 w-4" />
            </Button>
          )}

          <Button className="bg-indigo-900 hover:bg-indigo-800" onClick={() => router.push("/stories/new")}>
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add New Story</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>
    </div>
  )
}