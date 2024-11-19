import StylizedInput from '@/components/ui/InputStyled'
import UserContext from '@/contexts/UserContext'
import { Layout } from '@/layouts/Layout'
import { loginFormTypes } from '@/types/types'
import { loginSchema, LoginSchema } from '@/utils/const'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  styled,
  TextField,
} from '@mui/material'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const FormLoginContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '.form-box': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
}))

const FormLogin = ({ children }: any) => {
  const { login } = useContext(UserContext)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginSchema) => {
    try {
      const { email, password } = data
      await login(email, password)
      //   enqueueSnackbar('Login succesfull', { variant: 'success' })
      router.push('/dashboard')
    } catch (error) {
      //   enqueueSnackbar('login failed', { variant: 'error' })
      console.error(error)
    }
  }

  return (
    <Layout>
      <FormLoginContainer>
        <Container maxWidth={'lg'}>
          <Box
            className='form-box'
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              fullWidth
              label='Email'
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              margin='normal'
            />{' '}
            <TextField
              fullWidth
              label='Password'
              type='password'
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              margin='normal'
            />{' '}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              sx={{ mt: 2 }}
            >
              Login
            </Button>
            <Divider />
            {children}
          </Box>
        </Container>
      </FormLoginContainer>
    </Layout>
  )
}

export default FormLogin

//   const form = useForm<z.infer<typeof userSchema>>({
//     resolver: zodResolver(userSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       await login(formLogin.email, formLogin.password)
//       alert('login')
//       router.push('/dashboard')
//     } catch (error) {
//       console.error(error)
//     }
//   }
