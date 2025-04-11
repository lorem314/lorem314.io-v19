import { useMDXComponent } from "next-contentlayer2/hooks"

import Actions from "./Actions"
import Toc from "./Toc"

export default function Article({ bodyCode }: { bodyCode: string }) {
  const MDXContent = useMDXComponent(bodyCode)

  return (
    <div
      className={`relative mx-auto my-8 grid max-w-6xl grid-cols-[2rem_minmax(0,_auto)_minmax(0,_24rem)] gap-2.5`}
    >
      {/*  */}

      <aside className="">
        <Actions />
      </aside>

      <div>
        <MDXContent />
        <p>helo</p>
      </div>

      <Toc />

      {/*  */}
    </div>
  )
}
