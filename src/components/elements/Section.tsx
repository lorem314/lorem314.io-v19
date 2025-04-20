import { isValidElement, Children } from "react"
import type { ReactNode } from "react"

import { H1, H2, H3, H4, H5, H6 } from "@/components/elements/headings"
import { urlFriendly } from "@/utils"

type SectionProps = {
  title: string
  level: number
  children: ReactNode
}

const h = { 2: H2, 3: H3, 4: H4, 5: H5, 6: H6 }

const getHeadingByLevel = (level: number) => {
  if (level > 6) return H6
  else if (level < 1) return H1
  else return [H1, H2, H3, H4, H5, H6][level - 1]
}

const Section = (props: SectionProps) => {
  const { title, level = 2, children } = props

  const H = getHeadingByLevel(level)
  const id = urlFriendly(title)
  const fontSize = `text-[${1 + (7 - level) * 0.125}rem]`
  const marginTop = `mt-[${(7 - level) * 0.25 + 1}rem]`

  return (
    <section>
      <H id={id} className={`mb-4 font-bold`}>
        <a href={`#${id}`}>{title}</a>
      </H>

      {Children.toArray(children).map((child, index) => {
        if (!isValidElement(child)) return child

        const displayName = (child.type as React.FC).displayName
        const isChildFunction = typeof child.type === "function"

        if (!isChildFunction || displayName !== "Section") return child

        const { title, children } = child.props as SectionProps
        const key = `Section-${level}-${index}`

        return (
          <Section title={title} key={key} level={level + 1}>
            {children}
          </Section>
        )
      })}
    </section>
  )
}

Section.displayName = "Section"

export default Section
