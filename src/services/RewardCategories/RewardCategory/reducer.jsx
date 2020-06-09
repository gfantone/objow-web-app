import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const RewardCategory = (state = initialState.rewardCategory, action) => {
    switch (action.type) {
        case types.GET_REWARD_CATEGORY:
            return {...state, category: null, loading: true, hasError: false}

        case types.GET_REWARD_CATEGORY_SUCCESS:
            return {...state, category: action.category, loading: false, hasError: false}

        case types.GET_REWARD_CATEGORY_ERROR:
            return {...state, category: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default RewardCategory
