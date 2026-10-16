
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isCheckingAuth, children }) {

  if (isCheckingAuth) {
    return <p>Checking login...</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
