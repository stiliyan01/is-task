import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router";

import Homepage from "./pages/Homepage";
import Checkout from "./pages/Checkout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/admin/AdminPage";

import AdminMiddleware from "./middleware/AdminMiddleware";

import ProductPage from "./pages/admin/product/ProductPage";
import CreateProductPage from "./pages/admin/product/CreateProductPage";
import EditProductPage from "./pages/admin/product/EditProductPage";

import CategoryPage from "./pages/admin/category/CategoryPage";
import CreateCategoryPage from "./pages/admin/category/CreateCategoryPage";
import EditCategoryPage from "./pages/admin/category/EditCategoryPage";

import OrderPage from "./pages/admin/order/OrderPage";
import OrderDetailsPage from "./pages/admin/order/OrderDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    children: [
      {
        path: "/profile/products",
        element: <ProductPage />,
      },
      {
        path: "/profile/products/:id",
        element: <EditProductPage />,
      },
      {
        path: "/profile/products/create",
        element: <CreateProductPage />,
      },

      {
        path: "/profile/categories",
        element: <CategoryPage />,
      },
      {
        path: "/profile/categories/create",
        element: <CreateCategoryPage />,
      },
      {
        path: "/profile/categories/:id",
        element: <EditCategoryPage />,
      },

      {
        path: "/profile/orders",
        element: <OrderPage />,
      },
      {
        path: "/profile/orders/:id",
        element: <OrderDetailsPage />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <AdminMiddleware>
        <AdminPage />
      </AdminMiddleware>
    ),
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

      {
        path: "/admin/orders",
        element: <OrderPage />,
      },
      {
        path: "/admin/orders/:id",
        element: <OrderDetailsPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
