import * as types from './actionTypes'

export const getTeamChallengeGoalList = (challengeId) => {
    return {
        type: types.GET_TEAM_CHALLENGE_GOAL_LIST,
        challengeId
    }
}

export const getTeamChallengeGoalListSuccess = (goals) => {
    return {
        type: types.GET_TEAM_CHALLENGE_GOAL_LIST_SUCCESS,
        goals
    }
}

export const getTeamChallengeGoalListError = () => {
    return {
        type: types.GET_TEAM_CHALLENGE_GOAL_LIST_ERROR
    }
}