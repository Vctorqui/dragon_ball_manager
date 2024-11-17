import React from 'react'
import Container from '@mui/material/Container'
import { useRouter } from 'next/router'
import theme from '../../../theme/theme'
import { Box, styled, Typography } from '@mui/material'

const FooterBox = styled(Box)(() => ({
  padding: theme.spacing(2, 0),
  '.footerContainer': {
    display: 'flex',
    justifyContent: 'center',
    aligItems: 'center',
    gap: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '0',
    },
    '.footerLink': {
      textDecoration: 'none',
      color: theme.palette.text.primary,
      marginTop: '3px',
    },
  },
}))

export const Footer = () => {
//   const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const router = useRouter()
  const changeColor =
    router.pathname === '/'
      ? theme.palette.text.primary
      : theme.palette.common.white
  const changeBgColor =
    router.pathname === '/'
      ? theme.palette.common.black
      : theme.palette.secondary.dark

  return (
    <FooterBox sx={{ background: changeBgColor }}>
      <Container maxWidth={'lg'}>
        <Box className='footerContainer'>
          <Typography gutterBottom color={changeColor} variant='subtitle2'>
            ©2024 DevDash. Casi todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </FooterBox>
  )
}
