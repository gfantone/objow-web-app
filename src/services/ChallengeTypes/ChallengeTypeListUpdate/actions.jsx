import * as actionTypes from './actionTypes'

export const updateChallengeTypeList = (types) => {
    return {
        type: actionTypes.UPDATE_CHALLENGE_TYPE_LIST,
        types
    }
};

export const updateChallengeTypeListSuccess = () => {
    return {
        type: actionTypes.UPDATE_CHALLENGE_TYPE_LIST_SUCCESS
    }
};

export const updateChallengeTypeListError = () => {
    return {
        type: actionTypes.UPDATE_CHALLENGE_TYPE_LIST_ERROR
    }
};

export const clearChallengeTypeListUpdate = () => {
    return {
        type: actionTypes.CLEAR_CHALLENGE_TYPE_LIST_UPDATE
    }
};