import { isValidElement, Children } from "react"
import type { ReactNode } from "react"

type SectionProps = {
  title: string
  level: number
  children: ReactNode
}

const Section = (props: SectionProps) => {
  const { title, level = 2, children } = props

  return (
    <section>
      <div>
        level-{level} : {title}
      </div>

      {Children.toArray(children).map((child, index) => {
        if (!isValidElement(child)) return child

        const displayName = (child.type as React.FC).displayName
        const isChildFunction = typeof child.type === "function"

        if (!isChildFunction || displayName !== "Section") return child

        const { title, children } = child.props as {
          title: string
          children: ReactNode
        }
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
