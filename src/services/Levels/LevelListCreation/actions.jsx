import * as types from './actionTypes'

export const createLevelList = (levels) => {
    return {
        type: types.CREATE_LEVEL_LIST,
        levels
    }
};

export const createLevelListSuccess = () => {
    return {
        type: types.CREATE_LEVEL_LIST_SUCCESS
    }
};

export const createLevelListError = () => {
    return {
        type: types.CREATE_LEVEL_LIST_ERROR
    }
};

export const clearLevelListCreation = () => {
    return {
        type: types.CLEAR_LEVEL_LIST_CREATION
    }
};