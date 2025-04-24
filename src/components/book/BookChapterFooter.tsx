import Link from "next/link"

import { BookChapter } from "contentlayer/generated"

export default function BookChapterFooter({
  prevChapter,
  nextChapter,
}: {
  prevChapter?: BookChapter
  nextChapter?: BookChapter
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-left">
          {prevChapter ? (
            <div>
              <div>上一章</div>
              <div className="text-xl font-bold">
                <Link href="/">{prevChapter.title}</Link>
              </div>
            </div>
          ) : (
            <p>没有了</p>
          )}
        </div>
        <div className="text-right">
          {nextChapter ? (
            <div>
              <div>下一章</div>
              <div className="text-xl font-bold">
                <Link href="/">{nextChapter.title}</Link>
              </div>
            </div>
          ) : (
            <p>没有了</p>
          )}
        </div>
      </div>
    </>
  )
}
