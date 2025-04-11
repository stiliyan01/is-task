import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const CheckoutForm = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);

    const orderData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phoneNumber,
      address: formData.address,
      products: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.count,
        price: item.price,
      })),
      total: total.toFixed(2),
    };

    const submitOrder = async () => {
      setIsLoading(true);
      try {
        await api.post("/orders", orderData);
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/");
      } catch (err) {
        console.error("Грешка при поръчката:", err);
        alert("Възникна грешка при изпращането.");
      } finally {
        setIsLoading(false);
      }
    };

    submitOrder();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold" htmlFor="name">
          Име
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block font-semibold" htmlFor="address">
          Адрес
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block font-semibold" htmlFor="email">
          Имейл
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block font-semibold" htmlFor="phoneNumber">
          Телефон
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="flex justify-between items-center mt-6">
        <Link to="/" className="text-indigo-500 hover:text-indigo-700">
          Обратно в магазина
        </Link>
        <button
          type="submit"
          className={`${
            cart.length === 0 || isLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white px-6 py-3 rounded-lg`}
          disabled={cart.length === 0 || isLoading}
        >
          {isLoading ? "Изпращане..." : "Завърши поръчката"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
