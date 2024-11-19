import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { characterTypes } from '@/types/types';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<characterTypes[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://dragonball-api.com/api/characters');
        const data = await response.json();
        const storedCharacters = (await localforage.getItem<characterTypes[]>('customCharacters')) || [];
        setCharacters([...data.items.slice(0, 8), ...storedCharacters]); // Combining API and stored characters
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  const addCharacter = async (newCharacter: characterTypes) => {
    const updatedCharacters = [...characters, { ...newCharacter, id: Date.now() }];
    setCharacters(updatedCharacters);
    await localforage.setItem('customCharacters', updatedCharacters.filter(char => !char.isDefault));
  };

  return { characters, addCharacter };
};
