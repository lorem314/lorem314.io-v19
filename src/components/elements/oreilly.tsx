import { ReactNode } from "react"

export const Note = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-4 my-4 flex">
      <div className="mx-1 max-w-[84px]">
        <img src="/images/oreilly/note.png" alt="笔记" />
      </div>
      <div className="flex-grow py-2 pl-5">{children}</div>
    </div>
  )
}

export const Tip = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-4 my-4 flex">
      <div className="mx-3 max-w-[78px]">
        <img src="/images/oreilly/tip.png" alt="提示" />
      </div>
      <div className="flex-grow pl-2">{children}</div>
    </div>
  )
}

export const Warning = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-4 my-4 flex">
      <div className="max-w-[98px]">
        <img src="/images/oreilly/warning.png" alt="注意" />
      </div>
      <div className="flex-grow pl-2">{children}</div>
    </div>
  )
}

export const BorderBox = ({
  title,
  children,
}: {
  title?: string
  children: ReactNode
}) => {
  return (
    <div className="border border-neutral-800 px-2 py-2">
      {title ? (
        <div className="text-center text-lg font-bold">{title}</div>
      ) : null}
      <div className="mt-2">{children}</div>
    </div>
  )
}
