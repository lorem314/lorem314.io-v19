"use client"

import type { MouseEvent } from "react"

import { useSearchParams, usePathname, useRouter } from "next/navigation"

import type { Tag } from "@/types"

export default function AllTags({ allTags }: { allTags: Tag[] }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = (tag: Tag) => (event: MouseEvent<HTMLButtonElement>) => {
    const params = new URLSearchParams(searchParams)

    // console.log("clicked", tag)
    // console.log("params.query", params.get("query"))
    // console.log("params.tags", params.get("tags"))

    const selectedTags = params.get("tags")

    if (!event.shiftKey) {
      params.set("tags", tag.name)
    } else {
      if (!selectedTags) {
        params.set("tags", tag.name)
      } else {
        const tags = params.get("tags") + " " + tag.name
        params.set("tags", tags)
      }
    }
    // console.log("selectedTags ", selectedTags)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div>
      <ul className="flex flex-wrap items-center gap-2.5">
        {allTags.map((tag) => {
          return (
            <li key={tag.name}>
              <button
                className="border border-neutral-300"
                onClick={handleClick(tag)}
              >
                {tag.name}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
