import * as types from './actionTypes';

export const getGoalDefinition = (id) => {
    return {
        type: types.GET_GOAL_DEFINITION,
        id
    }
};

export const getGoalDefinitionSuccess = (definition) => {
    return {
        type: types.GET_GOAL_DEFINITION_SUCCESS,
        definition
    }
};

export const getGoalDefinitionError = () => {
    return {
        type: types.GET_GOAL_DEFINITION_ERROR
    }
};

export const clearGoalDefinition = () => {
    return {
        type: types.CLEAR_GOAL_DEFINITION
    }
};