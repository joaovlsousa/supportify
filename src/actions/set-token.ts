'use server'

import { cookies } from 'next/headers'

export async function setToken(token: string): Promise<void> {
  cookies().set('token', token)
}
