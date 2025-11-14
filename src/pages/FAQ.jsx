import Header from '../components/Header'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import useCart from '../lib/useCart'
import { useState } from 'react'


const faqs = [
  {
    q: "What is ACulture all about?",
    a: "ACulture is a premium e-commerce brand focused on redefining men’s fashion through culture, confidence, and quality. We curate high-end clothing and accessories that speak style and identity.",
  },
  {
    q: "Where is ACulture located?",
    a: "Our main base is in Port Harcourt, Nigeria — proudly built for modern African men who love sophistication with cultural depth.",
  },
  {
    q: "Do you have a physical store?",
    a: "Currently, ACulture operates fully online to ensure nationwide and international access. However, pop-up events and store collaborations happen occasionally — stay tuned on our socials.",
  },
  {
    q: "How can I know when new arrivals drop?",
    a: "Follow us on Instagram and Facebook @ACultureOfficial or subscribe to our newsletter for instant alerts on new collections and limited editions.",
  },
  {
    q: "Do you offer international delivery?",
    a: "Yes. ACulture ships worldwide through trusted delivery partners to ensure fast and secure deliveries.",
  },
  {
    q: "How long does delivery take within Nigeria?",
    a: "Typically, orders take 2–5 working days depending on your location. Lagos, Abuja, and Port Harcourt orders often arrive faster.",
  },
  {
    q: "Do you accept refunds or exchanges?",
    a: "Yes. Refunds and exchanges are accepted within 7 days of delivery for unworn, undamaged products. Contact our support for assistance.",
  },
  {
    q: "What should I do if I receive a wrong or damaged item?",
    a: "Kindly reach out to our customer service immediately with your order number and item pictures. We’ll replace or refund your order swiftly.",
  },
  {
    q: "Can I track my order?",
    a: "Absolutely. Once your order ships, a tracking number and link will be sent to your email or WhatsApp for real-time updates.",
  },
  {
    q: "Do you restock sold-out items?",
    a: "Some of our premium collections are limited-edition. However, core classics and essentials are restocked periodically. You can sign up for restock alerts.",
  },
  {
    q: "Do you sell gift cards?",
    a: "Yes! ACulture gift cards are available — the perfect gift for birthdays, holidays, or any special occasion.",
  },
  {
    q: "Can I pre-order upcoming collections?",
    a: "Yes. We occasionally allow pre-orders for exclusive releases. Stay tuned to our website and newsletter for updates.",
  },
  {
    q: "How do I contact ACulture?",
    a: "You can reach us via email at support@aculture.com or WhatsApp at +234 812 345 6789. Our support hours are 9 AM – 7 PM daily.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept credit/debit cards, bank transfers, and mobile money (Paystack & Flutterwave). All payments are 100% secure.",
  },
  {
    q: "Is it safe to shop on ACulture?",
    a: "Yes. Your personal and payment data are encrypted using advanced SSL security. We take privacy seriously.",
  },
  {
    q: "Can I cancel my order?",
    a: "Orders can be canceled within 2 hours of placement if they haven’t been shipped. Contact support immediately for assistance.",
  },
  {
    q: "Do you have a loyalty program?",
    a: "Yes, our Loyalty Club rewards customers with exclusive discounts, early access to drops, and free delivery after repeated purchases.",
  },
  {
    q: "How often do you release new collections?",
    a: "New arrivals are released monthly, with limited-edition capsules every season.",
  },
  {
    q: "Can I collaborate or become a brand ambassador?",
    a: "Definitely! We’re open to influencer partnerships. Email collab@aculture.com with your portfolio or social links.",
  },
  {
    q: "Where can I follow ACulture online?",
    a: "Follow us on Instagram, Facebook, and Twitter @ACultureOfficial to stay updated on drops, trends, and fashion inspiration.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
    const { cart, add, remove, updateQty } = useCart()
    const [cartOpen, setCartOpen] = useState(false)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
  <div>
     <Header cartCount={cart.length} onOpenCart={() => setCartOpen(true)} />
    <main className="bg-white mt-10 sm:mt-2 text-gray-900">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-6 overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight uppercase">
          Frequently Asked <span className="border-b-4 border-black pb-1">Questions</span>
        </h1>
        <p className="max-w-2xl mt-6 text-lg text-gray-600 leading-relaxed">
          Everything you need to know about shopping with ACulture — quality, delivery, returns,
          and more.
        </p>

        {/* Subtle decorative background */}
        <img
          src="/images/pattern-shadow.png"
          alt="Luxury pattern"
          className="absolute w-[500px] md:w-[800px] opacity-20 blur-sm -z-10 bottom-0"
        />
      </section>

      {/* FAQ Accordion */}
      <section className="px-6 md:px-16 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-200 py-5">
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center text-left focus:outline-none"
              >
                <span className="font-semibold text-lg text-gray-800">
                  {faq.q}
                </span>
                <span className="text-gray-500 text-xl">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              <div
                className={`mt-3 text-gray-600 leading-relaxed transition-all duration-300 ease-in-out ${
                  openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Location */}
      <section className="px-6 md:px-16 py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">Get in Touch</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
            Have more questions or need help with an order?  
            Our support team is always ready to assist you.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left mb-4 md:text-center">
            <div>
              <h3 className="font-semibold text-lg mb-2 uppercase"> <i className="fas fa-map-marker-alt text-black"></i> Address</h3>
              <p className="text-gray-600">
                15 Admiralty Close, GRA Phase 2, Port Harcourt, Nigeria
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 uppercase"><i className="fas fa-phone text-black"></i> Contact</h3>
              <p className="text-gray-600">
                support@aculture.com  
                <br />
                +234 812 345 6789
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 uppercase"><i className="fas fa-clock text-black"></i> Working Hours</h3>
              <p className="text-gray-600">
                Monday – Saturday  
                <br />
                9:00 AM – 7:00 PM
              </p>
            </div>
          </div>

            {/* Contact Form */}
            <form className="max-w-2xl mx-auto grid grid-cols-1 gap-6 text-left">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
              <button
                type="submit"
                className="bg-black text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-900 transition"
              >
                Send Message
              </button>
            </form>
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
