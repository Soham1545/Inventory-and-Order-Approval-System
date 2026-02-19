import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import {useAuth} from "../hooks/useAuth"

export default function AppRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader/>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
