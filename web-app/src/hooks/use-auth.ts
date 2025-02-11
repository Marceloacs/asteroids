import { useContext } from "react";
import { AuthContext } from "../providers/auth";
export default function useAuth() {

    const { authToken, user, setUserAndToken, reset } = useContext(AuthContext);

    const isAuthenticated = !!authToken;

    return {
        authToken,
        isAuthenticated,
        logout: reset,
        user,   
        setUserAndToken
    }
}