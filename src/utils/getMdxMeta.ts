import type { TocItem } from "@/types"

// matches: import React from 'react'
const isStaticImport = (line: string) => line.startsWith("import")

// matches: <Image width={64} height="64px" />
// const isSelfClosingTag = (line: string) => {}

// matches: <Component>
const isOpeningTag = (line: string, name?: string) =>
  !name
    ? new RegExp("^<[A-Z]").test(line)
    : new RegExp(`^${"<"}${name}`).test(line)

// matches: </Component>
const isClosingTag = (line: string, name?: string) =>
  line.startsWith(`</${name || ""}`)

// matches: ![alt](link)
const isMarkdownImage = (line: string) =>
  line.startsWith("![") && line.endsWith(")")

// const isComponentImage = () => {}

const isMdCodeBlockEnd = (line: string) => line.match(/^`{3,}$/)
const isMdCodeBlockStart = (line: string) => line.startsWith("```")

const getItems = (sectionLines: string[]) => {
  const items = []
  while (sectionLines.length !== 0) {
    const sectionLine = sectionLines.shift() || ""
    if (sectionLine.startsWith("</")) {
      break
    } else {
      const matches = sectionLine.match(/title="(.*?)"/)
      const title = matches ? matches[1] : ""
      const item: TocItem = { title, items: null }
      items.push(item)
      item.items = getItems(sectionLines)
    }
  }
  if (items.length === 0) return null
  else return items
}

const getMdxMeta = (rawBody: string) => {
  const lines = rawBody.split(/\r?\n/)
  const sectionLines = []
  const statistic = { codeblock: 0, image: 0, text: 0 }
  const flag = {
    codeblock: { isStarted: false, backtickNumber: 0 },
  }
  // code hike 支持 4 个` 来书写 codeblock
  // 用大于等于 3 个来判定是否是开 并记录 ` 是几个
  // 再次遇到大于等于 3 个时对比数量是否为与之前的开对应的闭
  for (const line of lines) {
    // console.log("[line]", line)

    if (!flag.codeblock.isStarted && line.length === 0) {
      // empty line
      continue
    } else if (!flag.codeblock.isStarted && isStaticImport(line)) {
      // import
      continue
    } else if (!flag.codeblock.isStarted && isOpeningTag(line)) {
      // <Component>
      if (line.startsWith("<Section")) sectionLines.push(line)
    } else if (!flag.codeblock.isStarted && isClosingTag(line)) {
      // </Component>
      if (line.startsWith("</Section")) sectionLines.push(line)
    } else if (!flag.codeblock.isStarted && isMarkdownImage(line)) {
      // ![alt](link)
      statistic.image++
    } else if (!flag.codeblock.isStarted && isMdCodeBlockStart(line)) {
      // console.log("[CodeBlock Start]", line)
      const matched = line.match(/^(`{3,})[a-zA-Z]{1,}/) || [""]
      const backtickNumber = matched[1].length
      flag.codeblock.isStarted = true
      flag.codeblock.backtickNumber = backtickNumber
    } else if (flag.codeblock.isStarted && isMdCodeBlockEnd(line)) {
      const backtickNumber = line.length
      if (backtickNumber === flag.codeblock.backtickNumber) {
        // console.log("[CodeBlock End] matched", line)
        statistic.codeblock++
        flag.codeblock.isStarted = false
        flag.codeblock.backtickNumber = 0
      } else {
        // console.log("[CodeBlock End] not matched", line)
      }
    } else if (!flag.codeblock.isStarted) {
      // common text, aka p element
      // console.log("text", line)
    }
  }

  const items = getItems(sectionLines)

  // console.dir(items, { depth: 6 })
  // console.log(JSON.stringify(items, null, 2))
  return {
    toc: {
      items,
    },
    statistic,
  }
}

export default getMdxMeta
