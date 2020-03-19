import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let GoalAdviceListCreation = (state = initialState.goalAdviceListCreation, action) => {
    switch (action.type) {
        case types.CREATE_GOAL_ADVICE_LIST:
            return {...state, success: false, loading: true, hasError: false};

        case types.CREATE_GOAL_ADVICE_LIST_SUCCESS:
            return {...state, success: true, loading: false, hasError: false};

        case types.CREATE_GOAL_ADVICE_LIST_ERROR:
            return {...state, success: false, loading: false, hasError: true};

        default:
            return state
    }
};

export default GoalAdviceListCreation
