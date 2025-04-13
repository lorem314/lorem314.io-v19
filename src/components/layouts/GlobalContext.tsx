import { createContext } from "react"

type GlobalContextProps = {
  test: string
  hasRightDrawer: boolean
  isRightDrawerOpen: boolean
  handleRightDrawer: { open: () => void; close: () => void }
}

const GlobalContext = createContext<GlobalContextProps>({
  test: "ok",
  hasRightDrawer: false,
  isRightDrawerOpen: false,
  handleRightDrawer: { open: () => {}, close: () => {} },
})

export default GlobalContext
