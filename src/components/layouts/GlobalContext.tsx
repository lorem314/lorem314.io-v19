import { createContext } from "react"

type GlobalContextProps = {
  test: string
  hasRightDrawer: boolean
  isRightDrawerOpen: boolean
  handleRightDrawer: { open: () => void; close: () => void }
  preferredTheme: string
  setPreferredTheme: (arg0: string) => void
  isLeftDrawerAlwaysCollapsed: boolean
  setIsLeftDrawerAlwaysCollapsed: (arg0: boolean) => void
  isRightDrawerAlwaysCollapsed: boolean
  setIsRightDrawerAlwaysCollapsed: (arg0: boolean) => void
}

const GlobalContext = createContext<GlobalContextProps>({
  test: "ok",
  hasRightDrawer: false,
  isRightDrawerOpen: false,
  handleRightDrawer: { open: () => {}, close: () => {} },
  preferredTheme: "system",
  setPreferredTheme: () => {},
  isLeftDrawerAlwaysCollapsed: false,
  setIsLeftDrawerAlwaysCollapsed: () => {},
  isRightDrawerAlwaysCollapsed: false,
  setIsRightDrawerAlwaysCollapsed: () => {},
})

export default GlobalContext
