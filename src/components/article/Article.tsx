import Link from "next/link"
import { useMDXComponent } from "next-contentlayer2/hooks"

import type { ReactElement, ReactNode } from "react"
import type { BlogPost } from "contentlayer/generated"

import CodeHikePre from "../elements/CodeHikePre"
import Counter from "../Counter"
import Section from "../elements/Section"
import { P, Ul, Ol } from "../elements/blocks"
import { Note, Tip, BorderBox, Warning } from "../elements/oreilly"
import Figure from "../elements/Figure"
import Table, { Thead, Tbody, Tr } from "../elements/Table"

const components = {
  p: P,
  ul: Ul,
  ol: Ol,
  a: Link,
  CodeHikePre,
  Counter,
  Section,
  Note,
  Tip,
  Warning,
  Figure,
  BorderBox,
  Table,
  Thead,
  Tbody,
  Tr,
}

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
    <section>
      <header className="bg-content-bg mb-2.5 rounded p-2.5 shadow transition-colors">
        {header}
      </header>

      <div
        id="mdx-content-container"
        className="bg-content-bg rounded p-2.5 shadow transition-colors"
      >
        <MDXContent components={components} />
      </div>

      <footer className="bg-content-bg mt-2.5 rounded p-2.5 shadow transition-colors">
        {footer}
      </footer>
    </section>
  )
}

// 在 components 中添加 Counter 组件后
// 可在 mdx 文件中直接使用 <Counter /> 组件
