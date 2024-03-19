import { Link } from "react-router-dom";
import React, { MouseEvent } from "react";
import { useAuth } from "../providers/AuthProvider";
import { fetchLogout } from "../api/AuthApi";

interface AdminLayoutProps {
  children?: React.ReactNode;
}
export default function AdminLayout({ children }: AdminLayoutProps) {
  const auth = useAuth();

  async function handleLogout(e: MouseEvent) {
    e.preventDefault();
    try {
      const accessToken = auth.getAccessToken();
      const response = await fetchLogout(accessToken);
      if (response.ok) {
        auth.logout();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <header>
        <div className="container-menu">
          <div className="logo">
            <img src="public/images/logo_spotlink.png" alt="Logo" />
          </div>
          <nav>
            <ul>
              <li><Link to="/admin">Cortar URL</Link></li>
              <li><Link to="/me">Mi Perfil</Link></li>
              <li><a href="#" onClick={handleLogout}>Cerrar Sesión</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}