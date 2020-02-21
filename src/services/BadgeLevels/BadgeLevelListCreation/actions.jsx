import * as types from './actionTypes'

export const createBadgeLevelList = (levels) => {
    return {
        type: types.CREATE_BADGE_LEVEL_LIST,
        levels
    }
}

export const createBadgeLevelListSuccess = () => {
    return {
        type: types.CREATE_BADGE_LEVEL_LIST_SUCCESS
    }
}

export const createBadgeLevelListError = () => {
    return {
        type: types.CREATE_BADGE_LEVEL_LIST_ERROR
    }
}

export const clearBadgeLevelListCreation = () => {
    return {
        type: types.CLEAR_BADGE_LEVEL_LIST_CREATION
    }
}