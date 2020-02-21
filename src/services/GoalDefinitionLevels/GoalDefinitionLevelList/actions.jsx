import * as types from './actionTypes';

export const getGoalDefinitionLevelList = (definitionId) => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_LIST,
        definitionId
    }
}

export const getGoalDefinitionLevelListSuccess = (levels) => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_LIST_SUCCESS,
        levels
    }
}

export const getGoalDefinitionLevelListError = () => {
    return {
        type: types.GET_GOAL_DEFINITION_LEVEL_LIST_ERROR
    }
}