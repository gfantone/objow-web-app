import * as types from './actionTypes';

export const getGoalDefinitionList = (periodId, includeData = false) => {
    return {
        type: types.GET_GOAL_DEFINITION_LIST,
        periodId,
        includeData
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
