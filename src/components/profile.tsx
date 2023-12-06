import { getUser } from '@/actions/get-user'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export async function Profile() {
  const user = await getUser()

  const fallbackLabel = user.name.charAt(0).toUpperCase()
  return (
    <Avatar>
      <AvatarImage />
      <AvatarFallback className="text-white bg-gradient-to-bl from-violet-600 via-rose-600 to-sky-800">
        {fallbackLabel}
      </AvatarFallback>
    </Avatar>
  )
}
