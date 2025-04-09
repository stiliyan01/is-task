import React from "react";
import { Link } from "react-router-dom";

const CheckoutForm = ({ formData, handleChange, handleSubmit, cart }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      disabled={cart.length === 0}
    >
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
          Адрес за доставка
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
          Имейл адрес
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
          Телефонен номер
        </label>
        <input
          type="number"
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
            cart.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white px-6 py-3 rounded-lg`}
          disabled={cart.length === 0}
        >
          Завърши поръчката
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
