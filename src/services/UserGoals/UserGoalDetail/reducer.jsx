import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let UserGoalDetail = (state = initialState.userGoalDetail, action) => {
    switch (action.type) {
        case types.GET_USER_GOAL_DETAIL:
            return {...state, goal: null, ranking: null, indications: null, playerGoals: [], loading: true, hasError: false}
            
        case types.GET_USER_GOAL_DETAIL_SUCCESS:
                return {...state, goal: action.goal, ranking: action.ranking, indications: action.indications, playerGoals: action.playerGoals, loading: false, hasError: false}

        case types.GET_USER_GOAL_DETAIL_ERROR:
                return {...state, goal: null, ranking: null, indications: null, playerGoals: [], loading: false, hasError: true}

        default:
            return state
    }
}

export default UserGoalDetail