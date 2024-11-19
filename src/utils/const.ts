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
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})
export type RegisterSchema = z.infer<typeof registerSchema>
