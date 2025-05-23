"use client"

import { useState, useContext, useCallback, useEffect } from "react"
import type { ChangeEvent, MouseEvent } from "react"

import { BlogPost } from "contentlayer/generated"

import AllTags from "@/components/blog/AllTags"
import BlogPostList from "@/components/blog/BlogPostList"
import Search from "./Search"
import Select from "./Select"

import Drawer from "../ui/Drawer"
import useDebounce from "@/hooks/useDebounce"

import GlobalContext from "../layouts/GlobalContext"

import { Tag } from "@/types"

export default function Layout({
  // children,
  allTags,
  allBlogPosts,
}: Readonly<{
  // children: React.ReactNode
  allTags: Tag[]
  allBlogPosts: BlogPost[]
}>) {
  const [blogs, setBlogs] = useState(allBlogPosts)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [isOrMode, setIsOrMode] = useState(true)
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)
  const { hasRightDrawer, isRightDrawerOpen, handleRightDrawer } =
    useContext(GlobalContext)

  const handleSelectTag = useCallback(
    (tag: Tag) => (event: MouseEvent | KeyboardEvent) => {
      setSelectedTags((prevSelectedTags) => {
        const hasSelected = prevSelectedTags.includes(tag)
        if (hasSelected) {
          event.stopPropagation()
          return prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
        } else {
          if (event.shiftKey) return [...prevSelectedTags, tag]
          else return [tag]
        }
      })
    },
    [],
  )

  const clearSelectedTags = useCallback(() => setSelectedTags([]), [])

  const handleChangeQuery = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    [],
  )

  const toggleFilterMode = useCallback((event: MouseEvent) => {
    event.stopPropagation()
    setIsOrMode((_) => !_)
  }, [])

  useEffect(() => {
    const blogs = allBlogPosts
      .filter((blog) => {
        if (debouncedQuery.length === 0) return true
        const lowercasedSearchTerm = debouncedQuery.toLowerCase()
        const lowercasedBlogTitle = blog.title.toLowerCase()
        return lowercasedBlogTitle.includes(lowercasedSearchTerm)
      })
      .filter((blog) => {
        if (selectedTags.length === 0) return true
        return selectedTags
          .map((tag) => blog.tags.includes(tag.name))
          [isOrMode ? "some" : "every"]((b) => b)
      })
    setBlogs(blogs)
  }, [debouncedQuery, selectedTags, isOrMode])

  return (
    <div className="mx-auto my-8 grid max-w-6xl grid-cols-8 gap-2.5">
      <section className="page-content col-span-8 flex flex-col gap-2.5 md:grid md:grid-cols-2">
        <Search value={query} onChange={handleChangeQuery} />
        <Select
          options={allTags}
          selectedTags={selectedTags}
          onSelectTag={handleSelectTag}
          clearSelectedTags={clearSelectedTags}
          isOrMode={isOrMode}
          toggleFilterMode={toggleFilterMode}
        />
      </section>

      <section
        className={`page-content ${hasRightDrawer ? "col-span-full" : "col-span-5"}`}
      >
        <h2 className="content-title">博客(999)</h2>
        <BlogPostList blogPosts={blogs} />
      </section>

      {hasRightDrawer ? (
        <Drawer
          isOpen={isRightDrawerOpen}
          onClose={handleRightDrawer.close}
          placement="right"
          size={360}
          title="所有标签"
        >
          {() => {
            return (
              <div>
                <AllTags
                  allTags={allTags}
                  selectedTags={selectedTags}
                  handleSelectTag={handleSelectTag}
                />
              </div>
            )
          }}
        </Drawer>
      ) : (
        <section className="page-content col-span-3">
          <h2 className="content-title">所有标签(99)</h2>
          <AllTags
            allTags={allTags}
            selectedTags={selectedTags}
            handleSelectTag={handleSelectTag}
          />
        </section>
      )}
    </div>
  )
}
