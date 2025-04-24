// import { defineDocumentType, makeSource } from "contentlayer/source-files"
import { defineDocumentType, makeSource } from "contentlayer2/source-files"
import { remarkCodeHike } from "codehike/mdx"

import getMdxMeta from "@/utils/getMdxMeta"

const BlogPost = defineDocumentType(() => {
  return {
    name: "BlogPost",
    contentType: "mdx",
    filePathPattern: "blog-posts/**/index.mdx",
    fields: {
      title: { type: "string", required: true },
      tags: { type: "list", of: { type: "string" }, default: [] },
      date: { type: "date", required: true },
    },
    computedFields: {
      meta: {
        type: "json",
        resolve: async (doc) => getMdxMeta(doc.body.raw),
      },
    },
  }
})

const BookCover = defineDocumentType(() => {
  return {
    name: "BookCover",
    contentType: "mdx",
    filePathPattern: "book-covers/**/index.mdx",
    fields: {
      isbn: { type: "string", required: true },
      title: { type: "string", required: true },
      subtitle: { type: "string", required: true },
    },
  }
})

const BookChapter = defineDocumentType(() => ({
  name: "BookChapter",
  contentType: "mdx",
  // 注意 /**/ 会匹配一或多个文件夹
  filePathPattern: "book-chapters/**/index.mdx",
  fields: {
    isbn: { type: "string", required: true },
    chapter: { type: "number", required: true },
    title: { type: "string", required: true },
  },
  computedFields: {
    meta: {
      type: "json",
      resolve: async (doc) => getMdxMeta(doc.body.raw),
    },
  },
}))

export default makeSource({
  contentDirPath: "published",
  documentTypes: [BlogPost, BookCover, BookChapter],
  mdx: {
    remarkPlugins: [[remarkCodeHike, { components: { code: "CodeHikePre" } }]],
  },
})
