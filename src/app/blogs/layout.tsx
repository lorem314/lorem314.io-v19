"use client"

import { allBlogPosts, type BlogPost } from "contentlayer/generated"

import Form from "@/components/blog/Form"
import BlogPostList from "@/components/blog/BlogPostList"

import type { Tag } from "@/types"

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
