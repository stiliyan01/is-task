import { Navigate, useLocation } from "react-router-dom";

const RedirectAfterRegistration = ({ children }) => {
  const isAuthenticated =
    sessionStorage.getItem("token") && sessionStorage.getItem("user");

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default RedirectAfterRegistration;
