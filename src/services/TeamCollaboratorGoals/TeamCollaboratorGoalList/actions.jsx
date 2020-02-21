import * as types from './actionTypes'

export const getTeamCollaboratorGoalList = (teamId, current, category, year, start, end) => {
    return {
        type: types.GET_TEAM_COLLABORATOR_GOAL_LIST,
        teamId,
        current,
        category,
        year,
        start,
        end
    }
};

export const getTeamCollaboratorGoalListSuccess = (goals) => {
    return {
        type: types.GET_TEAM_COLLABORATOR_GOAL_LIST_SUCCESS,
        goals
    }
};

export const getTeamCollaboratorGoalListError = () => {
    return {
        type: types.GET_TEAM_COLLABORATOR_GOAL_LIST_ERROR
    }
};