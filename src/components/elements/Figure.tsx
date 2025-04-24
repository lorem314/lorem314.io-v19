const Figure = ({
  src,
  title,
  id,
}: {
  src: string
  title?: string
  id?: string
}) => {
  const alt = `图片${id ? ` ${id}` : ""}${title ? ` ${title}` : ""}`
  return (
    <figure className="my-4" id={id ? `图片${id}` : undefined}>
      <img className="mx-auto" width="auto" src={src} alt={alt} />
      {title ? (
        <figcaption className="mt-1 text-center text-neutral-500">
          {id ? `图片 ${id} ` : null} {title}
        </figcaption>
      ) : null}
    </figure>
  )
}

export default Figure
