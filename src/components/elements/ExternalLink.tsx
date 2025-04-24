import type { DetailedHTMLProps, LinkHTMLAttributes } from "react"

import { FaExternalLinkAlt } from "react-icons/fa"

const ExternalLink = (
  props: DetailedHTMLProps<LinkHTMLAttributes<HTMLElement>, HTMLElement>,
) => {
  return (
    <a
      className="text-link-color mx-1 inline-flex cursor-pointer items-center gap-1"
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
      <FaExternalLinkAlt className="text-[0.75em]" />
    </a>
  )
}

export default ExternalLink
