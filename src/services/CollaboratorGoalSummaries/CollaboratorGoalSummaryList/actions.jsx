import * as types from './actionTypes'

export const getCollaboratorGoalSummaryList = (id, current, category, year, start, end, name) => ({
    type: types.GET_COLLABORATOR_GOAL_SUMMARY_LIST,
    id,
    current,
    category,
    year,
    start,
    end,
    name
})

export const getCollaboratorGoalSummaryListByDefinitionAndCollaborator = (definitionId, collaboratorId) => ({
    type: types.GET_COLLABORATOR_GOAL_SUMMARY_LIST_BY_DEFINITION_AND_COLLABORATOR,
    definitionId,
    collaboratorId
})

export const getCollaboratorGoalSummaryListSuccess = (goals) => ({
    type: types.GET_COLLABORATOR_GOAL_SUMMARY_LIST_SUCCESS,
    goals
})

export const getCollaboratorGoalSummaryListError = () => ({
    type: types.GET_COLLABORATOR_GOAL_SUMMARY_LIST_ERROR
})

export const clearCollaboratorGoalSummaryList = () => ({
    type: types.CLEAR_COLLABORATOR_GOAL_SUMMARY_LIST
})
