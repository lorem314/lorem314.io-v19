"use client"

import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useId,
} from "react"
import { createPortal } from "react-dom"
import type { ChangeEvent, KeyboardEvent } from "react"

import { BiChevronRight, BiChevronLeft } from "react-icons/bi"
import { FcCursor } from "react-icons/fc"

const clamp = (min: number, value: number, max: number) => {
  if (value < min) return min
  else if (max < value) return max
  else return value
}

type RangeInputProps = {
  value: number
  min: number
  max: number
  step: number
  onChange: (arg0: number) => void
}

export default function RangeInput({
  value,
  min,
  max,
  step,
  onChange,
}: RangeInputProps) {
  const refInput = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [hasLeftMouseDown, setHasLeftMouseDown] = useState(false)
  const [hasMovedAfterLeftMouseDown, setHasMovedAfterLeftMouseDown] =
    useState(false)
  const [valueAfterLeftMouseDown, setValueAfterLeftMouseDown] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useLayoutEffect(() => {
    const nodeInput = refInput.current
    if (!nodeInput) return
    nodeInput.value = `${value}`
  }, [value])

  const handleChagneValue = useCallback(
    (newValue: number) => {
      const nodeInput = refInput.current
      if (!nodeInput) return
      const result = clamp(min, newValue, max)
      nodeInput.value = `${result}`
      onChange(result)
    },
    [min, max],
  )

  const stepBackward = () => {
    onChange(value - step)
  }
  const stepForward = () => {
    onChange(value + step)
  }

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const nodeInput = refInput.current
    if (!nodeInput) return

    // console.log(`(${event.pageX}, ${event.pageY})`)
    // console.log("mouse move :", event.movementX)
    setMousePosition((prevMousePosition) => {
      return {
        x: prevMousePosition.x + event.movementX,
        y: prevMousePosition.y + event.movementY,
      }
    })
    // 添加灵敏程度 偶尔点击后会马上触发 mouse move 事件
    // 鼠标移动超过灵敏程度后 才会被视为鼠标移动 数值改变
    if (event.movementX === 0) {
      return
    }
    setHasMovedAfterLeftMouseDown(true)
    const nextValue = parseFloat(nodeInput.value) + event.movementX
    handleChagneValue(nextValue)
  }, [])

  useEffect(() => {
    const nodeInput = refInput.current

    const handleMouseDown = (event: MouseEvent) => {
      console.log(`mouse position (${event.pageX}, ${event.pageY})`)
      setMousePosition({ x: event.pageX, y: event.pageY })
      if (!nodeInput) return
      if (event.button === 0) {
        event.preventDefault()
        console.log("[mouse down] ", event.button)
        console.log("value after left mouse down :", value)
        setValueAfterLeftMouseDown(value)
        setHasLeftMouseDown(true)
        nodeInput?.requestPointerLock()
        nodeInput?.addEventListener("mousemove", handleMouseMove)
      } else if (hasLeftMouseDown && event.button === 2) {
        event.preventDefault()
        event.stopPropagation()
        console.log("reset value")
        setIsEditing(false)
        handleChagneValue(valueAfterLeftMouseDown)
        document.exitPointerLock()
        nodeInput.blur()
        setHasMovedAfterLeftMouseDown(false)
        nodeInput.removeEventListener("mousemove", handleMouseMove)
      }
    }

    const handleMouseUp = (event: MouseEvent) => {
      setHasLeftMouseDown(false)
      if (!nodeInput) return

      event.stopPropagation()
      event.preventDefault()

      console.log("[mouse up] ", event.button)

      if (event.button === 0 && !hasMovedAfterLeftMouseDown) {
        setIsEditing(true)
        nodeInput.select()
      } else if (event.button == 2) {
        nodeInput.blur()
      }

      nodeInput.removeEventListener("mousemove", handleMouseMove)
      document.exitPointerLock()
      setHasMovedAfterLeftMouseDown(false)
    }

    nodeInput?.addEventListener("mousedown", handleMouseDown)
    nodeInput?.addEventListener("mouseup", handleMouseUp)

    return () => {
      nodeInput?.removeEventListener("mousedown", handleMouseDown)
      nodeInput?.removeEventListener("mouseup", handleMouseUp)
    }
  }, [
    isEditing,
    hasLeftMouseDown,
    hasMovedAfterLeftMouseDown,
    valueAfterLeftMouseDown,
  ])

  const handleKeyDown = (event: KeyboardEvent) => {
    const nodeInput = refInput.current
    if (!nodeInput) return

    console.log("event.key :", event.code)

    if (event.code.includes("Enter")) {
      setIsEditing(false)
      handleChagneValue(parseFloat(nodeInput.value))
      nodeInput.blur()
      // onChange(refInput.current.value)
    }
  }

  return (
    <>
      <div className="flex items-center rounded-lg border border-neutral-500">
        <button className="opacity-50 hover:opacity-100" onClick={stepBackward}>
          <BiChevronLeft className="size-6" />
        </button>
        <input
          ref={refInput}
          className={`w-full cursor-default appearance-none border-x border-neutral-500 py-0.5 ${isEditing ? "text-right" : "text-center"} `}
          type="number"
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)}
          onContextMenu={(e) => e.preventDefault()}
        />
        <button className="opacity-50 hover:opacity-100" onClick={stepForward}>
          <BiChevronRight className="size-6" />
        </button>
      </div>
      {hasLeftMouseDown
        ? createPortal(
            <div
              // className={`absolute left-[${mousePosition.x}px] top-[${mousePosition.y}px]`}
              className={`absolute`}
              style={{
                top: `${mousePosition.y - 8}px`,
                left: `${mousePosition.x - 12}px`,
              }}
            >
              <FcCursor className="size-8" />
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
