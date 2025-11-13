import Header from '../components/Header'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import useCart from '../lib/useCart'
import { useState } from 'react'

export default function About() {
      const { cart, add, remove, updateQty } = useCart()
      const [cartOpen, setCartOpen] = useState(false)
  return (
    <div>
    <Header cartCount={cart.length} onOpenCart={() => setCartOpen(true)} />
<main className="bg-white text-gray-900 overflow-hidden">
  {/* Hero Section */}
  <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 overflow-hidden">
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight uppercase">
      The Story Behind <span className="text-black border-b-4 border-black pb-1">ACulture</span>
    </h1>
    <p className="max-w-3xl mt-6 text-lg text-gray-600 leading-relaxed">
      Redefining men’s fashion — ACulture blends premium style, confidence, and culture into every piece.
    </p>

    {/* Decorative blended images */}
    <div className="absolute inset-0 -z-10">
      <img
        src="/images/cloth-folds.png"
        alt="Fabric texture"
        className="absolute top-0 left-0 w-1/2 opacity-20 blur-lg"
      />
      <img
        src="/images/shoes-display.png"
        alt="Men shoes"
        className="absolute bottom-0 right-0 w-[60%] md:w-[40%] opacity-25 blur-md"
      />
      <img
        src="/images/watch-shadow.png"
        alt="Luxury watch"
        className="absolute bottom-10 left-10 w-[250px] opacity-20 blur-sm"
      />
    </div>
  </section>

  {/* The Journey */}
  <section className="px-6 md:px-16 py-24 bg-gray-50">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">How It All Started</h2>
        <p className="text-gray-700 leading-relaxed">
          ACulture was born from a vision — to give men access to fashion that speaks class,
          culture, and confidence. We noticed a gap between local style and global sophistication,
          so we decided to bridge it. What began as a small idea quickly evolved into a full-scale
          e-commerce experience for the modern man.
        </p>
        <p className="mt-6 text-gray-700 leading-relaxed">
          Every collection we release is a reflection of our values — quality, comfort, and boldness.
          From premium shirts and native wears to accessories that complete the look, each item
          is handpicked to elevate your style effortlessly.
        </p>
        <p className="mt-6 text-gray-700 leading-relaxed">
          We believe fashion should tell your story — strong, authentic, and unapologetically you.
        </p>
      </div>

      <div className="relative">
        <img
          src="/images/menswear-showcase.png"
          alt="Men’s fashion display"
          className="w-full rounded-2xl shadow-2xl"
        />
        <div className="absolute -bottom-6 -right-6 bg-white/70 backdrop-blur-lg px-5 py-3 rounded-xl shadow-md text-sm font-semibold uppercase tracking-wide">
          Established • 2022
        </div>
      </div>
    </div>
  </section>

  {/* Mission and Values */}
  <section className="px-6 md:px-16 py-24 bg-white">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">Our Mission</h2>
      <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
        To empower men through refined style. At ACulture, we believe true elegance isn’t loud —
        it’s in the details, the quality, and the confidence of how you wear it.  
        Our collections combine African-inspired creativity with a modern global edge, giving every
        man the power to dress with intention and pride.
      </p>
    </div>

    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mt-16 text-center">
      <div>
        <h3 className="text-xl font-semibold mb-2 uppercase">Quality First</h3>
        <p className="text-gray-600">We source the finest fabrics and craft each piece to last — because you deserve durability with class.</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 uppercase">Culture Meets Style</h3>
        <p className="text-gray-600">Our designs are inspired by African roots and modern streetwear, blended to reflect true originality.</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 uppercase">Customer-Centered</h3>
        <p className="text-gray-600">Your experience matters most. Every product, photo, and delivery is designed around your lifestyle.</p>
      </div>
    </div>
  </section>

  {/* About the Creator */}
  <section className="px-6 md:px-16 py-24 bg-gray-50">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">Meet the Founder</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        <img
          src="/images/creator.png"
          alt="Founder"
          className="w-48 h-48 object-cover rounded-full shadow-2xl border-4 border-black/10"
        />
        <div className="max-w-md text-left">
          <h3 className="text-2xl font-semibold">Awala Dave</h3>
          <p className="text-gray-700 mt-3 leading-relaxed">
            A visionary web developer and brand creator, passionate about building digital
            experiences that feel alive. Awala founded ACulture to redefine what it means
            to shop men’s wear — simple, refined, and cultural.
          </p>
          <p className="mt-4 text-gray-500 italic">
            “It’s not just fashion — it’s culture, confidence, and identity in one experience.”
          </p>
        </div>
      </div>
    </div>
  </section>
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
  );
}
