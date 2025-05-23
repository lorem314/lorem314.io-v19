import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"

import Header from "@/components/layouts/Header"
import Sidebar from "@/components/layouts/Sidebar"
import Layout from "@/components/layouts/Layout"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className="relative h-full w-full overflow-auto text-base"
      lang="zh-Hans"
      data-theme="light"
    >
      <body className="relative h-full w-full overflow-auto antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}

// className={`${geistSans.variable} ${geistMono.variable} antialiased`}

export const metadata: Metadata = {
  title: "主页 | lorem314.io-v19",
  // description: "lorem314 的博客网站",
}
