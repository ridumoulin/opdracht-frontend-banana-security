import {createContext, useState} from "react";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState(false);

    const data = {
        isAuth,
        setIsAuth,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;