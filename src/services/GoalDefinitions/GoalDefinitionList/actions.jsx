import * as types from './actionTypes';

export const getGoalDefinitionList = (periodId, isActive, includeData = false) => {
    return {
        type: types.GET_GOAL_DEFINITION_LIST,
        periodId,
        isActive,
        includeData
    }
};

export const getAllGoalDefinitionList = () => ({
    type: types.GET_ALL_GOAL_DEFINITION_LIST
})

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
