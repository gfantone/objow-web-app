import * as types from './actionTypes';

export const updateConfigList = (configs) => {
    return {
        type: types.UPDATE_CONFIG_LIST,
        configs
    }
};

export const updateConfigListSuccess = () => {
    return {
        type: types.UPDATE_CONFIG_LIST_SUCCESS
    }
};

export const updateConfigListError = () => {
    return {
        type: types.UPDATE_CONFIG_LIST_ERROR
    }
};

export const clearConfigListUpdate = () => {
    return {
        type: types.CLEAR_CONFIG_LIST_UPDATE
    }
};