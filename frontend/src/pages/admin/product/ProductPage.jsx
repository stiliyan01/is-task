import React, { useState, useEffect } from "react";
import api from "../../../api";
import Table from "../../../components/admin/Table";
import { Link, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [combinedProducts, setCombinedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Грешка при зареждане на продуктите", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Грешка при зареждане на категориите", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const mergedProducts = products.map((product) => {
      const category = categories.find((cat) => cat.id === product.category_id);
      return {
        ...product,
        category_name: category ? category.name : "Без категория",
      };
    });
    setCombinedProducts(mergedProducts);
  }, [products, categories]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Сигурни ли сте, че искате да изтриете този продукт?"
    );
    if (confirmDelete) {
      api.delete(`/products/${id}`).then(() => {
        setCombinedProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        navigate("/admin/products");
      });
    }
  };

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Име" },
    { key: "category_name", label: "Категория" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Продукти</h1>
        <Link
          to="/admin/products/create"
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md"
        >
          Създайте нов продукт
        </Link>
      </div>

      <Table
        data={combinedProducts}
        onDelete={handleDelete}
        columns={columns}
        textForLink="products"
      />
    </div>
  );
};

export default ProductPage;
