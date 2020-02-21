import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let PlayerGoalListUpdate = (state = initialState.playerGoalListUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_PLAYER_GOAL_LIST:
            return {...state, success: false, loading: true, hasError: false}

        case types.UPDATE_PLAYER_GOAL_LIST_SUCCESS:
            return {...state, success: true, loading: false, hasError: false}

        case types.UPDATE_PLAYER_GOAL_LIST_ERROR:
            return {...state, success: false, loading: false, hasError: true}

        default:
            return state
    }
}

export default PlayerGoalListUpdate