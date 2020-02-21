import * as types from './actionTypes'

export const getTeamChallengeDetail = (id) => {
    return {
        type: types.GET_TEAM_CHALLENGE_DETAIL,
        id
    }
};

export const getTeamChallengeDetailSuccess = (challenge) => {
    return {
        type: types.GET_TEAM_CHALLENGE_DETAIL_SUCCESS,
        challenge
    }
};

export const getTeamChallengeDetailError = () => {
    return {
        type: types.GET_TEAM_CHALLENGE_DETAIL_ERROR
    }
};