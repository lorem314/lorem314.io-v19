"use client"

import { useContext } from "react"

import Actions from "./Actions"
import Toc from "./Toc"

import Drawer from "../ui/Drawer"

import GlobalContext from "../layouts/GlobalContext"

import type { Toc as TypeToc } from "@/types"
import type { BlogPost, BookChapter } from "contentlayer/generated"

export default function Layout({
  children,
  toc,
  title,
}: {
  children: Readonly<React.ReactNode>
  toc: TypeToc
  title: string
}) {
  const { hasRightDrawer, isRightDrawerOpen, handleRightDrawer } =
    useContext(GlobalContext)

  return (
    <article
      id="article"
      className={`relative mx-auto my-8 grid max-w-7xl gap-2.5 ${hasRightDrawer ? "grid-cols-[2rem_minmax(0,_auto)]" : "grid-cols-[2rem_minmax(0,_auto)_minmax(0,_24rem)]"}`}
    >
      {/*  */}

      <aside className="">
        <Actions />
      </aside>

      {children}

      {hasRightDrawer ? (
        <Drawer
          isOpen={isRightDrawerOpen}
          onClose={handleRightDrawer.close}
          placement="right"
          size={360}
          title="目录"
        >
          {() => {
            return (
              <div className="p-2.5">
                <Toc title={title} toc={toc} />
              </div>
            )
          }}
        </Drawer>
      ) : (
        <aside>
          <div className="page-content sticky top-2.5 max-h-[calc(100vh-50px-2rem-10px)] overflow-y-auto">
            <Toc title={title} toc={toc} />
          </div>
        </aside>
      )}

      {/*  */}
    </article>
  )
}
