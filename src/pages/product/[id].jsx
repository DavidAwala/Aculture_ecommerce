import { useRouter } from 'next/router'
import Header from '../../components/Header'

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Product {id}</h1>
        <p className="mt-4">This is a minimal product page for product id {id}.</p>
      </main>
    </div>
  )
}
