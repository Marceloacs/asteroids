import { jwtDecode } from "jwt-decode";
import { useCallback, useState } from "react";

import { createContext, useEffect } from "react";

interface User {
    id: string,
    name: string,
    createdAt: string
}

export const AuthContext = createContext<{
    authToken: string | null;
    user: User | null;    
    reset: () => void;  
    setUserAndToken: (token: string | null) => void;
}>({
    authToken: null,
    user: null,
    reset: () => {},
    setUserAndToken: () => {}
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const setUserAndToken = useCallback((token: string | null) => {
        if (token) {
            setUser(decodeToken(token));
            setAuthToken(token);
            localStorage.setItem("asteroids-token", token);
        }
    }, [setUser, setAuthToken]);

    const reset =  useCallback(() => {
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem("asteroids-token");
    }, [setUser, setAuthToken]);

    function decodeToken(token: string) {
        const decodedToken = jwtDecode<{
            id: string,
            name: string,
            createdAt: string
        }>(token);
        return decodedToken;
    }

    useEffect(() => {
        const token = localStorage.getItem("asteroids-token");
        if (token) {
            setAuthToken(token);
            setUser(decodeToken(token));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authToken, user, setUserAndToken, reset }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;