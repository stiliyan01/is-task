import React, { useState, useEffect } from "react";
import api from "../../../api";
import ProductForm from "../../../components/admin/product/ProductFrom";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";

const EditProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get("/categories"),
        ]);

        if (!productRes.data || !productRes.data.id) {
          setNotFound(true);
        } else {
          setProduct(productRes.data);
          setCategories(categoriesRes.data);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setNotFound(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
    } catch (error) {
      console.error("Грешка при запазване на продукта:", error);
    }
  };

  if (notFound) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Продуктът не е намерен.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Редактиране на продукт</h1>
        <BackButton />
      </div>

      {isLoading ? (
        <div className="text-gray-600">Зареждане...</div>
      ) : (
        <ProductForm
          product={product}
          onChange={handleChange}
          onSubmit={handleSubmit}
          categories={categories}
        />
      )}
    </div>
  );
};

export default EditProductPage;
