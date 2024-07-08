import * as actionTypes from './actionTypes';
import initialState from '../../../store/initialState';

const GoalDefinitionPointRepartitionListUpdate = (
  state = initialState.goalDefinitionPointRepartitionListUpdate,
  action,
) => {
  switch (action.type) {
    case actionTypes.UPDATE_GOAL_DEFINITION_POINT_REPARTITION_LIST:
      return {
        ...state,
        pointRepartitions: action.pointRepartitions,
        loading: true,
        hasError: false,
      };

    case actionTypes.UPDATE_GOAL_DEFINITION_POINT_REPARTITION_LIST_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case actionTypes.UPDATE_GOAL_DEFINITION_POINT_REPARTITION_LIST_ERROR:
      return { ...state, loading: false, hasError: true };

    case actionTypes.UPDATE_GOAL_DEFINITION_POINT_REPARTITION_LIST_CLEAR:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default GoalDefinitionPointRepartitionListUpdate;
