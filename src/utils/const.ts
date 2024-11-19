import { loginFormTypes, registerFormTypes } from '@/types/types'
import { z } from 'zod'

export const loginFormInit: loginFormTypes = {
  email: '',
  password: '',
  // name: '',
}

export const registerFormInit: registerFormTypes = {
  name: '',
  email: '',
  password: '',
  password_confirm: '',
}

export const loginSchema = z.object({
  email: z.string().email({ message: 'Dirección de email no válida' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    name: z.string().min(3, { message: 'Nombre de usuario es requerido' }),
    email: z.string().email({ message: 'Dirección de email no válida' }),
    password: z
      .string()
      .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm_password'],
  })
export type RegisterSchema = z.infer<typeof registerSchema>
