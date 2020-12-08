import * as types from './actionTypes';

export const getGoalDefinitionList = (periodId, isActive, includeData = false) => {
    return {
        type: types.GET_GOAL_DEFINITION_LIST,
        periodId,
        isActive,
        includeData
    }
}

export const getGoalDefinitionListByCollaborator = (collaboratorId, periodId) => ({
    type: types.GET_GOAL_DEFINITION_LIST_BY_COLLABORATOR,
    collaboratorId,
    periodId
})

export const getGoalDefinitionListByTeam = (periodId, teamId) => ({
    type: types.GET_GOAL_DEFINITION_LIST_BY_TEAM,
    periodId,
    teamId
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
