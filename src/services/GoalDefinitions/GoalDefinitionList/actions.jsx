import * as types from './actionTypes';

export const getGoalDefinitionList = (periodId, includeData = false) => {
    return {
        type: types.GET_GOAL_DEFINITION_LIST,
        periodId,
        includeData
    }
};

export const getCurrentGoalDefinitionList = () => {
    return {
        type: types.GET_CURRENT_GOAL_DEFINITION_LIST
    }
};

export const getGoalDefinitionListSuccess = (definitions) => {
    return {
        type: types.GET_GOAL_DEFINITION_LIST_SUCCESS,
        definitions
    }
};

export const getGoalDefinitionListError = () => {
    return {
        type: types.GET_GOAL_DEFINITION_LIST_ERROR
    }
};