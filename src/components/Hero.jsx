// import Image from 'next/image'

// export default function Hero({ onShop }) {
//   return (
//     <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6 items-stretch">
//       {/* Large left image area */}
//       <div className="md:col-span-2 bg-gray-50 border border-black p-6 flex items-end">
//         <div className="w-full h-[420px] relative">
//           <Image
//             src="/placeholder-hero.jpg"
//             alt="Hero product"
//             fill
//             style={{ objectFit: 'cover' }}
//             className="rounded-md"
//           />
//         </div>
//         {/* overlay text bottom-left */}
//         <div className="absolute left-12 bottom-28 bg-white/90 p-6 border border-black rounded shadow">
//           <h1 className="h1-brand text-4xl uppercase">A CULTURE</h1>
//           <p className="mt-2 text-sm max-w-md">Premium men’s clothing — timeless cuts for everyday wear.</p>
//           <div className="mt-4">
//             <button onClick={onShop} className="px-4 py-2 border border-black rounded uppercase text-sm">Shop Men’s</button>
//           </div>
//         </div>
//       </div>

//       {/* right small feature box */}
//       <div className="bg-white border border-black p-6 flex flex-col justify-between">
//         <div>
//           <div className="text-xs uppercase tracking-widest">New Arrival</div>
//           <h2 className="h1-brand text-2xl mt-2">Tailored Linen Shirt</h2>
//           <p className="mt-3 text-sm text-gray-700">Lightweight, breathable — perfect for day-to-night.</p>
//         </div>
//         <div className="mt-4 flex items-center justify-between">
//           <div>
//             <div className="text-xl font-bold">₦9,999</div>
//             <div className="text-xs">Limited stock</div>
//           </div>
//           <div>
//             <button className="px-3 py-2 border border-black rounded">View</button>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
// We no longer need the Image import for this new layout
// import Image from 'next/image'

'use client'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image';
import ProductModal from "../components/ProductModal";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

export default function Hero({ onShop, cartCount = 0, onOpenCart }) {

 const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const productExample = {
    title: "ACulture Premium Denim Jacket",
    brand: "ACulture Men’s Line",
    price: 120,
    image: "/images/denim.png",
    gallery: ["/images/denim1.png", "/images/denim2.png", "/images/denim3.png"],
    description:
      "This premium denim jacket from ACulture is designed for the modern man — durable, stylish, and infused with cultural depth. Crafted from 100% organic cotton with reinforced stitching, it blends timeless design and exceptional comfort for everyday luxury.",
    rating: 4,
    reviews: 89,
    inStock: 14,
    colors: ["#000000", "#4444ff", "#d1d1d1"],
    sizes: ["S", "M", "L", "XL"],
    ageRange: "18–40",
    type: "Casual Outerwear",
    material: "Organic Cotton",
    origin: "Made in Nigeria",
  };

const slides = [
  { img: '/ph_1.png', title: 'Premium Men’s Collection', desc: 'Timeless cuts for every occasion.', price: '₦9,999', ls:'Limited stock'},
  { img: '/ph_3.png', title: 'Luxury Streetwear', desc: 'Modern comfort meets bold style.', price: '₦12,595', ls:'Limited stock' },
  { img: '/ph_2.png', title: 'Classic Tailored Fits', desc: 'Confidence starts with the right fit.', price: '₦14,999', ls:'Limited stock' }
]

const [current, setCurrent] = useState(0)
const [progress, setProgress] = useState(0)
const [open, setOpen] = useState(false);
const { user, signOut } = useAuth();
const duration = 10000 // 5 seconds per slide
const intervalRef = useRef(null)

useEffect(() => {
  let start = Date.now()

  const tick = () => {
    const elapsed = Date.now() - start
    const percent = (elapsed / duration) * 100

    if (percent >= 100) {
      nextSlide()
      start = Date.now()
    } else {
      setProgress(percent)
    }
  }

  intervalRef.current = setInterval(tick, 100)
  return () => clearInterval(intervalRef.current)
}, [current])

const nextSlide = () => {
  setCurrent((prev) => (prev + 1) % slides.length)
  setProgress(0)
}

const prevSlide = () => {
  setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  setProgress(0)
}

const handleSelect = (i) => {
  setCurrent(i)
  setProgress(0)
}


  // This section now implements the precise 6-div layout you provided.
  // Note that div2, div3, div4, and div5 overlap, so we use
  // z-index utilities (e.g., z-10, z-20) to manage the stacking order.
  return (
    <section 
      className="
        max-w-full mx-auto p-3 min-h-[600px] 
        grid 
        gap-0
        grid-cols-[0.5fr_repeat(3,1fr)_1.5fr] 
        grid-rows-[0.1fr_repeat(2,1fr)_0.5fr_1fr]
        lg:grid-rows-[0.5fr_repeat(2,1fr)_0.5fr_1fr]
      "
    >
    {/* div1 = grid area (row 1–4, column 5–6) */}
<div className="row-[1/4] col-[5/6] border border-black p-4 z-10">
  {slides.map((slide, i) => (
    <div
      key={i}
      className={`flex flex-col justify-between items-start h-[90%] ${
        i === current ? 'block' : 'hidden'
      }`}
    >
      <div claassName="flex flex-col justify-between items-start">
        <div className="text-xs uppercase tracking-widest">New Arrival</div>
        <h2 className="h1-brand text-2xl mt-8">{slide.title}</h2>
        <p className="mt-8 text-sm text-gray-700">{slide.desc}</p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between w-full">
        <div>
          <div className="text-xl font-bold">{slide.price}</div>
          <div className="text-xs">{slide.ls}</div>
        </div>

        <div className="text-left">
          <button onClick={() => {
          setSelectedProduct(productExample);
          setModalOpen(true);
        }} 
           className="px-3 mt-6 sm:mt-0 py-2 border border-black rounded">
            View
          </button>
        </div>

      </div>
    </div>
  ))}
</div>

      {/* .div2 { grid-area: 1 / 1 / 5 / 5; } */}
      {/* This is the base layer that others sit on top of */}
 <div className="row-[1/5] col-[1/5] border border-black p-4 flex items-center justify-center" 
  >
  {slides.map((slide, i) => (
  <div key={i} className={`relative pt-6 z-10 w-[13rem] h-[15rem] md:w-[70%] md:h-[100%] ${i === current ? 'block' : 'hidden'} animate-pulse-scale`}>
    <Image
      src={slide.img}
      alt={`Slide ${i + 1}`}
      fill
      style={{ objectFit: 'cover' }}
      className=''
    />
  </div>
  ))}
</div>

      
      {/* .div3 { grid-area: 4 / 4 / 5 / 5; } */}
      {/* This overlaps div2 */}
      <div className="row-[4/5] col-[4/5] border border-black p-4 z-10">
      
     

      </div>

      {/* .div4 { grid-area: 4 / 4 / 6 / 6; } */}
      {/* This overlaps div2 and div3 */}
      <div className="row-[4/6] col-[4/6] bg-white border border-black p-4 z-20">
        <div className="flex justify-between">
         <div className="relative">
           <h1 className="h1-brand text-4xl uppercase">A CULTURE</h1>
           <p className="mt-2 text-sm max-w-md">Premium men’s clothing — timeless cuts for everyday wear.</p>
           <div className="sm:mt-[3rem]">
             <button onClick={onShop} className="px-4 py-2 border border-black rounded uppercase text-sm">Shop Men’s</button>
           </div>
           </div>
           
              {/* BACKGROUND LOGO */}
                              <div className="sm:hidden absolute inset-0 opacity-10">
                                <Image
                                  src="/logo.png"
                                  alt="bg logo"
                                  fill
                                  className="object-contain"
                                />
                              </div>
           <div className="relative b-20 w-22 h-22 flex items-center justify-center overflow-hidden">
                    <Image className="hidden sm:block" src="/logo.png" alt="AC Logo" width={200} height={200}/>
                </div>
         </div>
      </div>

      {/* .div5 { grid-area: 1 / 1 / 2 / 4; } */}
      {/* This overlaps div2 */}
      <div className="row-[1] col-[1/2] lg:col-[1/4] bg-white border border-t-white border-l-white border-black p-1 z-10">
       

        <div className="hidden max-w-6xl mx-auto flex items-center justify-between p-1">
                <div className="flex items-center gap-4">
                  <div className="w-22 h-22 flex items-center justify-center overflow-hidden">
                    <Image src="/logo.png" alt="AC Logo" width={80} height={80}/>
                  </div>
                  <div>
                    <div className="h-4" />
                  </div>
                </div>
        
                <nav className="flex items-center gap-6">
                  <a className="text-sm uppercase tracking-wider" href="#">
                    <Link href="/" className="hover:text-gray-800 font-semibold">Shop</Link>
                      </a>
                  <a className="text-sm uppercase tracking-wider" href="#">
                    <Link href="/about" className="hover:text-gray-500 transition-colors">
                        About
                          </Link>
                          </a>
                  <a className="text-sm uppercase tracking-wider" href="#">
                    <Link href="/FAQ" className="hover:text-gray-800 font-semibold">FAQs</Link>
                      </a>
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
                   <Link href="/login" className="px-3 py-2 border border-black rounded-md">Sign in</Link>
                </nav>
              </div>

                         {/* ===== MOBILE HAMBURGER ===== */}
                            <button
                          onClick={() => setOpen(true)}
                          className="lg:hidden flex p-2 flex-col gap-1 relative z-50"
                          >
                        <span className="w-7 h-0.5 bg-black transition-all"></span>
                        <span className="w-7 h-0.5 bg-black transition-all"></span>
                        <span className="w-7 h-0.5 bg-black transition-all"></span>
                        </button>
                 

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

      </div>

      {/* .div6 { grid-area: 5 / 1 / 6 / 4; } */}
      {/* This is adjacent to div2 (starts where div2 ends) */}
      <div className="row-[5/6] col-[1/4] bg-black border border-black max-[640px]:p-2 p-4 z-10">
       

          <div className='flex max-[640px]:gap-6 max-[640px]:flex-col flex-row justify-between px-2 sm:px-8 items-center'>
      {/* INDICATOR + TOGGLE */}
      <div className="flex flex-col items-center max-[640px]:mb-6 justify-center z-30">
        {/* Progress Bar */}
        <div className="w-60 max-[640px]:w-20 max-[640px]:h-[1.2rem] h-[1.5rem] bg-white overflow-hidden rounded">
          <div 
            className="h-full bg-black transition-all duration-150" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Circle Indicators */}
        <div className="flex my-2 gap-3">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-3 h-3  max-[640px]: rounded-full border border-white transition-all ${
                current === i ? 'bg-white scale-110' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>
                            {/* PREV & NEXT BUTTONS */}
                <div className='flex flex-row justify-center items-center max-[640px]:gap-5 gap-10'>
      <button
        onClick={prevSlide}
        className="w-16 max-[640px]:w-10 max-[640px]:h-28 max-[640px]:text-2xl h-40 border border-white text-white flex items-center justify-center text-6xl font-bold z-30 transition"
        aria-label="Previous Slide"
      >
        &lt;
      </button>

      <button
        onClick={nextSlide}
        className="w-16 h-40 max-[640px]:w-10 max-[640px]:h-28 max-[640px]:text-2xl h-40 border border-white text-white flex items-center justify-center text-6xl font-bold z-30 transition"
        aria-label="Next Slide"
      > &gt; </button>   
    </div>
    </div>


      </div>
    <ProductModal
          productx={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
  
    </section>
  )
}