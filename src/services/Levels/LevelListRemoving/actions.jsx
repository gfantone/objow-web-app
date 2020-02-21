import * as types from './actionTypes'

export const removeLevelList = (levels) => {
    return {
        type: types.REMOVE_LEVEL_LIST,
        levels
    }
}

export const removeLevelListSuccess = () => {
    return {
        type: types.REMOVE_LEVEL_LIST_SUCCESS
    }
}

export const removeLevelListError = () => {
    return {
        type: types.REMOVE_LEVEL_LIST_ERROR
    }
}