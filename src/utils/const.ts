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

export const registerSchema = z
  .object({
    name: z.string().min(3, { message: 'Nombre de usuario es requerido' }),
    email: z.string().email({ message: 'Dirección de email no válida' }),
    password: z
      .string()
      .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    confirm_password: z.string().min(6, {
      message:
        'La confirmación de la contraseña debe tener al menos 6 caracteres',
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm_password'],
  })
export type RegisterSchema = z.infer<typeof registerSchema>

export const characterSchema = z.object({
  name: z.string().min(2),
  race: z.string(),
  gender: z.string(),
  ki: z.string().min(1, { message: 'Puedes tener 0 de ki' }),
  maxKi: z.string().min(1, { message: 'Seguro tienes mas poder maximo' }),
  image: z.any(),
})

export type CharacterSchema = z.infer<typeof characterSchema>
