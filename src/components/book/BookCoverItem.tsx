import { memo } from "react"
import Link from "next/link"
import Image from "next/image"

import type { BookCover, BookChapter } from "contentlayer/generated"

const BookCoverItem = ({
  bookCover,
  chapters,
}: {
  bookCover: BookCover
  chapters: BookChapter[]
}) => {
  console.log(`${bookCover.title} chapters`, chapters)
  return (
    <article>
      <header>
        <h3 className="text-xl font-bold">
          <Link href={`/books/${bookCover.title}`}>{bookCover.title}</Link>
        </h3>
        <h4 className="my-2 text-lg">{bookCover.subtitle}</h4>
      </header>
      <Image
        src={`/books/${bookCover.title}/cover.jpg`}
        alt={`${bookCover}的封面`}
        width={250}
        height={328}
      />
      <footer className="my-2">
        <ul>
          {chapters
            .sort(
              (prevChapter, nextChapter) =>
                prevChapter.chapter - nextChapter.chapter,
            )
            .map((chapter) => {
              return (
                <li key={chapter._id}>
                  第 {chapter.chapter} 章 - {chapter.title}
                </li>
              )
            })}
        </ul>
      </footer>
    </article>
  )
}

export default BookCoverItem
