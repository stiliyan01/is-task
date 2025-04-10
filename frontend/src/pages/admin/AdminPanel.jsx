import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold">Админ Панел</h1>
        <nav className="space-y-4">
          <Link
            to="/admin/products"
            className={`block px-4 py-2 rounded hover:bg-indigo-800 ${
              isActive("products") ? "bg-indigo-800" : ""
            }`}
          >
            Продукти
          </Link>
          <Link
            to="/admin/orders"
            className={`block px-4 py-2 rounded hover:bg-indigo-800 ${
              isActive("orders") ? "bg-indigo-800" : ""
            }`}
          >
            Поръчки
          </Link>
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
