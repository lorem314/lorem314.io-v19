import Image from "next/image"

export default function Home() {
  return (
    <div className="mx-auto my-8 max-w-2xl rounded bg-neutral-50 p-2.5 shadow">
      <h1 className="text-primary">home page</h1>
      <div>
        {Array(50)
          .fill(null)
          .map((item, index) => {
            return (
              <div key={index}>
                <p className="text-red-400 dark:text-green-400">
                  {index} Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Facilis, sed.
                </p>
              </div>
            )
          })}
      </div>
    </div>
  )
}
