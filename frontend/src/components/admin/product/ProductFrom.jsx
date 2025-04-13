import React from "react";

const ProductForm = ({ product, onChange, onSubmit, categories }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="name"
        >
          Име на продукта
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={onChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="description"
        >
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={onChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          rows="4"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="price"
        >
          Цена
        </label>
        <input
          type="number"
          step="0.01"
          id="price"
          name="price"
          value={product.price}
          onChange={onChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="category_id"
        >
          Категория
        </label>
        <select
          id="category_id"
          name="category_id"
          value={product.category_id}
          onChange={onChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Изберете категория</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-blue-700"
        >
          {product.id ? "Запази промените" : "Създай продукт"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
