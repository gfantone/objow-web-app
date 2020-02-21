import * as types from './actionTypes'

export const getLevelList = (periodId) => {
    return {
        type: types.GET_LEVEL_LIST,
        periodId
    }
};

export const getLevelListSuccess = (levels) => {
    return {
        type: types.GET_LEVEL_LIST_SUCCESS,
        levels
    }
};

export const getLevelListError = () => {
    return {
        type: types.GET_LEVEL_LIST_ERROR
    }
};