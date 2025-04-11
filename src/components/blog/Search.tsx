"use client"

import { useState, useRef } from "react"
import type { ChangeEvent, KeyboardEvent } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

import useDebounce from "../hooks/useDebounce"

export default function Search() {
  const ref = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const params = new URLSearchParams(searchParams)
  //   const value = event.target.value
  //   if (value) {
  //     params.set("query", value)
  //   } else {
  //     params.delete("query")
  //   }
  //   router.replace(`${pathname}?${params.toString()}`)
  // }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    console.log("key", event.key)
    if (event.key === "Enter") {
      if (!ref.current) return
      const node = ref.current
      const params = new URLSearchParams(searchParams)
      const value = node.value
      if (value) {
        params.set("query", value)
      } else {
        params.delete("query")
      }
      router.replace(`${pathname}?${params.toString()}`)
    } else if (event.key === "Escape") {
      const params = new URLSearchParams(searchParams)
      params.delete("query")
      router.replace(`${pathname}?${params.toString()}`)
    }
  }

  return (
    <div>
      <label className="card-label" htmlFor="blog-search">
        搜索内容
      </label>
      <input
        ref={ref}
        className="focus:ring-1 focus:ring-blue-600"
        type="search"
        // onChange={handleChange}
        onKeyDown={handleKeyDown}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  )
}

// function debounce(func: () => void, ms: number) {
//   let timeout
//   return function (...args) {
//     clearTimeout(timeout)
//     timeout = setTimeout(() => func(...args), ms)
//   }
// }
