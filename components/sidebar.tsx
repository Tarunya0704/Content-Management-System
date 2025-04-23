"use client"

import SidebarContent from "./sidebar-content"

export default function Sidebar() {
  return (
    <div className="hidden md:block w-64 h-full">
      <SidebarContent />
    </div>
  )
}
