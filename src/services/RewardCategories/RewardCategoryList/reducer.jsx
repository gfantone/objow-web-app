import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const RewardCategoryList = (state = initialState.rewardCategoryList, action) => {
    switch (action.type) {
        case types.GET_ACTIVE_REWARD_CATEGORY_LIST:
        case types.GET_INACTIVE_REWARD_CATEGORY_LIST:
            return {...state, categories: null, loading: true, hasError: false}

        case types.GET_REWARD_CATEGORY_LIST_SUCCESS:
            return {...state, categories: action.categories, loading: false, hasError: false}

        case types.GET_REWARD_CATEGORY_LIST_ERROR:
            return {...state, categories: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default RewardCategoryList
