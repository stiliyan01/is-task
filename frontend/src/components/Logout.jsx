import React from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
    } finally {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      navigate("/");
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-500 transition w-full"
    >
      Изход
    </button>
  );
}
