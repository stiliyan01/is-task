import React, { useState, useEffect } from "react";
import Header from "../components/homepage/Header";
import Filter from "../components/homepage/Filter";
import ProductList from "../components/homepage/ProductList";
import api from "../api";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Всички");
  const [maxPrice, setMaxPrice] = useState(100);
  const [priceLimit, setPriceLimit] = useState(100);
  const [cart, setCart] = useState(() => {
    const stored = sessionStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
        ]);
        const allProducts = productRes.data;

        setProducts(allProducts);
        setCategories(categoryRes.data);

        const highestPrice = Math.max(
          ...allProducts.map((p) => parseFloat(p.price))
        );
        setPriceLimit(highestPrice);
        setMaxPrice(highestPrice);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, count: 1 }]);
    }
  };

  const filteredProducts = products.filter((product) => {
    const isAll = selectedCategory === "Всички";
    const selectedCatId = isAll ? null : Number(selectedCategory);

    const inCategory = isAll || product.category_id === selectedCatId;
    const inPriceRange = parseFloat(product.price) <= maxPrice;

    return inCategory && inPriceRange;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <Header
        cart={cart}
        setCart={setCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />

      {isLoading ? (
        <div className="text-center text-gray-500 mt-20 text-lg animate-pulse">
          Зареждане на продукти...
        </div>
      ) : (
        <>
          <Filter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            categories={categories}
            priceLimit={priceLimit}
          />
          <ProductList
            filteredProducts={filteredProducts}
            addToCart={addToCart}
          />
        </>
      )}
    </div>
  );
}

export default HomePage;
