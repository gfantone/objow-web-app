import * as actionTypes from './actionTypes'

export const getChallengeAwardTypeList = () => {
    return {
        type: actionTypes.GET_CHALLENGE_AWARD_TYPE_LIST
    }
};

export const getChallengeAwardTypeListSuccess = (types) => {
    return {
        type: actionTypes.GET_CHALLENGE_AWARD_TYPE_LIST_SUCCESS,
        types
    }
};

export const getChallengeAwardTypeListError = () => {
    return {
        type: actionTypes.GET_CHALLENGE_AWARD_TYPE_LIST_ERROR
    }
};