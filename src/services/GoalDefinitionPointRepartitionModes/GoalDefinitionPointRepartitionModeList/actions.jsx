import * as actionTypes from './actionTypes';

export const getGoalDefinitionPointRepartitionModeList = () => {
  return {
    type: actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_MODE_LIST,
  };
};

export const getGoalDefinitionPointRepartitionModeListSuccess = (modes) => {
  return {
    type: actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_MODE_LIST_SUCCESS,
    modes,
  };
};

export const getGoalDefinitionPointRepartitionModeListError = () => {
  return {
    type: actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_MODE_LIST_ERROR,
  };
};
