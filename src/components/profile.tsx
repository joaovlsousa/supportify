import { Settings, User } from 'lucide-react'
import Link from 'next/link'

import { getUser } from '@/actions/get-user'

import { LogOut } from '@/components/logout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export async function Profile() {
  const user = await getUser()
  const fallbackLabel = user.name.charAt(0).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer transition hover:ring-2 hover:ring-primary">
          <AvatarImage />
          <AvatarFallback className="text-white bg-gradient-to-bl from-violet-600 via-rose-600 to-sky-800">
            {fallbackLabel}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mt-1 p-2">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/u/${user.sub}`}>
            <User className="mr-2 h-4 w-4" />
            <span>Conta</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/u/${user.sub}/#settings`}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
