// pages/login.jsx
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";


export default function Login() {
  const { user, signInEmail, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // If logged in
  if (user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <h2 className="text-2xl font-bold mb-3">Welcome, {user.email}</h2>
        <p className="text-gray-300 mb-6">You're securely logged in.</p>

        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
            onClick={() => router.push("/")}
          >
            Go to Shop
          </button>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            onClick={signOut}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // If not logged in
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 relative">
      <div
        className="absolute top-6 left-6 flex items-center text-gray-700 cursor-pointer hover:text-black transition"
        onClick={() => router.push("/")}
      >
       <Link href="/"> <i className="fas fa-arrow-left text-black"></i> Back to Home
      </Link> </div>

      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[90%] max-w-md transition-all duration-500">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Sign in to access your premium experience.
        </p>

        {message && (
          <div
            className={`mb-4 text-center p-2 rounded-lg ${
              message.includes("sent")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="relative mb-6">
          <i className="fas fa-envelope relative text-black t-3 l-3"></i>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-black text-gray-800"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
          onClick={async () => {
            setLoading(true);
            try {
              await signInEmail(email);
              setMessage("✅ Magic link sent! Check your inbox.");
            } catch (err) {
              setMessage("❌ Failed to send magic link. Try again.");
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Sending..." : <> <i className="fas fa-lock"></i> Send Magic Link </>}
        </button>

        <div className="text-center mt-8 text-sm text-gray-500">
          🔒 Secured by{" "}
          <span className="font-semibold text-black">Supabase</span>
        </div>
      </div>
    </div>
  );
}
