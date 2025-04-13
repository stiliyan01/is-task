import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => (
  <Link to={`/product/${product.id}`} className="block">
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500">Цена: {product.price} лв</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
        className="mt-4 w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-700"
      >
        Добави в кошницата
      </button>
    </div>
  </Link>
);

export default ProductCard;
