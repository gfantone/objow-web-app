import * as types from './actionTypes'

export const getCollaboratorChallengeGoalList = (challengeId) => {
    return {
        type: types.GET_COLLABORATOR_CHALLENGE_GOAL_LIST,
        challengeId
    }
}

export const getCollaboratorChallengeGoalListSuccess = (goals) => {
    return {
        type: types.GET_COLLABORATOR_CHALLENGE_GOAL_LIST_SUCCESS,
        goals
    }
}

export const getCollaboratorChallengeGoalListError = () => {
    return {
        type: types.GET_COLLABORATOR_CHALLENGE_GOAL_LIST_ERROR
    }
}