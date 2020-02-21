import * as types from './actionTypes'

export const getTeamGoalSummaryListByCollaborator = (collaboratorId, current, category, year, start, end) => {
    return {
        type: types.GET_TEAM_GOAL_SUMMARY_LIST_BY_COLLABORATOR,
        collaboratorId,
        current,
        category,
        year,
        start,
        end
    }
};

export const getTeamGoalSummaryListByTeam = (teamId, current, category, year, start, end) => {
    return {
        type: types.GET_TEAM_GOAL_SUMMARY_LIST_BY_TEAM,
        teamId,
        current,
        category,
        year,
        start,
        end
    }
};

export const getTeamGoalSummaryListSuccess = (goals) => {
    return {
        type: types.GET_TEAM_GOAL_SUMMARY_LIST_SUCCESS,
        goals
    }
};

export const getTeamGoalSummaryListError = () => {
    return {
        type: types.GET_TEAM_GOAL_SUMMARY_LIST_ERROR
    }
};