import localforage from 'localforage'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import theme from '../../theme/theme'
import { Delete, Edit } from '@mui/icons-material'
import CustomDialog from './StyledDialog'
import { Box, Button, styled } from '@mui/material'
import { CardDB } from './CardStyled'
import { CharacterForm } from './FormCharacter'
import { useRouter } from 'next/router'

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
  '.icon-card': {
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.secondary.light,
    },
  },
}))

export const DashboardCrud = () => {
  const [characters, setCharacters] = useState<any[]>([])
  const [editCharacter, setEditCharacter] = useState<any>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const router = useRouter()

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
              {router.pathname === '/' ? null : (
                <>
                  <Button
                    onClick={() => {
                      setEditCharacter(character)
                      setOpenDialog(true)
                    }}
                  >
                    <Edit className='icon-card' />
                  </Button>
                  <Button onClick={() => handleDelete(character.id)}>
                    <Delete className='icon-card' />
                  </Button>
                </>
              )}
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
