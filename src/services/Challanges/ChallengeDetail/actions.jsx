import * as types from './actionTypes'

export const getChallengeDetail = (id) => {
    return {
        type: types.GET_CHALLENGE_DETAIL,
        id
    }
};

export const getChallengeDetailSuccess = (challenge) => {
    return {
        type: types.GET_CHALLENGE_DETAIL_SUCCESS,
        challenge
    }
};

export const getChallengeDetailError = () => {
    return {
        type: types.GET_CHALLENGE_DETAIL_ERROR
    }
};