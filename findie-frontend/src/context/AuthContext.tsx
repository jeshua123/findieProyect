import { useState, createContext, useEffect } from 'react'
import { IUser } from '../models/IUser'
import useLocalStorage from '../customHooks/useLocalStorage'

type TAuthContextProps = {
  userLogged: IUser | undefined
  isLogged: boolean
  login: (e: IUser | undefined) => void
  logout: () => void
  isUserAllowed: (e: string[] | undefined) => boolean
}
const AuthContext: React.Context<TAuthContextProps> = createContext<TAuthContextProps>({
  userLogged: null!!,
  isLogged: null!!,
  login: null!!,
  logout: null!!,
  isUserAllowed: null!!,
})

const AuthContextProvider: React.FC = (props) => {
  const storage = useLocalStorage('userLogged', {})
  const userLoggedDEsafultValue = storage.item?._id ? storage.item : undefined
  const [userLogged, setUserLogged] = useState<IUser | undefined>(userLoggedDEsafultValue)
  const [isLogged, setIsLogged] = useState<boolean>(storage.item?._id ? true : false)

  const login = (user: IUser | undefined) => {
    setUserLogged(user)
    setIsLogged(true)
  }

  const logout = () => {
    setUserLogged(undefined)
    setIsLogged(false)
  }

  const isUserAllowed = (userType: string[] | undefined) => {
    if (!userLogged?.user_type || !isLogged) return false
    return userType ? userType.includes(userLogged.user_type) : false
  }

  useEffect(() => {
    storage.setItem(userLogged)
  }, [userLogged])

  return (
    <AuthContext.Provider value={{ userLogged, isLogged, login, logout, isUserAllowed }}>{props.children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
