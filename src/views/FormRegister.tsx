import StylizedInput, { isValidEmail } from '@/components/ui/InputStyled'
import UserContext from '@/contexts/UserContext'
import { Layout } from '@/layouts/Layout'

import { loginFormTypes, registerFormTypes } from '@/types/types'
import {
  loginFormInit,
  registerFormInit,
  registerSchema,
  RegisterSchema,
} from '@/utils/const'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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

const FormRegister = ({ children }: any) => {
  const userContext = useContext(UserContext)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await userContext.register(data.name, data.email, data.password)
      // enqueueSnackbar('user registered succesfull', { variant: 'success' })
      router.push('/login')
    } catch (error) {
      // enqueueSnackbar('registered failed', { variant: 'error' })
      console.error(error)
    }
  }

  return (
    <Layout>
      <FormGrid container spacing={0}>
        <Grid2 className='gridImg' size={{ xs: 12, lg: 6 }} />
        <Grid2 className='gridForms' size={{ xs: 12, lg: 6 }}>
          <Container maxWidth='lg'>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
              <Typography variant='h6' gutterBottom>
                Register
              </Typography>{' '}
              <TextField
                fullWidth
                label='Name'
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
                margin='normal'
              />{' '}
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
                Submit
              </Button>
              <Divider />
              {children}
            </Box>
          </Container>
        </Grid2>
      </FormGrid>
    </Layout>
  )
}

export default FormRegister

// const { register } = useContext(UserContext)
// const [formRegister, setFormRegister] =
//   useState<registerFormTypes>(registerFormInit)
// const router = useRouter()

// const handleChange = (event: any) => {
//   let { name, value } = event.target
//   setFormRegister({
//     ...formRegister,
//     [name]: value,
//   })
// }

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault()
//   try {
//     await register(
//       formRegister.name,
//       formRegister.email,
//       formRegister.password,
//       formRegister.password_confirm
//     )
//     alert('registrado')
//     router.push('/login')
//   } catch (error) {
//     console.error(error)
//   }
// }
