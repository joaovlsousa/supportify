'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { SignUpSchema, signUpSchema } from '@/schemas'

import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function SignUpForm() {
  const router = useRouter()

  const formMethods = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  })

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = formMethods

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const res = await axios.post('/api/sign-up', data)

      if (res.status === 201) {
        toast.success('Usuário criado')
        router.replace('/home')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error as string)
      }
    }
  }

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/5 space-y-4">
        <FormItem>
          <FormField
            control={control}
            disabled={isSubmitting}
            name="name"
            render={({ field }) => (
              <>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <FormControl>
                  <Input id="name" {...field} />
                </FormControl>
                <FormMessage>{errors.name?.message?.toString()}</FormMessage>
              </>
            )}
          />
        </FormItem>
        <FormItem>
          <FormField
            control={control}
            disabled={isSubmitting}
            name="email"
            render={({ field }) => (
              <>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <FormControl>
                  <Input id="email" {...field} />
                </FormControl>
                <FormMessage>{errors.email?.message?.toString()}</FormMessage>
              </>
            )}
          />
        </FormItem>
        <FormItem>
          <FormField
            control={control}
            disabled={isSubmitting}
            name="password"
            render={({ field }) => (
              <>
                <FormLabel htmlFor="password">Senha</FormLabel>
                <FormControl>
                  <Input id="password" type="password" {...field} />
                </FormControl>
                <FormMessage>
                  {errors.password?.message?.toString()}
                </FormMessage>
              </>
            )}
          />
        </FormItem>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Loader label="Entrando..." /> : 'Entrar'}
        </Button>
      </form>
    </Form>
  )
}
