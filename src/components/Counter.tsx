"use client"

import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      计数
      <button
        onClick={() => {
          setCount(count - 1)
        }}
      >
        {" "}
        -{" "}
      </button>
      <div>counter:{count}</div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        {" "}
        +{" "}
      </button>
    </div>
  )
}
