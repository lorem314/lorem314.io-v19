import Link from "next/link"

import { FaCodepen } from "react-icons/fa"
import { SiCodesandbox } from "react-icons/si"
import { FaGithub } from "react-icons/fa"
import { FaBilibili } from "react-icons/fa6"

const refs = {
  codepen: "https://codepen.io/Number_DDD",
  codesandbox: "https://codesandbox.io/u/lorem314",
  github: "https://github.com/lorem314",
  bilibili: "https://space.bilibili.com/7909744/",
}

const links = [
  { Icon: FaCodepen, title: "Codepen", href: refs.codepen },
  { Icon: SiCodesandbox, title: "CodeSandbox", href: refs.codesandbox },
  { Icon: FaGithub, title: "Github", href: refs.github },
  { Icon: FaBilibili, title: "Bilibili", href: refs.bilibili },
]

export default function Social() {
  return (
    <ul className="flex items-center gap-2.5">
      {links.map((link, index) => {
        const { Icon, title, href } = link
        return (
          <li key={index}>
            <a
              className="bg-misc-button-bg hover:bg-misc-button-hover-bg flex items-center gap-1 rounded p-2 text-white opacity-90 hover:opacity-100 sm:hover:bg-transparent lg:bg-transparent lg:p-0"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon />
              <span className="hidden lg:inline lg:text-sm">{title}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
