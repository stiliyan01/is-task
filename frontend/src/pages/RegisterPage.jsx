import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // 👈 добави useLocation
import api from "../api";
import FlashMessage from "../components/FlashMessage";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation(); // 👈 тук
  const from = location.state?.from || "/"; // 👈 тук

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
      const response = await api.post("/register", form);
      setFlashMessage("Регистрацията е успешна!");
      setFlashMessageType("success");

      sessionStorage.setItem("user", JSON.stringify(response.data.data.user));
      sessionStorage.setItem("token", response.data.data.token);

      navigate(from); // 👈 вместо "/"
    } catch (error) {
      setFlashMessage("Възникна грешка при регистрацията.");
      setFlashMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
        <FlashMessage
          message={flashMessage}
          type={flashMessageType}
          onClose={() => setFlashMessage("")}
        />
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Създай акаунт
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Име"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={form.name}
              onChange={handleChange}
              required
            />
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
              {loading ? "Изпращане..." : "Регистрация"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Вече имаш акаунт?<span> </span>
            <Link
              to="/login"
              state={{ from }} // 👈 запазваме от къде е дошъл
              className="text-indigo-600 hover:underline"
            >
              Вход
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
