import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { getToken } from '@/actions/get-token'
import { setToken } from '@/actions/set-token'
import { api } from '@/lib/api'
import { updateUserSchema } from '@/schemas'
import { cookies } from 'next/headers'

export async function PATCH(req: Request) {
  try {
    const currentToken = await getToken()

    if (!currentToken) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    const body = await req.json()
    const payload = updateUserSchema.safeParse(body)

    if (!payload.success) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 400 },
      )
    }

    const res = await api.patch('/u', payload.data, {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    })

    const { token } = res.data

    await setToken(token)

    return NextResponse.json(null, { status: res.status })
  } catch (error) {
    console.log('PATCH user error', error)
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

export async function DELETE(req: Request) {
  try {
    const token = await getToken()

    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    const res = await api.delete('/u', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.status === 200) {
      cookies().delete('token')
    }

    return NextResponse.json(null, { status: res.status })
  } catch (error) {
    console.log('PATCH user error', error)
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
