import config from "./config.json";

export const createShortLink = async (url: string, accessToken: string | undefined) => {
    const response = await fetch(`${config.BACKEND_API_URL}/v1/links`, {
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

export const fetchLinksByUser = async (accessToken: string | undefined) => {
    const response = await fetch(`${config.BACKEND_API_URL}/v1/links`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    });
    return response;
}

export const fetchUrlByToken = async (token: string | undefined) => {
    const response = await fetch(`${config.BACKEND_API_URL}/v1/links/${token}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    return response;
}