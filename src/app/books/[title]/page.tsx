import { allBookCovers, allBookChapters } from "contentlayer/generated"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default async function PageBookCover({
  params,
}: {
  params: Promise<{ title: string }>
}) {
  const awaitedParams = await params
  const decodedTitle = decodeURIComponent(awaitedParams.title)

  const bookCover = allBookCovers.find((bookCover) => {
    return bookCover.title === decodedTitle
  })

  if (!bookCover) {
    return <div>book cover not found</div>
  }

  const chapters = allBookChapters
    .filter((chapter) => chapter.isbn === bookCover.isbn)
    .sort(
      (prevChapter, nextChapter) => prevChapter.chapter - nextChapter.chapter,
    )

  return (
    <section className="page-content mx-auto my-8 max-w-2xl">
      <h2 className="content-title flex justify-between">
        <span>{bookCover.title}</span>
        <span className="text-base">{bookCover.subtitle}</span>
      </h2>

      <article className="flex flex-col items-center gap-2.5 p-2.5 sm:grid sm:grid-cols-2 sm:items-start">
        <div className="col-span-2 sm:col-span-1">
          <Image
            src={`/books/${bookCover.title}/cover.jpg`}
            alt={`${bookCover}的封面`}
            width={250}
            height={328}
          />
        </div>

        <header className="col-span-2 p-4 sm:col-span-1">
          <h3 className="text-xl font-bold">{bookCover.title}</h3>
          <h4 className="my-2 text-lg">{bookCover.subtitle}</h4>
        </header>

        <footer className="col-span-2 mt-4 flex justify-center">
          <ul>
            {chapters.map((chapter) => {
              return (
                <li className="font-bold" key={chapter._id}>
                  <Link
                    className="text-link-color"
                    href={`/books/${bookCover.title}/第${chapter.chapter}章`}
                  >
                    第 {chapter.chapter} 章 - {chapter.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </footer>
      </article>

      {/* <p className="text-red-400 sm:text-green-400">color</p> */}
    </section>
  )
}
