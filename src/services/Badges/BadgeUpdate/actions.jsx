import * as types from './actionTypes'

export const updateBadge = (id, description) => {
    return {
        type: types.UPDATE_BADGE,
        id,
        description
    }
};

export const updateBadgeSuccess = () => {
    return {
        type: types.UPDATE_BADGE_SUCCESS
    }
};

export const updateBadgeError = () => {
    return {
        type: types.UPDATE_BADGE_ERROR
    }
};

export const clearBadgeUpdate = () => {
    return {
        type: types.CLEAR_BADGE_UPDATE
    }
};