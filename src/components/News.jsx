import { useState } from "react";


export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setMessage("✅ Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="bg-black text-white py-20 px-6 md:px-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase">
        Join the ACulture Circle
      </h2>
      <p className="max-w-xl mx-auto text-gray-300 mb-8 leading-relaxed">
        Get exclusive updates on new arrivals, premium collections, and
        early-access offers — crafted for the cultured man.
      </p>

      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-2xl mx-auto"
      >
        <div className="relative flex items-center w-full sm:w-auto flex-1">
          <i className="fas fa-envelope text-white"></i>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-[350px] pl-12 pr-4 py-3 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-white transition"
          />
        </div>
        <button
          type="submit"
          className="px-8 py-3 rounded-full bg-white text-black font-semibold uppercase hover:bg-gray-200 transition"
        >
          Subscribe
        </button>
      </form>

      {message && (
        <p className="mt-6 text-sm text-gray-400 italic transition">{message}</p>
      )}

    </section>
  );
}
