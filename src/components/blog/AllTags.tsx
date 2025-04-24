"use client"

import type { MouseEvent } from "react"

import { useSearchParams, usePathname, useRouter } from "next/navigation"

import type { Tag } from "@/types"

export default function AllTags({
  allTags,
  selectedTags,
  handleSelectTag,
}: {
  allTags: Tag[]
  selectedTags: Tag[]
  handleSelectTag: (tag: Tag) => (event: MouseEvent | KeyboardEvent) => void
}) {
  return (
    <ul className="flex flex-wrap items-center gap-2.5">
      {allTags.map((tag) => {
        return (
          <li key={tag.name}>
            <button
              className="rounded border border-neutral-300 px-1.5 py-0.5"
              onClick={handleSelectTag(tag)}
            >
              {tag.name}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
