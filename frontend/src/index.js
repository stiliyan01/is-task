import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
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

import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product/:id",
    element: <Product />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/profile/products",
        element: <ProductPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile/products/:id",
        element: <EditProductPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile/products/create",
        element: <CreateProductPage />,
        errorElement: <ErrorPage />,
      },

      {
        path: "/profile/categories",
        element: <CategoryPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile/categories/create",
        element: <CreateCategoryPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile/categories/:id",
        element: <EditCategoryPage />,
        errorElement: <ErrorPage />,
      },

      {
        path: "/profile/orders",
        element: <OrderPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile/orders/:id",
        element: <OrderDetailsPage />,
        errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin/products",
        errorElement: <ErrorPage />,
        element: <ProductPage />,
      },
      {
        path: "/admin/products/:id",
        element: <EditProductPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/admin/products/create",
        element: <CreateProductPage />,
        errorElement: <ErrorPage />,
      },

      {
        path: "/admin/categories",
        element: <CategoryPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/admin/categories/create",
        element: <CreateCategoryPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/admin/categories/:id",
        element: <EditCategoryPage />,
        errorElement: <ErrorPage />,
      },

      {
        path: "/admin/orders",
        element: <OrderPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/admin/orders/:id",
        element: <OrderDetailsPage />,
        errorElement: <ErrorPage />,
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
