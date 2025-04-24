import ExternalLink from "../elements/ExternalLink"

export default function Footer() {
  return (
    <footer className="bg-content-bg -mx-2.5 py-8 text-center transition-colors">
      <p>lorem314.io-v19</p>
      <p>
        该网站使用
        <ExternalLink href="https://nextjs.org/">NextJS</ExternalLink>
        构建
      </p>
      <p>
        若发现错误或有改正建议 欢迎
        <ExternalLink href="https://github.com/lorem314">提出</ExternalLink>或
        <ExternalLink href="https://space.bilibili.com/7909744/">
          私信
        </ExternalLink>
      </p>
    </footer>
  )
}
