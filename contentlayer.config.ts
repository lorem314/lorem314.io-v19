// import { defineDocumentType, makeSource } from "contentlayer/source-files"
import { defineDocumentType, makeSource } from "contentlayer2/source-files"
import { remarkCodeHike } from "codehike/mdx"

const BlogPost = defineDocumentType(() => {
  console.log("define document type")
  return {
    name: "BlogPost",
    contentType: "mdx",
    filePathPattern: "blogs/**/index.mdx",
    fields: {
      title: { type: "string", required: true },
      tags: { type: "list", of: { type: "string" }, default: [] },
      date: { type: "date", required: true },
    },
  }
})

export default makeSource({
  contentDirPath: "published",
  documentTypes: [BlogPost],
  mdx: {
    remarkPlugins: [[remarkCodeHike, { components: { code: "CodeHikePre" } }]],
  },
})
