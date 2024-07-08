import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const GoalDefinitionLevelCollaoratorPoints = (
  state = initialState.goalDefinitionLevelCollaoratorPoints,
  action,
) => {
  switch (action.type) {
    case types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS:
    case types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_BY_COLLABORATOR:
    case types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_BY_TEAM:
      return {
        ...state,
        usedPoints: null,
        currentPoints: null,
        loading: true,
        hasError: false,
      };

    case types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_SUCCESS:
      return {
        ...state,
        usedPoints: action.usedPoints,
        currentPoints: action.currentPoints,
        loading: false,
        hasError: false,
      };

    case types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_ERROR:
      return {
        ...state,
        usedPoints: null,
        currentPoints: null,
        loading: false,
        hasError: true,
      };

    default:
      return state;
  }
};

export default GoalDefinitionLevelCollaoratorPoints;
