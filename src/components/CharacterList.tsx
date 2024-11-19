import localforage from 'localforage'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { CardDB } from './ui/CardStyled'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  styled,
} from '@mui/material'
import Image from 'next/image'
import { Delete, Edit } from '@mui/icons-material'
import CharacterForm from './CharacterForm'
import CustomDialog from './StyledDialog'
const CardStyled = styled(Box)((theme) => ({
  perspective: '1000px',
  margin: '20px',
  '&:hover .card-image': {
    transform: 'translateZ(50px)',
  },
  '.card-content': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    // width: '300px',
    padding: '20px',
    // background: 'white',
    border: '1px solid #fff',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.5s',
  },
  '&:hover .card-content': {
    transform: 'rotateY(10deg) rotateX(10deg) translateZ(30px)',
  },
  '.card-image': {
    maxWidth: '100%',
    // borderRadius: '10px',
    transform: 'translateZ(10px)',
    transition: 'transform 0.5s',
  },
  '.card-title': {
    fontSize: '1.5em',
    margin: '10px 0',
    transform: 'translateZ(20px)',
  },
  '.first-content': {
    transition: 'opacity .4s, visibility .4s',
    opacity: 1,
    visibility: 'visible',
    position: 'absolute',
  },
  '&:hover .first-content': { opacity: 0, visibility: 'hidden' },
  '.second-content': {
    opacity: 0,
    position: 'absolute',
    transition: 'opacity 0.4s, visibility 0.4s, transform 0.4s, fontSize 0.4s',
    visibility: 'hidden',
    fontSize: '0px',
    transform: 'rotate(90deg) scale(-1)',
  },
  '&:hover .second-content': {
    opacity: 1,
    visibility: 'visible',
    fontSize: '1rem',
    transform: 'rotate(0deg)',
  },
}))

export const CharacterList = () => {
  const [characters, setCharacters] = useState<any[]>([])
  const [editCharacter, setEditCharacter] = useState<any>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const loadCharacters = async () => {
    const savedCharacters =
      (await localforage.getItem<any[]>('characters')) || []
    setCharacters(savedCharacters)
  }
  useEffect(() => {
    loadCharacters()
  }, [])

  const handleDelete = async (id: string) => {
    const updatedCharacters = characters.filter((c) => c.id !== id)
    await localforage.setItem('characters', updatedCharacters)
    setCharacters(updatedCharacters)
    enqueueSnackbar('Personaje Eliminado', { variant: 'success' })
  }

  return (
    <>
      {characters.map((character) => (
        <>
          <CardStyled key={character.id}>
            <Box className='card-content'>
              <Image
                src={character.image}
                className='card-image'
                width={150}
                height={270}
                alt={character.name}
              />
              <Stack
                justifyContent={'center'}
                alignItems={'center'}
                height={120}
              >
                <Stack
                  spacing={1}
                  alignItems={'center'}
                  className='first-content'
                >
                  <h2 className='card-title'>{character.name}</h2>
                  <p className='card-details'>
                    <strong>Raza:</strong> {character.race}
                  </p>
                  <p className='card-details'>
                    <strong>Genero:</strong> {character.gender}
                  </p>
                </Stack>
                <Stack
                  spacing={1}
                  // justifyContent={'flex-start'}
                  alignItems={'center'}
                  className='second-content'
                >
                  <h2 className='card-title'>{character.name}</h2>
                  <p className='card-details'>
                    <strong>Power level:</strong> {character.ki}
                  </p>
                  <p className='card-details'>
                    <strong>Full Power Level:</strong> {character.maxKi}
                  </p>
                </Stack>
              </Stack>
            </Box>
          </CardStyled>
          <Button
            onClick={() => {
              setEditCharacter(character)
              setOpenDialog(true)
            }}
          >
            <Edit />
          </Button>
          <CustomDialog
            title='Edit Character'
            open={openDialog}
            onClose={() => setOpenDialog(false)}
          >
            <CharacterForm
              character={character}
              onSuccess={() => {
                loadCharacters()
                setEditCharacter(null)
                enqueueSnackbar('Personaje Editado con exito', {
                  variant: 'success',
                })
              }}
            />
          </CustomDialog>
          <Button onClick={() => handleDelete(character.id)}>
            <Delete />
          </Button>
        </>
      ))}
    </>
  )
}
