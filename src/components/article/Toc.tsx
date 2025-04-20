import {
  createRef,
  forwardRef,
  MouseEvent,
  useImperativeHandle,
  useRef,
} from "react"
import { VscCollapseAll, VscExpandAll } from "react-icons/vsc"

import Details from "../elements/Details"
import { urlFriendly } from "@/utils"

import type { Toc as TypeToc, TocItem } from "@/types"

export default function Toc({ title, toc }: { title: string; toc: TypeToc }) {
  return (
    <div>
      <Details isOpen={true}>
        <div className="details-head-in-toc group">
          <div className="font-bold">{title}</div>
          <div className="grow" />
          <button className="opacity-0 group-hover:opacity-50 hover:opacity-100">
            <VscExpandAll className="size-6" />
          </button>
          <button className="opacity-0 group-hover:opacity-50 hover:opacity-100">
            <VscCollapseAll className="size-6" />
          </button>
        </div>
        <Items items={toc.items} level={2} />
      </Details>
    </div>
  )
}

const Items = ({ items, level }: { items: TocItem[]; level: number }) => {
  if (!items) {
    return null
  }

  return (
    <ul className="tree-list">
      {items.map((item, index) => {
        return (
          <li key={index}>
            <Item level={level} item={item} />
          </li>
        )
      })}
    </ul>
  )
}

const Item = ({ item, level }: { item: TocItem; level: number }) => {
  const id = urlFriendly(item.title)
  if (!item.items) {
    return <a href={`#${id}`}>{item.title}</a>
  }
  return (
    <Details isOpen={true}>
      <div className="details-head-in-toc group">
        <a href={`#${id}`} onClick={justStopPropagation}>
          {item.title}
        </a>
        <div className="grow" />
        <button className="opacity-0 group-hover:opacity-50 hover:opacity-100">
          <VscExpandAll className="size-6" />
        </button>
        <button className="opacity-0 group-hover:opacity-50 hover:opacity-100">
          <VscCollapseAll className="size-6" />
        </button>
      </div>
      <Items items={item.items} level={level + 1} />
    </Details>
  )
}

const justStopPropagation = (event: MouseEvent) => event.stopPropagation()
