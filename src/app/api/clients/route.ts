import { getToken } from '@/actions/get-token'
import { api } from '@/lib/api'
import { clientSchema } from '@/schemas'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const token = await getToken()

    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    const body = await req.json()
    const payload = clientSchema.safeParse(body)

    if (!payload.success) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 400 },
      )
    }

    const res = await api.post('/clients', payload.data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return NextResponse.json(res.data.client, { status: res.status })
  } catch (error) {
    console.log('POST clients error', error)
    if (error instanceof AxiosError) {
      if (error.code === 'ECONNREFUSED') {
        return NextResponse.json(
          { error: 'Erro ao acessar o servidor' },
          { status: 500 },
        )
      }

      return NextResponse.json(
        { error: error.response?.data.error as string },
        { status: error.response?.status },
      )
    }
  }
}
