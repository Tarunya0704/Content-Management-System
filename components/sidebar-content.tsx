"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  User,
  CheckSquare,
  Globe,
  BarChart,
  ImageIcon,
  Sliders,
  Bell,
  CreditCard,
  Settings,
  HelpCircle,
} from "lucide-react"

export default function SidebarContent() {
  const pathname = usePathname()

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400">Content management</h2>
      </div>
      <nav className="space-y-1 px-3">
        <SidebarItem
          href="/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active={pathname === "/dashboard"}
        />
        <SidebarItem
          href="/stories"
          icon={<FileText size={20} />}
          label="Content"
          active={pathname.startsWith("/stories")}
        />
        <SidebarItem href="/users" icon={<User size={20} />} label="User" active={pathname === "/users"} />
        <SidebarItem href="/tasks" icon={<CheckSquare size={20} />} label="Task" active={pathname === "/tasks"} />
        <SidebarItem href="/app-web" icon={<Globe size={20} />} label="App/Web" active={pathname === "/app-web"} />
        <SidebarItem
          href="/analytics"
          icon={<BarChart size={20} />}
          label="Analytics"
          active={pathname === "/analytics"}
        />
        <SidebarItem href="/media" icon={<ImageIcon size={20} />} label="Media" active={pathname === "/media"} />
        <SidebarItem
          href="/customize"
          icon={<Sliders size={20} />}
          label="Customize"
          active={pathname === "/customize"}
        />
        <SidebarItem
          href="/notifications"
          icon={<Bell size={20} />}
          label="Notifications"
          active={pathname === "/notifications"}
        />
        <SidebarItem
          href="/subscription"
          icon={<CreditCard size={20} />}
          label="Subscription"
          active={pathname === "/subscription"}
        />
        <SidebarItem
          href="/settings"
          icon={<Settings size={20} />}
          label="Settings"
          active={pathname === "/settings"}
        />
      </nav>
      <div className="absolute bottom-0 w-full p-4">
        <Link
          href="/support"
          className="flex items-center gap-2 p-3 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <HelpCircle size={20} />
          <span>Contact Support</span>
        </Link>
      </div>
    </div>
  )
}

function SidebarItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${
        active
          ? "bg-indigo-900 text-white"
          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
