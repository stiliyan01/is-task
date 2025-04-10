import axios from "axios";

const csrfToken = document.head.querySelector(
  'meta[name="csrf-token"]'
)?.content;

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": csrfToken,
  },
});

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
