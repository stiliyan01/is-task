import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

const CategoryForm = () => {
  const [category, setCategory] = useState({ name: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/categories", category);
      navigate(-1);
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="name"
        >
          Име на категорията
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={category.name}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-blue-700"
        >
          {category.id ? "Запази промените" : "Създай категория"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
