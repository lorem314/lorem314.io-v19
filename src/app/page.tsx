import Image from "next/image"

import Details from "@/components/elements/Details"
import CodeHikePre from "@/components/elements/CodeHikePre"

const codeValue = `const str = "this is a string"
const fn = (name) => {
  console.log("hello", name)
}
`

export default function Home() {
  return (
    <div className="page-content mx-auto my-8 max-w-2xl">
      <h2 className="content-title">主页</h2>

      <p className="text-[1.5rem]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis
        laudantium atque unde ad?
      </p>

      {Array(8)
        .fill(null)
        .map((_, index) => {
          return (
            <div
              key={index}
              style={{
                fontSize: `${1 + index * 0.125}rem`,
                margin: "1rem 0",
                fontWeight: "bold",
              }}
            >
              [{`${1 + index * 0.125}rem`}] Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Voluptatem, porro.
            </div>
          )
        })}

      <Details isOpen={true}>
        <div>details title</div>
        <div>
          <p>details content</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            atque, ipsa cupiditate amet quae eos dolorem, temporibus quasi
            voluptas aliquam repellendus eligendi autem facilis beatae
            voluptatibus distinctio impedit fuga aspernatur.
          </p>
        </div>
      </Details>

      <CodeHikePre codeblock={{ value: codeValue, lang: "js", meta: "" }} />

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
