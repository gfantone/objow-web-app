import * as types from './actionTypes';

export const updateGoalDefinition = (id, definition) => {
  return {
    type: types.UPDATE_GOAL_DEFINITION,
    id,
    definition,
  };
};

export const updateGoalDefinitionSuccess = (definition) => {
  return {
    type: types.UPDATE_GOAL_DEFINITION_SUCCESS,
    definition,
  };
};

export const updateGoalDefinitionError = () => {
  return {
    type: types.UPDATE_GOAL_DEFINITION_ERROR,
  };
};

export const clearGoalDefinitionUpdate = () => {
  return {
    type: types.CLEAR_GOAL_DEFINITION_UPDATE,
  };
};
