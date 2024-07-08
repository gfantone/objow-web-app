import React, {createContext, useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
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
    const location = useLocation();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            const user = await getUser();

            if (!user) {
                const encodedPath = encodeURIComponent(location.pathname);
                const redirectUri = `${window.location.origin}/callback?redirect=${encodedPath}`;
                login(redirectUri);
                return;
            }

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
