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
import {
  characterSchema,
  CharacterSchema,
  genderOptions,
  raceOptions,
} from '@/utils/const'
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
  onSuccess?: (updatedCharacters: any[]) => void
}

export const CharacterForm = ({ character, onSuccess }: CharacterFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<CharacterSchema>({
    resolver: zodResolver(characterSchema),
    defaultValues: character || {},
  })

  const selectedGender = watch('gender')
  const selectedRace = watch('race')

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
      gap={2}
      alignItems={'center'}
      className='form-box'
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Typography variant='h3'>
        {character ? 'Actualizar' : 'Añadir'} Guerrero
      </Typography>
      <StylizedInput
        fullWidth
        label='Añadir Nombre del Guerrero'
        placeholder='E.g. Goku'
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
      />
      <>
        <Select
          fullWidth
          defaultValue=''
          value={selectedGender || ''}
          // {...register('gender')}
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
          <Typography component={'span'} variant='caption' color='error'>
            {errors.gender ? errors.gender.message : ''}
          </Typography>
        </Select>
      </>

      <Select
        fullWidth
        value={selectedRace || ''}
        defaultValue=''
        // {...register('race')}
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
        <Typography component={'span'} variant='caption' color='error'>
          {errors.gender ? errors.gender.message : ''}
        </Typography>
      </Select>
      <StylizedInput
        fullWidth
        label='Añadir Poder de tu Guerrero'
        placeholder='E.g. 10 millones'
        {...register('ki')}
        error={!!errors.ki}
        helperText={errors.ki ? errors.ki.message : ''}
      />
      <StylizedInput
        fullWidth
        label='Añadir Poder Máx de tu Guerrero'
        placeholder='E.g. 120 millones'
        {...register('maxKi')}
        error={!!errors.maxKi}
        helperText={errors.maxKi ? errors.maxKi.message : ''}
      />
      <StylizedInput
        fullWidth
        label='Añadir la descripcion de tu Guerrero'
        placeholder='E.g. El protagonista de la serie, conocido por su gran poder y personalidad amigable.'
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description ? errors.description.message : ''}
      />
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={2}
      >
        <Typography variant='body2'>
          {character ? 'Actualiza' : 'Selecciona'} la imagen de tu Guerrero
        </Typography>
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
          sx={{ my: 1 }}
        >
          {character ? 'Actualizar' : 'Añadir'} Personaje
        </Button>
      </Box>
    </Box>
  )
}
