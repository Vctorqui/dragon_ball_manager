import CustomDialog from '@/components/StyledDialog'
import UserContext from '@/contexts/UserContext'
import { Layout } from '@/layouts/Layout'
import { Add, Logout } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { useContext, useEffect, useState } from 'react'
import theme from '../theme/theme'
import { CharacterForm } from '@/components/FormCharacter'
import { DashboardCrud } from '@/components/DashboardCharacter'

const Dasboard = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { user, logout } = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleLogout = async () => {
    logout()
    router.push('/')
  }

  return (
    <Layout>
      <Container sx={{ marginTop: 15 }} maxWidth='lg'>
        <Box display={'flex'} flexDirection={'column'} justifyContent='center' alignItems='center' mb={4}>
          <Typography variant='h2'>
            Bienvenido,{' '}
            <span style={{ color: theme.palette.text.secondary }}>
              {user?.name}
            </span>
          </Typography>
          <Typography variant='h3'>Es hora de crear tu carta</Typography>
        </Box>
        <Box display={'flex'} justifyContent={'flex-start'}>
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={() => setOpen(true)}
          >
            Añadir Guerrero
          </Button>
        </Box>
        <CustomDialog open={open} onClose={() => setOpen(false)}>
          <CharacterForm
            onSuccess={() => {
              router.push('/')
              setOpen(false)
              enqueueSnackbar('Personaje añadido con exito', {
                variant: 'success',
              })
            }}
          />
        </CustomDialog>
        <DashboardCrud />
        <Box
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
          pb={10}
        >
          <Button
            variant='contained'
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Container>
    </Layout>
  )
}

export default Dasboard
