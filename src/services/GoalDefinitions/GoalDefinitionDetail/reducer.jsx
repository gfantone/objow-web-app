import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let GoalDefinitionList = (state = initialState.goalDefinition, action) => {
    switch (action.type) {
        case types.GET_GOAL_DEFINITION:
            return {...state, definition: null, loading: true, hasError: false}
            
        case types.GET_GOAL_DEFINITION_SUCCESS:
            return {...state, definition: action.definition, loading: false, hasError: false}

        case types.GET_GOAL_DEFINITION_ERROR:
            return {...state, definition: null, loading: false, hasError: true}

        case types.CLEAR_GOAL_DEFINITION:
            return {...state, definition: null, loading: false, hasError: false}

        default:
            return state;
    }
}

export default GoalDefinitionList;