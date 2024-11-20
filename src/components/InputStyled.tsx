import { ChangeEvent, useState } from 'react'
import {
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  StandardTextFieldProps,
  TextField,
  styled,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import theme from '../../theme/theme'

interface validationTypes {
  validate: () => boolean
  msg: string
}

interface FancyInputTypes extends StandardTextFieldProps {
  validation?: validationTypes[]
  onlyNumber?: boolean
  maxLength?: number
  validateSubmit?: boolean
  mb?: number
}

export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email)
}

const FormLabelCustom = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
}))

const StylizedInput = ({
  label,
  name,
  value,
  variant,
  required,
  validation,
  type,
  multiline,
  helperText,
  onChange,
  maxLength,
  validateSubmit,
  mb,
  ...rest
}: FancyInputTypes) => {
  const [touched, setTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const isNumber = () => type === 'number'

  const isEmptyString = (str: string) => {
    return str === ''
  }

  const stringIsOnlyDigits = (str: string) => {
    return /^[0-9]+([.])?([0-9]+)?$/.test(str)
  }

  const onChangeCustom = (e: ChangeEvent<HTMLInputElement>) => {
    setTouched(true)
    if (
      isNumber() &&
      !isEmptyString(e.target.value) &&
      !stringIsOnlyDigits(e.target.value)
    )
      return
    if (onChange) onChange(e)
  }

  const getMessageError = () => {
    if (validation) {
      for (const v of validation) {
        if (!v.validate()) return v.msg
      }
      return ''
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  // NOTES: here with validateSubmit we pass it to the inputs that are required with a status within the same form where we are calling the data and when we give submit it will show the ones that are not validated.

  const requiredCondition = (touched || validateSubmit) && !value && required
  const showCustomError =
    (touched || validateSubmit) && validation && !!getMessageError()
  const hasError = requiredCondition || showCustomError

  return (
    <>
      {type !== 'password' ? (
        <FormControl fullWidth error={hasError}>
          {/* {label && <FormLabelCustom>{label}</FormLabelCustom>} */}
          <TextField
            label={label}
            style={
              mb !== undefined ? { marginBottom: mb } : { marginBottom: 10 }
            }
            size='small'
            error={hasError}
            helperText={
              requiredCondition
                ? '* Required'
                : showCustomError
                ? getMessageError()
                : helperText ?? ''
            }
            variant={variant ? variant : 'outlined'}
            name={name}
            multiline={multiline}
            value={value}
            onChange={onChangeCustom}
            slotProps={{
              input: {
                className: required ? 'textField-required' : '',
              },
              htmlInput: {
                maxLength: maxLength,
                style: multiline
                  ? {
                      backgroundColor: 'transparent',
                      borderRadius: 4,
                      margin: '-8.5px -14px',
                      padding: '8.5px 14px',
                    }
                  : {
                      backgroundColor: 'transparent',
                      borderRadius: 4,
                    },
                autoComplete: 'off',
                form: {
                  autoComplete: 'off',
                },
              },
            }}
            {...rest}
          />
        </FormControl>
      ) : (
        <FormControl fullWidth error={hasError}>
          {/* {label && <FormLabelCustom>{label}</FormLabelCustom>} */}
          <TextField
            label={label}
            size='small'
            style={
              mb !== undefined ? { marginBottom: mb } : { marginBottom: 16 }
            }
            error={hasError}
            helperText={
              requiredCondition
                ? 'Required Field'
                : showCustomError
                ? getMessageError()
                : ''
            }
            variant={variant ? variant : 'outlined'}
            name={name}
            value={value}
            type={showPassword ? 'text' : 'password'}
            onChange={onChangeCustom}
            slotProps={{
              input: {
                sx: { paddingRight: 0 },
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={handleClickShowPassword}
                      sx={{
                        backgroundColor: theme.palette.secondary.light,
                        borderRadius: '10px',
                        '&:hover': {
                          background: theme.palette.text.secondary,
                        },
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOff
                          sx={{ color: theme.palette.primary.main }}
                        />
                      ) : (
                        <Visibility
                          sx={{ color: theme.palette.primary.main }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
              htmlInput: {
                maxLength: maxLength,
                style: multiline
                  ? {
                      backgroundColor: 'transparent',
                      borderRadius: 4,
                      margin: '-8.5px -14px',
                      padding: '8.5px 14px',
                    }
                  : {
                      backgroundColor: 'transparent',
                      borderRadius: 4,
                    },
                autoComplete: 'off',
                form: {
                  autoComplete: 'off',
                },
              },
            }}
            {...rest}
          />
        </FormControl>
      )}
    </>
  )
}

export default StylizedInput
