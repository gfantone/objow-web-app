import * as types from './actionTypes';

export const getGoalDefinitionList = (periodId, isActive, includeData = false, allDefinitions) => {
    return {
        type: types.GET_GOAL_DEFINITION_LIST,
        periodId,
        isActive,
        includeData,
        allDefinitions
    }
}

export const getGoalDefinitionListByCollaborator = (collaboratorId, periodId, current, detail) => ({
    type: types.GET_GOAL_DEFINITION_LIST_BY_COLLABORATOR,
    collaboratorId,
    periodId,
    current,
    detail
})

export const getGoalDefinitionListByTeam = (periodId, teamId, current, detail) => ({
    type: types.GET_GOAL_DEFINITION_LIST_BY_TEAM,
    periodId,
    teamId,
    current,
    detail
})

export const getGoalDefinitionListSuccess = (definitions) => {
    return {
        type: types.GET_GOAL_DEFINITION_LIST_SUCCESS,
        definitions
    }
}

export const getGoalDefinitionListError = () => {
    return {
        type: types.GET_GOAL_DEFINITION_LIST_ERROR
    }
}
