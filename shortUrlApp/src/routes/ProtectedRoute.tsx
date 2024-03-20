import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function ProtectedRoute() {
  const auth = useAuth();
  return auth?.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}