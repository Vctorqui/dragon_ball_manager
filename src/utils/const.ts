import { z } from 'zod'

export const raceOptions = [
  'Saiyan',
  'Human',
  'Namekian',
  'Frieza Race',
  'Android',
]
export const genderOptions = ['Male', 'Female', 'Other']

export const loginSchema = z.object({
  email: z.string().email({ message: 'Dirección de email no válida' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().min(3, { message: 'Nombre de usuario es requerido' }),
  email: z.string().email({ message: 'Dirección de email no válida' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const characterSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nombre de guerrero debe tener mas de dos caracteres' }),
  race: z.string({ message: 'Debes añadir la raza de tu guerrero' }),
  gender: z.string({ message: 'Debes añadir el genero de tu guerrero' }),
  ki: z.string().min(1, { message: 'Puedes tener 0 de ki' }),
  maxKi: z.string().min(1, { message: 'Seguro tienes mas poder maximo' }),
  description: z
    .string()
    .min(5, { message: 'La descripcion debe tener mas de 5 caracteres' }),
  image: z.any(),
})

export type CharacterSchema = z.infer<typeof characterSchema>
