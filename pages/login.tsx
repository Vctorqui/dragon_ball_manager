import StylizedInput from '@/components/ui/InputStyled'
import { useAuth } from '@/contexts/UserContext'
import { loginFormTypes } from '@/types/types'
import { loginFormInit } from '@/utils/const'
import { Box, Button } from '@mui/material'
import React, { useState } from 'react'

const UserLogForm = () => {
  const { isLogin, login, register, toggleLoginMode } = useAuth()
  const [formLogin, setFormLogin] = useState<loginFormTypes>(loginFormInit)

  const handleChange = (event: any) => {
    let { name, value } = event.target
    setFormLogin({
      ...formLogin,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      await login(formLogin.email, formLogin.password)
    } else {
      await register(formLogin.email, formLogin.password, formLogin.name)
    }
  }

  return (
    <Box component='form' onSubmit={handleSubmit}>
      {!isLogin && (
        <StylizedInput
          name='name'
          value={formLogin.name}
          onChange={handleChange}
          placeholder='Name'
          required
        />
      )}
      <StylizedInput
        name='email'
        value={formLogin.email}
        onChange={handleChange}
        placeholder='Email'
        required
      />
      <StylizedInput
        name='password'
        value={formLogin.password}
        onChange={handleChange}
        placeholder='Password'
        required
      />
      <Button type='submit'>{isLogin ? 'Login' : 'Register'}</Button>
      <Button onClick={toggleLoginMode}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </Button>
    </Box>
  )
}

export default UserLogForm
