import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminMiddleware({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user || user.is_admin !== 1) {
      navigate(-1);
    }
  }, [navigate]);

  return children;
}
