import { useState } from 'react'

export default function useLocalStorage(key: string, initialValue: any) {
  const [item, setStoredItem] = useState(() => {
    try {
      const localStorage = window.localStorage.getItem(key)
      return localStorage ? JSON.parse(localStorage) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setItem = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(item) : value
      setStoredItem(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  const removeItem = () => {
    try {
      setStoredItem(initialValue)
      window.localStorage.removeItem(key)
    } catch (error) {
      console.log(error)
    }
  }

  return { item, setItem, removeItem }
}
