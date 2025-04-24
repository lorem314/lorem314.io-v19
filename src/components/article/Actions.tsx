"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"

import { IoMdArrowBack } from "react-icons/io"
import { BiSolidArrowToTop } from "react-icons/bi"
import { MdFullscreen, MdFullscreenExit } from "react-icons/md"

import Tooltip from "../ui/Tooltip"

export default function Actions() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) setIsFullscreen(true)
      else setIsFullscreen(false)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const enterFullscreen = useCallback(() => {
    const nodeMainContent = document.getElementById("page-container")
    if (nodeMainContent && nodeMainContent.requestFullscreen) {
      nodeMainContent.requestFullscreen()
    } else {
      alert("浏览器不支持全屏")
    }
  }, [])

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  const toTop = useCallback(() => {
    document.getElementById("page-container")?.scrollTo(0, 0)
  }, [])

  const goBack = useCallback(() => {
    const splitted = pathname.split("/")
    const withoutLast = splitted.slice(0, splitted.length - 1)
    router.push(withoutLast.join("/"))
  }, [])

  return (
    <div className="sticky top-2.5 flex flex-col gap-2.5">
      <Tooltip tip="后退" placement="right">
        <button
          onClick={goBack}
          className="bg-content-bg size-8 rounded shadow transition-colors"
        >
          <IoMdArrowBack className="size-8 p-2 opacity-60 hover:opacity-80 active:opacity-100" />
        </button>
      </Tooltip>

      <Tooltip tip="回到顶部" placement="right">
        <button
          onClick={toTop}
          className="bg-content-bg size-8 rounded shadow transition-colors"
        >
          <BiSolidArrowToTop className="size-8 p-2 opacity-60 hover:opacity-80 active:opacity-100" />
        </button>
      </Tooltip>

      {isFullscreen ? (
        <Tooltip tip="退出全屏" placement="right">
          <button
            onClick={exitFullscreen}
            className="bg-content-bg size-8 rounded shadow transition-colors"
          >
            <MdFullscreenExit className="size-8 p-2 opacity-60 hover:opacity-80 active:opacity-100" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip tip="进入全屏" placement="right">
          <button
            onClick={enterFullscreen}
            className="bg-content-bg size-8 rounded shadow transition-colors"
          >
            <MdFullscreen className="size-8 p-2 opacity-60 hover:opacity-80 active:opacity-100" />
          </button>
        </Tooltip>
      )}
    </div>
  )
}
