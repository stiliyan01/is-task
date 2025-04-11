import React, { useState, useEffect } from "react";
import Cart from "../components/checkout/Cart";
import CheckoutForm from "../components/checkout/Form";

function CheckoutPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Завърши поръчката
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Cart cart={cart} setCart={setCart} />
        <CheckoutForm cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default CheckoutPage;
