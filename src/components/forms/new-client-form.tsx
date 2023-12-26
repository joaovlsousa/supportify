'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { MapPinned } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ClientSchema, clientSchema } from '@/schemas'

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function NewClientForm() {
  const router = useRouter()

  const formMethods = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
    mode: 'onBlur',
  })

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = formMethods

  const onSubmit = async (data: ClientSchema) => {
    try {
      const res = await axios.post('/api/clients', data)

      if (res.status === 201) {
        toast.success('Cliente cadastrado')
        router.replace(`/clients/${res.data.id}`)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error as string)
      }
    }
  }

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormItem>
          <FormField
            control={control}
            disabled={isSubmitting}
            name="role"
            render={({ field }) => (
              <>
                <FormLabel>Tipo do cliente</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center space-x-6"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="PEOPLE" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Pessoa Física
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="COMPANY" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Pessoa Jurídica
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </>
            )}
          />
        </FormItem>
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
        <div className="w-fit flex items-center pb-1 pr-6 border-b-2 border-primary">
          <MapPinned className="w-5 h-5 mr-2" />
          <h3 className="text-lg font-medium">Endereço</h3>
        </div>
        <FormItem>
          <FormField
            control={control}
            disabled={isSubmitting}
            name="address.city"
            render={({ field }) => (
              <>
                <FormLabel htmlFor="address.city">Cidade</FormLabel>
                <FormControl>
                  <Input id="address.city" {...field} />
                </FormControl>
                <FormMessage>
                  {errors.address?.city?.message?.toString()}
                </FormMessage>
              </>
            )}
          />
        </FormItem>
        <FormItem>
          <FormField
            control={control}
            disabled={isSubmitting}
            name="address.street"
            render={({ field }) => (
              <>
                <FormLabel htmlFor="address.street">Rua</FormLabel>
                <FormControl>
                  <Input id="address.street" {...field} />
                </FormControl>
                <FormMessage>
                  {errors.address?.street?.message?.toString()}
                </FormMessage>
              </>
            )}
          />
        </FormItem>
        <FormItem>
          <FormField
            control={control}
            disabled={isSubmitting}
            name="address.number"
            render={({ field }) => (
              <>
                <FormLabel htmlFor="address.number">Número</FormLabel>
                <FormControl>
                  <Input id="address.number" {...field} />
                </FormControl>
                <FormMessage>
                  {errors.address?.number?.message?.toString()}
                </FormMessage>
              </>
            )}
          />
        </FormItem>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader label="Cadastrando cliente..." />
          ) : (
            'Cadastrar cliente'
          )}
        </Button>
      </form>
    </Form>
  )
}
