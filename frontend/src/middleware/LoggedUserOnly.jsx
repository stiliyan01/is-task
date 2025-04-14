import { Navigate } from "react-router-dom";

const LoggedUserOnly = ({ children }) => {
  const isAuthenticated =
    sessionStorage.getItem("token") && sessionStorage.getItem("user");

  return !isAuthenticated ? <Navigate to="/" /> : children;
};

export default LoggedUserOnly;
