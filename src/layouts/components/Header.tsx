import {
  AppBar,
  Box,
  Container,
  Toolbar,
  styled,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useContext } from 'react'
import UserContext from '@/contexts/UserContext'

const AppBarContainer = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.main,
  boxShadow: '0px 5px 19px rgba(0,0,0,.2901960784)',
  [theme.breakpoints.down('md')]: {
    paddingTop: 0,
  },

  '.toolBarStyled': {
    padding: '0!important',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
    },
  },

  '.returnLink': {
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
}))

export const Header = () => {
  const router = useRouter()
  const { user } = useContext(UserContext)

  const renderLink = () => {
    if (!user) {
      if (router.pathname === '/login') {
        return (
          <Link className='returnLink' href='/'>
            Regresar
          </Link>
        )
      }
      return (
        <Link className='returnLink' href='/login'>
          Iniciar Sesión
        </Link>
      )
    } else {
      if (router.pathname === '/dashboard') {
        return (
          <Link className='returnLink' href='/'>
            Ir al centro de Filtrado
          </Link>
        )
      }
      return (
        <Link className='returnLink' href='/dashboard'>
          Ir al centro de Edición
        </Link>
      )
    }
  }

  return (
    <Box>
      <AppBarContainer position='fixed'>
        <Container maxWidth='lg'>
          <Toolbar className='toolBarStyled'>
            <Link href='/'>
              <Image
                style={{ maxWidth: '100%' }}
                src='/assets/logo.webp'
                width={160}
                height={90}
                alt='Logo de Dragon ball super manager'
                priority
              />
            </Link>
            {renderLink()}
          </Toolbar>
        </Container>
      </AppBarContainer>
    </Box>
  )
}
