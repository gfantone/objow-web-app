export const getActiveDomain = () => {
    const forcedomain = process.env.REACT_APP_FORCE_DOMAIN;

    if (forcedomain && forcedomain.trim()) {
        return forcedomain;
    }

    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    return parts.slice(-2).join('.');
}
