import * as types from './actionTypes'

export const getTeamCollaboratorGoalList = (teamId, current, category, year, start, end, name) => ({
    type: types.GET_TEAM_COLLABORATOR_GOAL_LIST,
    teamId,
    current,
    category,
    year,
    start,
    end,
    name
});

export const getTeamCollaboratorGoalListSuccess = (goals) => ({
    type: types.GET_TEAM_COLLABORATOR_GOAL_LIST_SUCCESS,
    goals
});

export const getTeamCollaboratorGoalListError = () => ({
    type: types.GET_TEAM_COLLABORATOR_GOAL_LIST_ERROR
});
