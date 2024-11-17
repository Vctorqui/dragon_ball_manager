import { Box, Container, styled, Typography } from '@mui/material'
import theme from '../../theme/theme'

const BannerContainer = styled(Box)(() => ({
  backgroundImage: 'url(https://i.redd.it/8rbb1xqoyaec1.gif)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition:'top center',
  // background: theme.palette.primary.main,
  position: 'relative',
  height: 'calc(100vh - 450px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '.bannerContainer': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
    '.loginBtn': {
      display: 'flex',
      gap: '10px',
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
              color={theme.palette.text.primary}
            >
              Dragon Ball Character Manager
            </Typography>
            <Typography
              textAlign={'center'}
              color={theme.palette.text.primary}
              variant='h6'
            >
              Explora el vasto universo de personajes de Dragon Ball. Busca,
              filtra y descubre tus favoritos de la serie..
            </Typography>
          </Box>
        </Container>
      </BannerContainer>
    </>
  )
}

export default Banner
