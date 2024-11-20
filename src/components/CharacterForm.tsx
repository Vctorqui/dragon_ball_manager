import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import localforage from 'localforage'
import {
  Box,
  Button,
  MenuItem,
  Select,
  styled,
  Typography,
} from '@mui/material'
import StylizedInput from './InputStyled'
import { characterSchema, CharacterSchema } from '@/utils/const'
import theme from '../../theme/theme'
import { CloudUpload } from '@mui/icons-material'
import { useEffect } from 'react'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

interface CharacterFormProps {
  character?: any
  onSuccess?: (updatedCharacters: any[]) => void // Especifica que puede recibir un array de personajes
}

const raceOptions = ['Saiyan', 'Human', 'Namekian', 'Frieza Race', 'Android']
const genderOptions = ['Male', 'Female', 'Other']

export default function CharacterForm({
  character,
  onSuccess,
}: CharacterFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CharacterSchema>({
    resolver: zodResolver(characterSchema),
    defaultValues: character || {},
  })

  useEffect(() => {
    if (character) {
      Object.keys(character).forEach((key) => {
        setValue(key as keyof CharacterSchema, character[key])
      })
    }
  }, [character, setValue])

  const onSubmit = async (data: CharacterSchema) => {
    const characters = (await localforage.getItem<any[]>('characters')) || []

    let imageUrl = character?.image || ''
    if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
      const image = data.image[0]
      imageUrl = URL.createObjectURL(image)
    }

    if (character) {
      const index = characters.findIndex((c) => c.id === character.id)
      characters[index] = { ...character, ...data, image: imageUrl }
    } else {
      characters.push({
        id: Math.random().toString(36).slice(2, 9),
        ...data,
        image: imageUrl,
      })
    }
    await localforage.setItem('characters', characters)
    onSuccess?.(characters)
  }

  return (
    <Box
      padding={2}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      gap={1}
      alignItems={'center'}
      className='form-box'
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Typography variant='h3'>
        {character ? 'Actualizar' : 'Añadir'} Personaje
      </Typography>
      <StylizedInput
        fullWidth
        label='Añadir Guerrero'
        placeholder='E.g. Goku'
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
      />
      <Select
        fullWidth
        defaultValue=''
        {...register('gender')}
        error={!!errors.gender}
        displayEmpty
        onChange={(e) => setValue('gender', e.target.value)}
      >
        <MenuItem value='' disabled>
          Selecciona un género para tu Guerrero
        </MenuItem>
        {genderOptions.map((gender) => (
          <MenuItem key={gender} value={gender}>
            {gender}
          </MenuItem>
        ))}
      </Select>
      {errors.gender && <Box color='error.main'>{errors.gender.message}</Box>}
      <Select
        fullWidth
        defaultValue=''
        {...register('race')}
        error={!!errors.race}
        displayEmpty
        onChange={(e) => setValue('race', e.target.value)}
      >
        <MenuItem value='' disabled>
          Selecciona la raza de tu Guerrero
        </MenuItem>
        {raceOptions.map((race) => (
          <MenuItem key={race} value={race}>
            {race}
          </MenuItem>
        ))}
      </Select>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Button
          sx={{ marginBottom: theme.spacing(2) }}
          component='label'
          variant='outlined'
          startIcon={<CloudUpload />}
        >
          <VisuallyHiddenInput
            {...register('image')}
            type='file'
            accept='image/*'
          />
        </Button>
      </Box>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ my: 2 }}
        >
          {character ? 'Actualizar' : 'Añadir'} Personaje
        </Button>
      </Box>
    </Box>
  )
}
