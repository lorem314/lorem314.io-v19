export type Placement4 = "top" | "left" | "right" | "bottom"

export type Placement8 =
  | Placement4
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

export type Tag = {
  name: string
  count: number
}

export type TocItem = {
  title: string
  items: TocItem[] | null
}

export type Toc = {
  items: TocItem[]
}

export type PreferedTheme = "system" | "light" | "dark"
