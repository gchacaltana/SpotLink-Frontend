import { useEffect } from 'react';
import { fetchUrlByToken } from '../api/LinkApi';
import { useParams } from 'react-router-dom';

export const RedirectUrl = () => {
    const { token } = useParams<{ token: string }>();
    useEffect(() => {
        const getUrlByToken = async () => {
            try {

                if (token === undefined) {
                    window.location.href = "/";
                }

                const response = await fetchUrlByToken(token);

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