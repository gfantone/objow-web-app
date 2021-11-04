import * as actionTypes from './actionTypes'

export const getChallengeRewardTypeList = () => {
    return {
        type: actionTypes.GET_CHALLENGE_REWARD_TYPE_LIST
    }
};

export const getChallengeRewardTypeListSuccess = (types) => {
    return {
        type: actionTypes.GET_CHALLENGE_REWARD_TYPE_LIST_SUCCESS,
        types
    }
};

export const getChallengeRewardTypeListError = () => {
    return {
        type: actionTypes.GET_CHALLENGE_REWARD_TYPE_LIST_ERROR
    }
};
