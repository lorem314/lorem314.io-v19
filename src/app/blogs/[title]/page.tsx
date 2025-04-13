import { notFound } from "next/navigation"
import { allBlogPosts } from "contentlayer/generated"

import Layout from "@/components/article/Layout"
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

  return (
    <Layout>
      <Article
        header={
          <>
            <h1>h1 title</h1>
          </>
        }
        bodyCode={blogPost.body.code}
        footer={
          <>
            <p>footer</p>
          </>
        }
      />
    </Layout>
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
