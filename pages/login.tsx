import { Box, Button, Container, Typography, styled } from '@mui/material'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { Layout } from '@/layouts/Layout'
import FormLogin from '@/views/FormLogin'
import FormRegister from '@/views/FormRegister'

const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 600,
  width: '100%',
  margin: '0 auto',
  height: 'calc(100vh - 100px)',

  [theme.breakpoints.down('md')]: {
    height: 'calc(100vh - 50px)',
  },
}))

const Login: NextPage = () => {
  const [tab, setTab] = useState(0)
  return (
    <Layout>
      <Container maxWidth={'lg'}>
        <FormBox>
          {tab === 0 && (
            <FormLogin>
              <Box display={'flex'} alignItems={'center'} mt={2}>
                <Typography variant='body2' fontWeight={'700'}>
                  ¿No tienes cuenta aún?
                </Typography>
                <Button variant='text' onClick={() => setTab(1)}>
                  Crear una cuenta
                </Button>
              </Box>
            </FormLogin>
          )}
          {tab === 1 && (
            <FormRegister>
              <Box display={'flex'} alignItems={'center'}>
                <Typography variant='body2' fontWeight={'700'}>
                  ¿Ya tienes una cuenta?
                </Typography>
                <Button variant='text' onClick={() => setTab(0)}>
                  Iniciar Sesión
                </Button>
              </Box>
            </FormRegister>
          )}
        </FormBox>
      </Container>
    </Layout>
  )
}

export default Login
