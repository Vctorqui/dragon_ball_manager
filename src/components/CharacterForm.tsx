'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import localforage from 'localforage'
import { Box, Button, styled, Typography } from '@mui/material'
import StylizedInput from './ui/InputStyled'
import { characterSchema, CharacterSchema } from '@/utils/const'
import { enqueueSnackbar } from 'notistack'
import theme from '../../theme/theme'
import { CloudUpload } from '@mui/icons-material'
import { useState } from 'react'

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
  onSuccess?: () => void
}

export default function CharacterForm({
  character,
  onSuccess,
}: CharacterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CharacterSchema>({ resolver: zodResolver(characterSchema) })

  const onSubmit = async (data: CharacterSchema) => {
    const characters = (await localforage.getItem<any[]>('characters')) || []

    const image = data.image[0]
    const imageUrl = URL.createObjectURL(image)

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
    onSuccess?.()
  }

  return (
    <Box
      className='form-box'
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* <Typography textAlign={'center'} variant='h6' gutterBottom>
        Iniciar Sesión
      </Typography> */}
      <StylizedInput
        fullWidth
        // label='Correo'
        placeholder='E.g. Goku'
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
      />
      <StylizedInput
        fullWidth
        // label='Contraseña'
        placeholder='E.g. Male'
        {...register('gender')}
        error={!!errors.gender}
        helperText={errors.gender ? errors.gender.message : ''}
      />
      <StylizedInput
        fullWidth
        // label='Contraseña'
        placeholder='E.g. Saiyan'
        {...register('race')}
        error={!!errors.race}
        helperText={errors.race ? errors.race.message : ''}
      />
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
            accept='image/png, image/jpg, image/jpeg'
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
