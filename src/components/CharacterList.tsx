import localforage from 'localforage'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import theme from '../../theme/theme'
import Image from 'next/image'
import { Delete, Edit } from '@mui/icons-material'
import CustomDialog from './StyledDialog'
import { Box, Button, Stack, styled } from '@mui/material'
import CharacterForm from './CharacterForm'
import { CardDB } from './CardStyled'

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

export const CharacterList = () => {
  const [characters, setCharacters] = useState<any[]>([])
  const [editCharacter, setEditCharacter] = useState<any>(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    loadCharacters()
  }, [])

  const loadCharacters = async () => {
    const savedCharacters =
      (await localforage.getItem<any[]>('characters')) || []
    setCharacters(savedCharacters)
  }

  const handleDelete = async (id: string) => {
    const updatedCharacters = characters.filter((c) => c.id !== id)
    await localforage.setItem('characters', updatedCharacters)
    setCharacters(updatedCharacters)
    enqueueSnackbar('Personaje Eliminado con exito', { variant: 'success' })
  }

  return (
    <>
      <CardContainer>
        <Box className='card-grid'>
          {characters.map((character) => (
            <CardDB key={character.id} character={character}>
              <Button
                onClick={() => {
                  setEditCharacter(character)
                  setOpenDialog(true)
                }}
              >
                <Edit sx={{ color: '#E63730' }} />
              </Button>
              <Button onClick={() => handleDelete(character.id)}>
                <Delete sx={{ color: '#E63730' }} />
              </Button>
            </CardDB>
          ))}
        </Box>
      </CardContainer>
      <CustomDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <CharacterForm
          character={editCharacter}
          onSuccess={(updatedCharacters) => {
            setCharacters(updatedCharacters)
            setOpenDialog(false)
            enqueueSnackbar(
              editCharacter
                ? 'Personaje Editado con éxito'
                : 'Personaje Añadido con éxito',
              { variant: 'success' }
            )
          }}
        />
      </CustomDialog>
    </>
  )
}
