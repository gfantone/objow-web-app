<<<<<<< HEAD
export const config = {
    authority: process.env.REACT_APP_KEYCLOAK_URL, // Utilise l'URL de votre serveur Keycloak et de votre realm depuis l'environnement
    automaticSilentRenew: true,
    client_id: process.env.REACT_APP_CLIENT_ID, // Utilise l'ID de votre client Keycloak depuis l'environnement
    redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`, // Utilise l'URL de redirection depuis l'environnement
    response_type: 'code',
    scope: 'openid profile email', // Les scopes dont vous avez besoin
    loadUserInfo: true, // Charger les informations utilisateur
    monitorSession: true // Surveiller la session
};
=======
import {getActiveDomain} from "../distributors/domainManager";

const objowOidcConfig = {
    authority: process.env.REACT_APP_EDENRED_OIDC_AUTHORITY,
    clientId: process.env.REACT_APP_EDENRED_OIDC_CLIENT_ID,
    redirectUri: process.env.REACT_APP_EDENRED_OIDC_REDIRECT_URI
};

const edenredOidcConfig = {
    authority: process.env.REACT_APP_EDENRED_OIDC_AUTHORITY,
    clientId: process.env.REACT_APP_EDENRED_OIDC_CLIENT_ID,
    redirectUri: process.env.REACT_APP_EDENRED_OIDC_REDIRECT_URI
}

const buildConfig = () => {
    const domain = getActiveDomain();
    const edenredDomains = process.env.REACT_APP_EDENRED_DOMAINS.split(';');
    let distributorConfig = objowOidcConfig;

    if (edenredDomains.includes(domain)) {
        distributorConfig = edenredOidcConfig;
    }

    return {
        authority: distributorConfig.authority,
        automaticSilentRenew: true,
        client_id: distributorConfig.clientId,
        redirect_uri: distributorConfig.redirectUri,
        response_type: 'code',
        scope: 'openid profile email',
        loadUserInfo: true,
        monitorSession: true,
    };
};

export const config = buildConfig();
>>>>>>> dev
