import { jwtDecode } from 'jwt-decode'
import { redirect } from 'next/navigation'
import { getToken } from './get-token'

interface User {
  sub: string
  name: string
  email: string
}

export async function getUser(): Promise<User> {
  const token = await getToken()

  if (!token) {
    redirect('/sign-in')
  }

  const user = jwtDecode<User>(token)

  return user
}
