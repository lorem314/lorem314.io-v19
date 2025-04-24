"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type { ChangeEvent, MouseEvent } from "react"

import { IoCloseSharp } from "react-icons/io5"
import { FaRegTrashAlt } from "react-icons/fa"
import { GiLogicGateAnd, GiLogicGateOr } from "react-icons/gi"
import { FaCaretDown } from "react-icons/fa"

import useDebounce from "@/hooks/useDebounce"

import type { Tag } from "@/types"

export default function Select({
  options,
  selectedTags,
  onSelectTag,
  clearSelectedTags,
  isOrMode,
  toggleFilterMode,
}: {
  options: Tag[]
  selectedTags: Tag[]
  onSelectTag: (tag: Tag) => (event: MouseEvent | KeyboardEvent) => void
  clearSelectedTags: () => void
  isOrMode: boolean
  toggleFilterMode: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  const refSelectedTags = useRef<HTMLUListElement>(null)
  const refTagInput = useRef<HTMLInputElement>(null)
  const refOptions = useRef<HTMLUListElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [term, setTerm] = useState("")
  const debouncedTerm = useDebounce(term)

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

  const handleSelectTag = useCallback(
    (tag: Tag) => (event: MouseEvent | KeyboardEvent) => {
      if (event.stopPropagation) {
        event.stopPropagation()
      }
      if (!event.shiftKey) {
        setIsOpen(false)
      }
      setTerm("")
      onSelectTag(tag)(event)
    },
    [onSelectTag],
  )

  const filteredOptions = options.filter((option) => {
    if (debouncedTerm === "") return true
    return option.name.includes(debouncedTerm)
  })

  // tag input listens to key press event
  useEffect(() => {
    const nodeTagInput = refTagInput.current

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target !== nodeTagInput) return
      switch (event.code) {
        case "Escape":
          setIsOpen(false)
          break
        case "Enter":
        case "NumpadEnter":
        case "Space":
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            const hoveredOption = filteredOptions[hoveredIndex]
            if (hoveredIndex !== -1 && hoveredOption) {
              handleSelectTag(hoveredOption)(event)
            }
            setIsOpen(false)
          }
          break
        case "ArrowUp":
        case "ArrowDown":
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          if (hoveredIndex === -1) {
            setHoveredIndex(() => 0)
          }
          const indexAddend = event.code === "ArrowDown" ? 1 : -1
          const newHoveredIndex = hoveredIndex + indexAddend
          if (newHoveredIndex >= 0 && newHoveredIndex < options.length) {
            setHoveredIndex(newHoveredIndex)
            const nodeOptions = refOptions.current
            const nodeNextHoveredLi = nodeOptions?.querySelector<HTMLLIElement>(
              `li:nth-of-type(${newHoveredIndex + 1})`,
            )
            if (!nodeNextHoveredLi || !nodeOptions) return
            if (event.code === "ArrowUp") {
              if (nodeNextHoveredLi.offsetTop < nodeOptions.scrollTop) {
                nodeOptions.scrollTop = nodeNextHoveredLi.offsetTop
              }
            } else if (event.code === "ArrowDown") {
              if (
                nodeNextHoveredLi.offsetTop + nodeNextHoveredLi.offsetHeight >
                nodeOptions.scrollTop + nodeOptions.clientHeight
              ) {
                nodeOptions.scrollTop =
                  (newHoveredIndex - 3) * nodeNextHoveredLi.offsetHeight
              }
            }
          }
          return
        default:
          return
      }
    }
    if (nodeTagInput) {
      nodeTagInput.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      nodeTagInput?.removeEventListener("keydown", handleKeyDown)
    }
  }, [
    isOpen,
    hoveredIndex,
    options,
    selectedTags,
    handleSelectTag,
    clearSelectedTags,
    filteredOptions,
  ])

  const handleMouseEnterOption = useCallback(
    (index: number) => () => setHoveredIndex(index),
    [],
  )
  const handleMouseLeaveOptions = useCallback(() => setHoveredIndex(-1), [])

  const handleChangeTerm = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setHoveredIndex(-1)
      setTerm(event.target.value)
      setIsOpen(true)
    },
    [],
  )

  const toggleIsOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      setIsOpen((prevIsOpen) => !prevIsOpen)
    },
    [],
  )

  return (
    <div className="relative">
      <h2 className="content-title">
        <label htmlFor="blog-select">筛选标签</label>
      </h2>

      {/* border-neutral-400 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 hover:border-neutral-600 */}
      <div className="border-ui-default-border-color flex items-center gap-2.5 rounded border">
        {/*  */}

        {selectedTags.length !== 0 ? (
          <ul
            ref={refSelectedTags}
            className="flex max-w-36 shrink-0 items-center gap-1.5 overflow-x-hidden pl-2"
          >
            {selectedTags.map((selectedTag) => {
              return (
                <li className="text-sm" key={selectedTag.name}>
                  <button
                    className="rounded border border-neutral-300 px-1.5"
                    onClick={handleSelectTag(selectedTag)}
                  >
                    {selectedTag.name}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}

        <input
          ref={refTagInput}
          id="blogs-select"
          className="border-none"
          type="text"
          placeholder="筛选标签..."
          autoComplete="off"
          value={term}
          onChange={handleChangeTerm}
          onFocus={() => setIsOpen(true)}
          onClick={(event) => event.stopPropagation()}
        />

        <div className="flex items-center">
          <button className="input-helper-button">
            <FaRegTrashAlt />
          </button>

          <button className="input-helper-button" onClick={toggleFilterMode}>
            {isOrMode ? <GiLogicGateOr /> : <GiLogicGateAnd />}
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
          {filteredOptions.length !== 0 ? (
            filteredOptions.map((tag, index) => {
              const isHovered = index === hoveredIndex
              return (
                <li
                  key={index}
                  className={`text-misc-button-icon-color flex h-8 cursor-pointer items-center justify-between px-2 ${isHovered ? "bg-black/10" : "bg-transparent"}`}
                  onMouseEnter={handleMouseEnterOption(index)}
                  onClick={handleSelectTag(tag)}
                >
                  <span>{tag.name}</span>
                  <span>{tag.count}</span>
                </li>
              )
            })
          ) : (
            <li className="flex h-8 items-center px-2">
              <p>没有符合查询的标签...</p>
            </li>
          )}
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
