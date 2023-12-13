import axios, { AxiosError } from 'axios'

import { ClientSchema } from '@/schemas'

async function getClients() {
  try {
    const res = await axios.get('http://localhost:3000/api/clients')

    const clients: ClientSchema[] = res.data

    return clients
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error)
      // redirect('/home')
    }
  }
}

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div>
      {clients?.map((client, index) => (
        <div key={index}>
          <h1>{client.name}</h1>
          <p>{client.role}</p>
        </div>
      ))}
    </div>
  )
}
