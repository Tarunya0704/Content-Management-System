export interface Story {
  id: string
  title: string
  image: string
  category: string
  date: string
  status: "Published" | "Draft" | "Pending" | "Archived"
  views: number
  featured?: string
  content?: string
}

export interface StoryFilter {
  status?: string
  search?: string
  startDate?: string
  endDate?: string
  category?: string
}
