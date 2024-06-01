import * as actionTypes from './actionTypes';

export const getGoalDefinitionRepartitionList = () => {
  return {
    type: actionTypes.GET_GOAL_DEFINITION_REPARTITION_LIST,
  };
};

export const getGoalDefinitionRepartitionListSuccess = (repartitions) => {
  return {
    type: actionTypes.GET_GOAL_DEFINITION_REPARTITION_LIST_SUCCESS,
    repartitions,
  };
};

export const getGoalDefinitionRepartitionListError = () => {
  return {
    type: actionTypes.GET_GOAL_DEFINITION_REPARTITION_LIST_ERROR,
  };
};
