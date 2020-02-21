import * as types from './actionTypes'

export const updateLevelList = (levels) => {
    return {
        type: types.UPDATE_LEVEL_LIST,
        levels
    }
}

export const updateLevelListSuccess = () => {
    return {
        type: types.UPDATE_LEVEL_LIST_SUCCESS
    }
}

export const updateLevelListError = () => {
    return {
        type: types.UPDATE_LEVEL_LIST_ERROR
    }
}

export const clearLevelListUpdate = () => {
    return {
        type: types.CLEAR_LEVEL_LIST_UPDATE
    }
}