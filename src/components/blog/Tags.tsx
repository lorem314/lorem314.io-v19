export default function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-2.5">
      {tags.map((tag, index) => {
        return (
          <li
            key={index}
            className="border-label-border-color rounded border px-2.5 py-1.5"
          >
            {tag}
          </li>
        )
      })}
    </ul>
  )
}
