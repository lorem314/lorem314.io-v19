"use client"

import { useState, useRef } from "react"
import type { ChangeEvent, KeyboardEvent } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

import useDebounce from "@/hooks/useDebounce"

export default function Search({
  value,
  onChange,
}: {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div>
      <h2 className="content-title">
        <label htmlFor="blog-search">搜索内容</label>
      </h2>
      <input
        id="blog-search"
        ref={ref}
        // className="focus:ring-primary-color focus:ring-1"
        type="search"
        placeholder="搜索标题..."
        value={value}
        onChange={onChange}
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
