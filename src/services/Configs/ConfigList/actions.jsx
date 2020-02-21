import * as types from './actionTypes';

export const getConfigList = (periodId) => {
    return {
        type: types.GET_CONFIG_LIST,
        periodId
    }
};

export const getPermanentConfigList = () => {
    return {
        type: types.GET_PERMANENT_CONFIG_LIST,
    }
};

export const getConfigListSuccess = (configs) => {
    return {
        type: types.GET_CONFIG_LIST_SUCCESS,
        configs
    }
};

export const getConfigListError = () => {
    return {
        type: types.GET_CONFIG_LIST_ERROR
    }
};

export const clearConfigList = () => {
    return {
        type: types.CLEAR_CONFIG_LIST
    }
};