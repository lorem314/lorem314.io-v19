"use client"

import { useState, forwardRef, useImperativeHandle, Children } from "react"
import type { ReactNode } from "react"

import { BiChevronRight, BiChevronDown } from "react-icons/bi"

type DetailsProps = {
  isOpen: boolean
  children: ReactNode[]
}

const Details = (props: DetailsProps) => {
  const { children } = props
  const [isOpen, setIsOpen] = useState(props.isOpen)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <details open={isOpen} className={`${isOpen ? "open" : "close"}`}>
      <summary
        className="flex cursor-pointer items-start select-none hover:bg-black/10"
        onClick={(event) => {
          event.preventDefault()
          isOpen ? close() : open()
        }}
      >
        <button
          className="opacity-50 hover:opacity-100"
          onClick={() => {
            isOpen ? close() : open()
          }}
        >
          {isOpen ? (
            <BiChevronDown className="size-6" />
          ) : (
            <BiChevronRight className="size-6" />
          )}
        </button>
        {children[0]}
      </summary>
      {children[1]}
    </details>
  )
}

// Details.displayName = "Details"

export default Details
