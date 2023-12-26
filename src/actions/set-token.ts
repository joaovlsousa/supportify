'use server'

import { cookies } from 'next/headers'

export async function setToken(token: string): Promise<void> {
  cookies().set('token', token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
  })
}
