import React, { useState } from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import ProductList from "./components/ProductList";

const productsData = [
  { id: 1, name: "Тениска", category: "Дрехи", price: 25 },
  { id: 2, name: "Дънки", category: "Дрехи", price: 50 },
  { id: 3, name: "Маратонки", category: "Обувки", price: 80 },
  { id: 4, name: "Яке", category: "Дрехи", price: 100 },
  { id: 5, name: "Кецове", category: "Обувки", price: 60 },
];

const categories = ["Всички", "Дрехи", "Обувки"];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Всички");
  const [maxPrice, setMaxPrice] = useState(100);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = productsData.filter((product) => {
    const inCategory =
      selectedCategory === "Всички" || product.category === selectedCategory;
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
