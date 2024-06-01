import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let GoalDefinitionLevelList = (
  state = initialState.goalDefinitionLevelList,
  action,
) => {
  switch (action.type) {
    case types.GET_GOAL_DEFINITION_LEVEL_LIST:
      return { ...state, levels: null, loading: true, hasError: false };

    case types.GET_GOAL_DEFINITION_LEVEL_LIST_SUCCESS:
      return {
        ...state,
        levels: action.levels,
        loading: false,
        hasError: false,
      };

    case types.GET_GOAL_DEFINITION_LEVEL_LIST_ERROR:
      return { ...state, levels: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default GoalDefinitionLevelList;
