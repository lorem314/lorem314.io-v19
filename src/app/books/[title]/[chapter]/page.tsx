import { allBookCovers, allBookChapters } from "contentlayer/generated"

import Layout from "@/components/article/Layout"
import Article from "@/components/article/Article"

import { H1 } from "@/components/elements/headings"
import BookChapterFooter from "@/components/book/BookChapterFooter"

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
  // console.log("bookChapter toc", bookChapter.meta.toc)
  const chapters = allBookChapters
    .filter((chapter) => chapter.isbn === bookCover.isbn)
    .sort((prev, next) => prev.chapter - next.chapter)

  // console.log("chapters ", chapters)
  const prevChapter = chapters[bookChapter.chapter - 2]
  const nextChapter = chapters[bookChapter.chapter]

  // console.log("prevChapter", prevChapter)
  // console.log("nextChapter", nextChapter)

  return (
    <Layout title={bookChapter.title} toc={bookChapter.meta.toc}>
      <Article
        header={
          <>
            <div className="mb-1 border-b border-neutral-500 pb-1 text-right text-[1.5rem] font-bold">
              第 {bookChapter.chapter} 章
            </div>
            <h1 className="text-right text-[1.75rem] font-bold">
              {bookChapter.title}
            </h1>
          </>
        }
        bodyCode={bookChapter.body.code}
        footer={
          <BookChapterFooter
            prevChapter={prevChapter}
            nextChapter={nextChapter}
          />
        }
      />
    </Layout>
  )
}
