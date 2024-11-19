import React, { createContext, useState, ReactNode, useEffect } from 'react'
import localforage from 'localforage'

interface User {
  id: string
  email: string
  password?: string
  name: string
}

interface UserContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  toggleLoginMode: () => void
}

const UserContext = createContext<UserContextType | any>(null)

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadCurrentUser = async () => {
      const savedUser = await localforage.getItem<User>('currentUser')
      if (savedUser) {
        setUser(savedUser)
      }
    }
    loadCurrentUser()
  }, [])

  const login = async (email: string, password: string) => {
    const users = (await localforage.getItem<User[]>('users')) || []
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) {
      throw new Error('Invalid credentials')
    }
    const { password: _, ...userWithoutPassword } = user
    setUser(userWithoutPassword)
    await localforage.setItem('user', userWithoutPassword)
  }

  const register = async (name: string, email: string, password: string) => {
    const users = (await localforage.getItem<User[]>('users')) || []
    if (users.some((u) => u.email === email)) {
      throw new Error('Email already exists')
    }
    const newUser = {
      id: Math.random().toString(36).slice(2, 9),
      name,
      email,
      password,
    }
    await localforage.setItem('users', [...users, newUser])
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    await localforage.setItem('user', userWithoutPassword)
  }

  const logout = async () => {
    setUser(null)
    await localforage.removeItem('user')
  }

  const globalState = {
    user,
    login,
    logout,
    register,
  }

  return (
    <UserContext.Provider value={globalState}>{children}</UserContext.Provider>
  )
}

export { UserProvider }
export default UserContext
