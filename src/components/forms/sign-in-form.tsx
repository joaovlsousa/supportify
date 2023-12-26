'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { SignInSchema, signInSchema } from '@/schemas'

import { Loader } from '@/components/layout/loader'
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

export function SignInForm() {
  const router = useRouter()

  const formMethods = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  })

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
  } = formMethods

  const onSubmit = async (data: SignInSchema) => {
    try {
      const res = await axios.post('/api/sign-in', data)

      if (res.status === 200) {
        toast.success('Sucesso')
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
            name="email"
            render={({ field }) => (
              <>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="seuemail@email.com"
                    {...field}
                  />
                </FormControl>
                {!isValid && (
                  <FormMessage>{errors.email?.message?.toString()}</FormMessage>
                )}
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
