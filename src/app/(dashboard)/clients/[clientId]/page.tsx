export default async function ClientPage({
  params,
}: {
  params: { clientId: string }
}) {
  return <p>{params.clientId}</p>
}
