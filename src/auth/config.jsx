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
