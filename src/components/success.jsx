import { useRouter } from 'next/router'
export default function Success() {
  const router = useRouter()
  const { reference } = router.query
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl text-center border border-black p-8">
        <h1 className="text-2xl font-bold">Payment confirmed</h1>
        <p className="mt-3">Thank you — your payment was successful.</p>
        <p className="mt-2 text-sm">Reference: <strong>{reference}</strong></p>
        <a href="/" className="mt-6 inline-block px-4 py-2 border border-black rounded">Continue shopping</a>
      </div>
    </div>
  )
}
