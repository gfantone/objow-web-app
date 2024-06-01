import * as actionTypes from './actionTypes';
import initialState from '../../../store/initialState';

const GoalDefinitionRepartitionList = (
  state = initialState.goalDefinitionRepartitionList,
  action,
) => {
  switch (action.type) {
    case actionTypes.GET_GOAL_DEFINITION_REPARTITION_LIST:
      return { ...state, repartitions: null, loading: true, hasError: false };

    case actionTypes.GET_GOAL_DEFINITION_REPARTITION_LIST_SUCCESS:
      return {
        ...state,
        repartitions: action.repartitions,
        loading: false,
        hasError: false,
      };

    case actionTypes.GET_GOAL_DEFINITION_REPARTITION_LIST_ERROR:
      return { ...state, repartitions: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default GoalDefinitionRepartitionList;
