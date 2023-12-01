'use server'

import { cookies } from 'next/headers'

export function getToken(): string | undefined {
  const handleCookies = cookies()

  const token = handleCookies.get('token')

  return token?.value
}
