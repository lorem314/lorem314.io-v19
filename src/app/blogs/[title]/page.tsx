import { notFound } from "next/navigation"
import { allBlogPosts } from "contentlayer/generated"
import { useMDXComponent } from "next-contentlayer/hooks"

import Article from "@/components/article/Article"

export default async function Page({
  params,
}: {
  params: Promise<{ title: string }>
}) {
  const awaitedParams = await params
  const decodedTitle = decodeURIComponent(awaitedParams.title)

  const blogPost = allBlogPosts.find(
    (blogPost) => blogPost._raw.flattenedPath === `blogs/${decodedTitle}`,
  )

  if (!blogPost) {
    console.log("not found")
    return <div>not found</div>
  }

  console.log("blogPost", blogPost._raw.flattenedPath)

  // const MDXContent = useMDXComponent(blogPost.body.code)
  // const renderedMDX = <MDXContent components={{}} />

  return (
    <div>
      <p>params.title (decoded) {decodedTitle}</p>
      <Article bodyCode={blogPost.body.code} />
      {/* {renderedMDX} */}
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ title: string }>
}) {
  const awaitedParams = await params
  const decodedTitle = decodeURIComponent(awaitedParams.title)

  const blogPost = allBlogPosts.find(
    (blogPost) => blogPost._raw.flattenedPath === `blogs/${decodedTitle}`,
  )

  if (!blogPost) {
    return {
      title: "404 | 博客 | lorem314.io",
    }
  }

  return {
    title: `${blogPost.title} | 博客 | lorem314.io`,
  }
}
