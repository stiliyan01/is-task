import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ filteredProducts, addToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))
      ) : (
        <p className="text-gray-500">
          Няма продукти, отговарящи на избраните филтри.
        </p>
      )}
    </div>
  );
};

export default ProductList;
