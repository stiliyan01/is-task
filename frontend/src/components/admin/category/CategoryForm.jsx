import React from "react";

const CategoryForm = ({ category, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="name"
        >
          Име на категорията
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={category.name}
          onChange={onChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-blue-700"
        >
          {category.id ? "Запази промените" : "Създай категория"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
