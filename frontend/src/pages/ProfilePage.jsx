import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import api from "../api";

const ProfilePanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const isActive = (path) => location.pathname.includes(path);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Грешка при изход:", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-indigo-600 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold">Профил</h1>
        <nav className="space-y-4">
          <NavLink
            to="/"
            className="block px-4 py-2 rounded hover:bg-indigo-800"
          >
            Към магазина
          </NavLink>
          {user.is_admin === 1 && (
            <NavLink
              to="/admin"
              className="block px-4 py-2 rounded hover:bg-indigo-800"
            >
              Админ панел
            </NavLink>
          )}
          <NavLink
            to="/profile/orders"
            className={`block px-4 py-2 rounded hover:bg-indigo-800 ${
              isActive("orders") ? "bg-indigo-800" : ""
            }`}
          >
            Моите поръчки
          </NavLink>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition duration-200 shadow-md"
          >
            Изход
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfilePanel;
