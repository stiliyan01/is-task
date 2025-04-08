import React from "react";
import ProductCard from "./ProductCard";
import Modal from "./Modal";
import { useState } from "react";

const ProductList = ({ filteredProducts, addToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedProduct && (
          <div>
            <h1>Име: {selectedProduct.name}</h1>
            <h4>Категория: {selectedProduct.category.name}</h4>
            <p>Описание: {selectedProduct.description}</p>
            <p>Цена: {selectedProduct.price} лв.</p>
          </div>
        )}
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              openModal={openModal}
            />
          ))
        ) : (
          <p className="text-gray-500">
            Няма продукти, отговарящи на избранита категория.
          </p>
        )}
      </div>
    </>
  );
};

export default ProductList;
