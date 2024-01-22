import {createContext, useState} from "react";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState({ isAuth: false, user: '' });
    const navigate = useNavigate();

    const login = (user) => {
        setIsAuth({ isAuth: true, user });
        console.log(`User ${user} is logged in!`);
        navigate('/profile');
    }

    const logout = () => {
        setIsAuth({ isAuth: false, user: '' });
        console.log('User is logged out!');
        navigate('/');
    };


    const data = {
        isAuth,
        login,
        logout,
        user,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;