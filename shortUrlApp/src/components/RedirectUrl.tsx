import { useEffect } from 'react';
import { fetchUrlByToken } from '../api/LinkApi';
import { extractTokenFromURL } from '../utils/StringUtil';
export const RedirectUrl = () => {
    useEffect(() => {
        const getUrlByToken = async () => {
            try {
                const urlToken = extractTokenFromURL(window.location.pathname);
                console.log("url token", urlToken);
                if (!urlToken) {
                    window.location.href = "/";
                }
                
                const response = await fetchUrlByToken(urlToken);
                
                if (!response.ok) {
                    window.location.href = "/";
                }
                const json = (await response.json()) as { url: string };
                
                if (json.url) {
                    window.location.href = json.url;
                }
            } catch (error: any) {
                console.log(error.message);
            }
        }
        getUrlByToken();
    }, []);
    return (
        <div>
            Redirecting...
        </div>
    )
}