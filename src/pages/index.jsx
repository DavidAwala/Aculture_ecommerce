import Header from '../components/Header'
import Hero from '../components/Hero'
import SearchBar from '../components/Search'
import Newsletter from '../components/News'
import Marquee from '../components/Marquee'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import useCart from '../lib/useCart'
import Link from "next/link";
import { useState, useMemo } from 'react'

const SAMPLE_PRODUCTS = [
  {
    id: 'p1',
    name: 'Tailored Linen Shirt',
    description: 'Lightweight linen shirt with neat tailored fit.',
    price: 999900, // price in kobo (₦9,999.00) - /100 later
    images: ['/ph_4p.png']
    ,category: 'Shirts'
  },
  {
    id: 'p2',
    name: 'Classic Bomber Jacket',
    description: 'Everyday bomber with premium lining.',
    price: 1999900,
    images: ['/ph_5p.png']
    ,category: 'Outerwear'
  },
  {
    id: 'p3',
    name: 'Everyday Tee',
    description: 'Soft cotton tee, relaxed fit.',
    price: 399900,
    images: ['/ph_6p.png']
    ,category: 'Shirts'
  },
  {
    id: 'p4',
    name: 'Slim Chinos',
    description: 'Tailored chinos with a modern silhouette.',
    price: 1299900,
    images: ['/ph_7p.png']
    ,category: 'Bottoms'
  }
]

export default function Home() {
  const { cart, add, remove, updateQty } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => {
    const cats = Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.category)))
    return ['All', ...cats]
  }, [])

  const filtered = useMemo(() => {
    return SAMPLE_PRODUCTS.filter(p => {
      if (activeCategory !== 'All' && p.category !== activeCategory) return false
      if (!search) return true
      const q = search.toLowerCase()
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    })
  }, [search, activeCategory])

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header cartCount={cart.length} onOpenCart={() => setCartOpen(true)} /> */}
      <main className="flex-1">
        <Hero onShop={() => window.scrollTo({ top: 800, behavior: 'smooth' })} cartCount={cart.length} onOpenCart={() => setCartOpen(true)} />
          <Marquee/>
        {/* Promo stripe */}
        <div className="bg-black text-white py-2 mt-6">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm">
            Free shipping on orders over ₦80,000
          </div>
        </div>

        {/* Product grid */}
        <section id="products" className="max-w-6xl mx-auto p-6">
          <div className="flex max-[640px]:flex-col items-center justify-between mb-4">
            <h2 className="h1-brand text-2xl">Featured</h2>
            <div className="flex items-center gap-3">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="border px-3 py-2 rounded-md" />
              <Link href="/" className="px-3 py-2 bg-black text-white rounded">Search</Link>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1 border rounded ${activeCategory===cat? 'bg-black text-white' : ''}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={(prod) => add(prod, 1)} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-6xl mx-auto p-6">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-black p-6 text-center hover:bg-black hover:text-white">Shirts</div>
            <div className="border border-black p-6 text-center hover:bg-black hover:text-white">Outerwear</div>
            <div className="border border-black p-6 text-center hover:bg-black hover:text-white">Accessories</div>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQty={(id, qty) => updateQty(id, qty)}
        remove={(id) => remove(id)}
      />
    </div>
  )
}

