import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
})

export type SignUpSchema = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
})

export type SignInSchema = z.infer<typeof signInSchema>
