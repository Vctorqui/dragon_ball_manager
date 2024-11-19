import React, { createContext, useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import localforage from 'localforage'

interface LoginFormInit {
  email: string
  password: string
  name: string
}

interface UserContextType {
  isLogin: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  toggleLoginMode: () => void
  currentUser: { email: string; name: string } | null
}

const UserContext = createContext<UserContextType | any>(null)

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [currentUser, setCurrentUser] = useState<{
    email: string
    name: string
  } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadCurrentUser = async () => {
      const user = await localforage.getItem<{ email: string; name: string }>(
        'currentUser'
      )
      if (user) {
        setCurrentUser(user)
      }
    }
    loadCurrentUser()
  }, [])

  const login = async (email: string, password: string) => {
    const users = (await localforage.getItem<LoginFormInit[]>('users')) || []
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      await localforage.setItem('currentUser', {
        email: user.email,
        name: user.name,
      })
      setCurrentUser({ email: user.email, name: user.name })
      router.push('dashboard')
    } else {
      alert('Invalid credentials')
    }
  }

  const register = async (email: string, password: string, name: string) => {
    const users = (await localforage.getItem<LoginFormInit[]>('users')) || []
    await localforage.setItem('users', [...users, { email, password, name }])
    setIsLogin(true)
  }

  const logout = async () => {
    setCurrentUser(null)
    await localforage.removeItem('currentUser')
  }

  const toggleLoginMode = () => {
    setIsLogin(!isLogin)
  }

  const globalState = {
    isLogin,
    login,
    logout,
    register,
    toggleLoginMode,
    currentUser,
  }

  return (
    <UserContext.Provider value={globalState}>{children}</UserContext.Provider>
  )
}

export { UserProvider }
export default UserContext
