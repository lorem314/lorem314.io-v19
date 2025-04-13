import type { RawCode } from "codehike/code"
import { Pre, highlight } from "codehike/code"

export default async function CodeHikePre({
  codeblock,
}: {
  codeblock: RawCode
}) {
  const highlighted = await highlight(codeblock, "github-light")

  return (
    <div>
      <p>code hike pre title</p>
      <div className="overflow-auto">
        <Pre code={highlighted} />
      </div>
    </div>
  )
}
