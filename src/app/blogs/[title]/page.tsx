import { notFound } from "next/navigation"
import { allBlogPosts } from "contentlayer/generated"

import Layout from "@/components/article/Layout"
import Article from "@/components/article/Article"
import Tags from "@/components/blog/Tags"

export default async function Page({
  params,
}: {
  params: Promise<{ title: string }>
}) {
  const awaitedParams = await params
  const decodedTitle = decodeURIComponent(awaitedParams.title)

  const blogPost = allBlogPosts.find(
    (blogPost) => blogPost.title === decodedTitle,
  )

  if (!blogPost) {
    console.log("not found")
    return <div>not found</div>
  }

  console.log("blogPost", blogPost._raw.flattenedPath)

  return (
    <Layout title={blogPost.title} toc={blogPost.meta.toc}>
      <Article
        header={
          <>
            <h1 className="text-[1.625rem]">{blogPost.title}</h1>
            <div>
              <Tags tags={blogPost.tags} />
            </div>
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
