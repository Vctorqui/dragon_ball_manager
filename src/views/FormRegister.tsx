import StylizedInput from '@/components/ui/InputStyled'
import UserContext from '@/contexts/UserContext'
import { registerSchema, RegisterSchema } from '@/utils/const'
import { Box, Button, Divider, styled, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const FormRegisterContainer = styled(Box)(({ theme }) => ({}))

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
      enqueueSnackbar('Usuario registrado con éxito', { variant: 'success' })
      router.reload()
    } catch (error) {
      enqueueSnackbar('Registro fallido vuelva a intentarlo', {
        variant: 'error',
      })
      console.error(error)
    }
  }

  return (
    <FormRegisterContainer>
      <Box
        className='form-box'
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Typography
          textAlign={'center'}
          component={'h4'}
          variant='h3'
          gutterBottom
        >
          Register
        </Typography>
        <StylizedInput
          fullWidth
          label='Nombre de Usuario'
          placeholder='E.g. Victor '
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
        />
        <StylizedInput
          fullWidth
          label='Correo Electronico'
          placeholder='E.g. tucorreo@mail.com'
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <StylizedInput
          fullWidth
          label='Contraseña'
          placeholder='*******'
          type='password'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        {/* <StylizedInput
          type='password'
          required
          placeholder='***********'
          label='Confirmar Contraseña'
          {...register('confirm_password')}
          error={!!errors.confirm_password}
          helperText={
            errors.confirm_password ? errors.confirm_password.message : ''
          }
        /> */}
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ my: 2 }}
          >
            Registrar Usuario
          </Button>
        </Box>
        <Divider />
        {children}
      </Box>
    </FormRegisterContainer>
  )
}

export default FormRegister
