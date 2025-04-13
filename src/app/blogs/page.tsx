import { redirect } from "next/navigation"
import { allBlogPosts, type BlogPost } from "contentlayer/generated"

import Form from "@/components/blog/Form"
import BlogPostList from "@/components/blog/BlogPostList"
import AllTags from "@/components/blog/AllTags"

import Layout from "@/components/blog/Layout"

import type { Tag } from "@/types"

const expectedSearchParams = ["query", "tags"]

export default async function PageBlogs({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const allTags = collectAllTags(allBlogPosts)
  const allTagNames = allTags.map((tag) => tag.name)
  const awaitedSearchParams = await searchParams

  // console.log("---------------------------------")

  // console.log("awaitedSearchParams ", awaitedSearchParams)
  // console.log("tags ", awaitedSearchParams.tags)
  // console.log("query ", awaitedSearchParams.query)

  // const tags = awaitedSearchParams.tags
  // const query = awaitedSearchParams.query

  const flag = { shouldRedirect: false }

  const initSearchParams = Object.entries(awaitedSearchParams).reduce(
    (prevSearchParams, [key, value]) => {
      switch (key) {
        case "tags":
          if (!expectedSearchParams.includes(key)) {
            // unknown search param, just leave it
            flag.shouldRedirect = true
            return { ...prevSearchParams }
          }
          if (!value) {
            // expected param, but no value, like `q` in `?q=&t=1`
            flag.shouldRedirect = true
            return { ...prevSearchParams }
          } else if (Array.isArray(value)) {
            // string[] - remove duplicated element
            const arr = value
              .join(" ")
              .split(" ")
              .filter((tagName) => {
                const isExpectedTagName = allTagNames.includes(tagName)
                if (!isExpectedTagName) flag.shouldRedirect = true
                return isExpectedTagName
              })
            const set = new Set(arr)
            if (arr.length !== set.size) flag.shouldRedirect = true
            return {
              ...prevSearchParams,
              [key]: Array.from(set).join(" "),
            }
          } else {
            // string
            const arr = value.split(" ").filter((tagName) => {
              const isExpectedTagName = allTagNames.includes(tagName)
              if (!isExpectedTagName) flag.shouldRedirect = true
              return isExpectedTagName
            })
            const set = new Set(arr)
            if (arr.length !== set.size) flag.shouldRedirect = true
            return {
              ...prevSearchParams,
              [key]: Array.from(set).join(" "),
            }
          }
        case "query":
          // handle multiple cases like `tags`
          return { ...prevSearchParams, [key]: value }
        default:
          flag.shouldRedirect = true
          return { ...prevSearchParams }
      }
    },
    {},
  )

  console.log("initSearchParams", initSearchParams)

  if (flag.shouldRedirect) {
    console.log("should redirect")
    flag.shouldRedirect = false
    const params = new URLSearchParams(initSearchParams)
    redirect(`/blogs?${params.toString()}`)
  }

  return (
    <Layout allTags={allTags}>
      <>
        <h2 className="card-label">博客(999)</h2>
        <BlogPostList blogPosts={allBlogPosts} />
      </>
    </Layout>
  )
}

const collectAllTags = (blogs: BlogPost[]) => {
  const tags: Tag[] = []
  blogs.forEach((blog) => {
    blog.tags.forEach((tagName) => {
      const targetTag = tags.find((tag) => tag.name === tagName)
      if (!targetTag) tags.push({ name: tagName, count: 1 })
      else targetTag.count++
    })
  })
  return tags
}
