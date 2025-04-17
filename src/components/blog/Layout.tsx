"use client"

import { useContext } from "react"

import Form from "@/components/blog/Form"
import AllTags from "@/components/blog/AllTags"
import { Tag } from "@/types"

import Drawer from "../ui/Drawer"

import GlobalContext from "../layouts/GlobalContext"

export default function Layout({
  children,
  allTags,
}: Readonly<{
  children: React.ReactNode
  allTags: Tag[]
}>) {
  const { hasRightDrawer, isRightDrawerOpen, handleRightDrawer } =
    useContext(GlobalContext)

  return (
    <div className="mx-auto my-8 grid max-w-6xl grid-cols-8 gap-2.5">
      <section className="page-content col-span-8 gap-2.5">
        <Form allTags={allTags} />
      </section>

      <section
        className={`page-content ${hasRightDrawer ? "col-span-full" : "col-span-5"}`}
      >
        <h2 className="content-title">博客(999)</h2>
        {children}
      </section>

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
                <AllTags allTags={allTags} />
              </div>
            )
          }}
        </Drawer>
      ) : (
        <section className="page-content col-span-3">
          <h2 className="content-title">所有标签(99)</h2>
          <AllTags allTags={allTags} />
        </section>
      )}
    </div>
  )
}
