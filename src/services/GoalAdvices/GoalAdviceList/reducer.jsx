import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let GoalAdviceList = (state = initialState.goalAdviceList, action) => {
    switch (action.type) {
        case types.GET_GOAL_ADVICE_LIST_BY_COLLABORATOR_GOAL:
        case types.GET_GOAL_ADVICE_LIST_BY_TEAM_GOAL:
        case types.GET_GOAL_ADVICE_LIST_BY_TEAM_COLLABORATOR_GOAL:
            return {...state, advices: null, loading: true, hasError: false};

        case types.GET_GOAL_ADVICE_LIST_SUCCESS:
            return {...state, advices: action.advices, loading: false, hasError: false};

        case types.GET_GOAL_ADVICE_LIST_ERROR:
            return {...state, advices: null, loading: false, hasError: true};

        default:
            return state
    }
};

export default GoalAdviceList
