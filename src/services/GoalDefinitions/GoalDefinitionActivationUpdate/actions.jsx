import * as types from './actionTypes';

export const updateGoalDefinitionActivation = (id, isActive) => ({
  type: types.UPDATE_GOAL_DEFINITION_ACTIVATION,
  id,
  isActive,
});

export const updateGoalDefinitionActivationSuccess = () => ({
  type: types.UPDATE_GOAL_DEFINITION_ACTIVATION_SUCCESS,
});

export const updateGoalDefinitionActivationError = () => ({
  type: types.UPDATE_GOAL_DEFINITION_ACTIVATION_ERROR,
});

export const clearGoalDefinitionActivationUpdate = () => ({
  type: types.CLEAR_GOAL_DEFINITION_ACTIVATION_UPDATE,
});
