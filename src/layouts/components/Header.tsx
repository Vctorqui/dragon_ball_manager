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

  return (
    <Box>
      <AppBarContainer position='fixed'>
        <Container maxWidth={'lg'}>
          <Toolbar className='toolBarStyled'>
            <Box
              sx={{ cursor: 'pointer' }}
              display={'flex'}
              alignItems={'center'}
              gap={1}
              onClick={() => router.push('/')}
            >
              <Stack justifyContent={'center'} alignItems={'center'}>
                <Image
                  style={{ maxWidth: '100%' }}
                  src={'/assets/logo.webp'}
                  width={160}
                  height={90}
                  alt='Logo of devBash'
                  priority
                />
              </Stack>
            </Box>
            {router.pathname === '/' && (
              <>
                <BoxNavContainer>
                  <Link className='nav-link' href={'#quotes'}></Link>
                </BoxNavContainer>
              </>
            )}
            {router.pathname === '/login' && (
              <>
                <Button
                  variant='text'
                  className='returnLink'
                  onClick={() => router.push('/')}
                >
                  <KeyboardReturn />
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBarContainer>
    </Box>
  )
}
