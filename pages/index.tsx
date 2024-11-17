import { Box } from '@mui/material'
import theme from '../theme/theme'

const Home = () => {
  return (
    <Box
      bgcolor={theme.palette.primary.main}
      height={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <h1>Dragon ball</h1>
    </Box>
  )
}

export default Home
