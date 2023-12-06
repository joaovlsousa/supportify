'use server'

import { cookies } from 'next/headers'

export async function getToken(): Promise<string | undefined> {
  const handleCookies = cookies()

  const token = handleCookies.get('token')

  return token?.value
}
