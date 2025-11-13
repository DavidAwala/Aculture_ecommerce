import { useEffect } from "react";
import Image from "next/image";

export default function ProductModal({ productx, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  if (!isOpen || !productx) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div style={{scrollbarWidth: 'none'}} className="relative bg-white w-full h-[100%] max-w-5xl rounded-3xl shadow-2xl p-4 overflow-y-auto animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-black hover:text-white transition p-2 rounded-full"
        >
          X
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Left - Product Gallery */}
          <div className="space-y-4">
            <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={productx.image}
                alt={productx.title}
                fill
                className="object-cover hover:scale-110 transition duration-700"
              />
            </div>

            {/* Thumbnail Row */}
            <div className="flex justify-center gap-3">
              {productx.gallery?.map((img, i) => (
                <div
                  key={i}
                  className="relative w-20 h-20 rounded-xl overflow-hidden border hover:border-black transition"
                >
                  <Image
                    src={img}
                    alt={`thumbnail-${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold uppercase">{productx.title}</h2>
              <p className="text-gray-500 mt-2">{productx.brand}</p>

              {/* Rating */}
              <div className="flex items-center mt-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <i
                      key={i}
                      className={`fa-star ${
                        i < productx.rating
                          ? "fas text-yellow-500"
                          : "far text-gray-300"
                      } text-lg mr-1`}
                    ></i>
                  ))}
                <span className="text-sm text-gray-500">
                  ({productx.reviews}+ reviews)
                </span>
              </div>

              {/* Price & Stock */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-semibold">${productx.price}</span>
                <span
                  className={`text-sm ${
                    productx.inStock > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {productx.inStock > 0
                    ? `${productx.inStock} in stock`
                    : "Out of stock"}
                </span>
              </div>

              {/* Description */}
              <p className="mt-5 text-gray-700 leading-relaxed">
                {productx.description}
              </p>

              {/* Color Options */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-2">Available Colors</h3>
                <div className="flex gap-3">
                  {productx.colors.map((color, i) => (
                    <button
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 ${
                        color === productx.selectedColor
                          ? "border-black scale-110"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Size Options */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-2">Available Sizes</h3>
                <div className="flex gap-3">
                  {productx.sizes.map((size, i) => (
                    <button
                      key={i}
                      className="px-4 py-2 border border-gray-400 rounded-md text-sm hover:bg-black hover:text-white transition"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <p><span className="font-semibold">Age Range:</span> {productx.ageRange}</p>
                <p><span className="font-semibold">Type:</span> {productx.type}</p>
                <p><span className="font-semibold">Material:</span> {productx.material}</p>
                <p><span className="font-semibold">Origin:</span> {productx.origin}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition">
                Add to Cart
              </button>
              <button className="flex-1 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
