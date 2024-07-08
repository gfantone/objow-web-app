import React, {createContext, useContext, useEffect, useState} from 'react';
<<<<<<< HEAD
=======
import {useLocation} from 'react-router-dom';
>>>>>>> dev
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
<<<<<<< HEAD
=======
    const location = useLocation();

>>>>>>> dev
    const [user, setUser] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            const user = await getUser();
<<<<<<< HEAD
=======

            if (!user) {
                const encodedPath = encodeURIComponent(location.pathname);
                const redirectUri = `${window.location.origin}/callback?redirect=${encodedPath}`;
                login(redirectUri);
                return;
            }

>>>>>>> dev
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
