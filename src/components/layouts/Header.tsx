import Link from "next/link"

import { RiMenu2Line } from "react-icons/ri"
import type { IconType } from "react-icons"

import Search from "./Search"
import Social from "./Social"

export default function Header({
  hasLeftDrawer,
  openLeftDrawer,
}: {
  hasLeftDrawer: boolean
  openLeftDrawer: () => void
}) {
  return (
    <header className="bg-primary-color flex h-12.5 items-center justify-between gap-2.5 px-2.5 text-white">
      {hasLeftDrawer ? (
        <button
          className="bg-misc-button-bg hover:bg-misc-button-hover-bg active:bg-misc-button-active-bg rounded p-2"
          onClick={() => openLeftDrawer()}
        >
          <RiMenu2Line className="h-5 w-5" />
        </button>
      ) : null}

      <h1 className="font-bold opacity-90 hover:opacity-100">
        <Link href="/">lorem314.io</Link>
      </h1>

      <Search />

      <Social />
    </header>
  )
}
