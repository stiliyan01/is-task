import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-indigo-700 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold">Админ Панел</h1>
        <nav className="space-y-4">
          <NavLink
            to="/admin/products"
            className={`block px-4 py-2 rounded hover:bg-indigo-800 ${
              isActive("products") ? "bg-indigo-800" : ""
            }`}
          >
            Продукти
          </NavLink>
          <NavLink
            to="/admin/categories"
            className={`block px-4 py-2 rounded hover:bg-indigo-800 ${
              isActive("categories") ? "bg-indigo-800" : ""
            }`}
          >
            Категории
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
