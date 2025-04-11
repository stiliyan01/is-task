import React from "react";

const Filter = ({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  categories,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
    <div>
      <label htmlFor="categorySelect" className="block mb-1 font-semibold">
        Категория:
      </label>
      <select
        id="categorySelect"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full border rounded p-2"
      >
        <option value="Всички">Всички</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label htmlFor="priceRange" className="block mb-1 font-semibold">
        Максимална цена: <span className="text-indigo-600">{maxPrice} лв.</span>
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

export default Filter;
