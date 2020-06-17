import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const TeamRewardOrderDetail = (state = initialState.teamRewardOrderDetail, action) => {
    switch (action.type) {
        case types.GET_TEAM_REWARD_ORDER:
            return {...state, order: null, loading: true, hasError: false}

        case types.GET_TEAM_REWARD_ORDER_SUCCESS:
            return {...state, order: action.order, loading: false, hasError: false}

        case types.GET_TEAM_REWARD_ORDER_ERROR:
            return {...state, order: null, loading: false, hasError: true}

        case types.CLEAR_TEAM_REWARD_ORDER_DETAIL:
            return {...state, order: null, loading: false, hasError: false}

        default:
            return state
    }
}

export default TeamRewardOrderDetail
