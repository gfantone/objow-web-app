import {OidcClient, User, UserManager} from 'oidc-client-ts';
import {config} from './config';

const oidcClient = new OidcClient(config);
export const userManager = new UserManager(config);

export const getAccessToken = async () => {
    try {
        const user = await userManager.getUser();

        if (!user) {
            return null;
        }

        if (!user.expired) {
            return user.access_token;
        }

        try {
            const renewedUser = await userManager.signinSilent();
            return renewedUser.access_token;
        } catch (silentError) {
            console.error('Silent renew error:', silentError);
            await login();
            return null;
        }
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
};

const clearData = () => {
    localStorage.clear();
}

export const getUser = async () => {
    try {
        return await userManager.getUser();
    } catch (error) {
        console.error('Error getting user', error);
        return null;
    }
};

export const login = (redirectUri = config.redirect_uri) => {
    clearData();
    userManager.signinRedirect({redirect_uri: redirectUri}).catch(error => {
        console.error('Error during login', error);
    });
};

export const logout = () => {
    clearData();
    userManager.signoutRedirect().catch(error => {
        console.error('Error during logout', error);
    });
};

export const loginCallback = async () => {
    try {
        await userManager.signinRedirectCallback();
        console.log('User successfully signed in via redirect callback.');
    } catch (error) {
        console.error('Error during signin redirect callback:', error);
    }
};

export const register = async (redirectUri) => {
    try {
        const effectiveRedirectUri = redirectUri || config.redirect_uri;
        const signinRequest = await oidcClient.createSigninRequest({
            redirect_uri: effectiveRedirectUri
        });

        window.location.href = signinRequest.url.replace('/openid-connect/auth', '/openid-connect/registrations');
    } catch (error) {
        console.error("Error during registration request:", error);
    }
};

export const registerCallback = async () => {
    try {
        let user = await userManager.getUser();

        if (user === null) {
            const signinResponse = await oidcClient.processSigninResponse(window.location.href);
            user = new User(signinResponse);
            await userManager.storeUser(user);
        }
    } catch (error) {
        console.error("Error during callback registration:", error);
    }
};
