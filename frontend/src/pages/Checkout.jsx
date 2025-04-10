import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "../components/checkout/Cart";
import CheckoutForm from "../components/checkout/Form";

function CheckoutPage() {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    paymentMethod: "credit_card",
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
      const totalAmount = parsedCart.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      setTotal(totalAmount);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateItemCount = (id, change) => {
    setCart((prevCart) => {
      let updatedCart = prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              count: item.count + change,
            }
          : item
      );

      updatedCart = updatedCart.filter((item) => item.count > 0);

      const newTotal = updatedCart.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      setTotal(newTotal);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Поръчката е завършена!", formData, cart);

    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Завърши поръчката
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Cart cart={cart} updateItemCount={updateItemCount} />
        <CheckoutForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cart={cart}
        />
      </div>
    </div>
  );
}

export default CheckoutPage;
