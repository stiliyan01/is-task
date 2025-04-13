import React, { useState } from "react";
import CategoryForm from "../../../components/admin/category/CategoryForm";

const CreateCategoryPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Създаване на категория</h1>
      <CategoryForm />
    </div>
  );
};

export default CreateCategoryPage;
