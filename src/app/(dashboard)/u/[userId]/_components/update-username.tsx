'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { UpdateUserSchema, updateUserSchema } from '@/schemas'

import { Loader } from '@/components/layout/loader'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface UpdateUsernameProps {
  currentUsername: string
}

export function UpdateUsername({ currentUsername }: UpdateUsernameProps) {
  const router = useRouter()

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    mode: 'onBlur',
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form

  async function onSubmit(data: UpdateUserSchema) {
    try {
      const res = await axios.patch('/api/u', data)

      if (res.status === 200) {
        toast.success('Nome alterado')
        router.refresh()
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error)
      }
    }
  }
  return (
    <div className="p-3 rounded-md">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-x-2"
        >
          <FormField
            name="name"
            control={control}
            defaultValue={currentUsername}
            render={({ field }) => (
              <div className="block space-y-1 flex-1">
                <FormLabel>Alterar nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>{errors.name?.message?.toString()}</FormMessage>
              </div>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-auto px-10"
          >
            {isSubmitting ? <Loader label="Alterando..." /> : 'Alterar'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
