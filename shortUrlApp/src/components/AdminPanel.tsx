import { useAuth } from "../providers/AuthProvider";
import AdminLayout from "../layouts/AdminLayout";
import { FormShortUrl } from "./FormShortUrl";

export default function AdminPanel() {
  const auth = useAuth();

  return (
    <AdminLayout>
        <h1>Bienvenido {auth?.getAuthUser()?.name ?? ""}</h1>
        <FormShortUrl />
    </AdminLayout>
  );
}