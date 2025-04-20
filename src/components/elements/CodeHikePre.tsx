import { Pre, highlight } from "codehike/code"
import type { RawCode } from "codehike/code"

export default async function CodeHikePre({
  codeblock,
}: {
  codeblock: RawCode
}) {
  const highlighted = await highlight(codeblock, "github-light")

  return (
    <div className="my-8">
      <div className="border border-neutral-400 p-2.5 font-bold first:rounded-t-md">
        code hike pre title
      </div>
      <div className="overflow-auto rounded-b-md border border-t-0 border-neutral-400 p-2.5">
        <Pre code={highlighted} />
      </div>
    </div>
  )
}
