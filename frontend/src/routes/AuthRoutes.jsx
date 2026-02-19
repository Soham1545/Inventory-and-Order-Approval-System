import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";

export default function AuthRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader/>;

  return !isAuthenticated ? <Outlet /> : <Navigate to="/app" replace />;
}
