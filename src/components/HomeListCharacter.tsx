import {
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  styled,
  Typography,
} from '@mui/material'
import { CardDB } from './CardStyled'
import theme from '../../theme/theme'
import localforage from 'localforage'
import { useContext, useEffect, useState } from 'react'
import { CharacterTypes } from '@/types/types'
import StylizedInput from './InputStyled'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import UserContext from '@/contexts/UserContext'
import { useCharacters } from '@/hooks/useCharacters'
import { DashboardCrud } from './DashboardCharacter'
import { useRouter } from 'next/router'
import { genderOptions, raceOptions } from '@/utils/const'

const CardContainer = styled(Box)(() => ({
  padding: '2rem 0',
  minHeight: '100vh',
  [theme.breakpoints.down('md')]: {
    padding: '1rem 0',
  },
  '.card-grid': {
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    gridAutoRows: '450px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
}))

const HomeListCharacters = () => {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const [search, setSearch] = useState('')
  const [customCharacters, setCustomCharacters] = useState<CharacterTypes[]>([])
  const [selectedRaces, setSelectedRaces] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const { characters } = useCharacters()

  useEffect(() => {
    const loadCustomCharacters = async () => {
      const saved = await localforage.getItem<CharacterTypes[]>(
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

  const userIsLogin = () => {
    if (user) {
      if (router.pathname === '/') {
        return (
          <>
            <Typography variant='h2' fontWeight={200}>
              Guerreros{' '}
              <span style={{ color: theme.palette.secondary.main }}>
                Creados
              </span>
            </Typography>
            <DashboardCrud />
          </>
        )
      }
      return null
    } else {
      null
    }
  }

  return (
    <Box pt={2} pb={10}>
      <Container maxWidth='lg'>
        <Typography mb={2} variant='h3'>
          Filtrar Guerreros Z
        </Typography>
        <StylizedInput
          color='secondary'
          focused
          fullWidth
          placeholder='Busca tu guerrero favorito'
          label='Buscar personajes '
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box display={'flex'} alignItems={'center'} gap={2}>
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
            Guerreros{' '}
            <span style={{ color: theme.palette.secondary.main }}>Z</span>
          </Typography>
          <Box className='card-grid'>
            {filteredCharacters.map((character) => (
              <CardDB key={character.name} character={character} />
            ))}
          </Box>
        </CardContainer>
        {userIsLogin()}
      </Container>
    </Box>
  )
}

export default HomeListCharacters
