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
  const refDetails = useRef<{ open: () => void; close: () => void }>(null)
  const refItems = useRef<{ openAll: () => void; closeAll: () => void }>(null)

  const openAll = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    refDetails.current?.open()
    refItems.current?.openAll()
  }
  const closeAll = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    refDetails.current?.close()
    refItems.current?.closeAll()
  }

  return (
    <div>
      <Details ref={refDetails} isOpen={true}>
        <div className="details-head-in-toc group">
          <div className="font-bold">{title}</div>
          <div className="grow" />
          <button
            className="opacity-0 group-hover:opacity-50 hover:opacity-100"
            onClick={openAll}
          >
            <VscExpandAll className="size-6" />
          </button>
          <button
            className="opacity-0 group-hover:opacity-50 hover:opacity-100"
            onClick={closeAll}
          >
            <VscCollapseAll className="size-6" />
          </button>
        </div>
        <Items ref={refItems} items={toc.items} level={2} />
      </Details>
    </div>
  )
}

type ItemsProps = {
  items: TocItem[]
  level: number
}

const Items = forwardRef((props: ItemsProps, ref) => {
  const { items = [], level } = props

  const refs = useRef(
    items.map(() => createRef<{ openAll: () => void; closeAll: () => void }>()),
  )

  useImperativeHandle(
    ref,
    () => ({
      openAll: () => refs.current.forEach((ref) => ref.current?.openAll()),
      closeAll: () => refs.current.forEach((ref) => ref.current?.closeAll()),
    }),
    [],
  )

  if (!items) {
    return null
  }

  return (
    <ul className="tree-list">
      {items.map((item, index) => {
        return (
          <li key={index}>
            <Item ref={refs.current[index]} level={level} item={item} />
          </li>
        )
      })}
    </ul>
  )
})

type ItemProps = {
  item: TocItem
  level: number
}

const Item = forwardRef((props: ItemProps, ref) => {
  const { item, level } = props

  const id = urlFriendly(item.title)

  const refDetails = useRef<{ open: () => void; close: () => void }>(null)
  const refItems = useRef<{ openAll: () => void; closeAll: () => void }>(null)

  const openAll = (event: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation()
    refDetails.current?.open()
    refItems.current?.openAll()
  }
  const closeAll = (event: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation()
    refDetails.current?.close()
    refItems.current?.closeAll()
  }

  useImperativeHandle(ref, () => ({ closeAll, openAll }), [])

  if (!item.items) {
    return <a href={`#${id}`}>{item.title}</a>
  }

  return (
    <Details ref={refDetails} isOpen={true}>
      <div className="details-head-in-toc group">
        <a href={`#${id}`} onClick={justStopPropagation}>
          {item.title}
        </a>
        <div className="grow" />
        <button
          className="opacity-0 group-hover:opacity-50 hover:opacity-100"
          onClick={openAll}
        >
          <VscExpandAll className="size-6" />
        </button>
        <button
          className="opacity-0 group-hover:opacity-50 hover:opacity-100"
          onClick={closeAll}
        >
          <VscCollapseAll className="size-6" />
        </button>
      </div>
      <Items ref={refItems} items={item.items} level={level + 1} />
    </Details>
  )
})

const justStopPropagation = (event: MouseEvent) => event.stopPropagation()
