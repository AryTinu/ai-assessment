import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const token =
    localStorage.getItem("token");

  const user =
    localStorage.getItem("user");

  if (

    !token ||

    !user ||

    token === "undefined" ||

    token === "null"

  ) {

    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;