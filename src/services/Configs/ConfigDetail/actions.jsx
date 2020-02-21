import * as types from './actionTypes';

export const getConfigDetail = (code) => {
    return {
        type: types.GET_CONFIG_DETAIL,
        code
    }
}

export const getConfigDetailSuccess = (config) => {
    return {
        type: types.GET_CONFIG_DETAIL_SUCCESS,
        config
    }
}

export const getConfigDetailError = () => {
    return {
        type: types.GET_CONFIG_DETAIL_ERROR
    }
}