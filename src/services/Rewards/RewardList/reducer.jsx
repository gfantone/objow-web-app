import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const RewardList = (state = initialState.rewardList, action) => {
    switch (action.type) {
        case types.GET_COLLABORATOR_REWARD_LIST:
        case types.GET_TEAM_REWARD_LIST:
            return {...state, rewards: null, loading: true, hasError: false}

        case types.GET_REWARD_LIST_SUCCESS:
            return {...state, rewards: action.rewards, loading: false, hasError: false}

        case types.GET_REWARD_LIST_ERROR:
            return {...state, rewards: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default RewardList
