import React, { useState } from "react";
import { validateURL } from "../utils/StringUtil";
import { createShortLink } from "../api/LinkApi";
import { useAuth } from "../providers/AuthProvider";
import { LinkResponse } from "../types/types";

export const FormShortUrl = () => {
    const auth = useAuth();
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");

    async function shortenURL() {
        try {
            setShortUrl("");
            setError("");
            setLoading("Acortando URL....");
            if (!validateURL(url)) {
                throw new Error("La URL ingresada no es válida");
            }
            
            const accessToken = auth?.getAccessToken();
            const response = await createShortLink(url, accessToken);
            if (!response.ok) {
                const json = (await response.json()) as { message: string };
                throw new Error(json.message);
            }
            setLoading("");
            const json = (await response.json()) as LinkResponse;
            if (json.token) {
                setUrl("");
                setShortUrl(`${window.location.origin}/${json.token}`);
            }
        } catch (error: any) {
            setLoading("");
            setError(error.message);
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        shortenURL();
    }

    function handleCopy() {
        navigator.clipboard.writeText(shortUrl)
            .then(() => {
                console.log('Texto copiado al portapapeles');

            })
            .catch(err => {
                console.error('Error al copiar el texto:', err);
            });
        setShortUrl("");
    }

    return (
        <>
            <h2>Acortador de URL</h2>
            <div className="container-form">
                <form onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="text"
                        placeholder="Ingresa una URL para acortar"
                        value={url}
                        required={true}
                        maxLength={1000}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button type="submit">Cortar URL</button>
                    {error && <div className="errorMessage">{error}</div>}
                    {loading && <div className="loadingMessageFormShort">{loading}</div>}
                    {shortUrl ? (
                        <>
                            <div className="successMessage">{shortUrl}</div>
                            <button onClick={handleCopy}>Copiar</button>
                        </>
                    ) : ""}
                </form>
            </div>
        </>
    );
}