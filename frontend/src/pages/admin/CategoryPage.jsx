import React, { useState, useEffect } from "react";
import api from "../../api";
import Table from "../../components/admin/Table";

const CategoryPage = () => {
  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Име" },
  ];

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleEdit = (category) => {
    console.log("Редактирай категория", category);
  };

  const handleDelete = (id) => {
    console.log("Изтрий категория с id", id);
  };

  if (isLoading) {
    return <div>Зареждаме категориите...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Категории</h1>
      <Table
        data={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        columns={columns}
      />
    </div>
  );
};

export default CategoryPage;
