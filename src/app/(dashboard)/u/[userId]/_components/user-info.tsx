import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface UserInfoProps {
  label: string
  value: string | number
}

export function UserInfo({ label, value }: UserInfoProps) {
  return (
    <div className="md:w-3/5 space-y-1 p-3 rounded-md bg-gray-900">
      <Label className="text-muted-foreground">{label}</Label>
      <Input disabled value={value} className="border-0 disabled:cursor-text" />
    </div>
  )
}
