import { useState } from "react"

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (arg0: T) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue

    try {
      const item = window.localStorage.getItem(key)
      if (!item) {
        window.localStorage.setItem(key, JSON.stringify(initialValue))
        return initialValue
      } else {
        return JSON.parse(item) as T
      }
    } catch (error) {
      console.error("[useLocalStorage] useState :", error)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error("[useLocalStorage] setValue :", error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
