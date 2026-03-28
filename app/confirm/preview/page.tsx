import ConfirmPage from '@/components/ConfirmPage'

interface PageProps {
  searchParams: Promise<{ state?: string }>
}

export default async function ConfirmPreviewPage({ searchParams }: PageProps) {
  const params = await searchParams
  const alreadyConfirmed = params.state === 'confirmed'
  return <ConfirmPage alreadyConfirmed={alreadyConfirmed} />
}
