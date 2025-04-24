import type { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react"

export const P = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >,
) => {
  return <p {...props} className="my-4 leading-7 tracking-wider" />
}

export const Ul = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
) => {
  return <ul {...props} className="list-disc pl-8" />
}

export const Ol = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLOListElement>, HTMLOListElement>,
) => {
  return <ol {...props} className="list-decimal pl-8" />
}
