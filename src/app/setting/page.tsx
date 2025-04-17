"use client"

import { useState, useContext } from "react"

import RangeInput from "@/components/ui/RangeInput"
import GlobalContext from "@/components/layouts/GlobalContext"

export default function PageSetting() {
  const {
    preferredTheme,
    setPreferredTheme,
    isLeftDrawerAlwaysCollapsed,
    setIsLeftDrawerAlwaysCollapsed,
    isRightDrawerAlwaysCollapsed,
    setIsRightDrawerAlwaysCollapsed,
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
            console.log("event", event.target.value)
            setPreferredTheme(event.target.value)
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
