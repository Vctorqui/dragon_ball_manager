import { Box, styled, Typography } from '@mui/material'
import Image from 'next/image'
import CustomDialog from './StyledDialog'
import { useState } from 'react'
import theme from '../../theme/theme'

interface CardItemsProps {
  character: any
  className?: string
  onClick?: any
  children?: any
}

const CardStyled = styled(Box)((theme) => ({
  cursor: 'pointer',
  perspective: '1000px',
  margin: '20px 0',
  '&:hover .card-image': {
    transform: 'translateZ(50px)',
  },
  '.card-content': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    padding: '20px',
    border: '1px solid #EEEEEE',
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
    transform: 'translateZ(10px)',
    transition: 'transform 0.5s',
  },
  '.card-title': {
    fontSize: '1.5em',
    margin: '10px 0',
    transform: 'translateZ(20px)',
  },
  '.first-content': {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    alignItems: 'center',
    transition: 'opacity .4s, visibility .4s',
    opacity: 1,
    visibility: 'visible',
    position: 'absolute',
  },
  '&:hover .first-content': { opacity: 0, visibility: 'hidden' },
  '.second-content': {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    alignItems: 'center',
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

export const CardDB = ({ className, character, children }: CardItemsProps) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <CardStyled className={className} onClick={() => setOpen(true)}>
        {children}
        <Box className='card-content'>
          <Image
            src={character.image}
            className='card-image'
            width={150}
            height={270}
            alt={character.name}
          />
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            height={120}
          >
            <Box className='first-content'>
              <Typography variant='h2' className='card-title'>
                {character.name}
              </Typography>
              <Typography variant='body2' className='card-details'>
                <strong>Raza:</strong> {character.race}
              </Typography>
              <Typography variant='body2' className='card-details'>
                <strong>Genero:</strong> {character.gender}
              </Typography>
            </Box>
            <Box className='second-content'>
              <Typography variant='h2' className='card-title'>
                {character.name}
              </Typography>
              <Typography variant='body2' className='card-details'>
                <strong>Power level:</strong> {character.ki}
              </Typography>
              <Typography variant='body2' className='card-details'>
                <strong>Full Power Level:</strong> {character.maxKi}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardStyled>
      <CustomDialog open={open} onClose={() => setOpen(false)}>
        <Box
          p={3}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          gap={1}
        >
          <Typography variant='h3'>{character.name}</Typography>
          <Box>
            <Typography fontWeight={700} color={theme.palette.secondary.main} variant='body2'>
              Genero: {character.gender}
            </Typography>
            <Typography fontWeight={700} color={theme.palette.secondary.main} variant='body2'>
              Raza: {character.race}
            </Typography>
          </Box>
          <Typography variant='body1'>{character.description}</Typography>
        </Box>
      </CustomDialog>
    </>
  )
}
