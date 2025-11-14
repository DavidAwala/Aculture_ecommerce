import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Header({ cartCount = 0, onOpenCart }) {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="w-full border-b border-black/10 backdrop-blur bg-white/80 fixed top-0 left-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-5">

          {/* LOGO */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full premium-border flex items-center justify-center overflow-hidden">
              <Image src="/logo.png" alt="AC Logo" width={56} height={56} />
            </div>
            <div>
              <div className="h-4" />
              <div className="text-sm uppercase tracking-widest font-semibold">
                A Culture
              </div>
            </div>
          </div>

          {/* ========= DESKTOP NAV ========= */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm uppercase hover:text-gray-900 font-semibold">
              Shop
            </Link>
            <Link href="/about" className="text-sm uppercase hover:text-gray-900 font-semibold">
              About
            </Link>
            <Link href="/FAQ" className="text-sm uppercase hover:text-gray-900 font-semibold">
              FAQs
            </Link>

            <button
              onClick={() => onOpenCart?.()}
              className="relative px-3 py-2 border border-black rounded-md"
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
                <span className="text-sm">{user.email}</span>
                <button onClick={signOut} className="px-3 py-2 border rounded">
                  Sign out
                </button>
              </div>
            ) : (
              <Link href="/login" className="px-3 py-2 border border-black rounded-md">
                Sign in
              </Link>
            )}
          </nav>

          {/* ===== MOBILE HAMBURGER ===== */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex flex-col gap-1 relative z-50"
          >
            <span className="w-7 h-0.5 bg-black transition-all"></span>
            <span className="w-7 h-0.5 bg-black transition-all"></span>
            <span className="w-7 h-0.5 bg-black transition-all"></span>
          </button>
        </div>
      </header>

      {/* ====== MOBILE SIDEBAR ====== */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-black/90 text-white z-50 transform 
        ${open ? "translate-x-0" : "translate-x-full"}
        transition-transform duration-500 ease-[cubic-bezier(.68,-0.35,.27,1.35)]`}
      >
        {/* BACKGROUND LOGO */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/logo.png"
            alt="bg logo"
            fill
            className="object-contain"
          />
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 flex flex-col gap-1"
        >
          <span className="w-7 h-0.5 bg-white rotate-45 translate-y-1"></span>
          <span className="w-7 h-0.5 bg-white -rotate-45 -translate-y-1"></span>
        </button>

        {/* SIDEBAR NAV */}
        <div className="relative z-20 flex flex-col items-start gap-6 mt-28 px-8">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="uppercase text-lg font-semibold tracking-wider"
          >
            Shop
          </Link>

          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="uppercase text-lg font-semibold tracking-wider"
          >
            About
          </Link>

          <Link
            href="/FAQ"
            onClick={() => setOpen(false)}
            className="uppercase text-lg font-semibold tracking-wider"
          >
            FAQs
          </Link>

          <button
            onClick={() => {
              setOpen(false);
              onOpenCart?.();
            }}
            className="uppercase text-lg font-semibold tracking-wider border border-white px-4 py-2 rounded-md"
          >
            Cart ({cartCount})
          </button>

          {user ? (
            <button
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              className="uppercase text-lg mt-3 border px-4 py-2 rounded-md"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="uppercase text-lg border px-4 py-2 rounded-md"
            >
              Sign in
            </Link>
          )}
        </div>
      </aside>

      {/* DARK BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
}
