import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const RewardDetail = (state = initialState.rewardDetail, action) => {
    switch (action.type) {
        case types.GET_REWARD:
            return {...state, reward: null, loading: true, hasError: false}

        case types.GET_REWARD_SUCCESS:
            return {...state, reward: action.reward, loading: false, hasError: false}

        case types.GET_REWARD_ERROR:
            return {...state, reward: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default RewardDetail
