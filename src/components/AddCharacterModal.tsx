import { characterTypes } from '@/types/types'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  styled,
  Box,
  Avatar,
} from '@mui/material'
import { useState } from 'react'
import theme from '../../theme/theme'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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

interface AddCharacterDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (character: characterTypes) => void
}

export default function AddCharacterDialog({
  open,
  onClose,
  onAdd,
}: AddCharacterDialogProps) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [newCharacter, setNewCharacter] = useState<Partial<characterTypes>>({
    name: '',
    ki: '',
    race: '',
    image: '',
  })

  const handleSubmit = () => {
    onAdd({
      id: Date.now(),
      ...newCharacter,
    } as characterTypes)
    setNewCharacter({
      name: '',
      ki: '',
      race: '',
      image: '',
    })
  }

  const handleFileChange = (event: any) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }
  console.log(selectedFile)

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Character</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label='Name'
          value={newCharacter.name}
          onChange={(e) =>
            setNewCharacter({ ...newCharacter, name: e.target.value })
          }
          margin='normal'
        />
        <TextField
          fullWidth
          label='Ki'
          type='number'
          value={newCharacter.ki}
          onChange={(e) =>
            setNewCharacter({ ...newCharacter, ki: e.target.value })
          }
          margin='normal'
        />
        <TextField
          fullWidth
          label='Race'
          value={newCharacter.race}
          onChange={(e) =>
            setNewCharacter({ ...newCharacter, race: e.target.value })
          }
          margin='normal'
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
            startIcon={<CloudUploadIcon />}
          >
            <VisuallyHiddenInput
              value={newCharacter.image}
              onChange={handleFileChange}
              type='file'
              accept='image/png, image/jpg, image/jpeg'
            />
          </Button>
        </Box>
        {/* <TextField
          fullWidth
          label='Image URL'
          value={newCharacter.image}
          onChange={(e) =>
            setNewCharacter({ ...newCharacter, image: e.target.value })
          }
          margin='normal'
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
