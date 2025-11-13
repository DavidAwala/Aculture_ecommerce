import { useEffect, useState } from 'react'

export default function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ac_cart')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('ac_cart', JSON.stringify(cart))
  }, [cart])

  function add(product, qty = 1) {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id)
      if (found) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p)
      }
      return [...prev, { ...product, qty }]
    })
  }

  function remove(id) {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  function updateQty(id, qty) {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p))
  }

  const total = cart.reduce((s, p) => s + (p.price * p.qty), 0)

  return { cart, add, remove, updateQty, total, setCart }
}
