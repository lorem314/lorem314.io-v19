"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type { MouseEvent } from "react"

import { useSearchParams, usePathname, useRouter } from "next/navigation"

import { IoCloseSharp } from "react-icons/io5"
import { FaRegTrashAlt } from "react-icons/fa"
import { GiLogicGateAnd, GiLogicGateOr } from "react-icons/gi"
import { FaCaretDown } from "react-icons/fa"

import useDebounce from "@/hooks/useDebounce"

import type { Tag } from "@/types"

export default function Select({ allTags }: { allTags: Tag[] }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const refSelectedTags = useRef<HTMLUListElement>(null)
  const refTagInput = useRef<HTMLInputElement>(null)
  const refOptions = useRef<HTMLUListElement>(null)
  const [isOpen, setIsOpen] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [term, setTerm] = useState("")
  const debouncedTerm = useDebounce(term)

  const params = new URLSearchParams(searchParams)
  // console.log("[Select] params.tags", params.get("tags")?.split(" "))

  const selectedTagNames =
    params
      .get("tags")
      ?.split(" ")
      .map((tagName) =>
        allTags.some((tag) => tag.name === tagName) ? tagName : null,
      )
      .filter((tagName) => tagName !== null) || []

  // close ul.options when click outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false)
    }
    window.addEventListener("click", handleClickOutside)
    return () => {
      window.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  // nodeSelectedTags horizontal wheel
  useEffect(() => {
    const nodeSelectedTags = refSelectedTags.current
    const handleWheel = (event: WheelEvent) => {
      console.log("on wheel")
      if (event.deltaY === 0 || !event.shiftKey) return
      nodeSelectedTags?.scrollBy({ left: event.deltaY < 0 ? -12 : 12 })
    }
    if (nodeSelectedTags) {
      nodeSelectedTags.addEventListener("wheel", handleWheel, { passive: true })
    }
    return () => {
      nodeSelectedTags?.removeEventListener("wheel", handleWheel)
    }
  }, [])

  const handleSelectTag =
    (tagName: string) => (event: MouseEvent | KeyboardEvent) => {
      const hasSelected = selectedTagNames.includes(tagName)
      console.log("handleSelectTag tagName:", tagName)
      console.log("handleSelectTag hasSelected:", hasSelected)

      const params = new URLSearchParams(searchParams)

      if (event.shiftKey) {
        const tags = params.get("tags")
        params.set("tags", tags + " " + tagName)
      } else {
        params.set("tags", tagName)
      }

      console.log("handleSelectTag params.toString():", params.toString())
      router.replace(`${pathname}?${params.toString()}`)
    }

  const handleChangeFilterMode = (event: MouseEvent<HTMLButtonElement>) => {
    const params = new URLSearchParams(searchParams)
    if (!params.has("mode") || params.get("mode") === "or") {
      params.set("mode", "and")
    } else {
      params.set("mode", "or")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleMouseEnterOption = useCallback(
    (index: number) => () => setHoveredIndex(index),
    [],
  )
  const handleMouseLeaveOptions = useCallback(() => setHoveredIndex(-1), [])

  return (
    <div className="relative">
      <h2 className="content-title">
        <label htmlFor="blog-search">筛选标签</label>
      </h2>

      <div className="flex items-center gap-2.5 rounded border border-neutral-400 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 hover:border-neutral-600">
        {/*  */}

        {selectedTagNames.length !== 0 ? (
          <ul
            ref={refSelectedTags}
            className="flex max-w-36 shrink-0 items-center gap-1.5 overflow-x-hidden pl-2"
          >
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

        <input
          ref={refTagInput}
          className="border-none"
          type="text"
          onClick={(event) => event.stopPropagation()}
          onFocus={() => setIsOpen(true)}
        />

        <div className="flex items-center">
          <button className="input-helper-button">
            <FaRegTrashAlt />
          </button>

          <button
            className="input-helper-button"
            onClick={handleChangeFilterMode}
          >
            {!searchParams.has("mode") || searchParams.get("mode") === "or" ? (
              <GiLogicGateOr title="or" />
            ) : (
              <GiLogicGateAnd title="and" />
            )}
          </button>

          <button className="input-helper-button">
            <FaCaretDown />
          </button>
        </div>

        <ul
          ref={refOptions}
          className={`bg-content-bg absolute top-full mt-2.5 max-h-32 w-full overflow-y-auto rounded border border-neutral-400 ${isOpen ? "block" : "hidden"}`}
          onClick={(event) => event.stopPropagation()}
          onMouseLeave={handleMouseLeaveOptions}
        >
          {allTags.map((tag, index) => {
            const isHovered = index === hoveredIndex
            return (
              <li
                key={index}
                className={`text-misc-button-icon-color flex h-8 cursor-pointer items-center justify-between px-2 ${isHovered ? "bg-black/10" : "bg-transparent"}`}
                onMouseEnter={handleMouseEnterOption(index)}
                onClick={handleSelectTag(tag.name)}
              >
                <span>{tag.name}</span>
                <span>{tag.count}</span>
              </li>
            )
          })}
        </ul>

        {/*  */}
      </div>
    </div>
  )
}

/*
ring-2 ring-blue-400 
focus-within:border-blue-400 focus-within:outline-2 focus-within:outline-blue-400
*/
