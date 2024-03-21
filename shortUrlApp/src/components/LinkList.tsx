import React, { useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useAuth } from "../providers/AuthProvider";
import { fetchLinksByUser } from "../api/LinkApi";
import { ShortLink } from "../types/types";
import { Link } from "react-router-dom";

export const LinkList = () => {
  const auth = useAuth();
  const [links, setLinks] = React.useState<Array<ShortLink>>([]);
  useEffect(() => {
    const fetchLinkList = async () => {
      try {

        const accessToken = auth?.getAccessToken();
        const response = await fetchLinksByUser(accessToken);
        if (!response.ok) {
          console.log("Error al obtener los links");
          return false;
        }
        const json = (await response.json()) as Array<ShortLink>;
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
        <div className="table">
          <div className="row header">
            <div className="cell">URL CORTA</div>
            <div className="cell">URL LARGA</div>
            <div className="cell">FECHA CREACIÓN</div>
          </div>
          {links.map((link) => (
            <div className="row" key={link.id}>
              <div className="cell"><Link to={`${window.location.origin}/${link.token}`} target="_blank" rel="noopener noreferrer">{`${window.location.origin}/${link.token}`}</Link></div>
              <div className="cell">{link.url}</div>
              <div className="cell">{link.created_at_format}</div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}