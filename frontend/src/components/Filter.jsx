import React from "react";

const Filter = ({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  categories,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div>
        <label
          htmlFor="categorySelect"
          className="block mb-1 font-semibold text-gray-700"
        >
          Категория:
        </label>
        <select
          id="categorySelect"
          className="w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-400"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="priceRange"
          className="block mb-1 font-semibold text-gray-700"
        >
          Максимална цена:{" "}
          <span className="text-indigo-600 font-bold">{maxPrice} лв.</span>
        </label>
        <input
          type="range"
          id="priceRange"
          min="0"
          max="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-indigo-500"
        />
      </div>
    </div>
  );
};

export default Filter;
