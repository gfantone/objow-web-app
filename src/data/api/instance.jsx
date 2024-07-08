import axios from 'axios';

import users from "./endpoints/users";
import tokens from "./endpoints/tokens";
import local from '../local/local';
import {getAccessToken, logout} from '../../auth';
import {getActiveDomain} from '../../distributors/domainManager';

const forceLogout = () => {
  local.removeAccessToken();
  local.removeRefreshToken();
  local.removeStore();
  window.location = '/';
};

const isMobileApp = () => {
  const { detect } = require('detect-browser');
  const browser = detect();
  const isMobile =
    browser.name === 'ios-webview' || browser.name === 'chromium-webview';
  return isMobile;
};

const createApiClient = () => {
    const instance = axios.create();

// instance.post = (url, data, options) => {
//   // this.post(url, data, Object.assign({}, options, { cancelToken: source.token }))

//   this.post(url, data, options)
// }
    instance.interceptors.request.use(
        (config) => {
            const baseUrlProtocol = process.env.REACT_APP_API_PROTOCOL;
            var baseUrl = process.env.REACT_APP_API_URL;
            const legacy_url = local.getTemporaryApiUrl();
            var token = local.getTemporaryAccessToken();

            if (!baseUrl) {
                baseUrl = local.getApiUrl();
            }

            if (!token) {
                token = local.getAccessToken();
            }
            const clientEnvironment = local.getClientEnvironment();
            const subdomain =
                clientEnvironment &&
                clientEnvironment !== 'dev' &&
                clientEnvironment !== 'testftiger'
                    ? `${clientEnvironment}.`
                    : '';

            if (
                legacy_url &&
                legacy_url.indexOf('firetiger.fr') >= 0 &&
                legacy_url.indexOf('api.firetiger.fr') < 0 &&
                legacy_url.indexOf('testftiger.firetiger.fr') < 0 &&
                legacy_url.startsWith('https://')
            ) {
                local.removeTemporaryApiUrl();
                forceLogout();
            } else {
                if (
                    !subdomain &&
                    clientEnvironment !== 'dev' &&
                    clientEnvironment !== 'testftiger'
                ) {
                    forceLogout();
                }
                config.url = `${baseUrlProtocol}${subdomain}${baseUrl}${config.url}`;
            }

            if (token) {
                config.headers.common['Authorization'] = `Bearer ${token}`;
            }
            const app_version = local.getAppVersion();
            const bundle_id = local.getAppBundleId();
            if (app_version) {
                config.headers.common['App-Version'] = app_version;
            }
            if (bundle_id) {
                config.headers.common['App-BundleId'] = bundle_id;
                config.headers.common['Is-Mobile'] = true;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response) => {
            // if(['post', 'patch', 'put'].indexOf(request.config.method) >= 0) {
            //     toast.success('Success')
            // }
            if (!('cache-control' in response.headers)) {
                local.setUpdateRequired('update-required' in response.headers);
            }

            localStorage.setItem('UPDATE_MENU_NOTIFICATIONS', true);
            return response;
        },
        (error) => {
            if (error.response.status == 403) {
                return forceLogout();
            }

            if (error.response.status != 401) {
                return Promise.reject(error);
            }

            if (error.response.status == 401 && error.config.url.endsWith('/token/')) {
                return {error};
            }

            if (
                error.response.status == 401 &&
                error.config.url.endsWith('/token/refresh/')
            ) {
                return forceLogout();
            }
            console.log('error', error.response.status);
            const legacy_url = local.getTemporaryApiUrl();
            const clientEnvironment = local.getClientEnvironment();
            const subdomain =
                clientEnvironment && clientEnvironment !== 'dev'
                    ? `${clientEnvironment}.`
                    : '';
            // Error during migration
            if (
                legacy_url &&
                legacy_url.indexOf('firetiger.fr') >= 0 &&
                legacy_url.indexOf('api.firetiger.fr') < 0 &&
                legacy_url.indexOf('testftiger.firetiger.fr') < 0 &&
                legacy_url.startsWith('https://')
            ) {
                local.removeTemporaryApiUrl();
                forceLogout();
            } else {
                if (!subdomain) {
                    forceLogout();
                }
            }

            var refreshToken = local.getTemporaryRefreshToken();
            var isTempToken = true;

            if (!refreshToken) {
                refreshToken = local.getRefreshToken();
                isTempToken = false;
            }
            if (!refreshToken) {
                return forceLogout();
            }
            localStorage.setItem('CHECK_NEW_VERSION', true);

            // only save connexion once, when there are multiple refresh token at once
            const tempSaveConnection = localStorage.getItem('TEMP_SAVE_CONNECTION');
            console.log('tempSaveConnection', tempSaveConnection);
            setTimeout(() => {
                localStorage.removeItem('TEMP_SAVE_CONNECTION');
            }, 2000);
            if (!tempSaveConnection) {
                localStorage.setItem('TEMP_SAVE_CONNECTION', true);
                users.saveConnection();
            }
            return tokens
                .refresh(refreshToken)
                .then((response) => {
                    if (!isTempToken) {
                        local.setAccessToken(response.data.access);
                    } else {
                        local.setTemporaryAccessToken(response.data.access);
                    }

                    return new Promise((resolve) => {
                        var token = local.getTemporaryAccessToken();

                        if (!token) {
                            token = local.getAccessToken();
                        }

                        error.config.headers.Authorization = `Bearer ${token}`;
                        return resolve(axios(error.config));
                    });
                })
                .catch(() => {
                    // return forceLogout()
                });
        }
    );

    return instance;
}

const createKeycloakApiClient = () => {
    const instance = axios.create();

    instance.interceptors.request.use(
        async config => {
            const baseUrlProtocol = process.env.REACT_APP_API_PROTOCOL;
            let baseUrl = process.env.REACT_APP_API_URL;
            let token = await getAccessToken();

            if (!baseUrl) {
                baseUrl = local.getApiUrl();
            }

            const clientEnvironment = local.getClientEnvironment();
            const subdomain =
                clientEnvironment &&
                clientEnvironment !== 'dev' &&
                clientEnvironment !== 'testftiger'
                    ? `${clientEnvironment}.`
                    : '';
            config.url = `${baseUrlProtocol}${subdomain}${baseUrl}${config.url}`;

            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            const app_version = local.getAppVersion();
            const bundle_id = local.getAppBundleId();
            if (app_version) {
                config.headers['App-Version'] = app_version;
            }
            if (bundle_id) {
                config.headers['App-BundleId'] = bundle_id;
            }
            config.headers['Is-Mobile'] = isMobileApp();

            return config;
        },
        error => Promise.reject(error)
    );

    instance.interceptors.response.use(
        response => {
            if (!('cache-control' in response.headers)) {
                local.setUpdateRequired('update-required' in response.headers);
            }

            localStorage.setItem('UPDATE_MENU_NOTIFICATIONS', true);
            return response;
        },
        async error => {
            if (error.response.status === 403) {
                return Promise.reject(error);
            }

            if (error.response.status !== 401) {
                return Promise.reject(error);
            }

            try {
                const token = await getAccessToken();

                if (token) {
                    error.config.headers['Authorization'] = `Bearer ${token}`;
                    return axios(error.config);
                } else {
                    logout();
                }
            } catch (refreshError) {
                console.error('Error refreshing token', refreshError);
                logout();
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

const selectApiClient = () => {
    const domain = getActiveDomain();
    const objowDomains = process.env.REACT_APP_OBJOW_DOMAINS.split(';');
    const edenredDomains = process.env.REACT_APP_EDENRED_DOMAINS.split(';');

    if (objowDomains.includes(domain)) {
        return createApiClient();
    }

    if (edenredDomains.includes(domain)) {
        return createKeycloakApiClient();
    }

    return createApiClient();
};

const instance = selectApiClient();
export default instance;
