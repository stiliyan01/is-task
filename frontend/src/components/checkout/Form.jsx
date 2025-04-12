import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import FlashMessage from "../FlashMessage";

export default function CheckoutForm({ cart, setCart }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMessageType, setFlashMessageType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setFormData({
          name: user.name || "",
          address: user.address || "",
          email: user.email || "",
          phoneNumber: user.phone_number || "",
        });
      } catch (error) {
        console.error("Неуспешно парсване на user:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);
    const storedUser = localStorage.getItem("user");
    let userId = null;

    if (storedUser) {
      try {
        userId = JSON.parse(storedUser)?.id;
      } catch {}
    }

    const orderData = {
      ...(userId && { user_id: userId }),
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
        setFlashMessage("Поръчката е успешно изпратена!");
        setFlashMessageType("success");
        setFormData({
          name: "",
          address: "",
          email: "",
          phoneNumber: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err) {
        console.log(err);
        setFlashMessage(
          "Грешка при изпращане на поръчката. Моля, опитайте отново."
        );
        setFlashMessageType("error");
      } finally {
        setIsLoading(false);
      }
    };

    submitOrder();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <FlashMessage
        message={flashMessage}
        type={flashMessageType}
        onClose={() => setFlashMessage("")}
      />
      <input
        type="text"
        name="name"
        placeholder="Име"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Адрес"
        value={formData.address}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Имейл"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Телефон"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 pt-4">
        <Link to="/" className="text-indigo-500 hover:underline">
          Обратно в магазина
        </Link>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <button
            type="submit"
            disabled={cart.length === 0 || isLoading}
            className={`${
              cart.length === 0 || isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white px-6 py-2 rounded-md transition`}
          >
            {isLoading ? "Изпращане..." : "Завърши поръчката"}
          </button>
          {!localStorage.getItem("token") && (
            <Link
              to="/login"
              className="bg-white border border-indigo-600 text-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-50 transition text-sm text-center"
            >
              Влез и завърши поръчката
            </Link>
          )}
        </div>
      </div>
    </form>
  );
}
