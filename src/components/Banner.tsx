import { Box, Container, styled, Typography } from '@mui/material'
import theme from '../../theme/theme'

const BannerContainer = styled(Box)(() => ({
  // backgroundImage: 'url(https://i.redd.it/8rbb1xqoyaec1.gif)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  // background: theme.palette.primary.main,
  position: 'relative',
  height: 'calc(100vh - 450px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  '.bannerContainer': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    position: 'relative',
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
    '.loginBtn': {
      display: 'flex',
      gap: '10px',
    },
    '.banner-text': {
      textShadow: '0 4px 5px #000000b3',
    },
  },
}))

const Banner = () => {
  return (
    <>
      <BannerContainer id='home'>
        <Container maxWidth={'lg'}>
          <Box className='bannerContainer'>
            <Typography
              textAlign={'center'}
              variant='h2'
              color={theme.palette.text.secondary}
              className='banner-text'
            >
              Dragon Ball Character Manager
            </Typography>
            <Typography
              textAlign={'center'}
              color={theme.palette.text.primary}
              variant='h6'
              className='banner-text'
            >
              Explora el vasto universo de personajes de Dragon Ball. Busca,
              filtra, crea, edita y descubre tus favoritos de la serie..
            </Typography>
          </Box>
        </Container>
      </BannerContainer>
    </>
  )
}

export default Banner
