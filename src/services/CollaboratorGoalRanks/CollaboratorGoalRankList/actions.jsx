import * as types from './actionTypes'

export const getCollaboratorGoalRankListByCollaboratorGoal = (goalId) => {
    return {
        type: types.GET_COLLABORATOR_GOAL_RANK_LIST_BY_COLLABORATOR_GOAL,
        goalId
    }
}

export const getCollaboratorGoalRankListByTeamCollaboratorGoal = (goalId) => {
    return {
        type: types.GET_COLLABORATOR_GOAL_RANK_LIST_BY_TEAM_COLLABORATOR_GOAL,
        goalId
    }
}

export const getCollaboratorGoalRankListSuccess = (ranks) => {
    return {
        type: types.GET_COLLABORATOR_GOAL_RANK_LIST_SUCCESS,
        ranks
    }
}

export const getCollaboratorGoalRankListError = () => {
    return {
        type: types.GET_COLLABORATOR_GOAL_RANK_LIST_ERROR
    }
}