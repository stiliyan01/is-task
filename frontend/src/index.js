import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App";
import Checkout from "./pages/Checkout";
import AdminPanel from "./pages/admin/AdminPanel";

import ProductPage from "./pages/admin/product/ProductPage";
import CreateProductPage from "./pages/admin/product/CreateProductPage";
import EditProductPage from "./pages/admin/product/EditProductPage";

import CategoryPage from "./pages/admin/category/CategoryPage";
import CreateCategoryPage from "./pages/admin/category/CreateCategoryPage";
import EditCategoryPage from "./pages/admin/category/EditCategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
    children: [
      {
        path: "/admin/products",
        element: <ProductPage />,
      },
      {
        path: "/admin/products/:id",
        element: <EditProductPage />,
      },
      {
        path: "/admin/products/create",
        element: <CreateProductPage />,
      },

      {
        path: "/admin/categories",
        element: <CategoryPage />,
      },
      {
        path: "/admin/categories/create",
        element: <CreateCategoryPage />,
      },
      {
        path: "/admin/categories/:id",
        element: <EditCategoryPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
