import { Box, Button, Container, Typography, styled } from '@mui/material'
import { NextPage } from 'next'
import React, { useState } from 'react'
import Grid from '@mui/material/Grid2'
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
            <Box className={tab === 0 ? 'fade-in' : 'fade-out'}>
              <FormLogin>
                <Box display={'flex'} alignItems={'center'} mt={2}>
                  <Typography variant='body2' fontWeight={'700'}>
                    ¿No tienes cuenta aún?
                  </Typography>
                  <Button
                    variant='outlined'
                    onClick={() => setTab(1)}
                  >
                    Crear una cuenta
                  </Button>
                </Box>
              </FormLogin>
            </Box>
          )}
          {tab === 1 && (
            <Box className={tab === 1 ? 'fade-in' : 'fade-out'}>
              <FormRegister>
                <Box display={'flex'} alignItems={'center'}>
                  <Typography variant='body2' fontWeight={'700'}>
                    ¿Ya tienes una cuenta?
                  </Typography>
                  <Button variant='outlined' onClick={() => setTab(0)}>
                    Iniciar Sesión
                  </Button>
                </Box>
              </FormRegister>
            </Box>
          )}
        </FormBox>
      </Container>
    </Layout>
  )
}

export default Login
