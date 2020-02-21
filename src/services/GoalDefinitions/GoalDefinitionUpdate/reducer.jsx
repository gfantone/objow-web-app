import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let GoalDefinitionUpdate = (state = initialState.goalDefinitionUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_GOAL_DEFINITION:
            return {...state, success: false, loading: true, hasError: false}
            
        case types.UPDATE_GOAL_DEFINITION_SUCCESS:
            return {...state, success: true, loading: false, hasError: false}

        case types.UPDATE_GOAL_DEFINITION_ERROR:
            return {...state, success: false, loading: false, hasError: true}

        case types.CLEAR_GOAL_DEFINITION_UPDATE:
            return {...state, success: false, loading: false, hasError: false}

        default:
            return state;
    }
}

export default GoalDefinitionUpdate