import { setToken } from '@/actions/set-token'
import { api } from '@/lib/api'
import { signUpSchema } from '@/schemas'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const payload = signUpSchema.safeParse(body)

  if (!payload.success) {
    return NextResponse.json(
      { error: 'Credenciais inválidas' },
      { status: 400 },
    )
  }

  try {
    const res = await api.post('/sign-up', payload.data)

    if (res.status !== 201) {
      return NextResponse.json(res.data, { status: res.status })
    }

    const { token } = res.data

    await setToken(token)

    return NextResponse.json(token, { status: 201 })
  } catch (error) {
    console.log('Sign up error', error)
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { error: error.response?.data.error as string },
        { status: error.status },
      )
    }
  }
}
