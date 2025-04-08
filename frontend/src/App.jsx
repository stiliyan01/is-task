import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import ProductList from "./components/ProductList";
import axios from "axios";
import api from "./api.js";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Всички");
  const [maxPrice, setMaxPrice] = useState(100);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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

  const filteredProducts = products.filter((product) => {
    const inCategory =
      selectedCategory === "Всички" || product.category_id == selectedCategory;
    const inPriceRange = product.price <= maxPrice;
    return inCategory && inPriceRange;
  });

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <Header
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        isCartOpen={isCartOpen}
      />
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        categories={categories}
      />
      <ProductList filteredProducts={filteredProducts} addToCart={addToCart} />
    </div>
  );
}

export default App;
