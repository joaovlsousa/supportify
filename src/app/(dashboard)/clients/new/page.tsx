import { NewClientForm } from '@/components/forms/new-client-form'
import { Separator } from '@/components/ui/separator'

export default function NewClientPage() {
  return (
    <div className="w-4/5 md:max-w-2xl space-y-6 m-auto">
      <div>
        <h2 className="text-xl font-semibold">Novo cliente</h2>
        <p className="text-sm text-muted-foreground">
          Preencha os dados referentes ao novo cliente para cadastrá-lo.
        </p>
      </div>
      <Separator />
      <NewClientForm />
    </div>
  )
}
