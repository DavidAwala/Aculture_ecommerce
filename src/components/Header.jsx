import Image from 'next/image'
import Link from "next/link";
import { useState } from 'react'
import useAuth from '../hooks/useAuth'

export default function Header({ cartCount = 0, onOpenCart }) {
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <header className="w-full border-b border-black/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full premium-border flex items-center justify-center overflow-hidden">
            <Image src="/logo.png" alt="AC Logo" width={56} height={56} />
          </div>
          <div>
            <div className="h-4" />
            <div className="text-sm uppercase tracking-widest font-semibold">A Culture</div>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm uppercase tracking-wider hover:text-gray-800 font-semibold">Shop</Link>
          <Link href="/about" className="text-sm uppercase tracking-wider hover:text-gray-500 transition-colors">About</Link>
          <Link href="/FAQ" className="text-sm uppercase tracking-wider hover:text-gray-800 font-semibold">FAQs</Link>
          <button
            onClick={() => onOpenCart?.()}
            className="relative px-3 py-2 border border-black rounded-md"
            aria-label="Open cart"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-sm">{user.email}</div>
              <button onClick={() => signOut()} className="px-3 py-2 border rounded">Sign out</button>
            </div>
          ) : (
            <Link href="/login" className="px-3 py-2 border border-black rounded-md">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
