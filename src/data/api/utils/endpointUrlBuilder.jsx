export const buildEndpointUrlWithParams = (baseUrl, endpoint, params) => {
    let url = baseUrl + endpoint;
    const urlSearchParams = new URLSearchParams(params);

    if (params != null && urlSearchParams.size > 0) {
        url += `?${urlSearchParams.toString()}`;
    }

    return url.toString();
};
