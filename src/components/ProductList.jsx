import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProductList({ onCheckout }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    supabase.from("products").select("*").then(({ data }) => setProducts(data || []));
  }, []);

  const addToCart = (prod) => {
    setCart((c) => {
      const exist = c.find((x) => x.id === prod.id);
      if (exist) return c.map((x) => x.id === prod.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...prod, qty: 1 }];
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Available Products</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-3 rounded">
            <img
              src={p.images?.[0] || "/placeholder.png"}
              alt={p.name}
              className="h-40 w-full object-cover mb-2 rounded"
            />
            <h3 className="font-semibold">{p.name}</h3>
            <p>₦{(p.price / 100).toLocaleString()}</p>
            <button
              className="mt-2 px-3 py-1 bg-black text-white rounded"
              onClick={() => addToCart(p)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-2">Cart</h3>
          {cart.map((i) => (
            <div key={i.id} className="flex justify-between mb-2">
              <span>{i.name} × {i.qty}</span>
              <span>₦{((i.price * i.qty) / 100).toLocaleString()}</span>
            </div>
          ))}
          <button
            className="mt-4 w-full bg-green-600 text-white py-2 rounded"
            onClick={() => onCheckout(cart)}
          >
            Checkout with Paystack
          </button>
        </div>
      )}
    </div>
  );
}
