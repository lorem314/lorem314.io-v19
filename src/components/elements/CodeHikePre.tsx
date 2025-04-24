import { Pre, highlight } from "codehike/code"
import type { RawCode } from "codehike/code"

import { firaCode } from "@/fonts"

export default async function CodeHikePre({
  codeblock,
}: {
  codeblock: RawCode
}) {
  const highlighted = await highlight(codeblock, "github-from-css")
  const meta = parseMeta(highlighted.meta)

  // console.log("meta", meta)

  return (
    <div className="my-8 rounded border border-neutral-500">
      {meta.title ? (
        <div className="border-b border-neutral-500 p-2.5 font-bold">
          {meta.title}
        </div>
      ) : null}
      <div className="overflow-auto rounded-b-md p-2.5">
        <Pre className={firaCode.className} code={highlighted} />
      </div>
    </div>
  )
}

const parseMeta = (rawMeta: string) => {
  const iterator = rawMeta.matchAll(/([a-zA-Z]+)(?:="(.+?)")?/g)
  const meta: { [key: string]: string | number | boolean } = {}
  for (const match of iterator) {
    const key = match[1]
    const value = match[2]
    if (value === undefined) meta[key] = true
    else meta[key] = value
  }
  return meta
}
