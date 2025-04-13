import React, { useState, useEffect } from "react";
import api from "../../../api";
import ProductForm from "../../../components/admin/product/ProductFrom";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";

const CreateProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {}
    };

    fetchCategories();
  }, []);

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
      await api.post("/products", product);
      navigate("/admin/products");
    } catch (error) {}
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold ">Създаване на продукт</h1>
        <BackButton />
      </div>

      <ProductForm
        product={product}
        onChange={handleChange}
        onSubmit={handleSubmit}
        categories={categories}
      />
    </div>
  );
};

export default CreateProductPage;
