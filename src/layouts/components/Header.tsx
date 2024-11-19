import { KeyboardReturn } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
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

const BoxNavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
  '.nav-link': {
    textDecoration: 'none',
    color: theme.palette.common.white,
    fontStyle: 'italic',
    fontWeight: 700,
    transition: 'all .2s ease-out',
    '&:hover': {
      color: theme.palette.text.secondary,
    },
  },
}))

export const Header = () => {
  const router = useRouter()
  const { isLogin } = useContext(UserContext)
  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    // <Box>
    //   <AppBarContainer position='fixed'>
    //     <Container maxWidth={'lg'}>
    //       <Toolbar className='toolBarStyled'>
    //         <Box
    //           sx={{ cursor: 'pointer' }}
    //           display={'flex'}
    //           alignItems={'center'}
    //           gap={1}
    //           onClick={() => router.push('/')}
    //         >
    //           <Stack justifyContent={'center'} alignItems={'center'}>
    //             <Image
    //               style={{ maxWidth: '100%' }}
    //               src={'/assets/logo.webp'}
    //               width={160}
    //               height={90}
    //               alt='Logo de Dragon ball super manager'
    //               priority
    //             />
    //           </Stack>
    //         </Box>
    //         {isLogin && router.pathname === '/dashboard' ? (
    //           <Button
    //             variant='contained'
    //             className='returnLink'
    //             onClick={() => router.push('/dashboard')}
    //           >
    //             Ir al centro de Edicion
    //           </Button>
    //         ) : (
    //           <Button
    //             variant='contained'
    //             className='returnLink'
    //             onClick={() => router.push('/dashboard')}
    //           >
    //             Iniciar Sesion
    //           </Button>
    //         )}
    //         {router.pathname === '/login' && (
    //           <>
    //             <Button
    //               variant='text'
    //               className='returnLink'
    //               onClick={() => router.push('/')}
    //             >
    //               <KeyboardReturn />
    //             </Button>
    //           </>
    //         )}
    //       </Toolbar>
    //     </Container>
    //   </AppBarContainer>
    // </Box>
    <Box>
      <AppBarContainer position='fixed'>
        <Container maxWidth='lg'>
          <Toolbar className='toolBarStyled'>
            <Box
              sx={{ cursor: 'pointer' }}
              display='flex'
              alignItems='center'
              gap={1}
              onClick={() => handleNavigation('/')}
            >
              <Stack justifyContent='center' alignItems='center'>
                <Image
                  style={{ maxWidth: '100%' }}
                  src='/assets/logo.webp'
                  width={160}
                  height={90}
                  alt='Logo de Dragon ball super manager'
                  priority
                />
              </Stack>
            </Box>
            {/* Renderizado condicional basado en el estado de autenticación y la ruta */}
            {!isLogin && router.pathname === '/' && (
              <Button
                variant='contained'
                className='returnLink'
                onClick={() => handleNavigation('/login')}
              >
                Iniciar Sesión
              </Button>
            )}
            {isLogin && router.pathname === '/dashboard' && (
              <Button
                variant='contained'
                className='returnLink'
                onClick={() => handleNavigation('/')}
              >
                Ir al home a filtrar
              </Button>
            )}
            {isLogin && router.pathname === '/' && (
              <Button
                variant='contained'
                className='returnLink'
                onClick={() => handleNavigation('/dashboard')}
              >
                Ir al centro de Edición
              </Button>
            )}
            {router.pathname === '/login' && (
              <Button
                variant='text'
                className='returnLink'
                onClick={() => handleNavigation('/')}
              >
                <KeyboardReturn />
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBarContainer>
    </Box>
  )
}
