import { memo } from "react"
import Link from "next/link"

import type { BlogPost } from "contentlayer/generated"

import Tags from "./Tags"

const BlogPostItem = ({ blogPost }: { blogPost: BlogPost }) => {
  return (
    <article>
      <header>
        <h3 className="text-lg font-bold">
          <Link href={`/blogs/${blogPost.title}`}>{blogPost.title}</Link>
        </h3>
      </header>
      <div className="my-2.5">
        <Tags tags={blogPost.tags} />
      </div>
      <section>section</section>
      <footer>footer</footer>
    </article>
  )
}

export default memo(BlogPostItem)
