"use client"

import { useState, useContext } from "react"

import { IoMdRefresh } from "react-icons/io"

import RangeInput from "@/components/ui/RangeInput"
import GlobalContext from "@/components/layouts/GlobalContext"

import { PreferedTheme } from "@/types"

export default function PageSetting() {
  const {
    preferredTheme,
    setPreferredTheme,
    isLeftDrawerAlwaysCollapsed,
    setIsLeftDrawerAlwaysCollapsed,
    isRightDrawerAlwaysCollapsed,
    setIsRightDrawerAlwaysCollapsed,
    leftDrawerWidth,
    setLeftDrawerWidth,
  } = useContext(GlobalContext)

  const [value, setValue] = useState(100)

  return (
    <div className="page-content mx-auto my-8 max-w-3xl">
      <div className="content-title">设置</div>

      <label className="flex items-center gap-2.5" htmlFor="preferred-theme">
        <span>主题</span>
        <select
          id="preferred-theme"
          value={preferredTheme}
          onChange={(event) => {
            setPreferredTheme(event.target.value as PreferedTheme)
          }}
        >
          <option value="system">系统</option>
          <option value="light">白天</option>
          <option value="dark">黑夜</option>
        </select>
      </label>

      <label
        className="my-2 flex items-center gap-2.5"
        htmlFor="is-left-drawer-always-collapsed"
      >
        <input
          type="checkbox"
          id="is-left-drawer-always-collapsed"
          checked={isLeftDrawerAlwaysCollapsed}
          onChange={(event) => {
            setIsLeftDrawerAlwaysCollapsed(event.target.checked)
          }}
        />
        <span className="">总是折叠左侧抽屉</span>
      </label>

      <label
        className="my-2 flex items-center gap-2.5"
        htmlFor="is-right-drawer-always-collapsed"
      >
        <input
          type="checkbox"
          id="is-right-drawer-always-collapsed"
          checked={isRightDrawerAlwaysCollapsed}
          onChange={(event) => {
            setIsRightDrawerAlwaysCollapsed(event.target.checked)
          }}
        />
        <span className="">总是折叠右侧抽屉</span>
      </label>

      <label
        className="my-2 flex items-center gap-2.5"
        // htmlFor="left-drawer-width-slider"
      >
        <span>左侧抽屉宽度</span>
        <RangeInput
          value={leftDrawerWidth}
          min={300}
          max={500}
          step={10}
          onChange={setLeftDrawerWidth}
        />
        <button
          className="opacity-50 hover:opacity-100"
          onClick={() => setLeftDrawerWidth(320)}
        >
          <IoMdRefresh />
        </button>
      </label>

      <div className="my-8">
        <RangeInput
          value={value}
          min={0}
          max={999}
          step={10}
          onChange={(newValue) => {
            setValue(newValue)
          }}
        />
      </div>
    </div>
  )
}
