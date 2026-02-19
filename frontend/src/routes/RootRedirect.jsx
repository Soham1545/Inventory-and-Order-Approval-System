import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";

export default function RootRedirect() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <Navigate
      to={isAuthenticated ? "/app" : "/auth/login"}
      replace
    />
  );
}
