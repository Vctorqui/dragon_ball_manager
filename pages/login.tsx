import StylizedInput from '@/components/ui/InputStyled'
import UserContext from '@/contexts/UserContext'
import { Layout } from '@/layouts/Layout'

import { loginFormTypes } from '@/types/types'
import { loginFormInit } from '@/utils/const'
import { Box, Button, Container, Grid2, styled } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'

const FormGrid = styled(Grid2)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.palette.secondary.main,
  '.gridImg': {
    height: 'calc(100vh - 123px)',
    backgroundImage: 'url(/images/bg-log1.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative',
    [theme.breakpoints.down('lg')]: {
      height: '400px',
      backgroundPosition: 'top',
    },
    [theme.breakpoints.down('sm')]: {
      height: '150px',
    },
  },
  '.gridForms': {
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 250px)',
    },
  },
}))

const UserLogForm = () => {
  const { isLogin, login, register, toggleLoginMode } = useContext(UserContext)
  const [formLogin, setFormLogin] = useState<loginFormTypes>(loginFormInit)
  const router = useRouter()

  const handleChange = (event: any) => {
    let { name, value } = event.target
    setFormLogin({
      ...formLogin,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(formLogin.email, formLogin.password)
      alert('login')
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <FormGrid container spacing={0}>
        <Grid2 className='gridImg' size={{ xs: 12, lg: 6 }} />
        <Grid2 className='gridForms' size={{ xs: 12, lg: 6 }}>
          <Container maxWidth='lg'>
            <Box component='form' onSubmit={handleSubmit}>
              {isLogin && (
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
          </Container>
        </Grid2>
      </FormGrid>
    </Layout>
  )
}

export default UserLogForm
