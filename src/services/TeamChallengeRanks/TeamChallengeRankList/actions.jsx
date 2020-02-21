import * as types from './actionTypes'

export const getTeamChallengeRankList = (challengeId) => {
    return {
        type: types.GET_TEAM_CHALLENGE_RANK_LIST,
        challengeId
    }
}

export const getTeamChallengeRankListSuccess = (ranks) => {
    return {
        type: types.GET_TEAM_CHALLENGE_RANK_LIST_SUCCESS,
        ranks
    }
}

export const getTeamChallengeRankListError = () => {
    return {
        type: types.GET_TEAM_CHALLENGE_RANK_LIST_ERROR
    }
}