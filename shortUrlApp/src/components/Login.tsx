import { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { useAuth } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import { fetchAuth } from "../api/AuthApi";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const [loading, setLoading] = useState("");

    const auth = useAuth();

    if (auth.isAuthenticated) {
        return <Navigate to="/admin" />;
    }

    function handleChange(e: React.ChangeEvent) {
        const { name, value } = e.target as HTMLInputElement;
        if (name === "email") {
            setEmail(value);
        }
        if (name === "password") {
            setPassword(value);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            setErrorResponse("");
            setLoading("Verificando cuenta....");
            const response = await fetchAuth(email, password);
            setLoading("");
            if (!response.ok) {
                const json = (await response.json()) as AuthResponseError;
                throw new Error(json.message);
            }
            const json = (await response.json()) as AuthResponse;
            if (json.authorisation.token) {
                auth.saveAuthUser(json);
            }
        } catch (error: any) {
            setErrorResponse(error.message);
        }
    }
    return (
        <DefaultLayout>
            <div className="login-container">
                <div className="logo">
                    <img src="../public/images/logo_spotlink.png" alt="logo" />
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Iniciar Sesión</h2>
                    {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                    <div className="form-group">
                        <label>Usuario</label>
                        <input
                            name="email"
                            type="email"
                            onChange={handleChange}
                            value={email}
                            maxLength={160}
                            required={true}
                            placeholder="Correo electrónico"
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={password}
                            maxLength={15}
                            required={true}
                            placeholder="Contraseña"
                        />
                    </div>
                    {!!loading && <div className="loadingMessage">{loading}</div>}
                    <button type="submit">Ingresar</button>
                </form>
            </div>

        </DefaultLayout>
    );
}