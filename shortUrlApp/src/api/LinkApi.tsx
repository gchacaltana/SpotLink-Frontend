import { API_URL } from "./constants";

export const fetchShortLink = async (url: string, accessToken: string) => {
    const response = await fetch(`${API_URL}/v1/links`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ url }),
    });
    return response;
}

export const fetchUrlByToken = async (urlToken: string) => {
    const response = await fetch(`${API_URL}/v1/links/${urlToken}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    return response;
}