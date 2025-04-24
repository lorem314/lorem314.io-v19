import type { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react"

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

export const H1 = (props: HeadingProps) => {
  return <h1 {...props} />
}

export const H2 = (props: HeadingProps) => {
  return <h2 {...props} />
}

export const H3 = (props: HeadingProps) => {
  return <h3 {...props} />
}

export const H4 = (props: HeadingProps) => {
  return <h4 {...props} />
}

export const H5 = (props: HeadingProps) => {
  return <h5 {...props} />
}

export const H6 = (props: HeadingProps) => {
  return <h6 {...props} />
}
