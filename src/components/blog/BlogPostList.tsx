import type { BlogPost } from "contentlayer/generated"

import BlogPostItem from "./BlogPostItem"

export default function BlogPostList({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <ul>
      {blogPosts.map((blogPost, index) => {
        return (
          <li key={blogPost._id}>
            <BlogPostItem blogPost={blogPost} />
          </li>
        )
      })}
    </ul>
  )
}
