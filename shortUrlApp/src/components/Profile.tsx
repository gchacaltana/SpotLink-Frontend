import AdminLayout from "../layouts/AdminLayout";
import { useAuth } from "../providers/AuthProvider";

export default function Profile() {
  const auth = useAuth();

  return (
    <AdminLayout>
      <h1>Mi Perfil</h1>
      <div className="container-profile">
        <div className="user-info">
          <div className="user-info-item">
            <label>Email:</label>
            <span>{auth?.getAuthUser()?.email}</span>
          </div>
          <div className="user-info-item">
            <label>Nombre:</label>
            <span>{auth?.getAuthUser()?.name}</span>
          </div>
          <div className="user-info-item">
            <label>Fecha de creación:</label>
            <span>{auth?.getAuthUser()?.created_at}</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}