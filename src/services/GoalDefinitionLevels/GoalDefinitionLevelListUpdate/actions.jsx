import * as types from './actionTypes';

export const updateGoalDefinitionLevelList = (
  definitionId,
  oldLevels,
  newLevels,
  removedLevels,
  team,
  collaborator,
) => {
  return {
    type: types.UPDATE_GOAL_DEFINITION_LEVEL_LIST,
    definitionId,
    oldLevels,
    newLevels,
    removedLevels,
    team,
    collaborator,
  };
};

export const updateGoalDefinitionLevelListSuccess = () => {
  return {
    type: types.UPDATE_GOAL_DEFINITION_LEVEL_LIST_SUCCESS,
  };
};

export const updateGoalDefinitionLevelListError = () => {
  return {
    type: types.UPDATE_GOAL_DEFINITION_LEVEL_LIST_ERROR,
  };
};

export const clearGoalDefinitionLevelListUpdate = () => {
  return {
    type: types.CLEAR_GOAL_DEFINITION_LEVEL_LIST_UPDATE,
  };
};
