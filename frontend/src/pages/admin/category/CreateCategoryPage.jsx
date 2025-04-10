import React, { useState } from "react";
import api from "../../../api";
import CategoryForm from "../../../components/admin/category/CategoryForm";
import { useNavigate } from "react-router-dom";

const CreateCategoryPage = () => {
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
      navigate("/admin/categories");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Създаване на категория</h1>
      <CategoryForm
        category={category}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateCategoryPage;
