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
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const FormLoginContainer = styled(Box)(({ theme }) => ({
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   '.form-box': {
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     flexDirection: 'column',
  //   },
}))

const FormLogin = ({ children }: any) => {
  const { login, user } = useContext(UserContext)
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
      enqueueSnackbar(`Bienvenido nuevamente,${user?.name}`, {
        variant: 'success',
      })
      router.push('/dashboard')
    } catch (error) {
      enqueueSnackbar('Credenciales no válidas', { variant: 'error' })
      console.error(error)
    }
  }

  return (
    <FormLoginContainer>
      <Box
        className='form-box'
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Typography textAlign={'center'} variant='h6' gutterBottom>
          Iniciar Sesión
        </Typography>
        <StylizedInput
          fullWidth
          label='Correo'
          placeholder='E.g. tucorreo@mail.com'
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
          // margin='normal'
        />
        <StylizedInput
          fullWidth
          label='Contraseña'
          placeholder='********'
          type='password'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
          // margin='normal'
        />
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ my: 2 }}
          >
            Iniciar Sesión
          </Button>
        </Box>
        <Divider />
        {children}
      </Box>
    </FormLoginContainer>
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
