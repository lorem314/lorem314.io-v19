import { BiSolidArrowToTop } from "react-icons/bi"
import { MdFullscreen, MdFullscreenExit } from "react-icons/md"

export default function Actions() {
  return (
    <div className="flex flex-col gap-2.5">
      {Array(3)
        .fill(null)
        .map((_, index) => {
          return (
            <button className="bg-content-bg size-8 rounded shadow" key={index}>
              <BiSolidArrowToTop />
            </button>
          )
        })}
    </div>
  )
}
