import React, { useRef, useState, cloneElement } from "react"
import type {
  ReactNode,
  ReactElement,
  PropsWithChildren,
  RefObject,
} from "react"
import { createPortal } from "react-dom"

import type { Placement4 } from "@/types"

const Tooltip = ({
  children,
  tip,
  placement,
}: {
  children: ReactElement
  tip: string
  placement: Placement4
}) => {
  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<{
    isShow: boolean
    rect: DOMRect | null
  }>({
    isShow: false,
    rect: null,
  })

  const show = () => {
    if (ref.current === null) return
    const rect = ref.current.getBoundingClientRect()
    setState({ isShow: true, rect })
  }

  const hide = () => {
    setState({ isShow: false, rect: null })
  }

  const { isShow, rect } = state

  return (
    <>
      {cloneElement(
        children as ReactElement<{
          ref: RefObject<HTMLElement | null>
          onMouseEnter: () => void
          onMouseLeave: () => void
          onFocus: () => void
          onBlur: () => void
        }>,
        {
          ref: ref,
          onMouseEnter: show,
          onMouseLeave: hide,
          onFocus: show,
          onBlur: hide,
        },
      )}
      {isShow ? <Portal rect={rect} tip={tip} placement={placement} /> : null}
    </>
  )
}

export default Tooltip

const Portal = ({
  rect,
  tip,
  placement,
}: {
  rect: DOMRect | null
  tip: string
  placement: Placement4
}) => {
  const transform = getTransform(placement)
  const positionProps = getPositionProps(placement, rect)
  return createPortal(
    <div
      className={`tooltip ${placement} text-tooltip-color bg-tooltip-bg rounded px-2 py-1.5 text-sm`}
      style={{
        position: "absolute",
        ...positionProps,
        transform,
      }}
    >
      {tip}
    </div>,
    document.body,
  )
}

const getPositionProps = (placement: Placement4, rect: DOMRect | null) => {
  switch (placement) {
    case "top":
      return {
        top: `${rect ? rect.top - 10 : 0}px`,
        left: `${rect ? rect.left + rect.width / 2 : 0}px`,
      }
    case "right":
      return {
        top: `${rect ? rect.top + rect.height / 2 : 0}px`,
        left: `${rect ? rect.left + rect.width + 10 : 0}px`,
      }
    case "bottom":
      return {
        top: `${rect ? rect.top + rect.height + 10 : 0}px`,
        left: `${rect ? rect.left + rect.width / 2 : 0}px`,
      }
    case "left":
      return {
        top: `${rect ? rect.top + rect.height / 2 : 0}px`,
        left: `${rect ? rect.left - 10 : 0}px`,
      }
    default:
      // top
      return {
        top: `${rect ? rect.top - 10 : 0}px`,
        left: `${rect ? rect.left + rect.width / 2 : 0}px`,
      }
  }
}

const getTransform = (placement: Placement4) => {
  switch (placement) {
    case "top":
      return "translate(-50%, -100%)"
    case "bottom":
      return "translate(-50%, 0)"
    case "left":
      return "translate(-100%, -50%)"
    case "right":
      return "translate(0, -50%)"
    default:
      return "translate(-50%, -100%)"
  }
}
