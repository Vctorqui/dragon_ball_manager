import { Box, styled, Typography } from '@mui/material'
import theme from '../../theme/theme'

const BannerContainer = styled(Box)(() => ({
  background: theme.palette.primary.main,
  position: 'relative',
  height: 'calc(100vh - 450px)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row-reverse',
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
  '&.videoContainer': {
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  '.bannerContainer': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    position: 'absolute',
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
        <Box className='videoContainer' component={'video'} autoPlay loop muted>
          <source src='/video/banner-db.mp4' type='video/mp4' />
        </Box>
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
            fontWeight={700}
            textAlign={'center'}
            color={theme.palette.text.primary}
            variant='h6'
            className='banner-text'
          >
            Explora el vasto universo de personajes de Dragon Ball. Filtra
            personajes Z. Crea y edita tus propias cartas.
          </Typography>
        </Box>
      </BannerContainer>
    </>
  )
}

export default Banner
