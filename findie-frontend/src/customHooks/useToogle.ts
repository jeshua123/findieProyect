import { useState } from 'react'

function useToogle() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const setToogle = () => {
    setIsOpen((prev) => !prev)
  }

  return { isOpen, setToogle }
}

export default useToogle
