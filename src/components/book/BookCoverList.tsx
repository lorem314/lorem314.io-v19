import { allBookChapters } from "contentlayer/generated"
import type { BookCover } from "contentlayer/generated"

import BookCoverItem from "./BookCoverItem"

import { ObjectGroupBy } from "@/utils"

export default function BookCoverList({
  bookCovers,
}: {
  bookCovers: BookCover[]
}) {
  const chaptersByIsbn = ObjectGroupBy(
    allBookChapters,
    (chapter) => chapter.isbn,
  )

  return (
    <ul className="grid grid-cols-1 gap-2.5 p-2.5 sm:grid-cols-2">
      {bookCovers.map((bookCover) => {
        return (
          <li className="flex flex-col items-center" key={bookCover._id}>
            <BookCoverItem
              bookCover={bookCover}
              chapters={chaptersByIsbn[bookCover.isbn]}
            />
          </li>
        )
      })}
    </ul>
  )
}
