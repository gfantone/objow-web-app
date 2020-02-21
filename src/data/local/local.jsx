import * as types from './localTypes'

const local = {
    getAccessToken() {
        return localStorage.getItem(types.ACCESS_TOKEN)
    },
    setAccessToken(token) {
        return localStorage.setItem(types.ACCESS_TOKEN, token)
    },
    getApiUrl() {
        return localStorage.getItem(types.API_URL)
    },
    setApiUrl(url) {
        return localStorage.setItem(types.API_URL, url)
    },
    getRefreshToken() {
        return localStorage.getItem(types.REFRESH_TOKEN)
    },
    setRefreshToken(token) {
        return localStorage.setItem(types.REFRESH_TOKEN, token)
    },
    getVersion() {
        return localStorage.getItem(types.VERSION)
    },
    setVersion(version) {
        return localStorage.setItem(types.VERSION, version)
    }
};

export default local