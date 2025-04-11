import { redirect } from "next/navigation"

import { allBlogPosts, type BlogPost } from "contentlayer/generated"

import Form from "@/components/blog/Form"
import BlogPostList from "@/components/blog/BlogPostList"
import AllTags from "@/components/blog/AllTags"

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

  console.log("---------------------------------")

  console.log("awaitedSearchParams ", awaitedSearchParams)
  console.log("tags ", awaitedSearchParams.tags)
  console.log("query ", awaitedSearchParams.query)

  const tags = awaitedSearchParams.tags
  const query = awaitedSearchParams.query

  const flag = { shouldRedirect: false }

  const initSearchParams = Object.entries(awaitedSearchParams).reduce(
    (prevSearchParams, [key, value]) => {
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
    },
    {},
  )

  console.log("initSearchParams", initSearchParams)

  // let selectedTagNames: string[] = []

  // if (tags) {
  //   if (Array.isArray(tags)) {
  //     // two `tags` in searchParams, need to merge then redirect
  //     selectedTagNames = tags.join(" ").split(" ")
  //     flags.shouldRedirect = true
  //     // selectedTagNames = tags.join(" ").split(" ")
  //     // const tagsSet = new Set(selectedTagNames)
  //     // if (tagsSet.size !== selectedTagNames.length) {
  //     //   console.log("[blogs/page.tsx] duplicate tagName detected")
  //     //   const params = new URLSearchParams({
  //     //     tags: selectedTagNames.join(" "),
  //     //     query: "",
  //     //   })
  //     //   redirect(`/blogs?${params.toString()}`)
  //     // }
  //   } else {
  //     // selectedTagNames = tags.split(" ")
  //     selectedTagNames = tags.split(" ")
  //   }
  // }
  // const selectedTagNamesSet = new Set(selectedTagNames)

  // if (selectedTagNamesSet.size !== selectedTagNames.length) {
  //   selectedTagNames = Array.from(selectedTagNamesSet)
  //   flags.shouldRedirect = true
  // }

  // console.log("selectedTagNames ", selectedTagNames)

  if (flag.shouldRedirect) {
    console.log("should redirect")
    flag.shouldRedirect = false
    const params = new URLSearchParams(initSearchParams)
    redirect(`/blogs?${params.toString()}`)
  }

  // remove not existed tags in url searchParams

  return (
    <div className="mx-auto my-8 grid max-w-6xl grid-cols-8 gap-2.5">
      <section className="card col-span-8 gap-2.5">
        <Form allTags={allTags} />
      </section>
      <section className="card col-span-5">
        <h2 className="card-label">博客(999)</h2>
        <BlogPostList blogPosts={allBlogPosts} />
      </section>
      <section className="card col-span-3">
        <h2 className="card-label">所有标签(99)</h2>
        <AllTags allTags={allTags} />
      </section>
    </div>
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
