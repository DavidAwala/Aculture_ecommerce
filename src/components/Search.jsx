import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-xl mx-auto bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-black transition"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for men’s wear, accessories, or brands..."
        className="flex-1 px-5 py-3 text-gray-700 focus:outline-none text-sm"
      />
      <button
        type="submit"
        className="bg-black text-white px-5 py-3 flex items-center justify-center hover:bg-gray-900 transition"
      >
      <i>search</i>
      </button>
    </form>
  );
}
