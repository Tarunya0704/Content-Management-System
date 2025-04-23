import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import Sidebar from "@/components/sidebar"
import MobileSidebar from "@/components/mobile-sidebar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Content Management System",
  description: "Manage your stories and content",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              <div className="p-4 md:hidden">
                <MobileSidebar />
              </div>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
