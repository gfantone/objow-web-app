import * as types from './actionTypes'

export const getTeamCollaboratorGoalDetail = (id) => {
    return {
        type: types.GET_TEAM_COLLABORATOR_GOAL_DETAIL,
        id
    }
}

export const getTeamCollaboratorGoalDetailSuccess = (goal) => {
    return {
        type: types.GET_TEAM_COLLABORATOR_GOAL_DETAIL_SUCCESS,
        goal
    }
}

export const getTeamCollaboratorGoalDetailError = () => {
    return {
        type: types.GET_TEAM_COLLABORATOR_GOAL_DETAIL_ERROR
    }
}