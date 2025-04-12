import React, { useState, useEffect } from "react";
import api from "../../../api";
import CategoryForm from "../../../components/admin/category/CategoryForm";
import { useParams, useNavigate } from "react-router-dom";

const EditCategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({ name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get(`/categories/${id}`);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [id]);

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
      await api.put(`/categories/${id}`, category);
      navigate("/profile/categories");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Редактиране на категория</h1>
      <CategoryForm
        category={category}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditCategoryPage;
