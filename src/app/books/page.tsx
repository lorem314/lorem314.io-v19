import { allBookCovers, allBookChapters } from "contentlayer/generated"

import BookCoverList from "@/components/book/BookCoverList"

export default function PageBooks() {
  // console.log("allBookCovers", allBookCovers)
  // console.log("allBookChapters", allBookChapters)

  return (
    <div className="page-content mx-auto my-8 max-w-4xl">
      <h2 className="content-title">书籍</h2>
      <BookCoverList bookCovers={allBookCovers} />
      {/* <ul>
        {allBookCovers.map((bookCover, index) => {
          return <li key={index}>{bookCover.title}</li>
        })}
      </ul> */}
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: "书籍 | lorem314.io-v19",
  }
}
