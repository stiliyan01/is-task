import React, { useState, useEffect } from "react";
import api from "../../../api";
import CategoryForm from "../../../components/admin/category/CategoryForm";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";

const EditCategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({ name: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get(`/categories/${id}`);

        if (!response.data || !response.data.id) {
          setNotFound(true);
        } else {
          setCategory(response.data);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setNotFound(true);
        }
      } finally {
        setIsLoading(false);
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
      navigate(-1);
    } catch (error) {
      console.error("Грешка при запазване:", error);
    }
  };

  if (notFound) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Категорията не е намерена.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Редактиране на категория</h1>
        <BackButton />
      </div>

      {isLoading ? (
        <div className="text-gray-600">Зареждане...</div>
      ) : (
        <CategoryForm
          category={category}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default EditCategoryPage;
