import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamGoalList = (state = initialState.teamGoalList, action) => {
    switch (action.type) {
        case types.GET_TEAM_GOAL_LIST_BY_DEFINITION:
            return {...state, goals: null, loading: true, hasError: false}
            
        case types.GET_TEAM_GOAL_LIST_SUCCESS:
                return {...state, goals: action.goals, loading: false, hasError: false}

        case types.GET_TEAM_GOAL_LIST_ERROR:
                return {...state, goals: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default TeamGoalList