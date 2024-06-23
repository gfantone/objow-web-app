import React, {createContext, useContext, useEffect, useState} from 'react';
import {
    getAccessToken,
    getUser,
    login,
    loginCallback,
    logout,
    register,
    registerCallback
} from './oidc';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            const user = await getUser();
            setUser(user);
        };

        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{
            getAccessToken,
            getUser,
            login,
            loginCallback,
            logout,
            register,
            registerCallback,
            user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
