import React, { useState, useEffect } from "react";
import api from "../../../api";
import Table from "../../../components/admin/Table";
import { Link, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [combinedProducts, setCombinedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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

  if (isLoading) {
    return <div>Зареждаме продуктите...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Продукти</h1>

        <div className="mb-4">
          <Link
            to="/admin/products/create"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md"
          >
            Създайте нов продукт
          </Link>
        </div>
      </div>

      <Table
        data={combinedProducts}
        onDelete={handleDelete}
        columns={columns}
        textForLink={"products"}
        // isForDetails={false}
      />
    </div>
  );
};

export default ProductPage;
