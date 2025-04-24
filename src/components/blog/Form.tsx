import type { Tag } from "@/types"

import Search from "./Search"
import Select from "./Select"

export default function Form({ allTags }: { allTags: Tag[] }) {
  return (
    <div className="flex flex-col gap-2.5 md:grid md:grid-cols-2">
      {/* <Search />
      <Select allTags={allTags} /> */}
    </div>
  )
}
