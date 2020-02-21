import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let GoalDefinitionCreation = (state = initialState.categoryCreation, action) => {
    switch (action.type) {
        case types.CREATE_CATEGORY:
            return {...state, success: false, loading: true, hasError: false}
            
        case types.CREATE_CATEGORY_SUCCESS:
            return {...state, success: true, loading: false, hasError: false}

        case types.CREATE_CATEGORY_ERROR:
            return {...state, success: false, loading: false, hasError: true}

        case types.CLEAR_CATEGORY_CREATION:
            return {...state, success: false, loading: false, hasError: false}

        default:
            return state;
    }
}

export default GoalDefinitionCreation