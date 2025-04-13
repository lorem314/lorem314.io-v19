"use client"

import { useContext } from "react"

import Actions from "./Actions"
import Toc from "./Toc"

import Drawer from "../ui/Drawer"

import GlobalContext from "../layouts/GlobalContext"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { hasRightDrawer, isRightDrawerOpen, handleRightDrawer } =
    useContext(GlobalContext)

  return (
    <div
      className={`mx-auto my-8 grid max-w-7xl gap-2.5 ${hasRightDrawer ? "grid-cols-[2rem_minmax(0,_auto)]" : "grid-cols-[2rem_minmax(0,_auto)_minmax(0,_24rem)]"}`}
    >
      {/*  */}

      <aside>
        <Actions />
      </aside>

      {children}

      {hasRightDrawer ? (
        <Drawer
          isOpen={isRightDrawerOpen}
          onClose={handleRightDrawer.close}
          placement="right"
          size={360}
          title="所有标签"
        >
          {() => {
            return (
              <div>
                <Toc />
              </div>
            )
          }}
        </Drawer>
      ) : (
        <aside>
          <div className="bg-content-bg rounded p-2.5 shadow">
            <Toc />
          </div>
        </aside>
      )}

      {/*  */}
    </div>
  )
}
