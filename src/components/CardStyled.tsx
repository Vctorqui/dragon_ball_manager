import UserContext from '@/contexts/UserContext'
import { characterTypes } from '@/types/types'
import { Delete, Edit } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { useContext, useState } from 'react'

interface cardItemsProps {
  character: any
  className?: string
  onClick?: any
  children?: any
}

interface CharacterCardProps {
  character: characterTypes
  onEdit: (character: characterTypes) => void
  onDelete: (id: number) => void
}

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
    padding: '20px',
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

export const CardDB = ({
  className,
  onClick,
  character,
  children,
}: cardItemsProps) => {
  return (
    <CardStyled className={className} onClick={onClick}>
      <Box className='card-content'>
        <Image
          src={character.image}
          className='card-image'
          width={150}
          height={270}
          alt={character.name}
        />
        <Stack justifyContent={'center'} alignItems={'center'} height={120}>
          <Stack spacing={1} alignItems={'center'} className='first-content'>
            <Typography variant='h2' className='card-title'>
              {character.name}
            </Typography>
            <Typography variant='body2' className='card-details'>
              <strong>Raza:</strong> {character.race}
            </Typography>
            <Typography variant='body2' className='card-details'>
              <strong>Genero:</strong> {character.gender}
            </Typography>
          </Stack>
          <Stack spacing={1} alignItems={'center'} className='second-content'>
            <Typography variant='h2' className='card-title'>
              {character.name}
            </Typography>
            <Typography variant='body2' className='card-details'>
              <strong>Power level:</strong> {character.ki}
            </Typography>
            <Typography variant='body2' className='card-details'>
              <strong>Full Power Level:</strong> {character.maxKi}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {children}
    </CardStyled>
  )
}

// export const CardDB2 = ({
//   character,
//   onEdit,
//   onDelete,
// }: CharacterCardProps) => {
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [editedCharacter, setEditedCharacter] = useState(character)
//   const { isLogin } = useContext(UserContext)

//   const handleEditSubmit = () => {
//     onEdit(editedCharacter)
//     setIsEditDialogOpen(false)
//   }
//   return (
//     <>
//       <CardStyled>
//         <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
//           {!isLogin && (
//             <>
//               <IconButton
//                 onClick={() => setIsEditDialogOpen(true)}
//                 color='primary'
//               >
//                 <Edit />
//               </IconButton>
//               <IconButton onClick={() => onDelete(character.id)} color='error'>
//                 <Delete />
//               </IconButton>
//             </>
//           )}
//         </Box>
//         <Box className='card-content'>
//           <Image
//             src={character.image}
//             className='card-image'
//             width={150}
//             height={270}
//             alt={character.name}
//           />
//           <Stack justifyContent={'center'} alignItems={'center'} height={120}>
//             <Stack spacing={1} alignItems={'center'} className='first-content'>
//               <h2 className='card-title'>{character.name}</h2>
//               <p className='card-details'>
//                 <strong>Raza:</strong> {character.race}
//               </p>
//               <p className='card-details'>
//                 <strong>Genero:</strong> {character.gender}
//               </p>
//             </Stack>
//             <Stack spacing={1} alignItems={'center'} className='second-content'>
//               <h2 className='card-title'>{character.name}</h2>
//               <p className='card-details'>
//                 <strong>Power level:</strong> {character.ki}
//               </p>
//               <p className='card-details'>
//                 <strong>Full Power Level:</strong> {character.maxKi}
//               </p>
//             </Stack>
//           </Stack>
//         </Box>
//       </CardStyled>
//       <Dialog
//         open={isEditDialogOpen}
//         onClose={() => setIsEditDialogOpen(false)}
//       >
//         <DialogTitle>Edit Character</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label='Name'
//             value={editedCharacter.name}
//             onChange={(e) =>
//               setEditedCharacter({ ...editedCharacter, name: e.target.value })
//             }
//           />
//           <TextField
//             fullWidth
//             label='Ki'
//             value={editedCharacter.ki}
//             onChange={(e) =>
//               setEditedCharacter({ ...editedCharacter, ki: e.target.value })
//             }
//           />
//           <TextField
//             fullWidth
//             label='Race'
//             value={editedCharacter.race}
//             onChange={(e) =>
//               setEditedCharacter({ ...editedCharacter, race: e.target.value })
//             }
//             margin='normal'
//           />
//           <TextField
//             fullWidth
//             label='Image URL'
//             value={editedCharacter.image}
//             onChange={(e) =>
//               setEditedCharacter({ ...editedCharacter, image: e.target.value })
//             }
//             margin='normal'
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleEditSubmit} variant='contained'>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   )
// }
