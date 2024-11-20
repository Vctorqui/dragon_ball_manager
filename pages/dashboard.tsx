import CharacterForm from '@/components/CharacterForm'
import { CharacterList } from '@/components/CharacterList'
import CustomDialog from '@/components/StyledDialog'
import UserContext from '@/contexts/UserContext'
import { Layout } from '@/layouts/Layout'
import { Add, Logout } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { useContext, useEffect, useState } from 'react'

const Dasboard = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { user, logout } = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleLogout = async () => {
    logout()
    router.push('/login')
  }

  return (
    <Layout>
      <Container sx={{ marginTop: 12 }} maxWidth='lg'>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={4}
        >
          <Typography variant='h1'>Bienvenido, {user?.name}</Typography>
          <Button
            variant='contained'
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Cerrar Sesiónn
          </Button>
        </Box>

        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{ mb: 4 }}
        >
          Añadir Guerrero
        </Button>
        <CustomDialog open={open} onClose={() => setOpen(false)}>
          <CharacterForm
            onSuccess={() => {
              setOpen(false)
              enqueueSnackbar('Personaje añadido con exito', {
                variant: 'success',
              })
            }}
          />
        </CustomDialog>
        <CharacterList />
      </Container>
    </Layout>
  )
}

export default Dasboard

// useEffect(() => {
//   const fetchCharacters = async () => {
//     try {
//       const response = await fetch(
//         'https://dragonball-api.com/api/characters'
//       )
//       const data = await response.json()
//       setCharacters(data.items.slice(0, 8)) // Limiting to 8 characters for demo
//     } catch (error) {
//       console.error('Error fetching characters:', error)
//     }
//   }
//   fetchCharacters()
// }, [router])

// const handleAddCharacter = (newCharacter: characterTypes) => {
//   setCharacters([...characters, { ...newCharacter, id: Date.now() }])
//   setIsAddDialogOpen(false)
// }

// const handleEditCharacter = (editedCharacter: characterTypes) => {
//   setCharacters(
//     characters.map((char) =>
//       char.id === editedCharacter.id ? editedCharacter : char
//     )
//   )
// }

// const handleDeleteCharacter = (id: number) => {
//   setCharacters(characters.filter((char) => char.id !== id))
// }

{
  /* Add New Character 
        </Button> 
        <Grid2 container spacing={3}> 
          {characters.map((character) => ( 
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={character.id}> 
              <CardDB2 
                character={character} 
                onEdit={handleEditCharacter} 
                onDelete={handleDeleteCharacter} 
              /> 
            </Grid2> 
          ))} 
        </Grid2> 
 
        <AddCharacterDialog 
          open={isAddDialogOpen} 
          onClose={() => setIsAddDialogOpen(false)} 
          onAdd={handleAddCharacter} 
        /> */
}
