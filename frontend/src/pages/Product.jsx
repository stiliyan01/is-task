import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/homepage/Header";
import api from "../api";

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        if (isMounted) {
          setProduct(response.data);
        }
      } catch (error) {
        if (isMounted) {
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, count: 1 }]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Header
        cart={cart}
        setCart={setCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />

      <Link to="/">
        <div className="mb-4 text-indigo-500 cursor-pointer hover:underline">
          &larr; Назад
        </div>
      </Link>

      {loading ? (
        <div className="text-center mt-10 text-gray-500">Зареждане...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-1">
            Категория:{" "}
            <span className="font-medium">{product.category?.name}</span>
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {product.description}
          </p>
          <p className="text-xl font-semibold text-indigo-600">
            {product.price} лв
          </p>
          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Добави в кошницата
          </button>
        </div>
      )}
    </div>
  );
}
