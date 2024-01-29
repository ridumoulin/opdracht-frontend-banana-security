import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import isTokenValid from "../helpers/isTokenValid";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token && isTokenValid(token)) {
            void login(token);
        } else {
            setAuthState({
                isAuth: false,
                user: null,
                status: "done",
            });
        }
    }, []);

    async function login(token) {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;

        try {
            const response = await axios.get(
                `http://localhost:3000/600/users/${userId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAuthState({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: "done",
            });

            navigate("/profile");
        } catch (error) {
            console.error("Error with login:", error);
            setAuthState({
                isAuth: false,
                user: null,
                status: "done",
            });
        }
    }

    function logout() {
        try {
            localStorage.removeItem("token");
            setAuthState({
                isAuth: false,
                user: null,
                status: "done",
            });
            console.log("User logged out!");
            navigate("/");
        } catch (error) {
            console.error("Error with logout:", error);
        }
    }

    const contextValue = {
        isAuth: authState.isAuth,
        login,
        logout,
        user: authState.user,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {authState.status === "done" ? (
                children
            ) : (
                <p>Loading...</p>
            )}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;