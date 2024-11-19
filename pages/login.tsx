import { Box, Button, Typography, styled } from '@mui/material'
import { NextPage } from 'next'
import React, { useState } from 'react'
import Grid from '@mui/material/Grid2'
import { Layout } from '@/layouts/Layout'
import FormLogin from '@/views/FormLogin'
import FormRegister from '@/views/FormRegister'

const FormGrid = styled(Grid)(({ theme }) => ({
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

const Login: NextPage = () => {
  const [tab, setTab] = useState(0)
  return (
    <Layout>
      <FormGrid container spacing={0}>
        <Grid className='gridImg' size={{ xs: 12, lg: 6 }} />
        <Grid className='gridForms' size={{ xs: 12, lg: 6 }}>
          {tab === 0 && (
            <Box className={tab === 0 ? 'fade-in' : 'fade-out'}>
              <FormLogin>
                <Box display={'flex'} alignItems={'center'}>
                  <Typography variant='body2' fontWeight={'700'}>
                    No Account Yet?
                  </Typography>
                  <Button
                    variant='text'
                    className='textLink'
                    onClick={() => setTab(1)}
                  >
                    Create an Account
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
                    Already have an account?
                  </Typography>
                  <Button
                    variant='text'
                    className='textLink'
                    onClick={() => setTab(0)}
                  >
                    Login
                  </Button>
                </Box>
              </FormRegister>
            </Box>
          )}
        </Grid>
      </FormGrid>
    </Layout>
  )
}

export default Login
