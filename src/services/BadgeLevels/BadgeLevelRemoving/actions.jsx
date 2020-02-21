import * as types from './actionTypes'

export const removeBadgeLevel = (id) => {
    return {
        type: types.REMOVE_BADGE_LEVEL,
        id
    }
}

export const removeBadgeLevelSuccess = () => {
    return {
        type: types.REMOVE_BADGE_LEVEL_SUCCESS
    }
}

export const removeBadgeLevelError = () => {
    return {
        type: types.REMOVE_BADGE_LEVEL_ERROR
    }
}