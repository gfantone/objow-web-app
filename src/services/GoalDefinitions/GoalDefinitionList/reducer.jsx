import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let GoalDefinitionList = (state = initialState.goalDefinitionList, action) => {
    switch (action.type) {
        case types.GET_GOAL_DEFINITION_LIST:
        case types.GET_ALL_GOAL_DEFINITION_LIST:
            return {...state, definitions: [], count: 0, loading: true, hasError: false};

        case types.GET_GOAL_DEFINITION_LIST_SUCCESS:
            return {...state, definitions: action.definitions, count: action.count, loading: false, hasError: false};

        case types.GET_GOAL_DEFINITION_LIST_ERROR:
            return {...state, definitions: [], count: 0, loading: false, hasError: true};

        default:
            return state;
    }
};

export default GoalDefinitionList;
