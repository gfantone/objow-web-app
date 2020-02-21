import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const GoalDefinitionLevelCollaoratorPoints = (state = initialState.goalDefinitionLevelCollaoratorPoints, action) => {
    switch (action.type) {
        case types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS:
            return {...state, points: null, loading: true, hasError: false}
            
        case types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_SUCCESS:
            return {...state, points: action.points, loading: false, hasError: false}

        case types.GET_GOAL_DEFINITION_LEVEL_COLLABORATOR_POINTS_ERROR:
            return {...state, points: null, loading: false, hasError: true}

        default:
            return state;
    }
}

export default GoalDefinitionLevelCollaoratorPoints