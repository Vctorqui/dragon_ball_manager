import { Box, Container, styled } from '@mui/material'
import { CardDB } from './ui/CardStyled'
import responsiveCharacters from '@/mocks/with-results.json'
import withoutResults from '@/mocks/without-results.json'
import theme from '../../theme/theme'

const CardContainer = styled(Box)(() => ({
  padding: '2rem 0',
  minHeight: '100vh',
  [theme.breakpoints.down('md')]: {
    padding: '1rem 0',
  },
  '.card-grid': {
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)' /* 2 columnas por defecto */,
    gap: '1rem' /* Espacio entre elementos */,
    gridAutoRows: '450px' /* Altura de las filas */,
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridAutoRows: '180px',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
      gridAutoRows: '180px',
    },
  },
}))

const SearchSection = () => {
  const characters = responsiveCharacters.items
  const hasCharacter = characters?.length > 0

  return (
    <section style={{ background: '#000' }}>
      <Container maxWidth='lg'>
        {hasCharacter ? (
          <CardContainer>
            <Box className='card-grid'>
              {characters.map((character) => (
                <CardDB key={character.id} character={character} />
              ))}
            </Box>
          </CardContainer>
        ) : (
          <p>no se encontraron datos</p>
        )}
      </Container>
    </section>
  )
}

export default SearchSection
