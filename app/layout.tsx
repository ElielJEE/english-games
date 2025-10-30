import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "English App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <main className="flex-1">{children}</main>
        <footer className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-medium mb-1">
              Created by <span className="font-bold">Eliel J. E. Escoto</span>
            </p>
            <p className="text-xs opacity-90">© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
