import { IoMdSearch } from "react-icons/io"

export default function Search() {
  return (
    <div className="flex grow-1 justify-end sm:justify-center">
      <button className="bg-misc-button-bg hover:bg-misc-button-hover-bg flex items-center rounded p-2 active:bg-[rgba(0,0,0,0.25)] sm:basis-md sm:justify-between sm:gap-1.5 sm:rounded-full sm:px-2.5 sm:py-1.5">
        <IoMdSearch />
        <span className="hidden grow sm:flex sm:items-center sm:justify-between sm:text-xs">
          <span>搜索</span>
          <span className="flex gap-1.5 font-bold">
            <kbd>Ctrl</kbd>
            <kbd>K</kbd>
          </span>
        </span>
      </button>
    </div>
  )
}
