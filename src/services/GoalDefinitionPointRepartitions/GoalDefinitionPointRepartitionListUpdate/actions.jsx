import * as actionTypes from './actionTypes';

export const updateGoalDefinitionPointRepartitionList = (pointRepartitions) => {
  return {
    type: actionTypes.UPDATE_GOAL_DEFINITION_POINT_REPARTITION_LIST,
    pointRepartitions,
  };
};

export const updateGoalDefinitionPointRepartitionListSuccess = () => {
  return {
    type: actionTypes.UPDATE_GOAL_DEFINITION_POINT_REPARTITION_LIST_SUCCESS,
  };
};

export const updateGoalDefinitionPointRepartitionListError = () => {
  return {
    type: actionTypes.UPDATE_GOAL_DEFINITION_POINT_REPARTITION_LIST_ERROR,
  };
};

export const updateGoalDefinitionPointRepartitionListClear = () => {
  return {
    type: actionTypes.UPDATE_GOAL_DEFINITION_POINT_REPARTITION_LIST_CLEAR,
  };
};
