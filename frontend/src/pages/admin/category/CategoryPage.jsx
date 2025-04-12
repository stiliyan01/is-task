import React, { useState, useEffect } from "react";
import api from "../../../api";
import Table from "../../../components/admin/Table";
import { Link, useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Сигурни ли сте, че искате да изтриете тази категория?"
    );
    if (confirmDelete) {
      api.delete(`/categories/${id}`).then(() => {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
        navigate("/admin/categories");
      });
    }
  };

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Име на категория" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Категории</h1>
        <Link
          to="/profile/categories/create"
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md"
        >
          Създай категория
        </Link>
      </div>

      <Table
        data={categories}
        onDelete={handleDelete}
        columns={columns}
        textForLink="categories"
        // isForDetails={false}
      />
    </div>
  );
};

export default CategoryPage;
