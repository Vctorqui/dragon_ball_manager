import AddCharacterDialog from '@/components/AddCharacterModal'
import { CardDB, CardDB2 } from '@/components/ui/CardStyled'
import UserContext from '@/contexts/UserContext'
import { Layout } from '@/layouts/Layout'
import { characterTypes } from '@/types/types'
import { Logout } from '@mui/icons-material'
import { Box, Button, Container, Grid2, Typography } from '@mui/material'
import localforage from 'localforage'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const Dasboard = () => {
  const router = useRouter()
  const { logout, currentUser } = useContext(UserContext)
  const [characters, setCharacters] = useState<characterTypes[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const user = await localforage.getItem('currentUser')
      if (!user) {
        router.push('/login')
      }
    }
    checkAuth()

    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          'https://dragonball-api.com/api/characters'
        )
        const data = await response.json()
        setCharacters(data.items.slice(0, 8)) // Limiting to 8 characters for demo
      } catch (error) {
        console.error('Error fetching characters:', error)
      }
    }
    fetchCharacters()
  }, [router])

  const handleAddCharacter = (newCharacter: characterTypes) => {
    setCharacters([...characters, { ...newCharacter, id: Date.now() }])
    setIsAddDialogOpen(false)
  }

  const handleEditCharacter = (editedCharacter: characterTypes) => {
    setCharacters(
      characters.map((char) =>
        char.id === editedCharacter.id ? editedCharacter : char
      )
    )
  }

  const handleDeleteCharacter = (id: number) => {
    setCharacters(characters.filter((char) => char.id !== id))
  }

  const handleLogout = async () => {
    logout()
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
          <Typography variant='h1'>Bienvenido, {currentUser?.name}</Typography>
          <Button
            variant='contained'
            color='error'
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>

        <Button
          variant='contained'
          color='primary'
          onClick={() => setIsAddDialogOpen(true)}
          sx={{ mb: 4 }}
        >
          Add New Character
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
        />
      </Container>
    </Layout>
  )
}

export default Dasboard
