'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { supportSchema, SupportSchema } from '@/schemas'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Store, User } from 'lucide-react'
import { Textarea } from '../ui/textarea'

interface NewSupportFormProps {
  clients: {
    id: string
    name: string
    role: 'PEOPLE' | 'COMPANY'
    address: {
      city: string
    }
  }[]
}

export function NewSupportForm({ clients }: NewSupportFormProps) {
  const router = useRouter()

  const formMethods = useForm<SupportSchema>({
    resolver: zodResolver(supportSchema),
    mode: 'onBlur',
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = formMethods

  const onSubmit = async (data: SupportSchema) => {
    try {
      const res = await axios.post('/api/supports', data)

      if (res.status === 201) {
        toast.success('Atendimento cadastrado')
        router.replace(`/supports/${res.data.id}`)
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
            name="clientId"
            render={({ field }) => (
              <>
                <FormLabel>Cliente</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        <div className="flex items-center gap-x-2">
                          {client.role === 'PEOPLE' ? (
                            <User className="w-4 h-4 text-rose-600" />
                          ) : (
                            <Store className="w-4 h-4 text-emerald-600" />
                          )}
                          <p>{client.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {' '}
                            - {client.address.city}
                          </p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </>
            )}
          />
        </FormItem>
        <FormItem>
          <FormField
            control={control}
            disabled={isSubmitting}
            name="title"
            render={({ field }) => (
              <>
                <FormLabel htmlFor="title">Assunto</FormLabel>
                <FormControl>
                  <Input id="title" {...field} />
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
            name="description"
            render={({ field }) => (
              <>
                <FormLabel htmlFor="description">Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    className="resize-none"
                    {...field}
                  />
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
            name="priority"
            render={({ field }) => (
              <>
                <FormLabel>Prioridade</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center space-x-6"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="HIGH" />
                      </FormControl>
                      <FormLabel className="font-normal">Alta</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="MEDIUM" />
                      </FormControl>
                      <FormLabel className="font-normal">Média</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="LOW" />
                      </FormControl>
                      <FormLabel className="font-normal">Baixa</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </>
            )}
          />
        </FormItem>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader label="Cadastrando atendimento..." />
          ) : (
            'Cadastrar atendimento'
          )}
        </Button>
      </form>
    </Form>
  )
}
