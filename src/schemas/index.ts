import { z } from 'zod'

export const signUpSchema = z.object({
  name: z
    .string({ required_error: 'Informe seu nome' })
    .min(1, 'Credenciais inválidas'),
  email: z
    .string({ required_error: 'Informe seu e-mail' })
    .email('E-mail inválido'),
  password: z
    .string({ required_error: 'Crie sua senha' })
    .min(6, 'Mínimo de 6 caracteres'),
})

export type SignUpSchema = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Informe seu e-mail' })
    .email('E-mail inválido'),
  password: z
    .string({ required_error: 'Insira a senha' })
    .min(6, 'Mínimo de 6 caracteres'),
})

export type SignInSchema = z.infer<typeof signInSchema>

export const clientSchema = z.object({
  name: z
    .string({ required_error: 'Informe o nome do cliente/empresa' })
    .min(1, 'Credenciais inválidas'),
  role: z.enum(['PEOPLE', 'COMPANY'], {
    required_error: 'Selecione o tipo do cliente',
  }),
  address: z.object({
    city: z
      .string({ required_error: 'Informe a cidade' })
      .min(1, 'Credenciais inválidas'),
    street: z
      .string({ required_error: 'Informe a rua' })
      .min(1, 'Credenciais inválidas'),
    number: z.coerce
      .number({
        required_error: 'Informe o número',
        invalid_type_error: 'Informe um número válido',
      })
      .positive('Número inválido'),
  }),
})

export type ClientSchema = z.infer<typeof clientSchema>

export const updateUserSchema = z.object({
  name: z.string({ required_error: 'Informe o nome' }).min(3, 'Nome inválido'),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>
