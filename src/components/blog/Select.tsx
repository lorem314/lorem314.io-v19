"use client"

import type { MouseEvent } from "react"
import type { Tag } from "@/types"

import { useSearchParams, usePathname, useRouter } from "next/navigation"

import { IoCloseSharp } from "react-icons/io5"
import { FaRegTrashAlt } from "react-icons/fa"
import { GiLogicGateAnd, GiLogicGateOr } from "react-icons/gi"
import { FaCaretDown } from "react-icons/fa"

export default function Select({ allTags }: { allTags: Tag[] }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const params = new URLSearchParams(searchParams)
  console.log("[Select] params.tags", params.get("tags")?.split(" "))

  const selectedTagNames =
    params
      .get("tags")
      ?.split(" ")
      .map((tagName) =>
        allTags.some((tag) => tag.name === tagName) ? tagName : null,
      )
      .filter((tagName) => tagName !== null) || []

  const handleSelectTag =
    (tagName: string) => (event: MouseEvent<HTMLButtonElement>) => {
      const params = new URLSearchParams(searchParams)

      const newSelectedTagNames = selectedTagNames.filter(
        (selectedTagName) => tagName !== selectedTagName,
      )

      if (newSelectedTagNames.length === 0) {
        params.delete("tags")
      } else {
        params.set("tags", newSelectedTagNames.join(" "))
      }

      router.replace(`${pathname}?${params.toString()}`)
    }

  return (
    <div>
      <label className="card-label" htmlFor="blog-search">
        筛选标签
      </label>

      <div className="flex items-center gap-2.5 rounded border border-neutral-400 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 hover:border-neutral-600">
        {/*  */}

        {selectedTagNames.length !== 0 ? (
          <ul className="flex max-w-32 shrink-0 items-center gap-1.5 overflow-x-hidden pl-2">
            {selectedTagNames.map((selectedTagName) => {
              return (
                <li className="text-sm" key={selectedTagName}>
                  <button
                    className="border border-neutral-300"
                    onClick={handleSelectTag(selectedTagName)}
                  >
                    {selectedTagName}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}

        <input className="no-focus-ring border-none" type="text" />

        <div className="flex">
          <button className="input-helper-button">
            <FaRegTrashAlt />
          </button>
          <button className="input-helper-button">
            <GiLogicGateAnd />
          </button>
          <button className="input-helper-button">
            <GiLogicGateOr />
          </button>
          <button className="input-helper-button">
            <FaCaretDown />
          </button>
        </div>

        {/*  */}
      </div>
    </div>
  )
}

/*
ring-2 ring-blue-400 
focus-within:border-blue-400 focus-within:outline-2 focus-within:outline-blue-400
*/
