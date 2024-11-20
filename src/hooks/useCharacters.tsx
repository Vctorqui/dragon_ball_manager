import { useState, useEffect } from 'react'
import localforage from 'localforage'
import { characterTypes } from '@/types/types'

export const useCharacters = () => {
  const [characters, setCharacters] = useState<characterTypes[]>([])

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          'https://dragonball-api.com/api/characters?limit=30'
        )
        const data = await response.json()
        const storedCharacters =
          (await localforage.getItem<characterTypes[]>('customCharacters')) ||
          []

        const allCharacters = [...data.items, ...storedCharacters]
        setCharacters(allCharacters)
      } catch (error) {
        console.error('Error fetching characters:', error)
      }
    }

    fetchCharacters()
  }, [])

  return { characters }
}
