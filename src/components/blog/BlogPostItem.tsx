import { memo } from "react"
import Link from "next/link"

import type { BlogPost } from "contentlayer/generated"

const BlogPostItem = ({ blogPost }: { blogPost: BlogPost }) => {
  return (
    <article>
      <header>
        <h3 className="text-lg font-bold">
          <Link href={blogPost._raw.sourceFileDir}>{blogPost.title}</Link>
        </h3>
      </header>
      <section>section</section>
      <footer>footer</footer>
    </article>
  )
}

export default memo(BlogPostItem)
