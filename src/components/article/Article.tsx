import { useMDXComponent } from "next-contentlayer2/hooks"

import type { ReactElement, ReactNode } from "react"
import type { BlogPost } from "contentlayer/generated"

import CodeHikePre from "../elements/CodeHikePre"
import Counter from "../Counter"

export default function Article({
  header,
  bodyCode,
  footer,
}: {
  header: ReactNode
  bodyCode: string
  footer: ReactNode
}) {
  const MDXContent = useMDXComponent(bodyCode)

  return (
    <article>
      <header className="bg-content-bg mb-2.5 rounded p-2.5 shadow">
        {header}
      </header>

      <div
        id="mdx-content-container"
        className="bg-content-bg rounded p-2.5 shadow"
      >
        <MDXContent components={{ CodeHikePre, Counter }} />
      </div>

      <footer className="bg-content-bg mt-2.5 rounded p-2.5 shadow">
        {footer}
      </footer>
    </article>
  )
}

// 在 components 中添加 Counter 组件后
// 可在 mdx 文件中直接使用 <Counter /> 组件
