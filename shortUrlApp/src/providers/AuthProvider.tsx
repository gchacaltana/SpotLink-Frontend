import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse, User } from "../types/types";
import { fetchMe } from "../api/AuthApi";

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => { },
    setAccessTokenAndRefreshToken: (
        _accessToken: string,
        _refreshToken: string
    ) => { },
    getRefreshToken: () => { },
    saveAuthUser: (authResponse: AuthResponse) => { },
    getAuthUser: () => ({} as User | undefined),
    logout: () => { },
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | undefined>();
    const [accessToken, setAccessToken] = useState<string>("");
    const [refreshToken, setRefreshToken] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isloading, setIsLoading] = useState(true);

    function getAccessToken(): string {
        return accessToken;
    }

    function saveAuthUser(authResponse: AuthResponse): void {
        setAccessTokenAndRefreshToken(
            authResponse.authorisation.token,
            authResponse.authorisation.token
        );
        setUser(authResponse.user);
        setIsAuthenticated(true);
    }

    function setAccessTokenAndRefreshToken(
        accessToken: string,
        refreshToken: string
    ) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        localStorage.setItem("token", JSON.stringify({ accessToken }));
    }

    function getRefreshToken() {
        if (refreshToken) {
            return refreshToken;
        }
        const token = localStorage.getItem("token");
        if (token) {
            const { refreshToken } = JSON.parse(token);
            setRefreshToken(refreshToken);
            return refreshToken;
        }
        return null;
    }

    function getAuthUser(): User | undefined {
        return user;
    }

    function logout() {
        localStorage.removeItem("token");
        setAccessToken("");
        setRefreshToken("");
        setUser(undefined);
        setIsAuthenticated(false);
        setIsLoading(false);
    }

    async function checkAuth() {
        try {            
            if (accessToken) {
                const userInfo = await retrieveUserInfo(accessToken);
                setUser(userInfo);
                setAccessToken(accessToken);
                setIsAuthenticated(true);
                setIsLoading(false);
            } else {
                const token = localStorage.getItem("token");
                if (token) {
                    const accessToken = JSON.parse(token).accessToken;
                    const userInfo = await retrieveUserInfo(accessToken);
                    if (userInfo) {
                        setUser(userInfo);
                        setAccessToken(accessToken);
                        setIsAuthenticated(true);
                        setIsLoading(false);
                    } else {
                        logout();
                    }
                } else {
                    logout();
                }
            }
        } catch (error) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                getAccessToken,
                setAccessTokenAndRefreshToken,
                getRefreshToken,
                saveAuthUser,
                getAuthUser,
                logout,
            }}
        >
            {isloading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
}

async function retrieveUserInfo(accessToken: string) {
    try {
        const response = await fetchMe(accessToken);
        if (response.ok) {
            const json = await response.json();
            return json;
        }
    } catch (error) {
        console.log(error);
    }
}

export const useAuth = () => useContext(AuthContext);