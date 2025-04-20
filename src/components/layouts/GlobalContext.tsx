import { createContext } from "react"

import { PreferedTheme } from "@/types"

type GlobalContextProps = {
  test: string
  hasRightDrawer: boolean
  isRightDrawerOpen: boolean
  handleRightDrawer: { open: () => void; close: () => void }
  preferredTheme: PreferedTheme
  setPreferredTheme: (arg0: PreferedTheme) => void
  isLeftDrawerAlwaysCollapsed: boolean
  setIsLeftDrawerAlwaysCollapsed: (arg0: boolean) => void
  isRightDrawerAlwaysCollapsed: boolean
  setIsRightDrawerAlwaysCollapsed: (arg0: boolean) => void
  leftDrawerWidth: number
  setLeftDrawerWidth: (arg0: number) => void
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
  leftDrawerWidth: 320,
  setLeftDrawerWidth: () => {},
})

export default GlobalContext
