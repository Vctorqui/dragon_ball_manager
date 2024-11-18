import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { CardDB } from './ui/CardStyled'
import responsiveCharacters from '@/mocks/with-results.json'
import withoutResults from '@/mocks/without-results.json'
import theme from '../../theme/theme'
import localforage from 'localforage'
import { use, useEffect, useState } from 'react'
import { characterTypes } from '@/types/types'
import StylizedInput from './ui/InputStyled'
import Select, { SelectChangeEvent } from '@mui/material/Select'

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
      // gridAutoRows: '180px',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
      // gridAutoRows: '180px',
    },
  },
}))

const ListOfCharacters = () => {
  const characters = responsiveCharacters.items
  const hasCharacter = characters?.length > 0
  const [search, setSearch] = useState('')
  const [dbCharacters, setDbCharacters] = useState()
  const [customCharacters, setCustomCharacters] = useState<characterTypes[]>([])
  const [selectedRaces, setSelectedRaces] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const raceOptions = ['Saiyan', 'Namekian', 'Human', 'Frieza Race', 'Android']
  const genderOptions = ['Male', 'Female', 'Unknown']

  useEffect(() => {
    const loadCustomCharacters = async () => {
      const saved = await localforage.getItem<characterTypes[]>(
        'customCharacters'
      )
      if (saved) setCustomCharacters(saved)
    }
    loadCustomCharacters()
  }, [])

  const handleRaceChange = (event: SelectChangeEvent<string>) => {
    setSelectedRaces(event.target.value)
  }
  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setSelectedGender(event.target.value)
  }

  const filteredCharacters = [...characters, ...customCharacters].filter(
    (character) => {
      const nameMatch = character.name
        .toLowerCase()
        .includes(search.toLowerCase())
      const raceMatch = selectedRaces ? character.race === selectedRaces : true
      const genderMatch = selectedGender
        ? character.gender === selectedGender
        : true
      return nameMatch && raceMatch && genderMatch
    }
  )
  const handleClearFilters = () => {
    setSelectedRaces('')
    setSelectedGender('')
  }

  return (
    <section style={{ background: '#000', padding: '20px 0' }}>
      <Container maxWidth='lg'>
        <StylizedInput
          color='secondary'
          focused
          fullWidth
          label='Buscar personajes '
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={2}
          sx={{
            '.css-1toxriw-MuiList-root-MuiMenu-list': {
              background: '#000',
            },
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Filtrar por Raza</InputLabel>
            <Select
              value={selectedRaces}
              onChange={handleRaceChange}
              label='Filtrar por Raza'
            >
              {raceOptions.map((race) => (
                <MenuItem key={race} value={race}>
                  {race}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Filtrar por genero</InputLabel>
            <Select
              value={selectedGender}
              onChange={handleGenderChange}
              label='Filtrar por genero'
            >
              {genderOptions.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          mt={2}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Button
            variant='contained'
            onClick={handleClearFilters}
            sx={{ mb: 4 }}
          >
            Limpiar Filtros
          </Button>
        </Box>
        <CardContainer>
          <Typography variant='h2' fontWeight={200}>
            Personajes <span style={{ color: '#E63730' }}>Z</span>
          </Typography>
          <Box className='card-grid'>
            {filteredCharacters.map((character) => (
              <CardDB key={character.id} character={character} />
            ))}
          </Box>
        </CardContainer>
      </Container>
    </section>
  )
}

export default ListOfCharacters
