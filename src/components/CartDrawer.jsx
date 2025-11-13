"use client";
import { useState } from "react";

export default function CartDrawer({ open, onClose, cart, updateQty, remove }) {
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: ""
  });

  if (!open) return null;

  // ✅ PAYSTACK CHECKOUT HANDLER
  async function checkout(e) {
    e.preventDefault();
    if (!form.email || !form.address || !form.phone || !form.name) {
      alert("Please fill all delivery details");
      return;
    }

    const sendCart = cart.map(i => ({ id: i.id, qty: i.qty }));

    const resp = await fetch("/api/checkout/paystack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        cart: sendCart, 
        email: form.email, 
        delivery: form 
      })
    });

    const json = await resp.json();
    if (json.authorization_url) {
      window.location.href = json.authorization_url; // ✅ redirect to Paystack
    } else {
      alert("Payment initialization failed");
    }
  }

  // ✅ Total Calculation
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0) / 100;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <aside className="w-96 bg-white border-l border-black p-6 overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">
            {checkoutMode ? "Checkout" : "Your Cart"}
          </h3>
          <button onClick={onClose} className="text-sm text-gray-600">
            Close
          </button>
        </div>

        {/* CART VIEW */}
        {!checkoutMode ? (
          cart.length === 0 ? (
            <div className="text-sm text-gray-600">Your cart is empty.</div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 border-b pb-3">
                  <img
                    src={item.images?.[0] || "/placeholder.png"}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm">
                      ₦{(item.price / 100).toLocaleString()}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={e =>
                          updateQty(item.id, parseInt(e.target.value || 1))
                        }
                        className="w-16 border px-2 py-1"
                      />
                      <button
                        className="text-sm text-gray-500 hover:text-black"
                        onClick={() => remove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-3">
                <div className="flex items-center justify-between font-bold">
                  <div>Total</div>
                  <div>₦{total.toLocaleString()}</div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setCheckoutMode(true)}
                    className="w-full px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          // ✅ CHECKOUT FORM VIEW
          <form onSubmit={checkout} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border px-3 py-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full border px-3 py-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border px-3 py-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Delivery Address</label>
              <textarea
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                className="w-full border px-3 py-2 mt-1"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                onClick={() => setCheckoutMode(false)}
                className="text-sm text-gray-600 hover:underline"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Pay ₦{total.toLocaleString()}
              </button>
            </div>
          </form>
        )}
      </aside>
    </div>
  );
}
