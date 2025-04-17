"use client"

import { useEffect } from "react"
import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import { AiOutlineTags } from "react-icons/ai"
import { VscListTree } from "react-icons/vsc"
import { IconType } from "react-icons"

import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

import Drawer from "../ui/Drawer"

import useDrawer from "@/hooks/useDrawer"
import useClient from "@/hooks/useClient"
import useLocalStorage from "@/hooks/useLocalStorage"

import GlobalContext from "./GlobalContext"

export default function Layout({ children }: { children: ReactNode }) {
  const isClient = useClient()
  const pathname = usePathname()

  const [preferredTheme, setPreferredTheme] = useLocalStorage(
    "preferred-theme",
    "system",
  )

  const [isLeftDrawerAlwaysCollapsed, setIsLeftDrawerAlwaysCollapsed] =
    useLocalStorage("is-left-drawer-always-collapsed", false)
  const [isRightDrawerAlwaysCollapsed, setIsRightDrawerAlwaysCollapsed] =
    useLocalStorage("is-right-drawer-always-collapsed", false)

  const {
    isCollapsed: isLeftDrawerCollapsed,
    isOpen: isLeftDrawerOpen,
    handler: handleLeftDrawer,
  } = useDrawer({
    isAlwaysCollapsed: isLeftDrawerAlwaysCollapsed,
    mediaQuery: "(max-width: 84rem)",
  })
  const hasLeftDrawer = isLeftDrawerAlwaysCollapsed || isLeftDrawerCollapsed

  const rightDrawerProps = getRightDrawerProps(pathname)
  const {
    isCollapsed: isRightDrawerCollapsed,
    isOpen: isRightDrawerOpen,
    handler: handleRightDrawer,
  } = useDrawer({
    isAlwaysCollapsed: isRightDrawerAlwaysCollapsed,
    mediaQuery: rightDrawerProps.mediaQuery,
  })
  const hasRightDrawer = isRightDrawerAlwaysCollapsed || isRightDrawerCollapsed

  // theme effect
  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleThemeChange = ({ matches }: { matches: boolean }) => {
      if (matches) {
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
        document.documentElement.classList.add("light")
      }
    }

    if (preferredTheme === "system") {
      darkQuery.addEventListener("change", handleThemeChange)
      const dataTheme = darkQuery.matches ? "dark" : "light"
      // document.documentElement.classList.remove("light")
      // document.documentElement.classList.remove("dark")
      // document.documentElement.classList.add(dataTheme)
      document.documentElement.setAttribute("data-theme", dataTheme)
    } else {
      // document.documentElement.classList.remove("light")
      // document.documentElement.classList.remove("dark")
      // document.documentElement.classList.add(preferredTheme)
      document.documentElement.setAttribute("data-theme", preferredTheme)
    }

    return () => {
      darkQuery.removeEventListener("change", handleThemeChange)
    }
  }, [preferredTheme])

  return isClient ? (
    <GlobalContext.Provider
      value={{
        test: "ok",
        hasRightDrawer,
        isRightDrawerOpen,
        handleRightDrawer,
        preferredTheme,
        setPreferredTheme,
        isLeftDrawerAlwaysCollapsed,
        setIsLeftDrawerAlwaysCollapsed,
        isRightDrawerAlwaysCollapsed,
        setIsRightDrawerAlwaysCollapsed,
      }}
    >
      <Header
        hasLeftDrawer={hasLeftDrawer}
        openLeftDrawer={handleLeftDrawer.open}
        hasRightDrawer={hasRightDrawer}
        openRightDrawer={handleRightDrawer.open}
        RightDrawerIcon={rightDrawerProps.icon}
      />

      {hasLeftDrawer ? (
        <Drawer
          isOpen={isLeftDrawerOpen}
          placement="left"
          size={20 * 16}
          onClose={handleLeftDrawer.close}
        >
          <Sidebar />
        </Drawer>
      ) : (
        <aside className="absolute top-12.5 bottom-0 left-0 w-80">
          <Sidebar />
        </aside>
      )}

      <main
        className={`absolute top-12.5 right-0 bottom-0 ${hasLeftDrawer ? "left-0" : "left-80"} overflow-auto px-2.5`}
      >
        {children}
        <Footer />
      </main>
    </GlobalContext.Provider>
  ) : (
    "not on client"
  )
}

const getRightDrawerProps = (
  pathname: string,
): { mediaQuery: string; icon: IconType | null } => {
  const splitted = pathname.split("/")
  const length = splitted.length

  if (splitted[1] === "blogs" && length === 2) {
    // /blogs
    return { mediaQuery: "(max-width: 1024px)", icon: AiOutlineTags }
  } else if (splitted[1] === "blogs" && length === 3) {
    // /blogs/[title]
    return { mediaQuery: "(max-width: 1024px)", icon: VscListTree }
  } else if (splitted[1] === "books" && length === 4) {
    // /books/[title]/[chapter]
    return { mediaQuery: "(max-width: 1024px)", icon: VscListTree }
  } else {
    return { mediaQuery: "", icon: null }
  }
}
