import React from 'react'
import Container from '@mui/material/Container'
import { useRouter } from 'next/router'
import theme from '../../../theme/theme'
import { Box, styled, Typography } from '@mui/material'
import Link from 'next/link'

const FooterBox = styled(Box)(() => ({
  padding: theme.spacing(2, 0),
  '.footerContainer': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '0',
    },
    '.footer-link': {
      textDecoration: 'none',
      color: theme.palette.text.primary,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '.text-footer': {
      textShadow: '0 4px 5px #000000b3',
    },
  },
}))

export const Footer = () => {
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
          <Typography
            gutterBottom
            color={changeColor}
            className='text-footer'
            variant='subtitle2'
          >
            ©2024 Dragon Ball Super Manager. Casi todos los derechos reservados.
          </Typography>
          <Box display={'flex'} alignItems={'center'} gap={2}>
            <Link
              className='text-footer footer-link'
              href={'https://victorqui-portfolio.netlify.app/'}
            >
              Sitio Web
            </Link>
            <Link
              className='text-footer footer-link'
              href={'https://github.com/Vctorqui'}
            >
              GitHub
            </Link>
          </Box>
        </Box>
      </Container>
    </FooterBox>
  )
}
