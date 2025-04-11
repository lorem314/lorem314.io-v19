"use client"

import type { ReactNode } from "react"

import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

import Drawer from "../ui/Drawer"

import useDrawer from "../hooks/useDrawer"
import useClient from "../hooks/useClient"

export default function Layout({ children }: { children: ReactNode }) {
  const isClient = useClient()

  const isLeftDrawerAlwaysCollapsed = false

  const {
    isCollapsed: isLeftDrawerCollapsed,
    isOpen: isLeftDrawerOpen,
    handler: handleLeftDrawer,
  } = useDrawer({
    isAlwaysCollapsed: isLeftDrawerAlwaysCollapsed,
    mediaQuery: "(max-width: 80rem)",
  })

  const hasLeftDrawer = isLeftDrawerAlwaysCollapsed || isLeftDrawerCollapsed

  return isClient ? (
    <>
      <Header
        hasLeftDrawer={hasLeftDrawer}
        openLeftDrawer={handleLeftDrawer.open}
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
        className={`absolute top-12.5 right-0 bottom-0 ${hasLeftDrawer ? "left-0" : "left-80"} overflow-auto bg-neutral-200 px-2.5`}
      >
        {children}
        <Footer />
      </main>
    </>
  ) : (
    "not on client"
  )
}
