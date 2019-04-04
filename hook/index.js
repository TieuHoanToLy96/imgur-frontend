import { useState } from "react"

export const useInput = (initValue) => {
  const [value, setValue] = useState(initValue)
  const onChange = e => {
    let v = e.target ? e.target.value || "" : e
    setValue(v) 
  }
  return [value, onChange]
}