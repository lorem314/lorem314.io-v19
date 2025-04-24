import React, { ReactNode } from "react"

const Table = ({
  id,
  title,
  children,
}: {
  id?: string
  title?: string
  children: ReactNode
}) => {
  return (
    <div className="relative overflow-x-auto">
      <table
        className="mx-auto my-4"
        id={id ? `表格${id}${title || ""}` : undefined}
      >
        {title ? (
          <caption className="mb-2">
            {id ? `表格 ${id} ` : ""}
            {title}
          </caption>
        ) : null}
        {children}
      </table>
    </div>
  )
}

export default Table

type Td = string | number
type Th = Td

export const Thead = ({ ths }: { ths: Th[] }) => {
  return (
    <thead>
      <tr className="bg-gray-100 transition-colors dark:bg-gray-700">
        {ths.map((th, index) => (
          <th key={index} scope="col">
            {th}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export const Tbody = ({ children }: { children: ReactNode }) => {
  return <tbody>{children}</tbody>
}

export const Tr = ({ th, tds }: { th?: Td; tds: Td[] }) => {
  return (
    <tr className="border-b bg-white transition-colors dark:border-gray-700 dark:bg-gray-800">
      {th ? (
        <th className="" scope="row">
          {th}
        </th>
      ) : null}
      {tds.map((td, index) => (
        <td key={index}>{td}</td>
      ))}
    </tr>
  )
}
