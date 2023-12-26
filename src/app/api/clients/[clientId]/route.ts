import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { getToken } from '@/actions/get-token'
import { api } from '@/lib/api'

export async function DELETE(
  req: Request,
  { params }: { params: { clientId: string } },
) {
  try {
    const token = await getToken()

    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    const res = await api.delete(`/clients/${params.clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return NextResponse.json(null, { status: res.status })
  } catch (error) {
    console.log('DELETE clients error', error)
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
