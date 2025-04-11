import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FlashMessage from "../components/FlashMessage";
import api from "../api";

export default function Login() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();

  const [flashMessage, setFlashMessage] = useState("");
  const [flashMessageType, setFlashMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/login", form);

      setFlashMessage("Успешен вход!");
      setFlashMessageType("success");

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      navigate(-1);
    } catch (error) {
      setFlashMessage("Грешка при вход. Проверете данните си.");
      setFlashMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Влез
        </h2>

        <FlashMessage
          message={flashMessage}
          type={flashMessageType}
          onClose={() => setFlashMessage("")}
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Имейл"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Парола"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className={`w-full p-3 rounded-xl transition text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Изпращане..." : "Вход"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Нямаш акаунт?<span> </span>
          <Link to="/register" className="text-indigo-600 hover:underline">
            Регистрирай се
          </Link>
        </p>
      </div>
    </div>
  );
}
