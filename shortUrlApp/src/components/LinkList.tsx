import React, { useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useAuth } from "../providers/AuthProvider";
import { fetchLinksByUser } from "../api/LinkApi";
import { Link } from "../types/types";

export const LinkList = () => {
  const auth = useAuth();
  const [links, setLinks] = React.useState<Array<Link>>([]);
  useEffect(() => {
    const fetchLinkList = async () => {
      try {

        const accessToken = auth?.getAccessToken();
        const response = await fetchLinksByUser(accessToken);
        if (!response.ok) {
          console.log("Error al obtener los links");
          return false;
        }
        const json = (await response.json()) as Array<Link>;
        setLinks(json);
        return false;
      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchLinkList();
  }, []);

  return (
    <AdminLayout>
      <h1>Mis Links</h1>
      <div className="container-links">
        <table className="tabla">
          <thead>
            <tr>
              <th>TOKEN</th>
              <th>URL LARGA</th>
              <th>FECHA CREACIÓN</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id}>
                <td>{link.token}</td>
                <td>{link.url}</td>
                <td>{link.created_at_format}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </AdminLayout>
  );
}