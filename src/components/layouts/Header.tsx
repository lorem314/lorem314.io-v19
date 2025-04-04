import Link from "next/link"

import Search from "./Search"
import Social from "./Social"

export default function Header() {
  return (
    <header className="flex h-12.5 items-center justify-between gap-2.5 bg-indigo-600 px-2.5 text-white">
      <h1 className="font-bold opacity-90 hover:opacity-100">
        <Link href="/">lorem314.io</Link>
      </h1>

      <Search />

      <Social />
    </header>
  )
}
