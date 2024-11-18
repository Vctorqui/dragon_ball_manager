// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'
import localforage from 'localforage'

interface LoginFormInit {
  email: string
  password: string
  name: string
}
// const loginFormInit: LoginFormInit = { email: '', password: '', name: '' }

interface UserContextType {
  isLogin: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  toggleLoginMode: () => void
  currentUser: { email: string; name: string } | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [currentUser, setCurrentUser] = useState<{
    email: string
    name: string
  } | null>(null)
  const router = useRouter()

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
    await localforage.removeItem('user')
  }

  const toggleLoginMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <UserContext.Provider
      value={{ isLogin, login, logout, register, toggleLoginMode, currentUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
