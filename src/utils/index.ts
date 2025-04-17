import { allBlogPosts, type BlogPost } from "contentlayer/generated"

import type { Tag } from "@/types"

export const collectAllTags = (blogs: BlogPost[]) => {
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

export const ObjectGroupBy = <T>(
  items: T[],
  callbackFn: (arg0: T) => string | symbol,
) => {
  return items.reduce((obj: { [key: string | symbol]: T[] }, item: T) => {
    const key = callbackFn(item)
    if (!obj[key]) obj[key] = []
    obj[key].push(item)
    return obj
  }, {})
}
