import React, { useState, useEffect } from "react";
import api from "../../api";
import Table from "../../components/admin/Table";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [combinedProducts, setCombinedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);
  useEffect(() => {
    if (products.length > 0 && categories.length > 0) {
      const mergedProducts = products.map((product) => {
        const category = categories.find(
          (cat) => cat.id === product.category_id
        );
        return {
          ...product,
          category_name: category ? category.name : "Без категория",
        };
      });
      setCombinedProducts(mergedProducts);
      setIsLoading(false);
    }
  }, [products, categories]);
  const handleEdit = (product) => {
    console.log("Редактирай продукт", product);
  };

  const handleDelete = (id) => {
    console.log("Изтрий продукт с id", id);
  };
  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Име" },
    { key: "category_name", label: "Категория" },
    { key: "price", label: "Цена" },
  ];

  if (isLoading) {
    return <div>Зареждаме продуктите...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Продукти</h1>
      <Table
        data={combinedProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        columns={columns}
      />
    </div>
  );
};

export default ProductPage;
