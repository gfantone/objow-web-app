import _ from 'lodash';

// searchParams = {param1: value1, param2: value2, ...}
export const appendSearchParams = (url, searchParams) => {
    let firstParam = true;
    return Object.keys(searchParams).reduce((acc, paramKey) => {
        const separator = firstParam ? '?' : '&';
        if (
            searchParams[paramKey] ||
            searchParams[paramKey] === false ||
            searchParams[paramKey] === 0
        ) {
            firstParam = false;
            return `${acc}${separator}${paramKey}=${searchParams[paramKey]}`;
        }
        return acc;
    }, url);
};

export const getQueryParam = (queryParams, paramName) => {
    return new URLSearchParams(queryParams).get(paramName);
};

export const hasImageExtension = (filename) => {
    if (filename) {
        const imagesExtension = ['png', 'jpg', 'jpeg'];
        const fileExtension = filename.replace(/^.*\./, '');
        return imagesExtension.indexOf(fileExtension) >= 0;
    }
};
