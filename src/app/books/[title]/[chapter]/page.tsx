import { allBookCovers, allBookChapters } from "contentlayer/generated"

import Layout from "@/components/article/Layout"
import Article from "@/components/article/Article"

export default async function PageBookChapter({
  params,
}: {
  params: Promise<{ title: string; chapter: string }>
}) {
  const awaitedParams = await params
  const decodedTitle = decodeURIComponent(awaitedParams.title)
  const decodedChapter = decodeURIComponent(awaitedParams.chapter)

  const bookCover = allBookCovers.find(
    (bookCover) => bookCover.title === decodedTitle,
  )

  // console.log("bookCover", bookCover)
  if (!bookCover) {
    return <div>not found</div>
  }

  const bookChapter = allBookChapters.find(
    (bookChapter) =>
      bookChapter.isbn === bookCover.isbn &&
      `第${bookChapter.chapter}章` === decodedChapter,
  )

  if (!bookChapter) {
    return <div>not found</div>
  }

  // console.log("bookChapter", bookChapter)

  console.log("bookChapter toc", bookChapter.meta.toc)

  return (
    <Layout title={bookChapter.title} toc={bookChapter.meta.toc}>
      <Article
        header={
          <>
            <h1>header title</h1>
          </>
        }
        bodyCode={bookChapter.body.code}
        footer={
          <>
            <p>footer</p>
          </>
        }
      />
      {/* <p>title : {decodedTitle}</p>
      <p>chapter : {decodedChapter}</p> */}
    </Layout>
  )
}
