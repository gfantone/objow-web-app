import * as types from './actionTypes';

export const createGoalDefinition = (definition) => {
    return {
        type: types.CREATE_GOAL_DEFINITION,
        definition
    }
};

export const createGoalDefinitionSuccess = (definition) => {
    return {
        type: types.CREATE_GOAL_DEFINITION_SUCCESS,
        definition
    }
};

export const createGoalDefinitionError = () => {
    return {
        type: types.CREATE_GOAL_DEFINITION_ERROR
    }
};

export const clearGoalDefinitionCreation = () => {
    return {
        type: types.CLEAR_GOAL_DEFINITION_CREATION
    }
};