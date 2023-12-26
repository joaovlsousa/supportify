import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { getToken } from '@/actions/get-token'

export async function DELETE(req: Request) {
  try {
    const token = await getToken()

    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    cookies().delete('token')

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao efetuar logout' },
      { status: 400 },
    )
  }
}
