import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const RewardUpdate = (state = initialState.rewardUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_REWARD:
        case types.UPDATE_REWARD_ACTIVATION:
            return {...state, success: false, loading: true, hasError: false}

        case types.UPDATE_REWARD_SUCCESS:
            return {...state, success: true, loading: false, hasError: false}

        case types.UPDATE_REWARD_ERROR:
            return {...state, success: false, loading: false, hasError: true}

        case types.CLEAR_REWARD_UPDATE:
            return {...state, success: false, loading: false, hasError: false}

        default:
            return state
    }
}

export default RewardUpdate
