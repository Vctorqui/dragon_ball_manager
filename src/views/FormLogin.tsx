import StylizedInput from '@/components/ui/InputStyled'
import UserContext from '@/contexts/UserContext'
import { loginSchema, LoginSchema } from '@/utils/const'
import { Box, Button, Divider, styled, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const FormLoginContainer = styled(Box)(({ theme }) => ({}))

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
        />
        <StylizedInput
          fullWidth
          label='Contraseña'
          placeholder='********'
          type='password'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
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
