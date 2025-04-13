import { useMDXComponent } from "next-contentlayer2/hooks"

import type { ReactElement, ReactNode } from "react"
import type { BlogPost } from "contentlayer/generated"

import CodeHikePre from "../elements/CodeHikePre"

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

      <div className="bg-content-bg rounded p-2.5 shadow">
        <MDXContent components={{ CodeHikePre }} />
      </div>

      <footer className="bg-content-bg mt-2.5 rounded p-2.5 shadow">
        {footer}
      </footer>
    </article>
  )
}
