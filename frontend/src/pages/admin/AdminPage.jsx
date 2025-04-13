import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Logout from "../../components/Logout";

const AdminPage = () => {
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-indigo-600 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">Админ панел</h1>
          <nav className="space-y-4">
            <NavLink
              to="/"
              className="block px-4 py-2 rounded hover:bg-indigo-800"
            >
              Към магазина
            </NavLink>

            {user.is_admin === 1 && (
              <NavLink
                to="/profile"
                className="block px-4 py-2 rounded hover:bg-indigo-800"
              >
                Профил
              </NavLink>
            )}

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
            <NavLink
              to="/admin/orders"
              className={`block px-4 py-2 rounded hover:bg-indigo-800 ${
                isActive("orders") ? "bg-indigo-800" : ""
              }`}
            >
              Поръчки
            </NavLink>
          </nav>
        </div>

        <div className="mt-6">
          <Logout />
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPage;
