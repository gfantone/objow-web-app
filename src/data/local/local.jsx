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
    getTemporaryAccessToken() {
        return localStorage.getItem(types.TEMPORARY_ACCESS_TOKEN)
    },
    setTemporaryAccessToken(token) {
        return localStorage.setItem(types.TEMPORARY_ACCESS_TOKEN, token)
    },
    removeTemporaryAccessToken() {
        return localStorage.removeItem(types.TEMPORARY_ACCESS_TOKEN)
    },
    getTemporaryApiUrl() {
        return localStorage.getItem(types.TEMPORARY_API_URL)
    },
    setTemporaryApiUrl(url) {
        return localStorage.setItem(types.TEMPORARY_API_URL, url)
    },
    removeTemporaryApiUrl() {
        return localStorage.removeItem(types.TEMPORARY_API_URL)
    },
    getTemporaryRefreshToken() {
        return localStorage.getItem(types.TEMPORARY_REFRESH_TOKEN)
    },
    setTemporaryRefreshToken(token) {
        return localStorage.setItem(types.TEMPORARY_REFRESH_TOKEN, token)
    },
    removeTemporaryRefreshToken() {
        return localStorage.removeItem(types.TEMPORARY_REFRESH_TOKEN)
    },
    getVersion() {
        return localStorage.getItem(types.VERSION)
    },
    setVersion(version) {
        return localStorage.setItem(types.VERSION, version)
    }
};

export default local
