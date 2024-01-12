import { Settings, User } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getToken } from '@/actions/get-token'
import { api } from '@/lib/api'
import { formatDate } from '@/lib/utils'

import { LogOut } from '@/components/logout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { DeleteUser } from './_components/delete-user'
import { UpdateUsername } from './_components/update-username'
import { UserInfo } from './_components/user-info'

interface UserResponsePayload {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
  totalClients: number
}

async function getUserById(
  userId: string,
): Promise<UserResponsePayload | null> {
  try {
    const token = await getToken()

    if (!token) {
      return null
    }

    const res = await api.get(`/u/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    const userData: UserResponsePayload = res.data.currentUser

    return userData
  } catch (error) {
    return null
  }
}

export default async function UserPage({
  params,
}: {
  params: { userId: string }
}) {
  const user = await getUserById(params.userId)

  if (!user) {
    redirect('/sign-up')
  }

  const fallbackLabel = user.name.charAt(0).toUpperCase()
  const createdAt = formatDate(new Date(user.createdAt))
  const updatedAt = formatDate(new Date(user.updatedAt))

  return (
    <main className="scroll-smooth h-full flex justify-center px-2 md:px-0">
      <div className="w-full h-full space-y-4 md:w-[42rem] md:p-4 md:border md:rounded-md">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <h1 className="text-xl font-bold">Perfil</h1>
            </div>
            <LogOut variant="destructive" className="w-auto h-auto px-4 py-2" />
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage />
              <AvatarFallback className="text-3xl text-white font-semibold bg-gradient-to-bl from-violet-600 via-rose-600 to-sky-800">
                {fallbackLabel}
              </AvatarFallback>
            </Avatar>
            <div className="h-20 pt-4 space-y-1">
              <h3 className="text-sm font-semibold">{user.name}</h3>
              <h3 className="text-xs font-medium text-muted-foreground">
                {user.email}
              </h3>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
            <UserInfo label="E-mail de acesso" value={user.email} />
            <UserInfo
              label="Quantidade de clientes"
              value={user.totalClients}
            />
            <UserInfo label="Conta criada em" value={createdAt} />
            <UserInfo label="Última atualização" value={updatedAt} />
          </div>
        </section>
        <section id="settings" className="space-y-4">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <h1 className="text-xl font-bold">Configurações</h1>
          </div>
          <div className="space-y-4">
            <UpdateUsername currentUsername={user.name} />
            <DeleteUser />
          </div>
        </section>
      </div>
    </main>
  )
}
