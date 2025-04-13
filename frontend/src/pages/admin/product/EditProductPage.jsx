import React, { useState, useEffect } from "react";
import api from "../../../api";
import ProductForm from "../../../components/admin/product/ProductFrom";

import { useParams, useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {}
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {}
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, product);
      navigate(-1);
    } catch (error) {}
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Редактиране на продукт</h1>
      <ProductForm
        product={product}
        onChange={handleChange}
        onSubmit={handleSubmit}
        categories={categories}
      />
    </div>
  );
};

export default EditProductPage;
