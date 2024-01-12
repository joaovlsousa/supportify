import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface UserInfoProps {
  label: string
  value: string | number
}

export function UserInfo({ label, value }: UserInfoProps) {
  return (
    <div className="space-y-1 p-3 rounded-md">
      <Label className="text-muted-foreground">{label}</Label>
      <Input disabled value={value} className="disabled:cursor-text" />
    </div>
  )
}
