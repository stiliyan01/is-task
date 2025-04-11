import axios from "axios";

const csrfToken = document.head.querySelector(
  'meta[name="csrf-token"]'
)?.content;

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    ...(csrfToken && { "X-CSRF-TOKEN": csrfToken }),
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
