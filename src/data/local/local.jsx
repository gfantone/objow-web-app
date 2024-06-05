import * as types from './localTypes';

const local = {
  getAccessToken() {
    return localStorage.getItem(types.ACCESS_TOKEN);
  },
  setAccessToken(token) {
    return localStorage.setItem(types.ACCESS_TOKEN, token);
  },
  removeAccessToken() {
    return localStorage.removeItem(types.ACCESS_TOKEN);
  },
  getApiUrl() {
    return localStorage.getItem(types.API_URL);
  },
  setApiUrl(url) {
    return localStorage.setItem(types.API_URL, url);
  },
  getRefreshToken() {
    return localStorage.getItem(types.REFRESH_TOKEN);
  },
  setRefreshToken(token) {
    return localStorage.setItem(types.REFRESH_TOKEN, token);
  },
  removeRefreshToken(token) {
    return localStorage.removeItem(types.REFRESH_TOKEN);
  },
  getTemporaryAccessToken() {
    return localStorage.getItem(types.TEMPORARY_ACCESS_TOKEN);
  },
  setTemporaryAccessToken(token) {
    return localStorage.setItem(types.TEMPORARY_ACCESS_TOKEN, token);
  },
  removeTemporaryAccessToken() {
    return localStorage.removeItem(types.TEMPORARY_ACCESS_TOKEN);
  },
  getTemporaryApiUrl() {
    return localStorage.getItem(types.TEMPORARY_API_URL);
  },
  setTemporaryApiUrl(url) {
    return localStorage.setItem(types.TEMPORARY_API_URL, url);
  },
  removeTemporaryApiUrl(url) {
    return localStorage.removeItem(types.TEMPORARY_API_URL);
  },
  getClientEnvironment() {
    return localStorage.getItem(types.CLIENT_ENVIRONMENT);
  },
  setClientEnvironment(environment) {
    return localStorage.setItem(types.CLIENT_ENVIRONMENT, environment);
  },
  getTemporaryRefreshToken() {
    return localStorage.getItem(types.TEMPORARY_REFRESH_TOKEN);
  },
  setTemporaryRefreshToken(token) {
    return localStorage.setItem(types.TEMPORARY_REFRESH_TOKEN, token);
  },
  removeTemporaryRefreshToken() {
    return localStorage.removeItem(types.TEMPORARY_REFRESH_TOKEN);
  },
  getVersion() {
    return localStorage.getItem(types.VERSION);
  },
  setVersion(version) {
    return localStorage.setItem(types.VERSION, version);
  },
  removeStore() {
    return localStorage.removeItem(types.STORE);
  },
  setAppVersion(version) {
    return localStorage.setItem(types.MOBILE_APP_VERSION, version);
  },
  getAppVersion() {
    return localStorage.getItem(types.MOBILE_APP_VERSION);
  },
  setAppBundleId(bundleId) {
    return localStorage.setItem(types.MOBILE_APP_BUNDLE_ID, bundleId);
  },
  getAppBundleId() {
    return localStorage.getItem(types.MOBILE_APP_BUNDLE_ID);
  },
  setUpdateRequired(updateRequired) {
    return localStorage.setItem(types.UPDATE_REQUIRED, updateRequired);
  },
  getUpdateRequired() {
    return localStorage.getItem(types.UPDATE_REQUIRED);
  },
};

export default local;
