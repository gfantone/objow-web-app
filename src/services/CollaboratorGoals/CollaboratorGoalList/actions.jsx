import * as types from './actionTypes';

export const getCollaboratorGoalListByTeamCollaboratorGoal = (teamCollaboratorGoalId) => {
    return {
        type: types.GET_COLLABORATOR_GOAL_LIST_BY_TEAM_COLLABORATOR_GOAL,
        teamCollaboratorGoalId
    }
}

export const getCollaboratorGoalListSuccess = (goals) => {
    return {
        type: types.GET_COLLABORATOR_GOAL_LIST_SUCCESS,
        goals
    }
}

export const getCollaboratorGoalListError = () => {
    return {
        type: types.GET_COLLABORATOR_GOAL_LIST_ERROR
    }
}