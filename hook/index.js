import { useState, useEffect } from "react"

export const useInput = (initValue) => {
  const [value, setValue] = useState(initValue)
  const onChange = e => {
    let v = e.target ? e.target.value || "" : e
    setValue(v)
  }
  return [value, onChange]
}

export const useDebounce = (value = "", delay) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => { clearTimeout(handler) }
  }, [value])

  return debounceValue
}