import * as types from './actionTypes'

export const getEmptyTeamGoalSummaryList = () => ({
    type: types.GET_EMPTY_TEAM_GOAL_SUMMARY_LIST
})

export const getTeamGoalSummaryListByCollaborator = (collaboratorId, current, category, year, start, end, name) => ({
    type: types.GET_TEAM_GOAL_SUMMARY_LIST_BY_COLLABORATOR,
    collaboratorId,
    current,
    category,
    year,
    start,
    end,
    name
})

export const getTeamGoalSummaryListByDefinitionAndCollaborator = (definitionId, collaboratorId) => ({
    type: types.GET_TEAM_GOAL_SUMMARY_LIST_BY_DEFINITION_AND_COLLABORATOR,
    definitionId,
    collaboratorId
})

export const getTeamGoalSummaryListByDefinitionAndTeam = (definitionId, teamId) => ({
    type: types.GET_TEAM_GOAL_SUMMARY_LIST_BY_DEFINITION_AND_TEAM,
    definitionId,
    teamId
})

export const getTeamGoalSummaryListByTeam = (teamId, current, category, year, start, end, name) => ({
    type: types.GET_TEAM_GOAL_SUMMARY_LIST_BY_TEAM,
    teamId,
    current,
    category,
    year,
    start,
    end,
    name
})

export const getTeamGoalSummaryListSuccess = (goals) => ({
    type: types.GET_TEAM_GOAL_SUMMARY_LIST_SUCCESS,
    goals
})

export const getTeamGoalSummaryListError = () => ({
    type: types.GET_TEAM_GOAL_SUMMARY_LIST_ERROR
})

export const clearTeamGoalSummaryList = () => ({
    type: types.CLEAR_TEAM_GOAL_SUMMARY_LIST
})
