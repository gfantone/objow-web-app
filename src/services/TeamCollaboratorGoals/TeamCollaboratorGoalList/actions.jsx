import * as types from './actionTypes'

export const getEmptyTeamCollaboratorGoalList = () => ({
    type: types.GET_EMPTY_TEAM_COLLABORATOR_GOAL_LIST
})

export const getTeamCollaboratorGoalList = (teamId, current, category, year, start, end, name) => ({
    type: types.GET_TEAM_COLLABORATOR_GOAL_LIST,
    teamId,
    current,
    category,
    year,
    start,
    end,
    name
})

export const getTeamCollaboratorGoalListByDefinitionAndTeam = (definitionId, teamId) => ({
    type: types.GET_TEAM_COLLABORATOR_GOAL_LIST_BY_DEFINITION_AND_TEAM,
    definitionId,
    teamId
})

export const getTeamCollaboratorGoalListSuccess = (goals) => ({
    type: types.GET_TEAM_COLLABORATOR_GOAL_LIST_SUCCESS,
    goals
})

export const getTeamCollaboratorGoalListError = () => ({
    type: types.GET_TEAM_COLLABORATOR_GOAL_LIST_ERROR
})

export const clearTeamCollaboratorGoalList = () => ({
    type: types.CLEAR_TEAM_COLLABORATOR_GOAL_LIST
})
