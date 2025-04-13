import { Navigate } from "react-router-dom";

const GuestOnlyRoute = ({ children }) => {
  const isAuthenticated =
    sessionStorage.getItem("token") && sessionStorage.getItem("user");

  return isAuthenticated ? <Navigate to="/profile" /> : children;
};

export default GuestOnlyRoute;
