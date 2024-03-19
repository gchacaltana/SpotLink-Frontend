import { API_URL } from "./constants";
import { AuthResponse } from "../types/types";

export const fetchAuth = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    return response;
}

export const fetchRefreshAccessToken = async (accessToken: string) => {
    const response = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        return json.authorisation.token;
    } else {
        console.log("Unable to refresh access token.");
    }
}

export const fetchLogout = async (accessToken: string) => {
    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response;
}

export const fetchMe = async (accessToken: string) => {
    const response = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response;
}