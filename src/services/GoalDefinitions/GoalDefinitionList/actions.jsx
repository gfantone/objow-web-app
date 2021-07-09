import * as types from './actionTypes';

export const getGoalDefinitionList = (periodId, isActive, includeData = false) => {
    return {
        type: types.GET_GOAL_DEFINITION_LIST,
        periodId,
        isActive,
        includeData
    }
}

export const getGoalDefinitionListByCollaborator = (collaboratorId, periodId, current) => ({
    type: types.GET_GOAL_DEFINITION_LIST_BY_COLLABORATOR,
    collaboratorId,
    periodId,
    current
})

export const getGoalDefinitionListByTeam = (periodId, teamId, current) => ({
    type: types.GET_GOAL_DEFINITION_LIST_BY_TEAM,
    periodId,
    teamId,
    current
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
