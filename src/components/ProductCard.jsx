import ProductModal from "../components/ProductModal";
import { useState } from "react";

export default function ProductCard({ product, onAdd }) {

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


  return (
    <div  className="border border-black p-4 rounded-lg flex flex-col">
                 <ProductModal
        productx={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {setModalOpen(false); console.log('closing')}}
      />
      <div  onClick={() => {
          setSelectedProduct(productExample);
          setModalOpen(true);
        }} className="h-56 bg-gray-100 rounded overflow-hidden mb-3">
        <img src={product.images?.[0] || '/placeholder.png'} alt={product.name} className="w-full h-full object-cover"/>
      </div>
      <h3  onClick={() => {
          setSelectedProduct(productExample);
          setModalOpen(true);
        }} className="text-lg font-semibold">{product.name}</h3>
      <p  onClick={() => {
          setSelectedProduct(productExample);
          setModalOpen(true);
        }} className="text-sm mt-1 text-gray-700 flex-1">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div  onClick={() => {
          setSelectedProduct(productExample);
          setModalOpen(true);
        }} className="text-xl font-bold">₦{(product.price/100).toLocaleString()}</div>
        <button className="px-3 py-1 border border-black rounded z-10" onClick={() => onAdd(product)}>Add to cart</button>
      </div>
    </div>
  )
}
