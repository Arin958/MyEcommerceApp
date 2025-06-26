import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(isAuthenticated, user);

  if (isAuthenticated) {
    // Already logged in and verified, redirect away from login/signup/verify
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
